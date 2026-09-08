// ============================================
// 👑 SILVER-ENIGMA
// ⚡ WhatsApp Multi-Device Group Management Bot
// ============================================

import "dotenv/config";
import express from "express";

import { startWhatsApp } from "./whatsapp/connection.js";
import { handleMessage } from "./whatsapp/handler.js";
import config from "./config.js";

// ============================================
// 🌐 WEB SERVER
// ============================================

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("👑 SILVER-ENIGMA IS ONLINE ⚡");
});

app.get("/status", (req, res) => {
  res.json({
    bot: config.BOT_NAME,
    status: "online",
    platform: "WhatsApp Multi-Device",
    prefix: config.PREFIX
  });
});

app.listen(PORT, () => {
  console.log(`🌐 WEB SERVER RUNNING ON PORT ${PORT}`);
});

// ============================================
// 🤖 START WHATSAPP BOT
// ============================================

async function startBot() {
  try {
    console.log("╭────────────────────────────╮");
    console.log("│ 👑 SILVER-ENIGMA           │");
    console.log("│ ⚡ STARTING WHATSAPP BOT   │");
    console.log("╰────────────────────────────╯");

    const sock = await startWhatsApp();

    console.log("✅ WHATSAPP CONNECTION STARTED");

    // ========================================
    // 💬 MESSAGE HANDLER
    // ========================================

    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        if (!messages || !messages.length) return;

        const message = messages[0];

        await handleMessage(sock, message);

      } catch (error) {
        console.error("❌ MESSAGE HANDLER ERROR:", error);
      }
    });

  } catch (error) {
    console.error("❌ FAILED TO START SILVER-ENIGMA:");
    console.error(error);

    setTimeout(() => {
      console.log("🔄 RESTARTING BOT...");
      startBot();
    }, 5000);
  }
}

// ============================================
// 🚀 BOOT
// ============================================

startBot();

// ============================================
// 🛑 PROCESS ERROR HANDLING
// ============================================

process.on("uncaughtException", (error) => {
  console.error("❌ UNCAUGHT EXCEPTION:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ UNHANDLED REJECTION:", error);
});
