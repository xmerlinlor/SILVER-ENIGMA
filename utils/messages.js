// ============================================
// 👑 SILVER-ENIGMA
// 💬 MESSAGE SYSTEM
// ============================================

import config from "../config.js";

// ============================================
// BOT NAME
// ============================================

export const BOT_NAME =
  config.BOT_NAME || "SILVER-ENIGMA";

// ============================================
// PREFIX
// ============================================

export const PREFIX =
  config.PREFIX || ".";

// ============================================
// BASIC MESSAGES
// ============================================

export const messages = {

  // ==========================================
  // GENERAL
  // ==========================================

  welcome:
    `╭━━━〔 👑 ${BOT_NAME} 〕━━━╮\n` +
    `┃\n` +
    `┃ 👋 WELCOME!\n` +
    `┃ ⚡ SYSTEM ONLINE\n` +
    `┃ 🚀 READY TO SERVE\n` +
    `┃\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`,

  alive:
    `╭━━━〔 👑 ${BOT_NAME} 〕━━━╮\n` +
    `┃\n` +
    `┃ ⚡ STATUS: ONLINE\n` +
    `┃ 🤖 MODE: ACTIVE\n` +
    `┃ 🚀 SYSTEM: RUNNING\n` +
    `┃\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`,

  pong:
    `🏓 PONG!\n\n` +
    `👑 ${BOT_NAME} IS ONLINE ⚡`,

  processing:
    `⏳ Processing your request...\n` +
    `⚡ Please wait.`,

  success:
    `✅ Operation completed successfully.`,

  failed:
    `❌ Operation failed.`,

  error:
    `❌ An unexpected error occurred.\n\n` +
    `⚡ Please try again later.`,

  // ==========================================
  // PERMISSIONS
  // ==========================================

  owner:
    `👑 This command is only available to the bot owner.`,

  sudo:
    `⚡ This command requires sudo permission.`,

  premium:
    `💎 This command is only available to premium users.`,

  blocked:
    `🚫 You are blocked from using ${BOT_NAME}.`,

  maintenance:
    `🔧 ${BOT_NAME} is currently under maintenance.\n\n` +
    `⚡ Please try again later.`,

  // ==========================================
  // GROUP
  // ==========================================

  groupOnly:
    `👥 This command can only be used in groups.`,

  adminOnly:
    `🛡️ This command is only available to group admins.`,

  botAdmin:
    `🤖 Please make ${BOT_NAME} a group admin first.`,

  botNotAdmin:
    `❌ I need administrator permission to perform this action.`,

  groupMetadata:
    `❌ Unable to retrieve group information.`,

  // ==========================================
  // USER
  // ==========================================

  userNotFound:
    `❌ User not found.`,

  userRequired:
    `👤 Please mention or reply to a user.`,

  invalidUser:
    `❌ Invalid user.`,

  // ==========================================
  // INPUT
  // ==========================================

  noText:
    `✍️ Please provide some text.`,

  noQuery:
    `🔎 Please provide a search query.`,

  noUrl:
    `🔗 Please provide a valid URL.`,

  invalidUrl:
    `❌ Invalid URL.`,

  invalidNumber:
    `❌ Please provide a valid number.`,

  invalidAmount:
    `❌ Please provide a valid amount.`,

  invalidCommand:
    `❌ Unknown command.\n\n` +
    `💡 Use ${PREFIX}menu to view available commands.`,

  // ==========================================
  // DOWNLOAD
  // ==========================================

  download:
    `📥 Downloading media...\n\n` +
    `⏳ Please wait...`,

  downloadFailed:
    `❌ Unable to download the requested media.`,

  fileTooLarge:
    `❌ The requested file is too large.`,

  // ==========================================
  // MEDIA
  // ==========================================

  imageRequired:
    `🖼️ Please send or reply to an image.`,

  videoRequired:
    `🎥 Please send or reply to a video.`,

  audioRequired:
    `🎵 Please send or reply to an audio file.`,

  stickerRequired:
    `🧩 Please send or reply to a sticker.`,

  mediaRequired:
    `📁 Please send or reply to a media file.`,

  // ==========================================
  // STICKER
  // ==========================================

  stickerProcessing:
    `🧩 Creating sticker...\n\n` +
    `⏳ Please wait...`,

  stickerFailed:
    `❌ Failed to create sticker.`,

  // ==========================================
  // AI
  // ==========================================

  aiThinking:
    `🤖 AI is thinking...\n\n` +
    `⏳ Please wait...`,

  aiError:
    `❌ AI service is currently unavailable.`,

  // ==========================================
  // MUSIC
  // ==========================================

  musicSearching:
    `🎵 Searching for your song...\n\n` +
    `🔎 Please wait...`,

  musicDownloading:
    `🎧 Downloading audio...\n\n` +
    `⏳ Please wait...`,

  musicFailed:
    `❌ Unable to process the requested song.`,

  // ==========================================
  // ECONOMY
  // ==========================================

  insufficientBalance:
    `💰 Insufficient balance.`,

  balance:
    `💰 YOUR BALANCE`,

  // ==========================================
  // GAME
  // ==========================================

  gameStarted:
    `🎮 Game started!\n\n` +
    `⚡ Good luck!`,

  gameOver:
    `🎮 GAME OVER!\n\n` +
    `🏆 Thanks for playing.`,

  invalidChoice:
    `❌ Invalid choice.`,

  // ==========================================
  // WARNINGS
  // ==========================================

  warningAdded:
    `⚠️ Warning added.`,

  warningReset:
    `✅ User warnings have been reset.`,

  noWarnings:
    `✅ This user has no warnings.`,

  // ==========================================
  // GROUP ACTIONS
  // ==========================================

  userMuted:
    `🔇 User has been muted.`,

  userUnmuted:
    `🔊 User has been unmuted.`,

  userKicked:
    `👢 User has been removed from the group.`,

  userPromoted:
    `⬆️ User has been promoted to admin.`,

  userDemoted:
    `⬇️ User has been removed from admin.`,

  // ==========================================
  // SETTINGS
  // ==========================================

  settingEnabled:
    `✅ Setting enabled.`,

  settingDisabled:
    `❌ Setting disabled.`,

  settingUpdated:
    `⚙️ Setting updated successfully.`,

  // ==========================================
  // PREMIUM
  // ==========================================

  premiumRequired:
    `💎 This feature requires SILVER-ENIGMA Premium.`,

  premiumActivated:
    `💎 Premium has been activated.`,

  premiumExpired:
    `⏰ Your premium access has expired.`,

  // ==========================================
  // DATABASE
  // ==========================================

  databaseError:
    `💾 Database error occurred.`,

  databaseSaved:
    `💾 Database saved successfully.`,

  // ==========================================
  // SYSTEM
  // ==========================================

  restarting:
    `🔄 ${BOT_NAME} is restarting...`,

  restarted:
    `✅ ${BOT_NAME} restarted successfully.`,

  shuttingDown:
    `🛑 ${BOT_NAME} is shutting down...`,

  unauthorized:
    `🚫 Unauthorized request.`

};

// ============================================
// GET MESSAGE
// ============================================

export function getMessage(
  name,
  fallback = ""
) {
  return (
    messages[name] ??
    fallback
  );
}

// ============================================
// FORMAT MESSAGE
// ============================================

export function formatMessage(
  name,
  replacements = {}
) {
  let message =
    getMessage(name, "");

  if (!message) {
    return "";
  }

  for (
    const [key, value]
    of Object.entries(replacements)
  ) {
    message =
      message.replace(
        new RegExp(
          `\\{${key}\\}`,
          "g"
        ),
        String(value)
      );
  }

  return message;
}

// ============================================
// COMMAND ERROR
// ============================================

export function commandError(
  command,
  error = ""
) {
  return (
    `❌ COMMAND ERROR\n\n` +
    `⚡ Command: ${PREFIX}${command}\n` +
    (error
      ? `📝 Error: ${error}`
      : `⚠️ Something went wrong.`)
  );
}

// ============================================
// SUCCESS MESSAGE
// ============================================

export function successMessage(
  text
) {
  return (
    `╭━━━〔 ✅ SUCCESS 〕━━━╮\n` +
    `┃\n` +
    `┃ ${text}\n` +
    `┃\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}

// ============================================
// ERROR MESSAGE
// ============================================

export function errorMessage(
  text
) {
  return (
    `╭━━━〔 ❌ ERROR 〕━━━╮\n` +
    `┃\n` +
    `┃ ${text}\n` +
    `┃\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}

// ============================================
// INFO MESSAGE
// ============================================

export function infoMessage(
  text
) {
  return (
    `╭━━━〔 ℹ️ INFO 〕━━━╮\n` +
    `┃\n` +
    `┃ ${text}\n` +
    `┃\n` +
    `╰━━━━━━━━━━━━━━━━━━╯`
  );
}

// ============================================
// LOADING MESSAGE
// ============================================

export function loadingMessage(
  text = "Processing..."
) {
  return (
    `⏳ ${text}\n\n` +
    `⚡ ${BOT_NAME}`
  );
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default messages;
