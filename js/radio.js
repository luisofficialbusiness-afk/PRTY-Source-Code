// Stations
const stations = [
  //  Main
  "https://soundcloud.com/luis-cruz-499857984/sets/prty-radio",

  //  Late Night
  "https://soundcloud.com/YOUR_PLAYLIST_LINK",

  //  Energy
  "https://soundcloud.com/YOUR_PLAYLIST_LINK",

  //  Chill
  "https://soundcloud.com/real-basil-omori-read-desc/sets/tuff-chill-playlist-for?si=3db79f9de20743fa88a3b615bfe9504b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
];

const frame = document.getElementById("radio-frame");

// Load station
function loadStation(index) {
  const url = encodeURIComponent(stations[index]);
  frame.src = `https://w.soundcloud.com/player/?url=${url}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=true`;
}

// Load random station on page load
window.addEventListener("load", () => {
  const random = Math.floor(Math.random() * stations.length);
  loadStation(random);
});

function openRadioProxy() {
  const radioURL = "https://prty-site.vercel.app/radio.html" ;
  const encoded =
    encodeURIComponent(radioURL)
  window.open(

    'https://prty-learning.b-cdn.net/service/${encoded}' ,
    "_blank"
    );
}

function speakPRTY(message) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(message);

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.toLowerCase().includes("google")
  );
  if (preferred) utterance.voice = preferred;

  speechSynthesis.cancel(); // stop any previous speech
  speechSynthesis.speak(utterance);
}

function playStation(name) {
  speakPRTY(`Thank you for tuning in to PRTY Radio ${name}`);
}
