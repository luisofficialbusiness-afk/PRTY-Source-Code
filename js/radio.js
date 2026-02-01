// Stations
const stations = [
  // Main
  "https://soundcloud.com/luis-cruz-499857984/sets/prty-radio",

  // Late Night
  "https://soundcloud.com/stormmusicgroup/sets/late-night-playlist",

  // Energy
  "https://soundcloud.com/stormmusicgroup/sets/hype-gaming-music",

  // Chill
  "https://soundcloud.com/real-basil-omori-read-desc/sets/tuff-chill-playlist-for"
];

const frame = document.getElementById("radio-frame");

let voiceReady = false;
let lastSpoken = "";
let sessionStart = Date.now();
let prtySaysEnabled = false;
let lastPRTYSayTime = 0;

// Load station
function loadStation(index) {
  const url = encodeURIComponent(stations[index]);
  frame.src =
    `https://w.soundcloud.com/player/?url=${url}` +
    `&auto_play=true&hide_related=true&show_comments=false` +
    `&show_user=false&show_reposts=false&visual=true`;
}

// Initialize voices (English ONLY)
function initVoices() {
  const voices = speechSynthesis.getVoices();

  // Only allow English voices
  voiceReady = voices.some(v => v.lang.startsWith("en"));
}

// Core voice function (NO foreign voices)
function speakPRTY(message) {
  if (!("speechSynthesis" in window)) return;
  if (!voiceReady) return;
  if (message === lastSpoken) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);

  // Calmer, more human
  utterance.rate = 0.95;
  utterance.pitch = 0.9;
  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();

  // HARD FILTER — English only
  const preferred =
    voices.find(v => v.lang === "en-US" && v.name.toLowerCase().includes("google")) ||
    voices.find(v => v.lang === "en-US") ||
    voices.find(v => v.lang.startsWith("en"));

  if (!preferred) return; // Do NOT speak if no English voice

  utterance.voice = preferred;

  lastSpoken = message;
  speechSynthesis.speak(utterance);
}

// PRTY Says logic
function prtySays() {
  if (!prtySaysEnabled) return;

  const now = Date.now();

  // Cooldown: 3–6 minutes
  if (now - lastPRTYSayTime < 180000 + Math.random() * 180000) return;
  lastPRTYSayTime = now;

  const hour = new Date().getHours();
  const minutesOnSite = Math.floor((now - sessionStart) / 60000);

  let lines = [];

  // Time-based lines
  if (hour >= 22 || hour < 5) {
    lines.push(
      "Late night PRTY Radio hits different.",
      "After hours vibes detected.",
      "You’re deep into the night session."
    );
  } else if (hour < 12) {
    lines.push(
      "Good morning. PRTY Radio is live.",
      "Starting the day with good music.",
      "Morning energy online."
    );
  } else {
    lines.push(
      "You’re locked into PRTY Radio.",
      "Good choice staying here.",
      "PRTY Radio certified moment."
    );
  }

  // Session-based lines
  if (minutesOnSite >= 15) {
    lines.push(
      "You’ve been here a while. Respect.",
      "PRTY Radio appreciates you.",
      "At this point, you’re part of the station."
    );
  }

  const line = lines[Math.floor(Math.random() * lines.length)];
  speakPRTY(line);
}

// User interaction handler (unlocks voice)
function selectStation(index, name) {
  initVoices();
  prtySaysEnabled = true;

  loadStation(index);
  speakPRTY(`Thank you for tuning in to PRTY Radio ${name}`);

  // Delayed PRTY Says
  setTimeout(prtySays, 20000 + Math.random() * 20000);
}

// Random station on load (NO voice)
window.addEventListener("load", () => {
  const random = Math.floor(Math.random() * stations.length);
  loadStation(random);
});

// Proxy open
function openRadioProxy() {
  const radioURL = "https://prty-site.vercel.app/radio.html";
  const encoded = encodeURIComponent(radioURL);

  window.open(
    `https://prty-learning.b-cdn.net/service/${encoded}`,
    "_blank"
  );
}

// Voice readiness event
speechSynthesis.onvoiceschanged = initVoices;
