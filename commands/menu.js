// ============================================
// 👑 SILVER-ENIGMA
// 📋 COMPLETE COMMAND MENU
// ============================================

const CATEGORIES = {

  // ==========================================
  // 01 ⚡ GENERAL
  // ==========================================
  general: {
    title: "⚡ Gᴇɴᴇʀᴀʟ",
    commands: [
      "menu", "help", "allmenu", "list", "commands",
      "ping", "alive", "status", "runtime", "uptime",
      "botinfo", "info", "about", "owner", "owners",
      "creator", "speed", "cpu", "ram", "disk",
      "server", "host", "version", "features", "stats",
      "health", "support", "rules", "terms", "privacy"
    ]
  },

  // ==========================================
  // 02 👑 OWNER
  // ==========================================
  owner: {
    title: "👑 Oᴡɴᴇʀ",
    commands: [
      "broadcast", "bc", "bcgroup", "bcall",
      "eval", "exec", "shell", "restart",
      "shutdown", "reload", "update", "install",
      "uninstall", "addsudo", "delsudo", "listsudo",
      "addowner", "delowner", "listowner", "block",
      "unblock", "blocklist", "join", "leave",
      "leaveall", "setname", "setbio", "setpp",
      "delpp", "setstatus", "maintenance"
    ]
  },

  // ==========================================
  // 03 🛡️ GROUP ADMIN
  // ==========================================
  group: {
    title: "🛡️ Gʀᴏᴜᴘ Aᴅᴍɪɴ",
    commands: [
      "kick", "add", "promote", "demote", "ban",
      "unban", "mute", "unmute", "warn", "unwarn",
      "warnings", "resetwarn", "delete", "del",
      "purge", "clear", "kickall", "banall", "warnall",
      "tagall", "hidetag", "tagadmins", "tagmods",
      "tagmembers", "tag", "mention", "mentionall",
      "groupinfo", "members", "admins", "listadmins",
      "getgroup", "getinvite", "link", "revoke",
      "approve", "reject", "approveall", "rejectall",
      "open", "close", "setsubject", "setdescription",
      "setrules", "setgroupicon", "removeicon",
      "resetgroup", "groupstats", "memberinfo",
      "checkadmin", "checkbot", "groupsettings",
      "groupsecurity"
    ]
  },

  // ==========================================
  // 04 🔒 SECURITY
  // ==========================================
  security: {
    title: "🔒 Sᴇᴄᴜʀɪᴛʏ",
    commands: [
      "antilink", "antilinkkick", "antilinkwarn",
      "antispam", "antiflood", "antiraid", "antibot",
      "antidelete", "antimention", "antigroupmention",
      "antitag", "antiinvite", "anticall",
      "antiswear", "antislam", "antiword", "antiscam",
      "antiphishing", "antinsfw", "antiforward",
      "antimedia", "antigif", "antisticker",
      "antistatus", "antisharedstatus", "antidomain",
      "antichannel", "antiporn", "antidup",
      "antiunknown", "antivoice", "antireport",
      "antibroadcast", "security", "securitylog",
      "securityinfo", "resetsecurity",
      "hijack", "hijackguard"
    ]
  },

  // ==========================================
  // 05 🔐 LOCK SYSTEM
  // ==========================================
  lock: {
    title: "🔐 Lᴏᴄᴋ Sʏsᴛᴇᴍ",
    commands: [
      "lock", "unlock",
      "locklink", "unlocklink",
      "lockmedia", "unlockmedia",
      "lockphoto", "unlockphoto",
      "lockvideo", "unlockvideo",
      "lockaudio", "unlockaudio",
      "lockdocument", "unlockdocument",
      "locksticker", "unlocksticker",
      "lockgif", "unlockgif",
      "lockcontact", "unlockcontact",
      "locklocation", "unlocklocation",
      "lockpoll", "unlockpoll",
      "lockreaction", "unlockreaction",
      "lockvoice", "unlockvoice",
      "lockall", "unlockall"
    ]
  },

  // ==========================================
  // 06 👋 WELCOME
  // ==========================================
  welcome: {
    title: "👋 Wᴇʟᴄᴏᴍᴇ",
    commands: [
      "welcome", "welcomeon", "welcomeoff",
      "setwelcome", "getwelcome", "resetwelcome",
      "goodbye", "goodbyeon", "goodbyeoff",
      "setgoodbye", "getgoodbye", "resetgoodbye",
      "welcomeimage", "goodbyeimage",
      "welcometext", "goodbyetext",
      "welcomegif", "goodbyegif",
      "welcomevideo", "goodbyevideo",
      "welcometag", "goodbyetag",
      "welcomebutton", "goodbyebutton",
      "welcomeaudio", "goodbyeaudio",
      "welcomeadmin", "goodbyeadmin",
      "welcomechannel", "resetgreet"
    ]
  },

  // ==========================================
  // 07 🤖 AI
  // ==========================================
  ai: {
    title: "🤖 Aɪ",
    commands: [
      "ai", "ask", "chat", "chatbot", "gpt",
      "gemini", "llama", "deepseek", "imagine",
      "image", "draw", "generate", "translate",
      "detect", "summarize", "summary", "rewrite",
      "paraphrase", "grammar", "fixgrammar",
      "explain", "code", "debug", "review",
      "optimize", "essay", "story", "poem",
      "question"
    ]
  },

  // ==========================================
  // 08 🎵 MUSIC
  // ==========================================
  music: {
    title: "🎵 Mᴜsɪᴄ",
    commands: [
      "play", "song", "music", "audio", "mp3",
      "ytmp3", "ytaudio", "ytsearch", "searchsong",
      "lyrics", "lyric", "album", "artist",
      "songinfo", "musicinfo", "spotify",
      "spotifydl", "soundcloud", "soundclouddl",
      "radio", "playlist", "queue", "pause",
      "resume", "skip", "stop", "volume",
      "next", "previous"
    ]
  },

  // ==========================================
  // 09 🎬 DOWNLOAD
  // ==========================================
  download: {
    title: "🎬 Dᴏᴡɴʟᴏᴀᴅ",
    commands: [
      "video", "ytmp4", "ytvideo", "youtube",
      "youtubedl", "tiktok", "tiktokdl", "tt",
      "instagram", "ig", "igdl", "facebook",
      "fb", "fbdl", "twitter", "x", "xdl",
      "threads", "pinterest", "pindl", "reddit",
      "redditdl", "snapchat", "snapdl", "mediafire",
      "gdrive", "terabox", "capcut", "download",
      "fetch"
    ]
  },

  // ==========================================
  // 10 🖼️ STICKER / TOOLS
  // ==========================================
  sticker: {
    title: "🖼️ Sᴛɪᴄᴋᴇʀ / Tᴏᴏʟs",
    commands: [
      "sticker", "s", "stick", "toimg", "img",
      "photo", "webp", "png", "jpg", "jpeg",
      "crop", "resize", "rotate", "flip",
      "blur", "sharpen", "invert", "grayscale",
      "removebg", "qr", "qrcode", "readqr",
      "caption", "meme", "take", "circle",
      "round", "frame", "watermark"
    ]
  },

  // ==========================================
  // 11 🎮 GAMES
  // ==========================================
  games: {
    title: "🎮 Gᴀᴍᴇs",
    commands: [
      "game", "games", "tictactoe", "ttt", "rps",
      "rock", "paper", "scissors", "hangman",
      "guess", "number", "trivia", "quiz",
      "mathgame", "wordgame", "scramble", "anagram",
      "memory", "blackjack", "dice", "roll",
      "coin", "coinflip", "spin", "slot",
      "lottery", "battle", "duel", "chess"
    ]
  },

  // ==========================================
  // 12 😂 FUN
  // ==========================================
  fun: {
    title: "😂 Fᴜɴ",
    commands: [
      "joke", "jokes", "meme", "memegenerator",
      "quote", "quotes", "truth", "dare",
      "truthordare", "8ball", "love", "ship",
      "compatibility", "rizz", "roast", "compliment",
      "insult", "pickup", "flirt", "wyr",
      "wouldyourather", "emojimix", "emojify",
      "reverse", "mock", "fancy", "howcute",
      "howfunny", "random"
    ]
  },

  // ==========================================
  // 13 💰 ECONOMY
  // ==========================================
  economy: {
    title: "💰 Eᴄᴏɴᴏᴍʏ",
    commands: [
      "balance", "bal", "wallet", "money", "daily",
      "weekly", "monthly", "work", "job", "crime",
      "rob", "gamble", "bet", "deposit", "withdraw",
      "pay", "send", "transfer", "give", "receive",
      "claim", "reward", "bonus", "cash", "bank",
      "transactions", "history", "rich", "leaderboard"
    ]
  },

  // ==========================================
  // 14 🏆 LEVEL / XP
  // ==========================================
  level: {
    title: "🏆 Lᴇᴠᴇʟ / XP",
    commands: [
      "level", "xp", "rank", "ranking", "leaderboard",
      "top", "topusers", "topchat", "topxp",
      "topmoney", "profile", "card", "badges",
      "badge", "achievements", "achievement",
      "reputation", "rep", "givexp", "addxp",
      "removexp", "resetxp", "levelup", "mylevel",
      "rankcard", "rankings", "toprank", "toprep",
      "topactive"
    ]
  },

  // ==========================================
  // 15 👤 USER
  // ==========================================
  user: {
    title: "👤 U sᴇʀ",
    commands: [
      "register", "unregister", "verify", "unverify",
      "profile", "me", "myinfo", "myid", "id",
      "whois", "avatar", "pp", "getpp", "setbio",
      "getbio", "setage", "getage", "setgender",
      "getgender", "setlocation", "getlocation",
      "afk", "unafk", "afklist", "mystats",
      "activity", "mygroups", "groups", "groupcount"
    ]
  },

  // ==========================================
  // 16 🔎 SEARCH
  // ==========================================
  search: {
    title: "🔎 Sᴇᴀʀᴄʜ",
    commands: [
      "google", "search", "youtube", "ytsearch",
      "wikipedia", "wiki", "image", "images",
      "news", "weather", "forecast", "time",
      "timezone", "date", "calendar", "translate",
      "dictionary", "define", "meaning", "synonym",
      "antonym", "github", "stackoverflow", "reddit",
      "imdb", "movies", "anime", "manga", "lyrics",
      "map"
    ]
  },

  // ==========================================
  // 17 🧰 TOOLS
  // ==========================================
  tools: {
    title: "🧰 Tᴏᴏʟs",
    commands: [
      "calculator", "calc", "unit", "convert",
      "currency", "exchange", "qr", "qrcode",
      "barcode", "shorturl", "urlshort", "urlinfo",
      "whois", "ip", "iplookup", "dns", "pingip",
      "port", "base64", "encode", "decode", "md5",
      "sha256", "uuid", "password", "random",
      "binary", "hex", "json", "timestamp"
    ]
  },

  // ==========================================
  // 18 📱 WHATSAPP
  // ==========================================
  whatsapp: {
    title: "📱 WʜᴀᴛsAᴘᴘ",
    commands: [
      "vcf", "contact", "save", "forward", "copy",
      "quote", "quoted", "reply", "react", "reaction",
      "read", "unread", "viewonce", "toviewonce",
      "poll", "createpoll", "pollresult", "status",
      "statusdl", "statussave", "statusview", "story",
      "channel", "channelinfo", "channelpost",
      "channelsearch", "contactinfo", "business",
      "jid", "jidinfo"
    ]
  },

  // ==========================================
  // 19 🌸 ANIME
  // ==========================================
  anime: {
    title: "🌸 Aɴɪᴍᴇ",
    commands: [
      "anime", "animeinfo", "animequote", "animegirl",
      "animeboy", "neko", "waifu", "maid", "husbando",
      "kiss", "hug", "pat", "slap", "poke", "bite",
      "cuddle", "wink", "smile", "wave", "blush",
      "cry", "angry", "dance", "sad", "happy",
      "baka", "senpai", "kitsune", "foxgirl", "cosplay"
    ]
  },

  // ==========================================
  // 20 ⚙️ SETTINGS
  // ==========================================
  settings: {
    title: "⚙️ Sᴇᴛᴛɪɴɢs",
    commands: [
      "settings", "config", "setprefix", "getprefix",
      "setlanguage", "language", "settimezone",
      "timezone", "setmode", "public", "private",
      "self", "groupmode", "autoread", "autotyping",
      "autorecording", "autoreact", "autoview",
      "autoreply", "autostatus", "autodownload",
      "autosticker", "autoemoji", "autowelcome",
      "autogoodbye", "autobot", "autoforward",
      "autotranslate", "resetsettings"
    ]
  },

  // ==========================================
  // 21 💎 PREMIUM
  // ==========================================
  premium: {
    title: "💎 Pʀᴇᴍɪᴜᴍ",
    commands: [
      "premium", "premiuminfo", "plans", "plan", "buy",
      "subscribe", "subscription", "activate",
      "deactivate", "addpremium", "delpremium",
      "listpremium", "premiumusers", "premiumcheck",
      "premiumfeatures", "premiumprice", "premiumdays",
      "adddays", "removedays", "giftpremium",
      "premiumgift", "premiumcode", "redeem", "coupon",
      "coupons", "createcoupon", "delcoupon",
      "listcoupon", "premiumstats"
    ]
  },

  // ==========================================
  // 22 📊 STATS / LOGS
  // ==========================================
  stats: {
    title: "📊 Sᴛᴀᴛs / Lᴏɢs",
    commands: [
      "stats", "botstats", "groupstats", "userstats",
      "commandstats", "cmdstats", "usage", "logs",
      "log", "errorlogs", "activitylogs", "userlogs",
      "grouplogs", "broadcaststats", "database",
      "dbstats", "dbstatus", "connections", "sessions",
      "session", "devices", "process", "memory",
      "storage", "uptimestats", "serverstats",
      "traffic", "requests"
    ]
  },

  // ==========================================
  // 23 🤖 AUTOMATION
  // ==========================================
  automation: {
    title: "🤖 Aᴜᴛᴏᴍᴀᴛɪᴏɴ",
    commands: [
      "autoreply", "autoresponder", "addreply",
      "delreply", "listreply", "setreply",
      "autoreact", "addreact", "delreact", "listreact",
      "autogreet", "autowarn", "autoban", "automute",
      "autokick", "autodelete", "autopin", "autounpin",
      "autotag", "autotranslate", "autosave",
      "autodownload", "autostatus", "autoforward",
      "autofilter", "autorespond", "autolike",
      "autoview", "autoread", "autojoin",

      // EXTRA PROTECTION SYSTEMS
      "antilinkkick", "antilinkwarn", "antistatus",
      "antisharedstatus", "antispamguard",
      "antifloodguard", "antiwordguard",
      "antistickerguard", "antimediaguard",
      "antiforwardguard", "antigroupmention",
      "autowarning", "hijackguard"
    ]
  },

  // ==========================================
  // 24 🎞️ MEDIA
  // ==========================================
  media: {
    title: "🎞️ Mᴇᴅɪᴀ",
    commands: [
      "stickerize", "toaudio", "tovideo", "tomp3",
      "toogg", "tomp4", "gif", "togif", "gifmp4",
      "videogif", "compress", "compressvideo",
      "compressimage", "compressaudio", "mutevideo",
      "trim", "cut", "merge", "speedvideo",
      "slowvideo", "reversevideo", "volumeup",
      "volumedown", "screenshot", "thumbnail",
      "extractaudio", "extractimage", "videotosticker",
      "imagetosticker", "audiosticker", "textsticker"
    ]
  },

  // ==========================================
  // 25 ✨ EXTRA
  // ==========================================
  extra: {
    title: "✨ E xᴛʀᴀ",
    commands: [
      "report", "reportuser", "reportgroup", "feedback",
      "suggest", "request", "support", "contact", "faq",
      "donate", "sponsor", "developer", "source",
      "repository", "credits", "thanks", "invitebot",
      "sharebot", "addbot", "botlink", "pair", "unpair",
      "login", "logout", "sessioninfo", "deviceinfo",
      "checknumber", "numberinfo", "online", "offline"
    ]
  }
};

// ============================================
// 📋 MAIN MENU
// ============================================

export function getMenu() {

  let menu = `
╭━━━〔 👑 sɪʟᴠᴇʀ Mᴅ 〕━━━╮
┃
┃ 👋 Hᴇʟʟᴏ, ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ sɪʟᴠᴇʀ Mᴅ
┃
┃ ⚡ Fᴀsᴛ • Sᴍᴀʀᴛ • Pᴏᴡᴇʀғᴜʟ
┃
┃ ─────────────────────
┃
┃ 📚 Cᴏᴍᴍᴀɴᴅ Mᴇɴᴜ
┃
`;

  let number = 1;

  for (const [key] of Object.entries(CATEGORIES)) {
    menu += `┃ ${String(number).padStart(2, "0")} ➜ .${key}\n`;
    number++;
  }

  menu += `
┃
┃ ─────────────────────
`;

  for (const category of Object.values(CATEGORIES)) {

    menu += `┃\n`;
    menu += `┃ ${category.title}\n`;
    menu += `┃\n`;

    for (const command of category.commands) {
      menu += `┃ ${getEmoji(category.title)} .${command}\n`;
    }
  }

  menu += `
┃
┃ ─────────────────────
┃
┃ 👑 sɪʟᴠᴇʀ Mᴅ
┃
┃ ❤️ Mᴀᴅᴇ Wɪᴛʜ Lᴏᴠᴇ
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`;

  return menu;
}

// ============================================
// 📂 CATEGORY MENU
// ============================================

export function getCategoryMenu(category) {

  const key = category
    .toLowerCase()
    .trim();

  const data = CATEGORIES[key];

  if (!data) return null;

  let menu = `
╭━━━〔 👑 sɪʟᴠᴇʀ Mᴅ 〕━━━╮
┃
┃ ${data.title}
┃
┃ ─────────────────────
`;

  for (const command of data.commands) {
    menu += `┃ ${getEmoji(data.title)} .${command}\n`;
  }

  menu += `
┃
╰━━━━━━━━━━━━━━━━━━━━╯
`;

  return menu;
}

// ============================================
// 🔎 FIND COMMAND
// ============================================

export function findCommand(command) {

  const name = command
    .toLowerCase()
    .trim();

  for (const [category, data] of Object.entries(CATEGORIES)) {

    if (data.commands.includes(name)) {
      return {
        category,
        command: name
      };
    }
  }

  return null;
}

// ============================================
// 🎨 CATEGORY EMOJI
// ============================================

function getEmoji(title) {

  if (title.includes("Gᴇɴᴇʀᴀʟ")) return "⚡";
  if (title.includes("Oᴡɴᴇʀ")) return "👑";
  if (title.includes("Gʀᴏᴜᴘ")) return "🛡️";
  if (title.includes("Sᴇᴄᴜʀɪᴛʏ")) return "🔒";
  if (title.includes("Lᴏᴄᴋ")) return "🔐";
  if (title.includes("Wᴇʟᴄᴏᴍᴇ")) return "👋";
  if (title.includes("Aɪ")) return "🤖";
  if (title.includes("Mᴜsɪᴄ")) return "🎵";
  if (title.includes("Dᴏᴡɴʟᴏᴀᴅ")) return "🎬";
  if (title.includes("Sᴛɪᴄᴋᴇʀ")) return "🖼️";
  if (title.includes("Gᴀᴍᴇ")) return "🎮";
  if (title.includes("Fᴜɴ")) return "😂";
  if (title.includes("Eᴄᴏɴᴏᴍʏ")) return "💰";
  if (title.includes("Lᴇᴠᴇʟ")) return "🏆";
  if (title.includes("U sᴇʀ")) return "👤";
  if (title.includes("Sᴇᴀʀᴄʜ")) return "🔎";
  if (title.includes("Tᴏᴏʟs")) return "🧰";
  if (title.includes("WʜᴀᴛsAᴘᴘ")) return "📱";
  if (title.includes("Aɴɪᴍᴇ")) return "🌸";
  if (title.includes("Sᴇᴛᴛɪɴɢs")) return "⚙️";
  if (title.includes("Pʀᴇᴍɪᴜᴍ")) return "💎";
  if (title.includes("Sᴛᴀᴛs")) return "📊";
  if (title.includes("Aᴜᴛᴏᴍᴀᴛɪᴏɴ")) return "🤖";
  if (title.includes("Mᴇᴅɪᴀ")) return "🎞️";
  if (title.includes("E xᴛʀᴀ")) return "✨";

  return "◈";
}

// ============================================
// 📊 COMMAND COUNT
// ============================================

export function getCommandCount() {

  let total = 0;

  for (const data of Object.values(CATEGORIES)) {
    total += data.commands.length;
  }

  return total;
}

// ============================================
// 📦 EXPORT
// ============================================

export { CATEGORIES };
