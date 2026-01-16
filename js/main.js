/* ====== SIDEBAR TOGGLE ====== */
function toggleSidebar(){
  const sb = document.getElementById("sidebar");
  if(sb.style.left === "-250px"){
    sb.style.left = "0";
  } else {
    sb.style.left = "-250px";
  }
}

/* ====== LIVE CLOCK & DATE ====== */
function updateClock(){
  const now = new Date();
  if(document.getElementById("time")){
    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
  }
}
setInterval(updateClock,1000);
updateClock();

/* ====== FIXED GAME LAUNCHER ★ ====== */
function launchGame(url){
  const win = window.open(url, "_blank"); // open in new tab
  if(!win){
    // fallback if popup blocked
    window.location.href = url;
  }
}

// Use chosen default launch mode
function launchPRTY(url) {
    const mode = localStorage.getItem("launchMode") || "about:blank";
    window.open(url, mode);
}

// ⭐ PRTY Activity Bar Logic
const prtyActivityMessages = [
  "Someone is definitely playing games rn 🎮",
  "Movies page getting love 🍿",
  "PRTY is alive and kicking",
  "Bug Hunters probably cooking 🐛",
  "GG chat",
  "AfterPRTY energy detected ✨",
  "If you're here, you're already bored",
  "This site exists. Somehow.",
  "Mr Beast still hasn't sent money"
];

function updatePrtyActivity() {
  const textEl = document.getElementById("prty-activity-text");
  if (!textEl) return;

  const random =
    prtyActivityMessages[
      Math.floor(Math.random() * prtyActivityMessages.length)
    ];

  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent = random;
    textEl.style.opacity = 0.9;
  }, 300);
}

// Initial load
updatePrtyActivity();

// Auto update every 15 seconds
setInterval(updatePrtyActivity, 15000);

// Panic Mode Shortcut: CTRL + L
document.addEventListener('keydown', function(e) {
  // Check if CTRL + L is pressed
  if (e.ctrlKey && e.key.toLowerCase() === 'l') {
    window.location.href = 'https://www.classlink.com';
  }
});
