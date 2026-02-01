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

// Load station
function loadStation(index) {
  const url = encodeURIComponent(stations[index]);
  frame.src =
    `https://w.soundcloud.com/player/?url=${url}` +
    `&auto_play=true&hide_related=true&show_comments=false` +
    `&show_user=false&show_reposts=false&visual=true`;
}

// Initialize voices safely
function initVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    voiceReady = true;
  }
}

// Voice handler
function speakPRTY(message) {
  if (!("speechSynthesis" in window)) return;
  if (!voiceReady) return;
  if (message === lastSpoken) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();
  const preferred =
    voices.find(v => v.name.toLowerCase().includes("google")) ||
    voices.find(v => v.lang === "en-US");

  if (preferred) utterance.voice = preferred;

  lastSpoken = message;
  speechSynthesis.speak(utterance);
}

// Button handler (USER INTERACTION — REQUIRED)
function selectStation(index, name) {
  initVoices(); // unlock voices
  loadStation(index);
  speakPRTY(`Thank you for tuning in to PRTY Radio ${name}`);
}

// Random station on load (NO VOICE HERE — browser rules)
window.addEventListener("load", () => {
  const random = Math.floor(Math.random() * stations.length);
  loadStation(random);
});

// Optional proxy open (unchanged logic, fixed string bug)
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
