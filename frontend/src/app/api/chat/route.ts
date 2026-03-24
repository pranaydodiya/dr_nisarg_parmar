import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 50;

const SYSTEM_PROMPT = `You are Dr. Nisarg Parmar's AI assistant on his medical website. Dr. Nisarg Parmar is a NIMHANS-trained Neurosurgeon providing expert neurological care in Gujarat, India. Your role is to assist website visitors with medical and health-related queries, provide information about the clinic, and guide them towards booking an appointment or contacting the doctor.

Rules:
- Always introduce yourself as an AI assistant and clarify that you are not a substitute for professional medical advice. Encourage users to consult Dr. Parmar for serious medical concerns.
- Respond courteously, professionally, and concisely, ensuring responses fit within 150 words.
- Use plain text without markdown formatting. For lists, use simple hyphens.
- Address only medical and health-related topics. For out-of-scope queries, politely state: 'I'm here to assist with medical and health-related questions. Please reach out to Dr. Parmar's office for other inquiries.'
- For ambiguous queries, ask clarifying questions to better understand the user's needs.
- For contradictory queries, request additional information to resolve inconsistencies.
- When symptoms or treatment questions arise, provide general information and suggest booking an appointment with Dr. Parmar.
- Monitor API usage to avoid exceeding quota limits and handle quota errors gracefully by informing users of temporary unavailability and suggesting they try again later.`;

function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "A non-empty messages array is required" },
        { status: 400 }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "Too many messages in conversation" },
        { status: 400 }
      );
    }

    // Validate each message has the expected shape
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return NextResponse.json(
          { error: "Each message must have a role and content string" },
          { status: 400 }
        );
      }
      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
          { error: `Message content must not exceed ${MAX_MESSAGE_LENGTH} characters` },
          { status: 400 }
        );
      }
    }

    const genAI = getGenAIClient();

    // Map messages to Gemini format, exclude the latest user message.
    // Filter out any leading assistant/model messages since Gemini
    // requires history to start with a "user" role message.
    const historyMessages = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const firstUserIndex = historyMessages.findIndex((msg: { role: string }) => msg.role === "user");
    const formattedHistory = firstUserIndex === -1 ? [] : historyMessages.slice(firstUserIndex);

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: formattedHistory,
    });

    const currentMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();

    return NextResponse.json({
      message: { role: "assistant", content: responseText },
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        { error: "Chat service is not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
