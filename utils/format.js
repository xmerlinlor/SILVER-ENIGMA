// ============================================
// 👑 SILVER-ENIGMA
// ✨ FORMAT & DISPLAY UTILITIES
// ============================================

import config from "../config.js";

// ============================================
// BOT SETTINGS
// ============================================

const BOT_NAME =
  config.BOT_NAME || "SILVER-ENIGMA";

const PREFIX =
  config.PREFIX || ".";

// ============================================
// FORMAT USER
// ============================================

export function formatUser(name = "User") {
  return String(name)
    .trim()
    .replace(/\s+/g, " ") || "User";
}

// ============================================
// FORMAT NUMBER
// ============================================

export function formatNumber(number) {
  const value = Number(number);

  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString("en-US");
}

// ============================================
// FORMAT CURRENCY
// ============================================

export function formatCurrency(
  amount = 0,
  currency = "₦"
) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return `${currency}0`;
  }

  return `${currency}${value.toLocaleString("en-US")}`;
}

// ============================================
// FORMAT BYTES
// ============================================

export function formatBytes(bytes = 0) {
  const value = Number(bytes);

  if (!Number.isFinite(value) || value <= 0) {
    return "0 B";
  }

  const units = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB"
  ];

  const index = Math.floor(
    Math.log(value) / Math.log(1024)
  );

  const safeIndex = Math.min(
    index,
    units.length - 1
  );

  return (
    (value / Math.pow(1024, safeIndex))
      .toFixed(safeIndex === 0 ? 0 : 2)
      .replace(/\.00$/, "") +
    ` ${units[safeIndex]}`
  );
}

// ============================================
// FORMAT DURATION
// ============================================

export function formatDuration(seconds = 0) {
  let value = Number(seconds);

  if (!Number.isFinite(value) || value < 0) {
    value = 0;
  }

  value = Math.floor(value);

  const days = Math.floor(value / 86400);
  value %= 86400;

  const hours = Math.floor(value / 3600);
  value %= 3600;

  const minutes = Math.floor(value / 60);
  const secs = value % 60;

  const parts = [];

  if (days) {
    parts.push(`${days}d`);
  }

  if (hours) {
    parts.push(`${hours}h`);
  }

  if (minutes) {
    parts.push(`${minutes}m`);
  }

  if (secs || parts.length === 0) {
    parts.push(`${secs}s`);
  }

  return parts.join(" ");
}

// ============================================
// FORMAT DATE
// ============================================

export function formatDate(
  date = Date.now()
) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Unknown";
  }

  return value.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
}

// ============================================
// FORMAT TIME
// ============================================

export function formatTime(
  date = Date.now()
) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Unknown";
  }

  return value.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
  );
}

// ============================================
// FORMAT DATE + TIME
// ============================================

export function formatDateTime(
  date = Date.now()
) {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "Unknown";
  }

  return value.toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  );
}

// ============================================
// FORMAT RELATIVE TIME
// ============================================

export function formatRelativeTime(
  timestamp
) {
  const time = new Date(timestamp).getTime();

  if (!Number.isFinite(time)) {
    return "Unknown";
  }

  const diff =
    Date.now() - time;

  if (diff < 0) {
    return "Just now";
  }

  const seconds =
    Math.floor(diff / 1000);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes =
    Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days =
    Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d ago`;
  }

  const months =
    Math.floor(days / 30);

  if (months < 12) {
    return `${months}mo ago`;
  }

  const years =
    Math.floor(months / 12);

  return `${years}y ago`;
}

// ============================================
// FORMAT JID
// ============================================

export function formatJid(jid = "") {
  if (!jid) {
    return "";
  }

  return String(jid).trim();
}

// ============================================
// GET NUMBER FROM JID
// ============================================

export function jidToNumber(jid = "") {
  if (!jid) {
    return "";
  }

  return String(jid)
    .split("@")[0]
    .split(":")[0]
    .replace(/\D/g, "");
}

// ============================================
// FORMAT PHONE NUMBER
// ============================================

export function formatPhone(
  number = ""
) {
  const clean =
    String(number)
      .replace(/\D/g, "");

  if (!clean) {
    return "";
  }

  return `+${clean}`;
}

// ============================================
// TRUNCATE TEXT
// ============================================

export function truncate(
  text = "",
  maxLength = 100
) {
  const value =
    String(text);

  if (value.length <= maxLength) {
    return value;
  }

  if (maxLength <= 3) {
    return value.slice(
      0,
      maxLength
    );
  }

  return (
    value.slice(0, maxLength - 3) +
    "..."
  );
}

// ============================================
// CLEAN TEXT
// ============================================

export function cleanText(
  text = ""
) {
  return String(text)
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================
// CAPITALIZE
// ============================================

export function capitalize(
  text = ""
) {
  const value =
    cleanText(text);

  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

// ============================================
// TITLE CASE
// ============================================

export function titleCase(
  text = ""
) {
  return cleanText(text)
    .toLowerCase()
    .split(" ")
    .map(word =>
      word
        ? word.charAt(0).toUpperCase() +
          word.slice(1)
        : ""
    )
    .join(" ");
}

// ============================================
// SAFE STRING
// ============================================

export function safeString(
  value,
  fallback = ""
) {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  return String(value);
}

// ============================================
// COMMAND DISPLAY
// ============================================

export function formatCommand(
  command = ""
) {
  const value =
    String(command)
      .trim()
      .replace(/^\./, "");

  return `${PREFIX}${value}`;
}

// ============================================
// BOT HEADER
// ============================================

export function botHeader(
  title = "SILVER-ENIGMA"
) {
  return (
    `╭━━━〔 👑 ${BOT_NAME} 〕━━━╮\n` +
    `┃ ${title}\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}

// ============================================
// BOX MESSAGE
// ============================================

export function boxMessage(
  title,
  lines = []
) {
  const content =
    Array.isArray(lines)
      ? lines
      : [lines];

  return (
    `╭━━━〔 ${title} 〕━━━╮\n` +
    content
      .map(line => `┃ ${line}`)
      .join("\n") +
    `\n╰━━━━━━━━━━━━━━━━━━━━╯`
  );
}

// ============================================
// MENU LINE
// ============================================

export function menuLine(
  command,
  description = ""
) {
  return (
    `┃ ${formatCommand(command)}` +
    (description
      ? ` — ${description}`
      : "")
  );
}

// ============================================
// LIST FORMAT
// ============================================

export function formatList(
  items = [],
  bullet = "•"
) {
  if (!Array.isArray(items)) {
    return "";
  }

  return items
    .map(
      (item, index) =>
        `${bullet} ${item}`
    )
    .join("\n");
}

// ============================================
// JSON SAFE FORMAT
// ============================================

export function prettyJSON(
  data
) {
  try {
    return JSON.stringify(
      data,
      null,
      2
    );
  } catch {
    return "{}";
  }
}

// ============================================
// PERCENTAGE
// ============================================

export function formatPercentage(
  value,
  total
) {
  const amount =
    Number(value);

  const maximum =
    Number(total);

  if (
    !Number.isFinite(amount) ||
    !Number.isFinite(maximum) ||
    maximum <= 0
  ) {
    return "0%";
  }

  const percentage =
    (amount / maximum) * 100;

  return `${percentage.toFixed(1)}%`;
}

// ============================================
// PROGRESS BAR
// ============================================

export function progressBar(
  value,
  total,
  size = 10
) {
  const amount =
    Number(value) || 0;

  const maximum =
    Number(total) || 0;

  const length =
    Math.max(1, Number(size) || 10);

  if (maximum <= 0) {
    return "░".repeat(length);
  }

  const percentage =
    Math.max(
      0,
      Math.min(
        1,
        amount / maximum
      )
    );

  const filled =
    Math.round(
      percentage * length
    );

  return (
    "█".repeat(filled) +
    "░".repeat(
      length - filled
    )
  );
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  formatUser,
  formatNumber,
  formatCurrency,
  formatBytes,
  formatDuration,
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatJid,
  jidToNumber,
  formatPhone,
  truncate,
  cleanText,
  capitalize,
  titleCase,
  safeString,
  formatCommand,
  botHeader,
  boxMessage,
  menuLine,
  formatList,
  prettyJSON,
  formatPercentage,
  progressBar
};
