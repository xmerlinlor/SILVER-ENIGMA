// ============================================
// 👑 SILVER-ENIGMA
// ⚡ CENTRAL WHATSAPP COMMAND SYSTEM
// ============================================

import config from "../config.js";

import {
  getUser,
  getGroup,
  isSudo,
  isBlocked,
  isPremium,
  getSetting,
  incrementStat,
  saveDatabase
} from "../database/database.js";

// ============================================
// COMMAND REGISTRY
// ============================================

const commands = new Map();

// ============================================
// REGISTER COMMAND
// ============================================

export function registerCommand(
  name,
  handler,
  options = {}
) {
  if (!name || typeof handler !== "function") {
    throw new Error(
      "Invalid command registration"
    );
  }

  const names = Array.isArray(name)
    ? name
    : [name];

  for (const commandName of names) {
    const cleanName =
      String(commandName)
        .trim()
        .toLowerCase();

    if (!cleanName) continue;

    commands.set(cleanName, {
      name: cleanName,
      execute: handler,

      aliases: Array.isArray(options.aliases)
        ? options.aliases.map(
            alias =>
              String(alias)
                .toLowerCase()
                .trim()
          )
        : [],

      category:
        options.category || "general",

      description:
        options.description ||
        "No description",

      usage:
        options.usage || "",

      premium:
        Boolean(options.premium),

      owner:
        Boolean(options.owner),

      sudo:
        Boolean(options.sudo),

      group:
        Boolean(options.group),

      admin:
        Boolean(options.admin),

      botAdmin:
        Boolean(options.botAdmin)
    });
  }
}

// ============================================
// UNREGISTER COMMAND
// ============================================

export function unregisterCommand(name) {
  if (!name) return false;

  return commands.delete(
    String(name)
      .toLowerCase()
      .trim()
  );
}

// ============================================
// GET COMMAND
// ============================================

export function getCommand(name) {
  if (!name) return null;

  return (
    commands.get(
      String(name)
        .toLowerCase()
        .trim()
    ) || null
  );
}

// ============================================
// GET ALL COMMANDS
// ============================================

export function getCommands() {
  return commands;
}

// ============================================
// FIND COMMAND / ALIAS
// ============================================

function findCommand(name) {
  if (!name) return null;

  const commandName =
    String(name)
      .toLowerCase()
      .trim();

  if (commands.has(commandName)) {
    return commands.get(commandName);
  }

  for (const command of commands.values()) {
    if (
      command.aliases.includes(
        commandName
      )
    ) {
      return command;
    }
  }

  return null;
}

// ============================================
// OWNER CHECK
// ============================================

function normalizeNumber(value) {
  return String(value || "")
    .replace(/\D/g, "");
}

function getNumber(jid) {
  return normalizeNumber(
    String(jid || "")
      .split("@")[0]
      .split(":")[0]
  );
}

function isOwner(sender) {
  const senderNumber =
    getNumber(sender);

  const ownerNumber =
    normalizeNumber(
      config.OWNER_NUMBER ||
      config.OWNER_ID ||
      config.OWNER
    );

  if (
    !senderNumber ||
    !ownerNumber
  ) {
    return false;
  }

  return (
    senderNumber === ownerNumber ||
    senderNumber.endsWith(ownerNumber) ||
    ownerNumber.endsWith(senderNumber)
  );
}

// ============================================
// GROUP ADMIN CHECK
// ============================================

function isGroupAdmin(
  sender,
  metadata
) {
  if (
    !metadata?.participants ||
    !sender
  ) {
    return false;
  }

  const senderNumber =
    getNumber(sender);

  const participant =
    metadata.participants.find(
      participant =>
        getNumber(
          participant.id
        ) === senderNumber
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// BOT ADMIN CHECK
// ============================================

function isBotAdmin(
  sock,
  metadata
) {
  if (
    !sock ||
    !metadata?.participants
  ) {
    return false;
  }

  const botNumber =
    getNumber(
      sock.user?.id
    );

  if (!botNumber) return false;

  const participant =
    metadata.participants.find(
      participant =>
        getNumber(
          participant.id
        ) === botNumber
    );

  return Boolean(
    participant?.admin === "admin" ||
    participant?.admin === "superadmin"
  );
}

// ============================================
// GROUP METADATA
// ============================================

async function getGroupMetadata(
  sock,
  jid
) {
  if (
    !jid ||
    !jid.endsWith("@g.us")
  ) {
    return null;
  }

  try {
    return await sock.groupMetadata(
      jid
    );
  } catch (error) {
    console.error(
      "❌ GROUP METADATA ERROR:",
      error
    );

    return null;
  }
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

    botAdmin:
      "🤖 Please make SILVER-ENIGMA a group admin first.",

    premium:
      "💎 This command is only available to premium users.",

    blocked:
      "🚫 You are blocked from using SILVER-ENIGMA.",

    maintenance:
      "🔧 SILVER-ENIGMA is currently under maintenance."
  };

  return ctx.reply(
    messages[type] ||
      "❌ You do not have permission to use this command."
  );
}

// ============================================
// CREATE COMMAND CONTEXT
// ============================================

function createContext(data) {
  const {
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
    premium,
    blocked
  } = data;

  return {

    // ========================================
    // BASIC
    // ========================================

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

    // ========================================
    // GROUP
    // ========================================

    metadata,

    isGroup,

    isAdmin:
      senderIsAdmin,

    senderIsAdmin,

    botIsAdmin,

    // ========================================
    // PERMISSIONS
    // ========================================

    isOwner:
      owner,

    isSudo:
      sudo,

    isPremium:
      premium,

    isBlocked:
      blocked,

    prefix:
      config.PREFIX || ".",

    // ========================================
    // REPLY
    // ========================================

    reply: async text => {
      return sock.sendMessage(
        remoteJid,
        {
          text: String(text)
        },
        {
          quoted: message
        }
      );
    },

    // ========================================
    // SEND
    // ========================================

    send: async content => {
      return sock.sendMessage(
        remoteJid,
        content,
        {
          quoted: message
        }
      );
    },

    // ========================================
    // REACT
    // ========================================

    react: async emoji => {
      return sock.sendMessage(
        remoteJid,
        {
          react: {
            text: String(emoji),
            key: message.key
          }
        }
      );
    },

    // ========================================
    // MENTION
    // ========================================

    mention: async (
      text,
      mentions = []
    ) => {
      return sock.sendMessage(
        remoteJid,
        {
          text: String(text),
          mentions
        },
        {
          quoted: message
        }
      );
    }
  };
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

    // ========================================
    // BASIC VALIDATION
    // ========================================

    if (!sock) {
      throw new Error(
        "WhatsApp socket is missing."
      );
    }

    if (!message) {
      throw new Error(
        "WhatsApp message is missing."
      );
    }

    const remoteJid =
      message?.key?.remoteJid;

    if (!remoteJid) {
      throw new Error(
        "Message remoteJid is missing."
      );
    }

    // ========================================
    // FIND COMMAND
    // ========================================

    const command =
      findCommand(commandName);

    if (!command) {
      console.log(
        `⚠️ UNKNOWN COMMAND: ${
          config.PREFIX || "."
        }${commandName}`
      );

      return false;
    }

    // ========================================
    // SENDER
    // ========================================

    const sender =
      message?.key?.participant ||
      message?.participant ||
      remoteJid;

    const pushName =
      message?.pushName ||
      "User";

    // ========================================
    // USER
    // ========================================

    const user =
      getUser(sender);

    // ========================================
    // GROUP
    // ========================================

    const isGroup =
      remoteJid.endsWith("@g.us");

    const group =
      isGroup
        ? getGroup(remoteJid)
        : null;

    // Prevent unused-variable warnings
    void group;

    // ========================================
    // PERMISSIONS
    // ========================================

    const blocked =
      isBlocked(sender);

    const owner =
      isOwner(sender);

    const sudo =
      isSudo(sender) ||
      isOwner(sender);

    const premium =
      isPremium(sender) ||
      owner ||
      sudo;

    // ========================================
    // GROUP INFORMATION
    // ========================================

    let metadata = null;

    let senderIsAdmin = false;

    let botIsAdmin = false;

    if (isGroup) {

      metadata =
        await getGroupMetadata(
          sock,
          remoteJid
        );

      senderIsAdmin =
        isGroupAdmin(
          sender,
          metadata
        );

      botIsAdmin =
        isBotAdmin(
          sock,
          metadata
        );
    }

    // ========================================
    // CONTEXT
    // ========================================

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
        premium,
        blocked
      });

    // ========================================
    // BLOCKED
    // ========================================

    if (
      blocked &&
      !owner
    ) {
      await permissionError(
        ctx,
        "blocked"
      );

      return true;
    }

    // ========================================
    // MAINTENANCE
    // ========================================

    const maintenance =
      getSetting(
        "maintenance"
      );

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

    // ========================================
    // OWNER
    // ========================================

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

    // ========================================
    // SUDO
    // ========================================

    if (
      command.sudo &&
      !sudo
    ) {
      await permissionError(
        ctx,
        "sudo"
      );

      return true;
    }

    // ========================================
    // GROUP
    // ========================================

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

    // ========================================
    // ADMIN
    // ========================================

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

    // ========================================
    // BOT ADMIN
    // ========================================

    if (
      command.botAdmin &&
      !botIsAdmin &&
      !owner &&
      !sudo
    ) {
      await permissionError(
        ctx,
        "botAdmin"
      );

      return true;
    }

    // ========================================
    // PREMIUM
    // ========================================

    if (
      command.premium &&
      !premium
    ) {
      await permissionError(
        ctx,
        "premium"
      );

      return true;
    }

    // ========================================
    // STATISTICS
    // ========================================

    try {
      incrementStat(
        "commands"
      );

      if (user) {
        user.commands =
          (user.commands || 0) + 1;

        saveDatabase();
      }
    } catch (statError) {
      console.error(
        "⚠️ STATISTICS ERROR:",
        statError
      );
    }

    // ========================================
    // EXECUTION LOG
    // ========================================

    console.log(
      `⚡ EXECUTING COMMAND`
    );

    console.log(
      `   Command : ${
        config.PREFIX || "."
      }${command.name}`
    );

    console.log(
      `   User    : ${sender}`
    );

    console.log(
      `   Chat    : ${remoteJid}`
    );

    console.log(
      `   Group   : ${isGroup}`
    );

    // ========================================
    // EXECUTE
    // ========================================

    await command.execute(
      ctx
    );

    console.log(
      `✅ COMMAND COMPLETED: ${
        command.name
      }`
    );

    return true;

  } catch (error) {

    console.error("");
    console.error(
      "╔══════════════════════════════════════════╗"
    );
    console.error(
      "║ ❌ COMMAND EXECUTION ERROR              ║"
    );
    console.error(
      "╚══════════════════════════════════════════╝"
    );

    console.error(
      "Command:",
      commandName
    );

    console.error(
      "Message:",
      error?.message || error
    );

    console.error(
      "Stack:",
      error?.stack || "No stack trace"
    );

    console.error(
      "══════════════════════════════════════════"
    );

    try {

      await sock.sendMessage(
        message?.key?.remoteJid,
        {
          text:
            `❌ COMMAND ERROR\n\n` +
            `⚡ Command: ${
              config.PREFIX || "."
            }${commandName}\n\n` +
            `📝 ${
              error?.message ||
              "Something went wrong."
            }`
        }
      );

    } catch (sendError) {

      console.error(
        "❌ FAILED TO SEND ERROR MESSAGE:",
        sendError
      );
    }

    return true;
  }
}

// ============================================
// BUILT-IN COMMAND: PING
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
    description:
      "Check bot response speed",
    usage: ".ping"
  }
);

// ============================================
// BUILT-IN COMMAND: ALIVE
// ============================================

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
    description:
      "Check bot status",
    usage: ".alive"
  }
);

// ============================================
// BUILT-IN COMMAND: RUNTIME
// ============================================

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
      Math.floor(
        seconds % 60
      );

    await ctx.reply(
      `⏱️ SILVER-ENIGMA RUNTIME\n\n` +
      `📅 ${days}d ${hours}h ${minutes}m ${secs}s`
    );
  },
  {
    aliases: ["uptime"],
    category: "general",
    description:
      "Show bot runtime",
    usage: ".runtime"
  }
);

// ============================================
// BUILT-IN COMMAND: ID
// ============================================

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
    description:
      "Show chat and user ID",
    usage: ".id"
  }
);

// ============================================
// STARTUP DIAGNOSTIC
// ============================================

console.log(
  `⚡ SILVER-ENIGMA COMMAND SYSTEM LOADED`
);

console.log(
  `📦 Commands registered: ${commands.size}`
);

export default commands;
