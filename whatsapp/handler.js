// ============================================
// 👑 SILVER-ENIGMA
// 💬 WHATSAPP MESSAGE HANDLER
// ============================================

import config from "../config.js";
import { executeCommand } from "../commands/cmd.js";

export async function handleMessage(sock, message) {
  try {
    if (!message?.message) return;

    const remoteJid = message?.key?.remoteJid;

    if (!remoteJid) return;

    if (remoteJid === "status@broadcast") return;

    const messageType =
      Object.keys(message.message)[0];

    let text = "";

    switch (messageType) {
      case "conversation":
        text = message.message.conversation || "";
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

    const prefix = config.PREFIX || ".";

    if (!text.startsWith(prefix)) return;

    const commandText =
      text.slice(prefix.length).trim();

    if (!commandText) return;

    const parts = commandText.split(/\s+/);

    const commandName =
      parts.shift()?.toLowerCase();

    if (!commandName) return;

    const args = parts;

    const commandInput = args.join(" ");

    console.log(
      `📩 COMMAND: ${prefix}${commandName}`
    );

    await executeCommand({
      sock,
      message,
      commandName,
      args,
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
