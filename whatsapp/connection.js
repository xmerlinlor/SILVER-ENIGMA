// ============================================
// 👑 SILVER-ENIGMA
// 📱 WHATSAPP CONNECTION
// ============================================

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";
import qrcode from "qrcode-terminal";

// ============================================
// 🚀 START WHATSAPP
// ============================================

export async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,

    logger: pino({
      level: "silent"
    }),

    printQRInTerminal: false,

    browser: [
      "SILVER-ENIGMA",
      "Chrome",
      "1.0.0"
    ],

    markOnlineOnConnect: true
  });

  // ==========================================
  // 🔐 SAVE SESSION
  // ==========================================

  sock.ev.on("creds.update", saveCreds);

  // ==========================================
  // 📱 CONNECTION UPDATE
  // ==========================================

  sock.ev.on("connection.update", async (update) => {
    const {
      connection,
      lastDisconnect,
      qr
    } = update;

    // QR CODE
    if (qr) {
      console.log("\n📱 SCAN THIS QR CODE:\n");
      qrcode.generate(qr, {
        small: true
      });
    }

    // CONNECTED
    if (connection === "open") {
      console.log("");
      console.log("╭────────────────────────────╮");
      console.log("│ 👑 SILVER-ENIGMA           │");
      console.log("│ ✅ WHATSAPP CONNECTED      │");
      console.log("╰────────────────────────────╯");
      console.log("");
    }

    // DISCONNECTED
    if (connection === "close") {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      const shouldReconnect =
        statusCode !== DisconnectReason.loggedOut;

      console.log(
        "❌ WHATSAPP CONNECTION CLOSED"
      );

      if (shouldReconnect) {
        console.log(
          "🔄 RECONNECTING..."
        );

        setTimeout(() => {
          startWhatsApp();
        }, 5000);
      } else {
        console.log(
          "🔐 SESSION LOGGED OUT. DELETE THE SESSION FOLDER AND PAIR AGAIN."
        );
      }
    }
  });

  return sock;
}
