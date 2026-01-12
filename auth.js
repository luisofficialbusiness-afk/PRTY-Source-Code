// Users setup
const USERS = [
  { username: "rveprty.", passwordHash: "REPLACE_THIS_HASH", role: "owner" }
];

// ----------------- LOGIN -----------------
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const hash = CryptoJS.SHA256(pass).toString();
  const found = USERS.find(u => u.username === user && u.passwordHash === hash);
  if (!found) {
    document.getElementById("error").innerText = "Invalid login";
    return;
  }
  localStorage.setItem("prtyUser", JSON.stringify(found));
  localStorage.setItem("tickets", JSON.stringify(localStorage.getItem("tickets") || "[]"));
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("prtyUser");
  window.location.href = "login.html";
}

// ----------------- DASHBOARD -----------------
function loadDashboard() {
  const user = JSON.parse(localStorage.getItem("prtyUser"));
  if (!user) { window.location.href = "login.html"; return; }

  document.getElementById("welcome").innerText =
    `Welcome ${user.username}, Today you have ${getTaskCount()} tasks`;

  // Show Catastrophic button only for Owner
  if (user.role !== "owner") document.getElementById("catModeBtn").style.display = "none";

  renderTickets();
}

// ----------------- TICKETS -----------------
function getTaskCount() {
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  return tickets.filter(t => t.status === "Open").length;
}

function renderTickets() {
  const grid = document.getElementById("ticketsGrid");
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  grid.innerHTML = "";

  tickets.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.style.borderLeft = `5px solid ${severityColor(t.severity)}`;
    card.innerHTML = `
      <h4>[${t.type}] ${t.title}</h4>
      <p>${t.description}</p>
      <p>Status: ${t.status}</p>
      <button onclick="markDone(${i})">Done</button>
      <button onclick="escalate(${i})">Escalate</button>
      <button onclick="deleteTicket(${i})">Delete</button>
    `;
    grid.appendChild(card);
  });

  document.getElementById("taskCounter").innerText =
    `${getTaskCount()} tasks`;
}

function severityColor(sev){
  switch(sev){
    case "Low": return "green";
    case "Medium": return "yellow";
    case "High": return "orange";
    case "Critical": return "red";
    default: return "white";
  }
}

function markDone(i){
  const tickets = JSON.parse(localStorage.getItem("tickets"));
  tickets[i].status = "Done";
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets();
}

function escalate(i){
  const tickets = JSON.parse(localStorage.getItem("tickets"));
  tickets[i].status = "Escalated";
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets();
}

function deleteTicket(i){
  const tickets = JSON.parse(localStorage.getItem("tickets"));
  tickets.splice(i,1);
  localStorage.setItem("tickets", JSON.stringify(tickets));
  renderTickets();
}

// ----------------- ADD TICKET -----------------
function openAddTicket(){ document.getElementById("addTicketPopup").style.display="block"; }
function closeAddTicket(){ document.getElementById("addTicketPopup").style.display="none"; }

function submitTicket(){
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  tickets.push({
    type: document.getElementById("ticketType").value,
    severity: document.getElementById("ticketSeverity").value,
    title: document.getElementById("ticketTitle").value,
    description: document.getElementById("ticketDesc").value,
    status: "Open"
  });
  localStorage.setItem("tickets", JSON.stringify(tickets));
  closeAddTicket();
  renderTickets();
}

// ----------------- CATASTROPHIC MODE -----------------
let catMode = false;
function toggleCatastrophicMode(){
  catMode = !catMode;
  document.getElementById("catOverlay").style.display = catMode ? "flex" : "none";
  if(catMode){
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const counts = {Low:0, Medium:0, High:0, Critical:0};
    tickets.forEach(t => counts[t.severity]++);
    document.getElementById("catStats").innerText = 
      `Total Open: ${getTaskCount()}\nLow: ${counts.Low}, Medium: ${counts.Medium}, High: ${counts.High}, Critical: ${counts.Critical}`;
  }
}
