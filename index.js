// ============================================
// 👑 SILVER-ENIGMA
// ⚡ WhatsApp Multi-Device Group Management Bot
// ============================================

import "dotenv/config";
import express from "express";

import {
  startWhatsApp,
  requestPairingCode,
  getConnectionStatus
} from "./whatsapp/connection.js";

import { handleMessage } from "./whatsapp/handler.js";
import config from "./config.js";

// ============================================
// 🌐 WEB SERVER
// ============================================

const app = express();

const PORT =
  Number(process.env.PORT) || 3000;

// ============================================
// 🏠 HOME
// ============================================

app.get("/", (req, res) => {
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>SILVER-ENIGMA</title>

  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f0f0f;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    .box {
      width: 90%;
      max-width: 500px;
      padding: 35px;
      border-radius: 20px;
      background: #181818;
      box-shadow: 0 0 30px rgba(255,255,255,0.08);
    }

    h1 {
      margin-bottom: 10px;
    }

    p {
      color: #aaa;
    }

    a {
      display: inline-block;
      margin-top: 20px;
      padding: 13px 25px;
      border-radius: 10px;
      background: white;
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>

<body>

  <div class="box">

    <h1>👑 SILVER-ENIGMA</h1>

    <p>⚡ WhatsApp Multi-Device Bot</p>

    <a href="/pair">
      📱 Pair WhatsApp
    </a>

  </div>

</body>
</html>
  `);
});

// ============================================
// 🔑 PAIR PAGE
// ============================================

app.get("/pair", (req, res) => {

  res.status(200).send(`
<!DOCTYPE html>
<html>

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Pair SILVER-ENIGMA</title>

  <style>

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;

      display: flex;
      align-items: center;
      justify-content: center;

      background:
        linear-gradient(
          135deg,
          #050505,
          #171717
        );

      color: white;

      font-family:
        Arial,
        sans-serif;
    }

    .container {
      width: 92%;
      max-width: 450px;

      background: #121212;

      padding: 30px;

      border-radius: 20px;

      box-shadow:
        0 0 35px
        rgba(255,255,255,0.08);

      text-align: center;
    }

    .logo {
      font-size: 55px;
      margin-bottom: 10px;
    }

    h1 {
      margin: 0;
      font-size: 28px;
    }

    .subtitle {
      color: #999;
      margin-bottom: 25px;
    }

    input {
      width: 100%;

      padding: 15px;

      border-radius: 10px;

      border: 1px solid #333;

      background: #202020;

      color: white;

      font-size: 16px;

      outline: none;

      margin-bottom: 15px;
    }

    button {
      width: 100%;

      padding: 15px;

      border: none;

      border-radius: 10px;

      background: white;

      color: black;

      font-size: 16px;

      font-weight: bold;

      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    #result {
      margin-top: 20px;
      padding: 15px;

      border-radius: 10px;

      background: #1d1d1d;

      display: none;

      word-break: break-word;
    }

    .code {
      font-size: 28px;

      letter-spacing: 5px;

      font-weight: bold;

      margin-top: 10px;
    }

    .instructions {
      margin-top: 25px;

      text-align: left;

      color: #aaa;

      font-size: 14px;

      line-height: 1.7;
    }

  </style>

</head>

<body>

  <div class="container">

    <div class="logo">
      👑
    </div>

    <h1>
      SILVER-ENIGMA
    </h1>

    <div class="subtitle">
      WhatsApp Pairing
    </div>

    <input
      id="number"
      type="tel"
      placeholder="2348012345678"
      autocomplete="off"
    />

    <button
      id="pairButton"
      onclick="pairWhatsApp()"
    >
      🔑 GET PAIRING CODE
    </button>

    <div id="result"></div>

    <div class="instructions">

      <b>📱 How to pair:</b>

      <br>

      1. Enter your WhatsApp number with country code.

      <br>

      2. Do not use +, spaces or dashes.

      <br>

      3. Tap <b>GET PAIRING CODE</b>.

      <br>

      4. Open WhatsApp.

      <br>

      5. Go to
      <b>Linked Devices</b>.

      <br>

      6. Select
      <b>Link a device</b>.

      <br>

      7. Choose
      <b>Link with phone number</b>.

      <br>

      8. Enter the displayed code.

    </div>

  </div>

<script>

async function pairWhatsApp() {

  const input =
    document.getElementById("number");

  const button =
    document.getElementById("pairButton");

  const result =
    document.getElementById("result");

  const number =
    input.value.trim();

  if (!number) {

    result.style.display = "block";

    result.innerHTML =
      "❌ Please enter your WhatsApp number.";

    return;
  }

  button.disabled = true;

  button.innerText =
    "⏳ GENERATING CODE...";

  result.style.display = "block";

  result.innerHTML =
    "⏳ Please wait...";

  try {

    const response =
      await fetch(
        "/api/pair?number=" +
        encodeURIComponent(number)
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "Pairing failed."
      );
    }

    result.innerHTML = `
      <div>
        ✅ PAIRING CODE
      </div>

      <div class="code">
        ${data.code}
      </div>

      <br>

      📱 Enter this code in WhatsApp
      <br>
      under Linked Devices.
    `;

  } catch (error) {

    result.innerHTML =
      "❌ " +
      (error.message ||
      "Pairing failed.");

  } finally {

    button.disabled = false;

    button.innerText =
      "🔑 GET PAIRING CODE";
  }
}

</script>

</body>
</html>
  `);
});

// ============================================
// 🔑 PAIRING API
// ============================================

app.get("/api/pair", async (req, res) => {

  try {

    const number =
      String(
        req.query.number || ""
      ).trim();

    if (!number) {

      return res.status(400).json({
        error:
          "WhatsApp number is required."
      });

    }

    const cleanNumber =
      number.replace(/\D/g, "");

    if (
      cleanNumber.length < 8 ||
      cleanNumber.length > 15
    ) {

      return res.status(400).json({
        error:
          "Invalid WhatsApp number."
      });

    }

    console.log(
      `📱 PAIR REQUEST: ${cleanNumber}`
    );

    const code =
      await requestPairingCode(
        cleanNumber
      );

    return res.json({
      success: true,
      code: String(code)
    });

  } catch (error) {

    console.error(
      "❌ PAIR API ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Unable to generate pairing code."
    });

  }

});

// ============================================
// 📊 STATUS
// ============================================

app.get("/status", (req, res) => {

  let connection =
    "unknown";

  try {

    if (
      typeof getConnectionStatus ===
      "function"
    ) {

      connection =
        getConnectionStatus();

    }

  } catch {}

  res.json({

    bot:
      config.BOT_NAME ||
      "SILVER-ENIGMA",

    status:
      "online",

    connection,

    platform:
      "WhatsApp Multi-Device",

    prefix:
      config.PREFIX || "."

  });

});

// ============================================
// 🚀 START WEB SERVER
// ============================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `🌐 WEB SERVER RUNNING ON PORT ${PORT}`
    );

    console.log(
      `🔗 PAIR PAGE: /pair`
    );

  }
);

// ============================================
// 🤖 START WHATSAPP BOT
// ============================================

async function startBot() {

  try {

    console.log(
      "╭────────────────────────────╮"
    );

    console.log(
      "│ 👑 SILVER-ENIGMA           │"
    );

    console.log(
      "│ ⚡ STARTING WHATSAPP BOT   │"
    );

    console.log(
      "╰────────────────────────────╯"
    );

    const sock =
      await startWhatsApp();

    console.log(
      "✅ WHATSAPP CONNECTION STARTED"
    );

    // ========================================
    // 💬 MESSAGE HANDLER
    // ========================================

    sock.ev.on(
      "messages.upsert",
      async ({ messages }) => {

        try {

          if (
            !messages ||
            !messages.length
          ) {
            return;
          }

          const message =
            messages[0];

          await handleMessage(
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
    );

  } catch (error) {

    console.error(
      "❌ FAILED TO START SILVER-ENIGMA:"
    );

    console.error(
      error
    );

    setTimeout(
      () => {

        console.log(
          "🔄 RESTARTING BOT..."
        );

        startBot();

      },
      5000
    );

  }

}

// ============================================
// 🚀 BOOT
// ============================================

startBot();

// ============================================
// 🛑 PROCESS ERROR HANDLING
// ============================================

process.on(
  "uncaughtException",
  error => {

    console.error(
      "❌ UNCAUGHT EXCEPTION:",
      error
    );

  }
);

process.on(
  "unhandledRejection",
  error => {

    console.error(
      "❌ UNHANDLED REJECTION:",
      error
    );

  }
);
