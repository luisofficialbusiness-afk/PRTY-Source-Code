
const PREMIUM_KEYS = [
  "PRTY-BOOST-001",
  "PRTY-LIFE-777",
  "PRTY-BETA-PRTY"
];

function activatePremium() {
  const input = document.getElementById("premium-code").value.trim();
  const status = document.getElementById("premium-status");

  if (PREMIUM_KEYS.includes(input)) {
    localStorage.setItem("prty-premium", "true");
    status.style.color = "#00ffcc";
    status.textContent = "✅ PRTY Premium Activated!";
  } else {
    status.style.color = "#ff5555";
    status.textContent = "❌ Invalid Premium Code";
  }
}

// Utility
function isPremiumUser() {
  return localStorage.getItem("prty-premium") === "true";
}
