const stations = [
  {
    name: "Main",
    url: "https://soundcloud.com/luis-cruz-499857984/sets/prty-radio",
    body: "station-main",
    desc: "The core of PRTY Radio.",
    voice: "You’re listening to PRTY Radio."
  },
  {
    name: "Late Night",
    url: "https://soundcloud.com/stormmusicgroup/sets/late-night-playlist",
    body: "station-late",
    desc: "2AM thoughts. Headphones recommended.",
    voice: "Welcome to PRTY Late Night."
  },
  {
    name: "Energy",
    url: "https://soundcloud.com/stormmusicgroup/sets/hype-gaming-music",
    body: "station-energy",
    desc: "Fast, loud, zero excuses.",
    voice: "This is PRTY Energy."
  },
  {
    name: "Chill",
    url: "https://soundcloud.com/real-basil-omori-read-desc/sets/tuff-chill-playlist-for",
    body: "station-chill",
    desc: "Soft vibes only.",
    voice: "You’re tuned into PRTY Chill."
  }
];

const frame = document.getElementById("radio-frame");
const stationName = document.getElementById("station-name");
const stationDesc = document.getElementById("station-desc");

function loadStation(i) {
  const s = stations[i];
  document.body.className = s.body;
  stationName.textContent = `🎧 PRTY Radio — ${s.name}`;
  stationDesc.textContent = s.desc;

  const encoded = encodeURIComponent(s.url);
  frame.src = `https://w.soundcloud.com/player/?url=${encoded}&auto_play=true&visual=true`;
}

function selectStation(i) {
  loadStation(i);
  speakPRTY(stations[i].voice);
}

/* VOICE (after interaction only) */
function speakPRTY(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

/* TIME */
function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  const label = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Night";
  document.getElementById("time-info").textContent =
    `${label} · ${now.toLocaleTimeString()}`;
}
setInterval(updateTime, 60000);
updateTime();

/* PRTY SAYS */
const sayings = [
  "PRTY Radio keeping you company.",
  "Still here? Respect.",
  "Late nights hit different.",
  "Vibes > everything."
];
setInterval(() => {
  document.getElementById("prty-says").textContent =
    sayings[Math.floor(Math.random() * sayings.length)];
}, 180000);

/* LISTENER COUNT (safe) */
async function updateListeners() {
  try {
    const res = await fetch("/radio/status");
    const data = await res.json();
    document.getElementById("listener-count").textContent =
      `👥 ${data.listeners} listening`;
  } catch {
    document.getElementById("listener-count").textContent =
      "👥 Live listeners";
  }
}
setInterval(updateListeners, 15000);
updateListeners();

/* AUTO STATION */
window.addEventListener("load", () => {
  const h = new Date().getHours();
  if (h >= 23 || h < 6) loadStation(1);
  else if (h < 12) loadStation(2);
  else loadStation(0);
});
