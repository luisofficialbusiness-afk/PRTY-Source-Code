
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  sidebar.classList.toggle("closed");
}


function updateClock() {
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");
  if (!timeEl || !dateEl) return;

  const now = new Date();
  timeEl.innerText = now.toLocaleTimeString();
  dateEl.innerText = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();


function launchGame(url) {
  const win = window.open(url, "_blank");
  if (!win) window.location.href = url;
}

function launchPRTY(url) {
  const mode = localStorage.getItem("launchMode") || "_blank";
  window.open(url, mode);
}


(function () {
  if (
    !window.location.pathname.endsWith("index.html") &&
    !window.location.pathname.endsWith("/")
  ) return;

  const activityText = document.getElementById("prty-activity-text");
  if (!activityText) return;

  const PRTY_STATS = {
    games: 108,
    movies: 13,
    manga: 8
  };

  const hour = new Date().getHours();

  const messages = [
    "🟢 PRTY is online",
    "🎉 welcome to PRTY",
    `🎮 ${PRTY_STATS.games} games available`,
    `🎬 ${PRTY_STATS.movies} movies ready`,
    `📚 ${PRTY_STATS.manga} manga & books`,
    ...(hour >= 6 && hour < 12
      ? ["☀️ good morning from PRTY"]
      : []),
    ...(hour >= 21 || hour < 5
      ? ["🌙 late night PRTY session"]
      : [])
  ];

  function updateActivity() {
    activityText.style.opacity = "0";
    setTimeout(() => {
      activityText.innerText =
        messages[Math.floor(Math.random() * messages.length)];
      activityText.style.opacity = "1";
    }, 200);
  }

  updateActivity();
  setInterval(updateActivity, 12000);
})();


(function () {
  const movieLoader = document.getElementById("movie-loading");
  const movieText = document.getElementById("movie-loading-text");
  if (!movieLoader || !movieText) return;

  const phrases = [
    "Lights off. Movie on.",
    "AfterPRTY Cinema booting",
    "Loading questionable content…",
    "Background noise loading",
    "This seemed like a good idea"
  ];

  movieText.innerText =
    phrases[Math.floor(Math.random() * phrases.length)];

  window.addEventListener("load", () => {
    setTimeout(() => {
      movieLoader.style.display = "none";
    }, 900);
  });
})();


window.addEventListener("load", () => {
  const theme = localStorage.getItem("prty-theme");
  const title = localStorage.getItem("cloakTitle");
  const icon = localStorage.getItem("cloakIcon");

  if (theme) document.body.className = theme;
  if (title) document.title = title;

  if (icon) {
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = icon;
  }
});


let panicTimer;
let panicSeconds = 3;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    startPanic();
  }
});

function startPanic() {
  const overlay = document.getElementById("panic-overlay");
  if (!overlay) {
    window.location.replace("https://www.classlink.com");
    return;
  }

  panicSeconds = 3;
  overlay.style.display = "flex";
  updateCountdown();

  panicTimer = setInterval(() => {
    panicSeconds--;
    updateCountdown();
    if (panicSeconds <= 0) {
      clearInterval(panicTimer);
      redirectPanic();
    }
  }, 1000);
}

function updateCountdown() {
  const text = document.getElementById("panic-countdown");
  if (text) text.innerText = `Redirecting in ${panicSeconds}...`;
}

function cancelPanic() {
  clearInterval(panicTimer);
  const overlay = document.getElementById("panic-overlay");
  if (overlay) overlay.style.display = "none";
}

function redirectPanic() {
  const url =
    localStorage.getItem("panicURL") ||
    "https://www.classlink.com";
  window.location.replace(url);
}


function launchProxy() {
  const win = window.open("about:blank");
  if (win) win.location.href = "https://prty-learning.b-cdn.net/";
}


const PREMIUM_KEYS = [
  "PRTY-BOOST-001",
  "PRTY-LIFE-777",
  "PRTY-BETA-PRTY"
];

function activatePremium() {
  const input = document.getElementById("premium-code");
  const status = document.getElementById("premium-status");
  if (!input || !status) return;

  if (PREMIUM_KEYS.includes(input.value.trim())) {
    localStorage.setItem("prty-premium", "true");
    status.style.color = "#00ffcc";
    status.innerText = "✅ PRTY Premium Activated!";
  } else {
    status.style.color = "#ff5555";
    status.innerText = "❌ Invalid Premium Code";
  }
}

function isPremiumUser() {
  return localStorage.getItem("prty-premium") === "true";
}
