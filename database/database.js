// ============================================
// 👑 SILVER-ENIGMA
// 💾 DATABASE SYSTEM
// ============================================

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data.json");

// ============================================
// DEFAULT DATABASE
// ============================================

const defaultData = {
  users: {},
  groups: {},

  sudo: [],
  blocked: [],

  settings: {
    maintenance: false,
    autoRead: false,
    autoTyping: false,
    autoRecording: false,
    autoReact: false,
    publicMode: true,
    prefix: "."
  },

  groupSettings: {},

  warnings: {},

  economy: {},

  levels: {},

  premium: {},

  statistics: {
    messages: 0,
    commands: 0,
    users: 0,
    groups: 0
  }
};

// ============================================
// CREATE DATABASE
// ============================================

function createDatabase() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(defaultData, null, 2)
      );

      console.log("💾 Database created.");
    }
  } catch (error) {
    console.error(
      "❌ DATABASE CREATE ERROR:",
      error
    );
  }
}

// ============================================
// LOAD DATABASE
// ============================================

function loadDatabase() {
  createDatabase();

  try {
    const raw = fs.readFileSync(
      DATA_FILE,
      "utf8"
    );

    const data = JSON.parse(raw);

    return {
      ...defaultData,
      ...data,
      settings: {
        ...defaultData.settings,
        ...(data.settings || {})
      }
    };
  } catch (error) {
    console.error(
      "❌ DATABASE LOAD ERROR:",
      error
    );

    return structuredClone(defaultData);
  }
}

// ============================================
// DATABASE INSTANCE
// ============================================

let database = loadDatabase();

// ============================================
// SAVE DATABASE
// ============================================

export function saveDatabase() {
  try {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(database, null, 2)
    );

    return true;
  } catch (error) {
    console.error(
      "❌ DATABASE SAVE ERROR:",
      error
    );

    return false;
  }
}

// ============================================
// GET DATABASE
// ============================================

export function getDatabase() {
  return database;
}

// ============================================
// USERS
// ============================================

export function getUser(userId) {
  if (!userId) return null;

  if (!database.users[userId]) {
    database.users[userId] = {
      id: userId,
      name: "",
      registered: Date.now(),

      premium: false,

      level: 1,
      xp: 0,

      balance: 0,

      warnings: 0,

      commands: 0,
      messages: 0
    };

    database.statistics.users++;

    saveDatabase();
  }

  return database.users[userId];
}

export function updateUser(userId, updates = {}) {
  const user = getUser(userId);

  if (!user) return null;

  database.users[userId] = {
    ...user,
    ...updates
  };

  saveDatabase();

  return database.users[userId];
}

// ============================================
// GROUPS
// ============================================

export function getGroup(groupId) {
  if (!groupId) return null;

  if (!database.groups[groupId]) {
    database.groups[groupId] = {
      id: groupId,

      welcome: false,
      goodbye: false,

      antilink: false,
      antispam: false,
      anitbadword: false,

      mute: false,

      warnings: {},

      settings: {}
    };

    database.statistics.groups++;

    saveDatabase();
  }

  return database.groups[groupId];
}

export function updateGroup(groupId, updates = {}) {
  const group = getGroup(groupId);

  if (!group) return null;

  database.groups[groupId] = {
    ...group,
    ...updates
  };

  saveDatabase();

  return database.groups[groupId];
}

// ============================================
// SUDO
// ============================================

export function isSudo(userId) {
  return database.sudo.includes(userId);
}

export function addSudo(userId) {
  if (!userId) return false;

  if (!database.sudo.includes(userId)) {
    database.sudo.push(userId);
    saveDatabase();
  }

  return true;
}

export function removeSudo(userId) {
  const index = database.sudo.indexOf(userId);

  if (index !== -1) {
    database.sudo.splice(index, 1);
    saveDatabase();
    return true;
  }

  return false;
}

// ============================================
// BLOCK SYSTEM
// ============================================

export function isBlocked(userId) {
  return database.blocked.includes(userId);
}

export function blockUser(userId) {
  if (!userId) return false;

  if (!database.blocked.includes(userId)) {
    database.blocked.push(userId);
    saveDatabase();
  }

  return true;
}

export function unblockUser(userId) {
  const index = database.blocked.indexOf(userId);

  if (index !== -1) {
    database.blocked.splice(index, 1);
    saveDatabase();
    return true;
  }

  return false;
}

// ============================================
// SETTINGS
// ============================================

export function getSetting(name) {
  return database.settings[name];
}

export function setSetting(name, value) {
  database.settings[name] = value;

  saveDatabase();

  return value;
}

// ============================================
// GROUP SETTINGS
// ============================================

export function getGroupSetting(groupId, name) {
  const group = getGroup(groupId);

  if (!group) return undefined;

  return group.settings?.[name];
}

export function setGroupSetting(groupId, name, value) {
  const group = getGroup(groupId);

  if (!group.settings) {
    group.settings = {};
  }

  group.settings[name] = value;

  saveDatabase();

  return value;
}

// ============================================
// WARNINGS
// ============================================

export function getWarnings(groupId, userId) {
  if (!database.warnings[groupId]) {
    database.warnings[groupId] = {};
  }

  return database.warnings[groupId][userId] || 0;
}

export function addWarning(groupId, userId) {
  if (!database.warnings[groupId]) {
    database.warnings[groupId] = {};
  }

  database.warnings[groupId][userId] =
    (database.warnings[groupId][userId] || 0) + 1;

  saveDatabase();

  return database.warnings[groupId][userId];
}

export function resetWarnings(groupId, userId) {
  if (database.warnings[groupId]) {
    delete database.warnings[groupId][userId];
    saveDatabase();
  }

  return true;
}

// ============================================
// PREMIUM
// ============================================

export function isPremium(userId) {
  const user = getUser(userId);

  return Boolean(user?.premium);
}

export function setPremium(userId, status = true) {
  const user = getUser(userId);

  if (!user) return false;

  user.premium = status;

  saveDatabase();

  return status;
}

// ============================================
// ECONOMY
// ============================================

export function getBalance(userId) {
  const user = getUser(userId);

  return user?.balance || 0;
}

export function addBalance(userId, amount) {
  const user = getUser(userId);

  if (!user) return false;

  user.balance += Number(amount) || 0;

  saveDatabase();

  return user.balance;
}

export function removeBalance(userId, amount) {
  const user = getUser(userId);

  if (!user) return false;

  const value = Number(amount) || 0;

  if (user.balance < value) {
    return false;
  }

  user.balance -= value;

  saveDatabase();

  return user.balance;
}

// ============================================
// XP / LEVEL
// ============================================

export function addXP(userId, amount) {
  const user = getUser(userId);

  if (!user) return null;

  user.xp += Number(amount) || 0;

  const requiredXP = user.level * 1000;

  if (user.xp >= requiredXP) {
    user.xp -= requiredXP;
    user.level++;

    saveDatabase();

    return {
      levelUp: true,
      level: user.level,
      xp: user.xp
    };
  }

  saveDatabase();

  return {
    levelUp: false,
    level: user.level,
    xp: user.xp
  };
}

// ============================================
// STATISTICS
// ============================================

export function incrementStat(stat, amount = 1) {
  if (
    typeof database.statistics[stat] !==
    "number"
  ) {
    database.statistics[stat] = 0;
  }

  database.statistics[stat] += amount;

  saveDatabase();

  return database.statistics[stat];
}

export function getStatistics() {
  return database.statistics;
}

// ============================================
// RESET DATABASE
// ============================================

export function resetDatabase() {
  database = structuredClone(defaultData);

  saveDatabase();

  return database;
}

// ============================================
// INITIAL SAVE
// ============================================

saveDatabase();

console.log("💾 SILVER-ENIGMA DATABASE LOADED");

export default database;
