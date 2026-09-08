// ============================================
// 👑 SILVER-ENIGMA
// ⚡ CENTRAL WHATSAPP COMMAND HANDLER
// ============================================

import config from "../config.js";

import {
  getUser,
  getGroup,
  isSudo,
  isBlocked,
  isPremium,
  getSetting,
  incrementStat
} from "../database/database.js";

// ============================================
// COMMAND REGISTRY
// ============================================

const commands = new Map();

// ============================================
// REGISTER COMMAND
// ============================================

export function registerCommand(name, handler, options = {}) {
  if (!name || typeof handler !== "function") {
    throw new Error("Invalid command registration");
  }

  const names = Array.isArray(name)
    ? name
    : [name];

  for (const commandName of names) {
    commands.set(commandName.toLowerCase(), {
      name: commandName.toLowerCase(),
      execute: handler,

      aliases: options.aliases || [],
      category: options.category || "general",
      description: options.description || "No description",
      usage: options.usage || "",
      premium: Boolean(options.premium),
      owner: Boolean(options.owner),
      group: Boolean(options.group),
      admin: Boolean(options.admin)
    });
  }
}

// ============================================
// DELETE COMMAND
// ============================================

export function unregisterCommand(name) {
  if (!name) return false;

  return commands.delete(
    name.toLowerCase()
  );
}

// ============================================
// GET COMMAND
// ============================================

export function getCommand(name) {
  if (!name) return null;

  return commands.get(
    name.toLowerCase()
  ) || null;
}

// ============================================
// GET ALL COMMANDS
// ============================================

export function getCommands() {
  return commands;
}

// ============================================
// COMMAND ALIASES
// ============================================

function findCommand(name) {
  if (!name) return null;

  const commandName = name.toLowerCase();

  if (commands.has(commandName)) {
    return commands.get(commandName);
  }

  for (const command of commands.values()) {
    if (
      command.aliases
        .map(alias => alias.toLowerCase())
        .includes(commandName)
    ) {
      return command;
    }
  }

  return null;
}

// ============================================
// CHECK OWNER
// ============================================

function isOwner(sender) {
  if (!sender) return false;

  const ownerId =
    config.OWNER_NUMBER ||
    config.OWNER_ID ||
    config.OWNER;

  if (!ownerId) return false;

  const cleanSender =
    sender.replace(/\D/g, "");

  const cleanOwner =
    String(ownerId).replace(/\D/g, "");

  return (
    cleanSender === cleanOwner ||
    cleanSender.endsWith(cleanOwner) ||
    cleanOwner.endsWith(cleanSender)
  );
}

// ============================================
// CHECK GROUP
// ============================================

async function checkGroup(sock, jid) {
  try {
    if (!jid?.endsWith("@g.us")) {
      return {
        isGroup: false,
        metadata: null
      };
    }

    const metadata =
      await sock.groupMetadata(jid);

    return {
      isGroup: true,
      metadata
    };
  } catch (error) {
    console.error(
      "❌ GROUP METADATA ERROR:",
      error
    );

    return {
      isGroup: true,
      metadata: null
    };
  }
}

// ============================================
// CHECK GROUP ADMIN
// ============================================

function isGroupAdmin(
  sender,
  metadata
) {
  if (!metadata?.participants) {
    return false;
  }

  const participant =
    metadata.participants.find(
      p =>
        p.id === sender ||
        p.id?.split(":")[0] ===
          sender?.split(":")[0]
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// BOT ADMIN
// ============================================

async function isBotAdmin(
  sock,
  metadata
) {
  if (!metadata?.participants) {
    return false;
  }

  const botId =
    sock.user?.id?.split(":")[0];

  const participant =
    metadata.participants.find(
      p =>
        p.id?.split(":")[0] === botId
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// COMMAND CONTEXT
// ============================================

function createContext({
  sock,
  message,
  command,
  args,
  text,
  remoteJid,
  sender,
  pushName,
  metadata,
  isGroup,
  senderIsAdmin,
  botIsAdmin,
  owner,
  sudo,
  blocked,
  premium
}) {
  return {
    sock,
    message,

    command,
    args,
    text,

    remoteJid,
    jid: remoteJid,

    sender,
    user: sender,

    pushName,

    metadata,

    isGroup,
    isAdmin: senderIsAdmin,
    senderIsAdmin,

    botIsAdmin,

    isOwner: owner,
    isSudo: sudo,
    isPremium: premium,
    isBlocked: blocked,

    prefix:
      config.PREFIX || ".",

    reply: async text => {
      return sock.sendMessage(
        remoteJid,
        { text: String(text) },
        { quoted: message }
      );
    },

    send: async content => {
      return sock.sendMessage(
        remoteJid,
        content,
        { quoted: message }
      );
    },

    react: async emoji => {
      return sock.sendMessage(
        remoteJid,
        {
          react: {
            text: emoji,
            key: message.key
          }
        }
      );
    },

    mention: async (
      text,
      mentions = []
    ) => {
      return sock.sendMessage(
        remoteJid,
        {
          text,
          mentions
        },
        { quoted: message }
      );
    }
  };
}

// ============================================
// PERMISSION MESSAGE
// ============================================

async function permissionError(
  ctx,
  type
) {
  const messages = {
    owner:
      "👑 This command is only available to the bot owner.",

    sudo:
      "⚡ This command requires sudo permission.",

    group:
      "👥 This command can only be used in groups.",

    admin:
      "🛡️ This command is only available to group admins.",

    botadmin:
      "🤖 I need to be a group admin to use this command.",

    premium:
      "💎 This command is only available to premium users.",

    blocked:
      "🚫 You are blocked from using this bot.",

    maintenance:
      "🔧 SILVER-ENIGMA is currently under maintenance."
  };

  return ctx.reply(
    messages[type] ||
      "❌ You do not have permission to use this command."
  );
}

// ============================================
// EXECUTE COMMAND
// ============================================

export async function executeCommand({
  sock,
  message,
  commandName,
  args = [],
  text = ""
}) {
  try {
    const remoteJid =
      message?.key?.remoteJid;

    if (!remoteJid) return;

    const sender =
      message?.key?.participant ||
      message?.participant ||
      remoteJid;

    const pushName =
      message?.pushName ||
      "User";

    // ----------------------------------------
    // FIND COMMAND
    // ----------------------------------------

    const command =
      findCommand(commandName);

    if (!command) {
      return false;
    }

    // ----------------------------------------
    // DATABASE
    // ----------------------------------------

    const user =
      getUser(sender);

    const isGroup =
      remoteJid.endsWith("@g.us");

    const group =
      isGroup
        ? getGroup(remoteJid)
        : null;

    const blocked =
      isBlocked(sender);

    const owner =
      isOwner(sender);

    const sudo =
      isSudo(sender);

    const premium =
      isPremium(sender);

    // ----------------------------------------
    // GROUP INFORMATION
    // ----------------------------------------

    let metadata = null;
    let senderIsAdmin = false;
    let botIsAdmin = false;

    if (isGroup) {
      const groupInfo =
        await checkGroup(
          sock,
          remoteJid
        );

      metadata =
        groupInfo.metadata;

      senderIsAdmin =
        isGroupAdmin(
          sender,
          metadata
        );

      botIsAdmin =
        await isBotAdmin(
          sock,
          metadata
        );
    }

    // ----------------------------------------
    // CONTEXT
    // ----------------------------------------

    const ctx =
      createContext({
        sock,
        message,
        command,
        args,
        text,
        remoteJid,
        sender,
        pushName,
        metadata,
        isGroup,
        senderIsAdmin,
        botIsAdmin,
        owner,
        sudo,
        blocked,
        premium
      });

    // ----------------------------------------
    // BLOCKED
    // ----------------------------------------

    if (blocked && !owner) {
      await permissionError(
        ctx,
        "blocked"
      );

      return true;
    }

    // ----------------------------------------
    // MAINTENANCE
    // ----------------------------------------

    const maintenance =
      getSetting("maintenance");

    if (
      maintenance &&
      !owner &&
      !sudo
    ) {
      await permissionError(
        ctx,
        "maintenance"
      );

      return true;
    }

    // ----------------------------------------
    // OWNER COMMAND
    // ----------------------------------------

    if (
      command.owner &&
      !owner
    ) {
      await permissionError(
        ctx,
        "owner"
      );

      return true;
    }

    // ----------------------------------------
    // GROUP COMMAND
    // ----------------------------------------

    if (
      command.group &&
      !isGroup
    ) {
      await permissionError(
        ctx,
        "group"
      );

      return true;
    }

    // ----------------------------------------
    // ADMIN COMMAND
    // ----------------------------------------

    if (
      command.admin &&
      !senderIsAdmin &&
      !owner &&
      !sudo
    ) {
      await permissionError(
        ctx,
        "admin"
      );

      return true;
    }

    // ----------------------------------------
    // PREMIUM COMMAND
    // ----------------------------------------

    if (
      command.premium &&
      !premium &&
      !owner &&
      !sudo
    ) {
      await permissionError(
        ctx,
        "premium"
      );

      return true;
    }

    // ----------------------------------------
    // EXECUTE
    // ----------------------------------------

    await incrementStat(
      "commands"
    );

    if (user) {
      user.commands =
        (user.commands || 0) + 1;
    }

    console.log(
      `⚡ EXECUTING: ${config.PREFIX || "."}${command.name} | ${sender}`
    );

    await command.execute(
      ctx
    );

    return true;

  } catch (error) {
    console.error(
      "❌ COMMAND EXECUTION ERROR:",
      error
    );

    try {
      await sock.sendMessage(
        message.key.remoteJid,
        {
          text:
            "❌ An error occurred while executing the command."
        }
      );
    } catch {}

    return true;
  }
}

// ============================================
// BUILT-IN COMMANDS
// ============================================

registerCommand(
  "ping",
  async ctx => {
    const start =
      Date.now();

    await ctx.reply(
      "🏓 Pinging..."
    );

    const latency =
      Date.now() - start;

    await ctx.reply(
      `🏓 PONG!\n\n` +
      `⚡ Speed: ${latency}ms\n` +
      `👑 SILVER-ENIGMA IS ONLINE`
    );
  },
  {
    aliases: ["p"],
    category: "general",
    description: "Check bot response speed",
    usage: ".ping"
  }
);

registerCommand(
  "alive",
  async ctx => {
    await ctx.reply(
      `╭━━━〔 👑 SILVER-ENIGMA 〕━━━╮\n` +
      `┃\n` +
      `┃ ⚡ STATUS: ONLINE\n` +
      `┃ 🤖 MODE: ACTIVE\n` +
      `┃ 🚀 SYSTEM: RUNNING\n` +
      `┃\n` +
      `╰━━━━━━━━━━━━━━━━━━━━╯`
    );
  },
  {
    aliases: ["online"],
    category: "general",
    description: "Check bot status",
    usage: ".alive"
  }
);

registerCommand(
  "runtime",
  async ctx => {
    const seconds =
      process.uptime();

    const days =
      Math.floor(
        seconds / 86400
      );

    const hours =
      Math.floor(
        (seconds % 86400) / 3600
      );

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    const secs =
      Math.floor(seconds % 60);

    await ctx.reply(
      `⏱️ SILVER-ENIGMA RUNTIME\n\n` +
      `📅 ${days}d ${hours}h ${minutes}m ${secs}s`
    );
  },
  {
    aliases: ["uptime"],
    category: "general",
    description: "Show bot runtime",
    usage: ".runtime"
  }
);

registerCommand(
  "id",
  async ctx => {
    await ctx.reply(
      `🆔 JID:\n${ctx.remoteJid}\n\n` +
      `👤 USER:\n${ctx.sender}`
    );
  },
  {
    category: "tools",
    description: "Show chat and user ID",
    usage: ".id"
  }
);

// ============================================
// EXPORT
// ============================================

export default commands;
