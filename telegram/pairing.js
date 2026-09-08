// ============================================
// 👑 SILVER-ENIGMA
// 🔐 TELEGRAM WHATSAPP PAIRING PORTAL
// ============================================

import { Telegraf, Markup } from "telegraf";

import config from "../config.js";

import {
  requestPairingCode,
  getConnectionStatus,
  isWhatsAppConnected,
  logoutWhatsApp
} from "../whatsapp/connection.js";

// ============================================
// 🤖 TELEGRAM BOT
// ============================================

const token =
  config.TELEGRAM_BOT_TOKEN ||
  process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error(
    "❌ TELEGRAM_BOT_TOKEN is missing."
  );
}

const bot = new Telegraf(token);

// ============================================
// 💾 USER STATE
// ============================================

const waitingForNumber = new Set();

// ============================================
// 🏠 MAIN MENU
// ============================================

function mainMenu() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        "📱 Pᴀɪʀ WʜᴀᴛsAᴘᴘ",
        "pair"
      )
    ],
    [
      Markup.button.callback(
        "📊 Sᴛᴀᴛᴜs",
        "status"
      ),
      Markup.button.callback(
        "ℹ️ Hᴇʟᴘ",
        "help"
      )
    ],
    [
      Markup.button.callback(
        "🔌 Sᴇssɪᴏɴ",
        "session"
      )
    ]
  ]);
}

// ============================================
// 🏠 /START
// ============================================

bot.start(async ctx => {
  await ctx.reply(
`╭━━━〔 👑 Sɪʟᴠᴇʀ Eɴɪɢᴍᴀ 〕━━━╮
┃
┃ ⚡ WʜᴀᴛsAᴘᴘ Cᴏɴɴᴇᴄᴛ
┃
┃ Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ Eɴɪɢᴍᴀ Pᴏʀᴛᴀʟ.
┃
┃ 🔐 Sᴇᴄᴜʀᴇ Mᴜʟᴛɪ-Dᴇᴠɪᴄᴇ Pᴀɪʀɪɴɢ
┃ ⚡ Fᴀsᴛ Cᴏɴɴᴇᴄᴛɪᴏɴ
┃ 🛡️ Pʀɪᴠᴀᴛᴇ Sᴇssɪᴏɴ
┃
┃ Sᴛᴀᴛᴜs : 🟢 Rᴇᴀᴅʏ
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

Sᴇʟᴇᴄᴛ ᴀɴ ᴏᴘᴛɪᴏɴ ʙᴇʟᴏᴡ 👇`,
    mainMenu()
  );
});

// ============================================
// 📱 PAIR BUTTON
// ============================================

bot.action("pair", async ctx => {
  try {
    await ctx.answerCbQuery();

    waitingForNumber.add(ctx.from.id);

    await ctx.reply(
`╭━━━〔 📱 Pᴀɪʀ WʜᴀᴛsAᴘᴘ 〕━━━╮
┃
┃ 🔐 Eɴᴛᴇʀ ʏᴏᴜʀ WʜᴀᴛsAᴘᴘ
┃ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ.
┃
┃ Eхᴀᴍᴘʟᴇ:
┃ +2348012345678
┃
┃ ⚠️ Dᴏ ɴᴏᴛ ᴜsᴇ sᴘᴀᴄᴇs.
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );

  } catch (error) {
    console.error(
      "❌ PAIR BUTTON ERROR:",
      error
    );
  }
});

// ============================================
// 📊 STATUS BUTTON
// ============================================

bot.action("status", async ctx => {
  try {
    await ctx.answerCbQuery();

    const status =
      getConnectionStatus();

    const connected =
      isWhatsAppConnected();

    await ctx.reply(
`╭━━━〔 📊 Sᴛᴀᴛᴜs 〕━━━╮
┃
┃ 👑 Bᴏᴛ : Sɪʟᴠᴇʀ Eɴɪɢᴍᴀ
┃
┃ WʜᴀᴛsAᴘᴘ :
┃ ${connected ? "🟢 Cᴏɴɴᴇᴄᴛᴇᴅ" : "🔴 Dɪsᴄᴏɴɴᴇᴄᴛᴇᴅ"}
┃
┃ Cᴏɴɴᴇᴄᴛɪᴏɴ :
┃ ${status}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    );

  } catch (error) {
    console.error(
      "❌ STATUS ERROR:",
      error
    );
  }
});

// ============================================
// ℹ️ HELP BUTTON
// ============================================

bot.action("help", async ctx => {
  try {
    await ctx.answerCbQuery();

    await ctx.reply(
`╭━━━〔 ℹ️ Hᴇʟᴘ 〕━━━╮
┃
┃ 📱 Pᴀɪʀ WʜᴀᴛsAᴘᴘ
┃ Gᴇɴᴇʀᴀᴛᴇ ᴀ WʜᴀᴛsAᴘᴘ
┃ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ.
┃
┃ 📊 Sᴛᴀᴛᴜs
┃ Cʜᴇᴄᴋ ʏᴏᴜʀ WʜᴀᴛsAᴘᴘ
┃ ᴄᴏɴɴᴇᴄᴛɪᴏɴ.
┃
┃ 🔌 Sᴇssɪᴏɴ
┃ Mᴀɴᴀɢᴇ ʏᴏᴜʀ WʜᴀᴛsAᴘᴘ
┃ sᴇssɪᴏɴ.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    );

  } catch (error) {
    console.error(
      "❌ HELP ERROR:",
      error
    );
  }
});

// ============================================
// 🔌 SESSION BUTTON
// ============================================

bot.action("session", async ctx => {
  try {
    await ctx.answerCbQuery();

    const connected =
      isWhatsAppConnected();

    await ctx.reply(
`╭━━━〔 🔌 Sᴇssɪᴏɴ 〕━━━╮
┃
┃ WʜᴀᴛsAᴘᴘ :
┃ ${connected ? "🟢 Aᴄᴛɪᴠᴇ" : "🔴 Iɴᴀᴄᴛɪᴠᴇ"}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            "🚪 Lᴏɢᴏᴜᴛ",
            "logout"
          )
        ]
      ])
    );

  } catch (error) {
    console.error(
      "❌ SESSION ERROR:",
      error
    );
  }
});

// ============================================
// 🚪 LOGOUT
// ============================================

bot.action("logout", async ctx => {
  try {
    await ctx.answerCbQuery();

    const result =
      await logoutWhatsApp();

    await ctx.reply(
      result
        ? "🚪 ✅ WʜᴀᴛsAᴘᴘ sᴇssɪᴏɴ ʟᴏɢɢᴇᴅ ᴏᴜᴛ."
        : "⚠️ Nᴏ ᴀᴄᴛɪᴠᴇ sᴇssɪᴏɴ ғᴏᴜɴᴅ."
    );

  } catch (error) {
    console.error(
      "❌ LOGOUT BUTTON ERROR:",
      error
    );

    await ctx.reply(
      "❌ Fᴀɪʟᴇᴅ ᴛᴏ ʟᴏɢᴏᴜᴛ."
    );
  }
});

// ============================================
// 📱 NUMBER MESSAGE
// ============================================

bot.on("text", async ctx => {
  try {
    const userId =
      ctx.from.id;

    if (!waitingForNumber.has(userId)) {
      return;
    }

    waitingForNumber.delete(userId);

    let number =
      String(ctx.message.text || "")
        .replace(/\D/g, "");

    if (
      number.length < 8 ||
      number.length > 15
    ) {
      await ctx.reply(
        "❌ Iɴᴠᴀʟɪᴅ WʜᴀᴛsAᴘᴘ ɴᴜᴍʙᴇʀ.\n\nPʟᴇᴀsᴇ ᴜsᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ."
      );

      return;
    }

    await ctx.reply(
      "⏳ Gᴇɴᴇʀᴀᴛɪɴɢ ʏᴏᴜʀ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ..."
    );

    const code =
      await requestPairingCode(number);

    await ctx.reply(
`╭━━━〔 🔐 Pᴀɪʀɪɴɢ Cᴏᴅᴇ 〕━━━╮
┃
┃ 👑 Sɪʟᴠᴇʀ Eɴɪɢᴍᴀ
┃
┃ Yᴏᴜʀ ᴄᴏᴅᴇ:
┃
┃ 🔑 ${code}
┃
┃ 📱 Oᴘᴇɴ WʜᴀᴛsAᴘᴘ
┃ → Sᴇᴛᴛɪɴɢs
┃ → Lɪɴᴋᴇᴅ Dᴇᴠɪᴄᴇs
┃ → Lɪɴᴋ ᴀ Dᴇᴠɪᴄᴇ
┃ → Lɪɴᴋ ᴡɪᴛʜ Pʜᴏɴᴇ Nᴜᴍʙᴇʀ
┃
┃ Eɴᴛᴇʀ ᴛʜᴇ ᴄᴏᴅᴇ ᴀʙᴏᴠᴇ.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    );

  } catch (error) {
    console.error(
      "❌ PAIRING ERROR:",
      error
    );

    await ctx.reply(
`❌ Pᴀɪʀɪɴɢ ғᴀɪʟᴇᴅ.

Pʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.

Eʀʀᴏʀ:
${error?.message || "Unknown error"}`
    );
  }
});

// ============================================
// 🛡️ BOT ERRORS
// ============================================

bot.catch(error => {
  console.error(
    "❌ TELEGRAM BOT ERROR:",
    error
  );
});

// ============================================
// 🚀 START TELEGRAM
// ============================================

export async function startTelegram() {
  try {
    await bot.launch();

    console.log("");
    console.log(
      "╭────────────────────────────╮"
    );
    console.log(
      "│ 👑 SILVER-ENIGMA           │"
    );
    console.log(
      "│ 🤖 TELEGRAM BOT ONLINE     │"
    );
    console.log(
      "╰────────────────────────────╯"
    );
    console.log("");

  } catch (error) {
    console.error(
      "❌ TELEGRAM START ERROR:",
      error
    );

    throw error;
  }
}

// ============================================
// 🛑 GRACEFUL SHUTDOWN
// ============================================

process.once(
  "SIGINT",
  () => bot.stop("SIGINT")
);

process.once(
  "SIGTERM",
  () => bot.stop("SIGTERM")
);

export default bot;
