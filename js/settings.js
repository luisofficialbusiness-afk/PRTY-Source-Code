// SHORTCUTS
function setShortcut(page) {
  localStorage.setItem("prty-shortcut", page);
  alert("Shortcut saved!");
}

function clearShortcut() {
  localStorage.removeItem("prty-shortcut");
  alert("Shortcut cleared!");
}

// CLOAK
function setCloak(title, icon) {
  localStorage.setItem("prty-cloak-title", title);
  localStorage.setItem("prty-cloak-icon", icon);
  alert("Cloak applied!");
}

function resetCloak() {
  localStorage.removeItem("prty-cloak-title");
  localStorage.removeItem("prty-cloak-icon");
  alert("Cloak reset!");
}
