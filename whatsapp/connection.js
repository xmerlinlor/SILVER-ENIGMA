// ============================================
// 👑 SILVER-ENIGMA
// 📱 WHATSAPP CONNECTION + PAIRING SYSTEM
// ============================================

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";

// ============================================
// ⚙️ CONFIG
// ============================================

const SESSION_PATH = "./session";

let sock = null;
let messageHandler = null;
let connectionState = "disconnected";

// ============================================
// 📱 START WHATSAPP
// ============================================

export async function connectWhatsApp(handler) {
  messageHandler = handler;

  return startWhatsApp();
}

// ============================================
// 🚀 START CONNECTION
// ============================================

export async function startWhatsApp() {
  try {
    const {
      state,
      saveCreds
    } = await useMultiFileAuthState(
      SESSION_PATH
    );

    sock = makeWASocket({
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

    // ========================================
    // 💾 SAVE CREDENTIALS
    // ========================================

    sock.ev.on(
      "creds.update",
      saveCreds
    );

    // ========================================
    // 💬 MESSAGE HANDLER
    // ========================================

    sock.ev.on(
      "messages.upsert",
      async ({ messages }) => {
        try {
          if (
            !messageHandler ||
            !messages?.length
          ) {
            return;
          }

          for (const message of messages) {
            await messageHandler(
              sock,
              message
            );
          }

        } catch (error) {
          console.error(
            "❌ MESSAGE HANDLER ERROR:",
            error
          );
        }
      }
    );

    // ========================================
    // 📱 CONNECTION UPDATE
    // ========================================

    sock.ev.on(
      "connection.update",
      async update => {

        const {
          connection,
          lastDisconnect
        } = update;

        // ====================================
        // CONNECTED
        // ====================================

        if (
          connection === "open"
        ) {
          connectionState =
            "connected";

          console.log("");
          console.log(
            "╭────────────────────────────╮"
          );
          console.log(
            "│ 👑 SILVER-ENIGMA           │"
          );
          console.log(
            "│ ✅ WHATSAPP CONNECTED      │"
          );
          console.log(
            "╰────────────────────────────╯"
          );
          console.log("");
        }

        // ====================================
        // DISCONNECTED
        // ====================================

        if (
          connection === "close"
        ) {

          connectionState =
            "disconnected";

          const statusCode =
            lastDisconnect
              ?.error
              ?.output
              ?.statusCode;

          const shouldReconnect =
            statusCode !==
            DisconnectReason.loggedOut;

          console.log(
            "❌ WHATSAPP CONNECTION CLOSED"
          );

          if (shouldReconnect) {

            console.log(
              "🔄 RECONNECTING IN 5 SECONDS..."
            );

            setTimeout(
              () => {
                startWhatsApp();
              },
              5000
            );

          } else {

            connectionState =
              "logged_out";

            console.log(
              "🔐 SESSION LOGGED OUT."
            );
          }
        }
      }
    );

    return sock;

  } catch (error) {

    connectionState =
      "error";

    console.error(
      "❌ WHATSAPP START ERROR:",
      error
    );

    throw error;
  }
}

// ============================================
// 🔑 GENERATE PAIRING CODE
// ============================================

export async function requestPairingCode(
  phoneNumber
) {
  try {

    if (!sock) {
      await startWhatsApp();
    }

    if (!sock) {
      throw new Error(
        "WhatsApp socket is not available."
      );
    }

    let number =
      String(phoneNumber || "")
        .replace(/\D/g, "");

    if (!number) {
      throw new Error(
        "Invalid WhatsApp phone number."
      );
    }

    // ========================================
    // WAIT FOR SOCKET TO BE READY
    // ========================================

    if (
      typeof sock.requestPairingCode !==
      "function"
    ) {
      throw new Error(
        "This installed Baileys version does not support pairing codes."
      );
    }

    console.log(
      `📱 REQUESTING PAIRING CODE FOR: ${number}`
    );

    const code =
      await sock.requestPairingCode(
        number
      );

    console.log("");
    console.log(
      "╭────────────────────────────╮"
    );
    console.log(
      "│ 🔑 WHATSAPP PAIRING CODE   │"
    );
    console.log(
      `│ ${String(code).padEnd(26)}│`
    );
    console.log(
      "╰────────────────────────────╯"
    );
    console.log("");

    return code;

  } catch (error) {

    console.error(
      "❌ PAIRING CODE ERROR:",
      error
    );

    throw error;
  }
}

// ============================================
// 📊 CONNECTION STATUS
// ============================================

export function getConnectionStatus() {
  return connectionState;
}

// ============================================
// 🔌 GET SOCKET
// ============================================

export function getWhatsAppSocket() {
  return sock;
}

// ============================================
// 🔐 CHECK CONNECTED
// ============================================

export function isWhatsAppConnected() {
  return (
    connectionState ===
    "connected"
  );
}

// ============================================
// 👋 LOGOUT
// ============================================

export async function logoutWhatsApp() {
  try {

    if (!sock) {
      return false;
    }

    await sock.logout();

    connectionState =
      "logged_out";

    sock = null;

    return true;

  } catch (error) {

    console.error(
      "❌ WHATSAPP LOGOUT ERROR:",
      error
    );

    return false;
  }
}

// ============================================
// 📦 DEFAULT EXPORT
// ============================================

export default {
  connectWhatsApp,
  startWhatsApp,
  requestPairingCode,
  getConnectionStatus,
  getWhatsAppSocket,
  isWhatsAppConnected,
  logoutWhatsApp
};
