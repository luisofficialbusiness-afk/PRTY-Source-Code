// APPLY CLOAK
const cloakTitle = localStorage.getItem("prty-cloak-title");
const cloakIcon = localStorage.getItem("prty-cloak-icon");

if (cloakTitle) document.title = cloakTitle;
if (cloakIcon) {
  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = cloakIcon;
}

// APPLY SHORTCUT (optional auto-open on home)
if (location.pathname.endsWith("index.html")) {
  const shortcut = localStorage.getItem("prty-shortcut");
  if (shortcut) {
    console.log("PRTY Shortcut ready:", shortcut);
  }
}
