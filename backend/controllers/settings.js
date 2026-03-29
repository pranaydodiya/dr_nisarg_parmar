import { getDb } from '../db.js';
import { stripHtml } from '../utils/sanitize.js';

const SETTINGS_KEY = "contact_settings";

const defaults = {
  emergencyPhone: "+91 99741 11089",
  emergencyPhoneTel: "+919974111089",
  primaryPhone: "+91 99741 11089",
  primaryPhoneTel: "+919974111089",
  email: "contact@drnisargparmar.com",
  emergencyMessage: "Head injuries, spinal trauma, stroke — immediate care available.",
  emergencyTitle: "24/7 Emergency Neurosurgery",
  showEmergencyStrip: true,
  whatsappNumber: "",
  whatsappMessage: "Hello Dr. Nisarg, I would like to book an appointment.",
  showWhatsapp: false,
};

// GET /api/contact-settings - Public
export async function getContactSettings(req, res) {
  try {
    res.set(
      "Cache-Control",
      "public, s-maxage=120, stale-while-revalidate=600",
    );
    const db = getDb();
    const settings = await db.collection("settings").findOne({ key: SETTINGS_KEY });

    if (!settings) {
      return res.json(defaults);
    }

    const { _id, key, updatedAt, ...publicSettings } = settings;
    return res.json(publicSettings);
  } catch (error) {
    console.error("Error fetching public contact settings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// GET /api/admin/contact-settings
export async function getAdminContactSettings(req, res) {
  try {
    const db = getDb();
    const settings = await db.collection("settings").findOne({ key: SETTINGS_KEY });
    return res.json(settings || { ...defaults, key: SETTINGS_KEY });
  } catch (error) {
    console.error("Error fetching admin contact settings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// PUT /api/admin/contact-settings
export async function updateContactSettings(req, res) {
  try {
    const {
      emergencyPhone, emergencyPhoneTel, primaryPhone, primaryPhoneTel,
      email, emergencyMessage, emergencyTitle, showEmergencyStrip,
      whatsappNumber, whatsappMessage, showWhatsapp,
    } = req.body;

    const db = getDb();

    const updateDoc = {
      key: SETTINGS_KEY,
      emergencyPhone: stripHtml(emergencyPhone || ""),
      emergencyPhoneTel: stripHtml(emergencyPhoneTel || ""),
      primaryPhone: stripHtml(primaryPhone || ""),
      primaryPhoneTel: stripHtml(primaryPhoneTel || ""),
      email: stripHtml(email || ""),
      emergencyMessage: stripHtml(emergencyMessage || ""),
      emergencyTitle: stripHtml(emergencyTitle || "24/7 Emergency Neurosurgery"),
      showEmergencyStrip: showEmergencyStrip !== false,
      whatsappNumber: stripHtml(whatsappNumber || ""),
      whatsappMessage: stripHtml(whatsappMessage || ""),
      showWhatsapp: showWhatsapp === true,
      updatedAt: new Date(),
    };

    await db.collection("settings").updateOne(
      { key: SETTINGS_KEY },
      { $set: updateDoc },
      { upsert: true }
    );

    return res.json(updateDoc);
  } catch (error) {
    console.error("Error updating contact settings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
