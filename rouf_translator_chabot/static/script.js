/* ── Constants ─────────────────────────────────────────────────────── */
const LANGUAGES = [
  "Arabic","Afrikaans","Albanian","Amharic","Bengali","Bosnian",
  "Bulgarian","Catalan","Chinese (Simplified)","Chinese (Traditional)",
  "Croatian","Czech","Danish","Dutch","English","Estonian",
  "Finnish","French","German","Greek","Gujarati","Hebrew",
  "Hindi","Hungarian","Indonesian","Italian","Japanese","Kannada",
  "Korean","Latvian","Lithuanian","Macedonian","Malay","Malayalam",
  "Maltese","Marathi","Norwegian","Persian","Polish","Portuguese",
  "Punjabi","Romanian","Russian","Serbian","Sinhala","Slovak",
  "Slovenian","Somali","Spanish","Swahili","Swedish","Tagalog",
  "Tamil","Telugu","Thai","Turkish","Ukrainian","Urdu",
  "Uzbek","Vietnamese","Welsh","Zulu"
];

const SUGGESTIONS = [
  "Hello, how are you?",
  "Where is the nearest hospital?",
  "I love learning new languages!",
  "What time is it?",
  "Thank you very much!",
];

/* ── State ─────────────────────────────────────────────────────────── */
let selectedLanguage = "Arabic";
let isLoading        = false;

/* ── DOM refs ──────────────────────────────────────────────────────── */
const messagesEl  = document.getElementById("messages");
const userInput   = document.getElementById("userInput");
const sendBtn     = document.getElementById("sendBtn");
const langList    = document.getElementById("langList");
const langSearch  = document.getElementById("langSearch");
const langDropdown= document.getElementById("langDropdown");
const selectedLangEl = document.getElementById("selectedLang");
const suggestionsEl  = document.getElementById("suggestions");

/* ── Init ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  buildLangList(LANGUAGES);
  buildSuggestions();
  addWelcomeMessage();
  userInput.addEventListener("input", () => {
    sendBtn.disabled = !userInput.value.trim() || isLoading;
  });
});

/* ── Welcome message ───────────────────────────────────────────────── */
function addWelcomeMessage() {
  appendBotMessage(
    "مرحباً! I'm <strong>Rouf_Translator</strong> 🌍<br>Type any text and choose a language — I'll translate it instantly for you."
  );
}

/* ── Language dropdown ─────────────────────────────────────────────── */
function buildLangList(langs) {
  langList.innerHTML = "";
  langs.forEach(lang => {
    const div = document.createElement("div");
    div.className = `lang-item${lang === selectedLanguage ? " active" : ""}`;
    div.textContent = lang;
    div.onclick = () => selectLanguage(lang);
    langList.appendChild(div);
  });
}

function filterLangs(query) {
  const filtered = LANGUAGES.filter(l => l.toLowerCase().includes(query.toLowerCase()));
  buildLangList(filtered);
}

function toggleLangMenu() {
  langDropdown.classList.toggle("open");
  if (langDropdown.classList.contains("open")) {
    langSearch.value = "";
    buildLangList(LANGUAGES);
    langSearch.focus();
  }
}

function closeLangMenu() {
  langDropdown.classList.remove("open");
}

function selectLanguage(lang) {
  selectedLanguage = lang;
  selectedLangEl.textContent = lang;
  userInput.placeholder = `Type to translate into ${lang}...`;
  buildLangList(LANGUAGES);   // refresh active state
  closeLangMenu();
}

/* ── Suggestion chips ──────────────────────────────────────────────── */
function buildSuggestions() {
  SUGGESTIONS.forEach(text => {
    const btn = document.createElement("button");
    btn.className = "suggestion-chip";
    btn.textContent = text;
    btn.onclick = () => sendMessage(text);
    suggestionsEl.appendChild(btn);
  });
}

/* ── Send message ──────────────────────────────────────────────────── */
async function sendMessage(overrideText = null) {
  const text = (overrideText || userInput.value).trim();
  if (!text || isLoading) return;

  userInput.value = "";
  autoResize(userInput);
  sendBtn.disabled = true;
  isLoading = true;

  appendUserMessage(text, selectedLanguage);
  showTypingIndicator();

  try {
    const res = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target_language: selectedLanguage }),
    });

    removeTypingIndicator();

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "Unknown error" }));
      appendBotMessage(`⚠️ Error: ${err.detail || res.statusText}`, selectedLanguage);
    } else {
      const data = await res.json();
      appendBotMessage(escapeHtml(data.translated_text), selectedLanguage);
    }
  } catch (e) {
    removeTypingIndicator();
    appendBotMessage("⚠️ Network error. Please check your connection.", selectedLanguage);
  }

  isLoading = false;
  sendBtn.disabled = !userInput.value.trim();
  userInput.focus();
}

/* ── Message builders ──────────────────────────────────────────────── */
function appendUserMessage(text, lang) {
  const row = document.createElement("div");
  row.className = "msg-row user";
  row.innerHTML = `
    <div class="avatar user">👤</div>
    <div class="bubble-wrap">
      <span class="lang-badge user-badge">→ ${escapeHtml(lang)}</span>
      <div class="bubble user">${escapeHtml(text)}</div>
      <div class="bubble-meta">${now()}</div>
    </div>`;
  messagesEl.appendChild(row);
  scrollToBottom();
}

function appendBotMessage(html, lang = null) {
  const row = document.createElement("div");
  row.className = "msg-row";
  row.innerHTML = `
    <div class="avatar bot">🌐</div>
    <div class="bubble-wrap">
      ${lang ? `<span class="lang-badge">→ ${escapeHtml(lang)}</span>` : ""}
      <div class="bubble bot">${html}</div>
      <div class="bubble-meta">${now()}</div>
    </div>`;
  messagesEl.appendChild(row);
  scrollToBottom();
}

/* ── Typing indicator ──────────────────────────────────────────────── */
function showTypingIndicator() {
  const row = document.createElement("div");
  row.className = "msg-row";
  row.id = "typingRow";
  row.innerHTML = `
    <div class="avatar bot">🌐</div>
    <div class="typing-dots"><span></span><span></span><span></span></div>`;
  messagesEl.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById("typingRow");
  if (el) el.remove();
}

/* ── Helpers ───────────────────────────────────────────────────────── */
function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 100) + "px";
  sendBtn.disabled = !el.value.trim() || isLoading;
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ── Close dropdown on outside click ──────────────────────────────── */
document.addEventListener("click", (e) => {
  const selector = document.getElementById("langSelector");
  if (selector && !selector.contains(e.target)) closeLangMenu();
});