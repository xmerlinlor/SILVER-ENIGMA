// ============================================
// 👑 SILVER-ENIGMA
// 📱 WHATSAPP CONNECTION MANAGER
// ============================================

import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";

import pino from "pino";

// ============================================
// ⚙️ SETTINGS
// ============================================

const SESSION_PATH = "./session";

let sock = null;
let messageHandler = null;
let connectionState = "disconnected";
let reconnectTimer = null;
let starting = false;

// ============================================
// 🔌 CONNECT WHATSAPP
// ============================================

export async function connectWhatsApp(handler) {
  messageHandler = handler;

  if (sock && connectionState === "connected") {
    return sock;
  }

  return startWhatsApp();
}

// ============================================
// 🚀 START WHATSAPP
// ============================================

export async function startWhatsApp() {
  if (starting) {
    return sock;
  }

  starting = true;

  try {
    const { state, saveCreds } =
      await useMultiFileAuthState(SESSION_PATH);

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
    // 💾 SAVE SESSION
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
        if (!messageHandler || !messages?.length) {
          return;
        }

        for (const message of messages) {
          try {
            await messageHandler(
              sock,
              message
            );
          } catch (error) {
            console.error(
              "❌ MESSAGE HANDLER ERROR:",
              error
            );
          }
        }
      }
    );

    // ========================================
    // 📡 CONNECTION UPDATE
    // ========================================

    sock.ev.on(
      "connection.update",
      async (update) => {
        const {
          connection,
          lastDisconnect
        } = update;

        // ====================================
        // 🟢 CONNECTED
        // ====================================

        if (connection === "open") {
          connectionState = "connected";
          starting = false;

          console.log("");
          console.log(
            "╭────────────────────────────╮"
          );
          console.log(
            "│ 👑 SILVER-ENIGMA           │"
          );
          console.log(
            "│ 🟢 WHATSAPP CONNECTED      │"
          );
          console.log(
            "╰────────────────────────────╯"
          );
          console.log("");
        }

        // ====================================
        // 🔴 CLOSED
        // ====================================

        if (connection === "close") {
          connectionState = "disconnected";
          starting = false;
          sock = null;

          const statusCode =
            lastDisconnect?.error?.output?.statusCode;

          console.log(
            `❌ WHATSAPP CONNECTION CLOSED: ${statusCode || "UNKNOWN"}`
          );

          // ==================================
          // 🔐 LOGGED OUT
          // ==================================

          if (
            statusCode === DisconnectReason.loggedOut
          ) {
            connectionState = "logged_out";

            console.log(
              "🔐 WHATSAPP SESSION LOGGED OUT."
            );

            return;
          }

          // ==================================
          // 🔄 RECONNECT
          // ==================================

          if (!reconnectTimer) {
            console.log(
              "🔄 RECONNECTING IN 5 SECONDS..."
            );

            reconnectTimer = setTimeout(
              async () => {
                reconnectTimer = null;

                try {
                  await startWhatsApp();
                } catch (error) {
                  console.error(
                    "❌ RECONNECT ERROR:",
                    error
                  );
                }
              },
              5000
            );
          }
        }
      }
    );

    starting = false;

    return sock;

  } catch (error) {
    starting = false;
    connectionState = "error";

    console.error(
      "❌ WHATSAPP START ERROR:",
      error
    );

    throw error;
  }
}

// ============================================
// 🔑 REQUEST PAIRING CODE
// ============================================

export async function requestPairingCode(
  phoneNumber
) {
  try {
    let number =
      String(phoneNumber || "")
        .replace(/\D/g, "");

    if (!number) {
      throw new Error(
        "WhatsApp phone number is required."
      );
    }

    if (
      number.length < 8 ||
      number.length > 15
    ) {
      throw new Error(
        "Invalid WhatsApp phone number."
      );
    }

    // ========================================
    // START SOCKET IF NEEDED
    // ========================================

    if (!sock) {
      await startWhatsApp();
    }

    if (!sock) {
      throw new Error(
        "WhatsApp socket is not available."
      );
    }

    // ========================================
    // CHECK PAIRING SUPPORT
    // ========================================

    if (
      typeof sock.requestPairingCode !==
      "function"
    ) {
      throw new Error(
        "Pairing codes are not supported by the installed Baileys version."
      );
    }

    console.log(
      `📱 PAIRING REQUEST: ${number}`
    );

    // ========================================
    // REQUEST CODE
    // ========================================

    const code =
      await sock.requestPairingCode(
        number
      );

    console.log(
      `🔑 PAIRING CODE: ${code}`
    );

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
// 🟢 CHECK CONNECTION
// ============================================

export function isWhatsAppConnected() {
  return connectionState === "connected";
}

// ============================================
// 🚪 LOGOUT
// ============================================

export async function logoutWhatsApp() {
  try {
    if (!sock) {
      return false;
    }

    await sock.logout();

    sock = null;
    connectionState = "logged_out";

    return true;

  } catch (error) {
    console.error(
      "❌ LOGOUT ERROR:",
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
