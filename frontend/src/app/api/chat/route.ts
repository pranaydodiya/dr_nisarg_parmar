import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 50;

const SYSTEM_PROMPT = `You are Dr. Nisarg Parmar's AI assistant on his medical website.
Dr. Nisarg Parmar is a NIMHANS trained Neurosurgeon providing expert neurological care in Gujarat.

Rules:
- Answer courteously, professionally, concisely, and accurately based on general medical knowledge.
- Always clarify you are an AI assistant and recommend consulting the doctor for serious medical advice.
- Do not use markdown formatting symbols. For lists, use simple hyphens.
- Do not answer questions unrelated to medical or health topics. Politely redirect the user.
- When a patient describes symptoms or asks about treatment, after answering, suggest they book an appointment with Dr. Parmar for a proper consultation.
- Keep responses concise (under 150 words) to fit the chat widget format.`;

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
