// ============================================
// 👑 SILVER-ENIGMA
// ⚡ WhatsApp Multi-Device Bot
// ============================================

import "dotenv/config";
import express from "express";

import {
  connectWhatsApp,
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>SILVER-ENIGMA</title>

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

  background: #080808;

  color: white;

  font-family: Arial, sans-serif;

  text-align: center;
}

.container {
  width: 90%;
  max-width: 500px;

  padding: 35px 25px;

  border-radius: 20px;

  background: #151515;

  box-shadow:
    0 0 40px
    rgba(255,255,255,0.08);
}

.logo {
  font-size: 60px;
}

h1 {
  margin: 10px 0;

  font-size: 28px;
}

p {
  color: #999;
}

.status {
  margin-top: 20px;

  padding: 12px;

  border-radius: 10px;

  background: #1f1f1f;
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

  <p>
    ⚡ WhatsApp Multi-Device Bot
  </p>

  <div class="status">
    🟢 SYSTEM ONLINE
  </div>

</div>

</body>
</html>
  `);
});

// ============================================
// 📊 STATUS API
// ============================================

app.get("/status", (req, res) => {

  let connection = "unknown";

  try {
    connection =
      getConnectionStatus();
  } catch {
    connection = "error";
  }

  res.status(200).json({

    bot:
      config.BOT_NAME ||
      "SILVER-ENIGMA",

    status:
      "online",

    connection,

    platform:
      "WhatsApp Multi-Device",

    prefix:
      config.PREFIX ||
      "."

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
      "╭────────────────────────────╮"
    );

    console.log(
      "│ 👑 SILVER-ENIGMA           │"
    );

    console.log(
      "│ 🌐 WEB SERVER ONLINE       │"
    );

    console.log(
      "╰────────────────────────────╯"
    );

    console.log(
      `🌐 PORT: ${PORT}`
    );

  }
);

// ============================================
// 🤖 START WHATSAPP
// ============================================

async function startBot() {

  try {

    console.log("");

    console.log(
      "╭────────────────────────────╮"
    );

    console.log(
      "│ 👑 SILVER-ENIGMA           │"
    );

    console.log(
      "│ ⚡ STARTING WHATSAPP       │"
    );

    console.log(
      "╰────────────────────────────╯"
    );

    console.log("");

    await connectWhatsApp(
      handleMessage
    );

    console.log(
      "✅ WHATSAPP CONNECTION STARTED"
    );

  } catch (error) {

    console.error(
      "❌ FAILED TO START WHATSAPP:"
    );

    console.error(
      error
    );

    setTimeout(
      startBot,
      5000
    );

  }

}

// ============================================
// 🚀 BOOT
// ============================================

startBot();

// ============================================
// 🛑 ERROR HANDLING
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
