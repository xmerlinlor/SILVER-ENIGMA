// ============================================
// 👑 SILVER-ENIGMA
// 💬 WHATSAPP MESSAGE HANDLER
// ============================================

import config from "../config.js";
import { executeCommand } from "../cmd/cmd.js";

export async function handleMessage(sock, message) {
  try {
    if (!message?.message) return;

    const remoteJid = message?.key?.remoteJid;

    if (!remoteJid) return;

    // Ignore WhatsApp status
    if (remoteJid === "status@broadcast") return;

    // ============================================
    // GET MESSAGE TEXT
    // ============================================

    const messageType =
      Object.keys(message.message)[0];

    let text = "";

    switch (messageType) {
      case "conversation":
        text =
          message.message.conversation || "";
        break;

      case "extendedTextMessage":
        text =
          message.message.extendedTextMessage?.text || "";
        break;

      case "imageMessage":
        text =
          message.message.imageMessage?.caption || "";
        break;

      case "videoMessage":
        text =
          message.message.videoMessage?.caption || "";
        break;

      case "buttonsResponseMessage":
        text =
          message.message.buttonsResponseMessage
            ?.selectedButtonId || "";
        break;

      case "listResponseMessage":
        text =
          message.message.listResponseMessage
            ?.singleSelectReply?.selectedRowId || "";
        break;

      default:
        return;
    }

    text = String(text).trim();

    if (!text) return;

    // ============================================
    // PREFIX
    // ============================================

    const prefix = config.PREFIX || ".";

    if (!text.startsWith(prefix)) return;

    const commandText =
      text.slice(prefix.length).trim();

    if (!commandText) return;

    const parts =
      commandText.split(/\s+/);

    const commandName =
      parts.shift()?.toLowerCase();

    const args = parts;

    const commandArgs =
      args.length
        ? args
        : [];

    const commandInput =
      args.join(" ");

    console.log(
      `📩 COMMAND: ${prefix}${commandName}`
    );

    // ============================================
    // EXECUTE COMMAND
    // ============================================

    await executeCommand({
      sock,
      message,
      commandName,
      args: commandArgs,
      text: commandInput
    });

  } catch (error) {
    console.error(
      "❌ HANDLER ERROR:",
      error
    );
  }
}

export default handleMessage;
