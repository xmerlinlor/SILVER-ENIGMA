// ============================================
// 👑 SILVER-ENIGMA
// 💬 WHATSAPP MESSAGE HANDLER
// ============================================

import config from "../config.js";

export async function handleMessage(sock, message) {
  try {
    if (!message?.message) return;

    const remoteJid = message.key.remoteJid;

    if (!remoteJid) return;

    // Ignore status broadcasts
    if (remoteJid === "status@broadcast") return;

    const messageType = Object.keys(message.message)[0];

    // Get text from common message types
    let text = "";

    if (messageType === "conversation") {
      text = message.message.conversation || "";
    } else if (messageType === "extendedTextMessage") {
      text = message.message.extendedTextMessage?.text || "";
    } else if (messageType === "imageMessage") {
      text = message.message.imageMessage?.caption || "";
    } else if (messageType === "videoMessage") {
      text = message.message.videoMessage?.caption || "";
    }

    text = text.trim();

    if (!text) return;

    // ========================================
    // PREFIX CHECK
    // ========================================

    if (!text.startsWith(config.PREFIX)) return;

    const commandText = text
      .slice(config.PREFIX.length)
      .trim();

    if (!commandText) return;

    const args = commandText.split(/\s+/);
    const command = args.shift().toLowerCase();

    console.log(
      `📩 COMMAND: ${config.PREFIX}${command}`
    );

    // ========================================
    // TEMPORARY TEST COMMAND
    // ========================================

    if (command === "ping") {
      await sock.sendMessage(remoteJid, {
        text: "🏓 PONG!\n\n👑 SILVER-ENIGMA IS ONLINE ⚡"
      });

      return;
    }

  } catch (error) {
    console.error(
      "❌ HANDLER ERROR:",
      error
    );
  }
}
