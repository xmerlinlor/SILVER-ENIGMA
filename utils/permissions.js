// ============================================
// 👑 SILVER-ENIGMA
// 🛡️ PERMISSIONS SYSTEM
// ============================================

import config from "../config.js";

import {
  isSudo,
  isBlocked,
  isPremium
} from "../database/database.js";

// ============================================
// NORMALIZE NUMBER
// ============================================

export function normalizeNumber(value) {
  if (!value) return "";

  return String(value)
    .replace(/[^0-9]/g, "");
}

// ============================================
// GET NUMBER FROM JID
// ============================================

export function getNumber(jid) {
  if (!jid) return "";

  return normalizeNumber(
    String(jid).split("@")[0].split(":")[0]
  );
}

// ============================================
// CHECK OWNER
// ============================================

export function isOwner(jid) {
  if (!jid) return false;

  const sender = getNumber(jid);

  const owner =
    config.OWNER_NUMBER ||
    config.OWNER_ID ||
    config.OWNER;

  if (!owner) return false;

  const ownerNumber =
    normalizeNumber(owner);

  if (!sender || !ownerNumber) {
    return false;
  }

  return (
    sender === ownerNumber ||
    sender.endsWith(ownerNumber) ||
    ownerNumber.endsWith(sender)
  );
}

// ============================================
// CHECK SUDO
// ============================================

export function checkSudo(jid) {
  if (!jid) return false;

  return (
    isOwner(jid) ||
    isSudo(jid) ||
    isSudo(getNumber(jid))
  );
}

// ============================================
// CHECK PREMIUM
// ============================================

export function checkPremium(jid) {
  if (!jid) return false;

  return (
    isOwner(jid) ||
    isSudo(jid) ||
    isPremium(jid) ||
    isPremium(getNumber(jid))
  );
}

// ============================================
// CHECK BLOCKED
// ============================================

export function checkBlocked(jid) {
  if (!jid) return false;

  return (
    isBlocked(jid) ||
    isBlocked(getNumber(jid))
  );
}

// ============================================
// CHECK GROUP
// ============================================

export function isGroup(jid) {
  return Boolean(
    jid &&
    String(jid).endsWith("@g.us")
  );
}

// ============================================
// CHECK GROUP ADMIN
// ============================================

export function isGroupAdmin(
  metadata,
  jid
) {
  if (!metadata?.participants || !jid) {
    return false;
  }

  const senderNumber =
    getNumber(jid);

  const participant =
    metadata.participants.find(
      user =>
        getNumber(user.id) ===
        senderNumber
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// CHECK BOT ADMIN
// ============================================

export function isBotAdmin(
  sock,
  metadata
) {
  if (
    !sock ||
    !metadata?.participants
  ) {
    return false;
  }

  const botId =
    sock.user?.id;

  if (!botId) return false;

  const botNumber =
    getNumber(botId);

  const participant =
    metadata.participants.find(
      user =>
        getNumber(user.id) ===
        botNumber
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// CHECK PERMISSION
// ============================================

export function hasPermission(
  jid,
  permission
) {
  switch (
    String(permission).toLowerCase()
  ) {
    case "owner":
      return isOwner(jid);

    case "sudo":
      return checkSudo(jid);

    case "premium":
      return checkPremium(jid);

    case "blocked":
      return checkBlocked(jid);

    default:
      return false;
  }
}

// ============================================
// COMMAND PERMISSION CHECK
// ============================================

export function checkCommandPermission(
  jid,
  command
) {
  if (!command) {
    return {
      allowed: false,
      reason: "invalid"
    };
  }

  if (checkBlocked(jid)) {
    return {
      allowed: false,
      reason: "blocked"
    };
  }

  if (
    command.owner &&
    !isOwner(jid)
  ) {
    return {
      allowed: false,
      reason: "owner"
    };
  }

  if (
    command.sudo &&
    !checkSudo(jid)
  ) {
    return {
      allowed: false,
      reason: "sudo"
    };
  }

  if (
    command.premium &&
    !checkPremium(jid)
  ) {
    return {
      allowed: false,
      reason: "premium"
    };
  }

  return {
    allowed: true,
    reason: null
  };
}

// ============================================
// PERMISSION MESSAGE
// ============================================

export function permissionMessage(
  reason
) {
  const messages = {
    owner:
      "👑 This command is only available to the bot owner.",

    sudo:
      "⚡ This command requires sudo permission.",

    premium:
      "💎 This command is only available to premium users.",

    blocked:
      "🚫 You are blocked from using SILVER-ENIGMA.",

    group:
      "👥 This command can only be used in groups.",

    admin:
      "🛡️ This command is only available to group admins.",

    botadmin:
      "🤖 Please make SILVER-ENIGMA a group admin first.",

    invalid:
      "❌ Invalid command permission."
  };

  return (
    messages[reason] ||
    "❌ You do not have permission to use this command."
  );
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  normalizeNumber,
  getNumber,
  isOwner,
  checkSudo,
  checkPremium,
  checkBlocked,
  isGroup,
  isGroupAdmin,
  isBotAdmin,
  hasPermission,
  checkCommandPermission,
  permissionMessage
};
