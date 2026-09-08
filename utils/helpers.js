// ============================================
// 👑 SILVER-ENIGMA
// 🛠️ GENERAL HELPER FUNCTIONS
// ============================================

import crypto from "crypto";

// ============================================
// SLEEP
// ============================================

export function sleep(ms = 1000) {
  const time = Number(ms);

  return new Promise(resolve =>
    setTimeout(
      resolve,
      Number.isFinite(time) && time > 0
        ? time
        : 0
    )
  );
}

// ============================================
// RANDOM NUMBER
// ============================================

export function randomNumber(
  min = 0,
  max = 100
) {
  min = Number(min);
  max = Number(max);

  if (!Number.isFinite(min)) min = 0;
  if (!Number.isFinite(max)) max = 100;

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(
    Math.random() *
      (max - min + 1)
  ) + min;
}

// ============================================
// RANDOM ITEM
// ============================================

export function randomItem(
  array = []
) {
  if (!Array.isArray(array)) {
    return null;
  }

  if (array.length === 0) {
    return null;
  }

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
}

// ============================================
// SHUFFLE ARRAY
// ============================================

export function shuffle(
  array = []
) {
  if (!Array.isArray(array)) {
    return [];
  }

  const result = [...array];

  for (
    let i = result.length - 1;
    i > 0;
    i--
  ) {
    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

// ============================================
// RANDOM STRING
// ============================================

export function randomString(
  length = 10
) {
  const size =
    Math.max(
      1,
      Math.floor(Number(length) || 10)
    );

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789";

  let result = "";

  for (let i = 0; i < size; i++) {
    result += characters.charAt(
      Math.floor(
        Math.random() *
        characters.length
      )
    );
  }

  return result;
}

// ============================================
// RANDOM ID
// ============================================

export function randomId(
  length = 16
) {
  return crypto
    .randomBytes(
      Math.ceil(length / 2)
    )
    .toString("hex")
    .slice(0, length);
}

// ============================================
// GENERATE UUID
// ============================================

export function uuid() {
  if (
    typeof crypto.randomUUID ===
    "function"
  ) {
    return crypto.randomUUID();
  }

  return [
    randomId(8),
    randomId(4),
    randomId(4),
    randomId(4),
    randomId(12)
  ].join("-");
}

// ============================================
// CHECK URL
// ============================================

export function isValidUrl(
  value = ""
) {
  try {
    const url =
      new URL(String(value).trim());

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

// ============================================
// GET URL
// ============================================

export function getUrl(
  value = ""
) {
  const text =
    String(value).trim();

  if (!text) {
    return null;
  }

  try {
    return new URL(text);
  } catch {
    try {
      return new URL(
        `https://${text}`
      );
    } catch {
      return null;
    }
  }
}

// ============================================
// EXTRACT URL
// ============================================

export function extractUrl(
  text = ""
) {
  const match =
    String(text).match(
      /https?:\/\/[^\s]+/i
    );

  return match
    ? match[0]
    : null;
}

// ============================================
// CHECK EMAIL
// ============================================

export function isValidEmail(
  email = ""
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(
      String(email).trim()
    );
}

// ============================================
// CHECK NUMBER
// ============================================

export function isNumber(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return false;
  }

  return Number.isFinite(
    Number(value)
  );
}

// ============================================
// SAFE NUMBER
// ============================================

export function toNumber(
  value,
  fallback = 0
) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

// ============================================
// CLAMP NUMBER
// ============================================

export function clamp(
  value,
  min,
  max
) {
  const number =
    toNumber(value, min);

  return Math.min(
    Math.max(number, min),
    max
  );
}

// ============================================
// PARSE BOOLEAN
// ============================================

export function parseBoolean(
  value,
  fallback = false
) {
  if (
    typeof value === "boolean"
  ) {
    return value;
  }

  const text =
    String(value)
      .trim()
      .toLowerCase();

  if (
    [
      "true",
      "yes",
      "on",
      "1",
      "enable",
      "enabled"
    ].includes(text)
  ) {
    return true;
  }

  if (
    [
      "false",
      "no",
      "off",
      "0",
      "disable",
      "disabled"
    ].includes(text)
  ) {
    return false;
  }

  return fallback;
}

// ============================================
// CLEAN JID
// ============================================

export function cleanJid(
  jid = ""
) {
  return String(jid)
    .trim()
    .split(":")[0];
}

// ============================================
// GET PHONE NUMBER
// ============================================

export function getPhoneNumber(
  jid = ""
) {
  return cleanJid(jid)
    .split("@")[0]
    .replace(/\D/g, "");
}

// ============================================
// CHECK GROUP JID
// ============================================

export function isGroupJid(
  jid = ""
) {
  return String(jid)
    .endsWith("@g.us");
}

// ============================================
// CHECK USER JID
// ============================================

export function isUserJid(
  jid = ""
) {
  return (
    String(jid).endsWith(
      "@s.whatsapp.net"
    ) ||
    String(jid).endsWith(
      "@lid"
    )
  );
}

// ============================================
// MENTION USER
// ============================================

export function mention(
  jid
) {
  const number =
    getPhoneNumber(jid);

  return number
    ? `@${number}`
    : "@user";
}

// ============================================
// EXTRACT MENTIONS
// ============================================

export function extractMentions(
  text = ""
) {
  const matches =
    String(text).match(
      /@\d+/g
    );

  if (!matches) {
    return [];
  }

  return [
    ...new Set(
      matches.map(
        value =>
          value
            .replace("@", "") +
          "@s.whatsapp.net"
      )
    )
  ];
}

// ============================================
// PARSE COMMAND ARGUMENTS
// ============================================

export function parseArgs(
  text = ""
) {
  const value =
    String(text).trim();

  if (!value) {
    return [];
  }

  const matches =
    value.match(
      /"([^"]+)"|'([^']+)'|(\S+)/g
    );

  if (!matches) {
    return [];
  }

  return matches.map(
    arg => {
      if (
        (arg.startsWith('"') &&
          arg.endsWith('"')) ||
        (arg.startsWith("'") &&
          arg.endsWith("'"))
      ) {
        return arg.slice(1, -1);
      }

      return arg;
    }
  );
}

// ============================================
// GET FIRST ARGUMENT
// ============================================

export function firstArg(
  args = []
) {
  return Array.isArray(args) &&
    args.length
    ? args[0]
    : "";
}

// ============================================
// GET REST OF ARGUMENTS
// ============================================

export function restArgs(
  args = []
) {
  if (!Array.isArray(args)) {
    return [];
  }

  return args.slice(1);
}

// ============================================
// JOIN ARGUMENTS
// ============================================

export function joinArgs(
  args = [],
  separator = " "
) {
  if (!Array.isArray(args)) {
    return "";
  }

  return args.join(separator);
}

// ============================================
// RETRY FUNCTION
// ============================================

export async function retry(
  fn,
  attempts = 3,
  delay = 1000
) {
  if (typeof fn !== "function") {
    throw new TypeError(
      "retry requires a function"
    );
  }

  const totalAttempts =
    Math.max(
      1,
      Math.floor(
        Number(attempts) || 3
      )
    );

  let lastError;

  for (
    let attempt = 1;
    attempt <= totalAttempts;
    attempt++
  ) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;

      if (
        attempt < totalAttempts
      ) {
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

// ============================================
// SAFE JSON PARSE
// ============================================

export function safeJsonParse(
  value,
  fallback = null
) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// ============================================
// SAFE JSON STRINGIFY
// ============================================

export function safeJsonStringify(
  value,
  fallback = "{}"
) {
  try {
    return JSON.stringify(
      value,
      null,
      2
    );
  } catch {
    return fallback;
  }
}

// ============================================
// DEEP CLONE
// ============================================

export function deepClone(
  value
) {
  try {
    return structuredClone(value);
  } catch {
    try {
      return JSON.parse(
        JSON.stringify(value)
      );
    } catch {
      return value;
    }
  }
}

// ============================================
// OBJECT CHECK
// ============================================

export function isObject(
  value
) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

// ============================================
// ARRAY CHECK
// ============================================

export function isArray(
  value
) {
  return Array.isArray(value);
}

// ============================================
// EMPTY CHECK
// ============================================

export function isEmpty(
  value
) {
  if (
    value === null ||
    value === undefined
  ) {
    return true;
  }

  if (
    typeof value === "string"
  ) {
    return value.trim() === "";
  }

  if (
    Array.isArray(value)
  ) {
    return value.length === 0;
  }

  if (
    isObject(value)
  ) {
    return (
      Object.keys(value).length === 0
    );
  }

  return false;
}

// ============================================
// REMOVE DUPLICATES
// ============================================

export function unique(
  array = []
) {
  if (!Array.isArray(array)) {
    return [];
  }

  return [
    ...new Set(array)
  ];
}

// ============================================
// GROUP ARRAY
// ============================================

export function chunk(
  array = [],
  size = 10
) {
  if (!Array.isArray(array)) {
    return [];
  }

  const chunkSize =
    Math.max(
      1,
      Math.floor(
        Number(size) || 10
      )
    );

  const result = [];

  for (
    let i = 0;
    i < array.length;
    i += chunkSize
  ) {
    result.push(
      array.slice(
        i,
        i + chunkSize
      )
    );
  }

  return result;
}

// ============================================
// GET ERROR MESSAGE
// ============================================

export function getErrorMessage(
  error,
  fallback = "Unknown error"
) {
  if (!error) {
    return fallback;
  }

  if (
    typeof error === "string"
  ) {
    return error;
  }

  return (
    error.message ||
    error.toString?.() ||
    fallback
  );
}

// ============================================
// TIMESTAMP
// ============================================

export function timestamp() {
  return Date.now();
}

// ============================================
// UNIX TIMESTAMP
// ============================================

export function unixTimestamp() {
  return Math.floor(
    Date.now() / 1000
  );
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  sleep,
  randomNumber,
  randomItem,
  shuffle,
  randomString,
  randomId,
  uuid,
  isValidUrl,
  getUrl,
  extractUrl,
  isValidEmail,
  isNumber,
  toNumber,
  clamp,
  parseBoolean,
  cleanJid,
  getPhoneNumber,
  isGroupJid,
  isUserJid,
  mention,
  extractMentions,
  parseArgs,
  firstArg,
  restArgs,
  joinArgs,
  retry,
  safeJsonParse,
  safeJsonStringify,
  deepClone,
  isObject,
  isArray,
  isEmpty,
  unique,
  chunk,
  getErrorMessage,
  timestamp,
  unixTimestamp
};
