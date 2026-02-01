// Stations
const stations = [
  "https://soundcloud.com/luis-cruz-499857984/sets/prty-radio", // Main
  "https://soundcloud.com/stormmusicgroup/sets/late-night-playlist", // Late Night
  "https://soundcloud.com/stormmusicgroup/sets/hype-gaming-music", // Energy
  "https://soundcloud.com/real-basil-omori-read-desc/sets/tuff-chill-playlist-for" // Chill
];

// Station metadata (NEW)
const stationMeta = [
  { name: "Main", bg: "#0b0f1a" },
  { name: "Late Night", bg: "#070013" },
  { name: "Energy", bg: "#120000" },
  { name: "Chill", bg: "#001212" }
];

const frame = document.getElementById("radio-frame");
let voiceReady = false;
let lastSpoken = "";
let radioStartTime = Date.now();
let currentStationIndex = 0;


function loadStation(index) {
  if (!frame) return;

  currentStationIndex = index;

  const url = encodeURIComponent(stations[index]);
  frame.src =
    "https://w.soundcloud.com/player/?url=" +
    url +
    "&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true";

  // Background swap (NEW)
  document.body.style.background = stationMeta[index].bg;
}


function initVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length) voiceReady = true;
}

function speakPRTY(message) {
  if (!("speechSynthesis" in window)) return;
  if (!voiceReady) return;
  if (message === lastSpoken) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Force ENGLISH, no French
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(
    v => v.lang === "en-US" && !v.name.toLowerCase().includes("fr")
  );

  if (preferred) utterance.voice = preferred;

  lastSpoken = message;
  speechSynthesis.speak(utterance);
}


function selectStation(index, name) {
  initVoices(); // unlock speech
  loadStation(index);
  speakPRTY("Thank you for tuning in to PRTY Radio " + name);
}

// Random station on page load (NO voice)
window.addEventListener("load", () => {
  const random = Math.floor(Math.random() * stations.length);
  loadStation(random);
});


const prtyLinesDay = [
  "PRTY Radio keeping you company.",
  "Hope your day is going smooth.",
  "Music makes everything better."
];

const prtyLinesNight = [
  "Late night vibes on PRTY Radio.",
  "You’re still up… respect.",
  "Perfect time to just chill."
];

function prtySays() {
  if (!voiceReady) return;

  const minutesListening = Math.floor((Date.now() - radioStartTime) / 60000);
  if (minutesListening < 2) return; // don’t talk too early

  const hour = new Date().getHours();
  const pool =
    hour >= 21 || hour < 6 ? prtyLinesNight : prtyLinesDay;

  const line = pool[Math.floor(Math.random() * pool.length)];
  speakPRTY(line);
}

// Speak every 6–9 minutes (randomized)
setInterval(() => {
  if (Math.random() < 0.6) prtySays();
}, 420000);

function openRadioProxy() {
  const radioURL = "https://prty-site.vercel.app/radio.html";
  const encoded = encodeURIComponent(radioURL);

  window.open(
    "https://prty-learning.b-cdn.net/service/" + encoded,
    "_blank"
  );
}

speechSynthesis.onvoiceschanged = initVoices;
