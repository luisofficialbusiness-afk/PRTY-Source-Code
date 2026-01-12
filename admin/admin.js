// --- USERS ---
const users = [
  { username: "rveprty.", role: "owner" },
  { username: "admin", role: "admin" }
];

// --- STORAGE ---
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
let pendingDeletes = JSON.parse(localStorage.getItem("pendingDeletes")) || [];

// --- LOGIN ---
if(document.getElementById("loginForm")){
  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let passOK = true;
    if(username==="rveprty.") passOK = password === prompt("Enter Owner password for session");

    const user = users.find(u=>u.username===username);
    if(user && passOK){
      localStorage.setItem("currentUser", username);
      localStorage.setItem("currentRole", user.role);
      window.location.href="dashboard.html";
    } else error.textContent="Wrong username or password";
  });
}

// --- DASHBOARD ---
if(document.getElementById("ticketGrid")){
  const currentUser = localStorage.getItem("currentUser");
  const currentRole = localStorage.getItem("currentRole");
  if(!currentUser){ window.location.href="login.html"; }

  const greeting = document.getElementById("greeting");
  const clock = document.getElementById("clock");
  const ticketGrid = document.getElementById("ticketGrid");
  const pendingDiv = document.getElementById("pendingDeletions");
  const addBtn = document.getElementById("addTicketBtn");
  const popup = document.getElementById("ticketPopup");
  const closePopup = document.getElementById("closePopup");
  const ticketForm = document.getElementById("ticketForm");

  const catBtn = document.getElementById("catastrophicBtn");
  const catastrophicOverlay = document.getElementById("catastrophicOverlay");
  const catastrophicStats = document.getElementById("catastrophicStats");
  const closeCat = document.getElementById("closeCatastrophic");

  function updateClock(){
    const now = new Date();
    clock.textContent = `Today is ${now.toDateString()} ${now.toLocaleTimeString()}`;
  }
  setInterval(updateClock,1000);
  updateClock();

  function updateGreeting(){
    greeting.textContent = `Welcome ${currentUser}. Today you have ${tickets.filter(t=>t.status!=="Done").length} tasks to do`;
  }

  function saveTickets(){ localStorage.setItem("tickets",JSON.stringify(tickets)); localStorage.setItem("pendingDeletes",JSON.stringify(pendingDeletes)); }

  function renderTickets(){
    ticketGrid.innerHTML="";
    tickets.forEach((t,i)=>{
      const card = document.createElement("div"); card.classList.add("ticket-card");
      card.innerHTML=`
        <h3>[${t.type}] ${t.title}</h3>
        <p>${t.description}</p>
        <p class="status">Status: ${t.status}</p>
        <button class="done">✔ Done</button>
        <button class="escalate">⚠ Escalate</button>
        <button class="delete">🗑 Delete</button>
      `;
      ticketGrid.appendChild(card);
      card.querySelector(".done").onclick=()=>{ t.status="Done"; saveTickets(); renderTickets(); updateGreeting(); };
      card.querySelector(".escalate").onclick=()=>{ t.status="Escalated"; saveTickets(); renderTickets(); };
      card.querySelector(".delete").onclick=()=>{
        if(currentRole==="owner"){ tickets.splice(i,1); saveTickets(); renderTickets(); updateGreeting(); }
        else{ pendingDeletes.push(t); tickets.splice(i,1); saveTickets(); renderTickets(); updateGreeting(); }
      };
    });

    if(currentRole==="owner"){
      pendingDiv.innerHTML="<h2>🔥 Pending Deletions</h2>";
      pendingDeletes.forEach((t,i)=>{
        const card=document.createElement("div"); card.classList.add("ticket-card");
        card.innerHTML=`
          <h3>[${t.type}] ${t.title}</h3>
          <p>${t.description}</p>
          <p class="status">Status: ${t.status}</p>
          <button class="restore">Restore</button>
          <button class="permDelete">Permanently Delete</button>
        `;
        pendingDiv.appendChild(card);
        card.querySelector(".restore").onclick=()=>{ tickets.push(t); pendingDeletes.splice(i,1); saveTickets(); renderTickets(); updateGreeting(); };
        card.querySelector(".permDelete").onclick=()=>{ pendingDeletes.splice(i,1); saveTickets(); renderTickets(); updateGreeting(); };
      });
    } else { pendingDiv.innerHTML=""; }
  }

  addBtn.onclick=()=>{ popup.style.display="flex"; }
  closePopup.onclick=()=>{ popup.style.display="none"; }
  ticketForm.addEventListener("submit", e=>{
    e.preventDefault();
    const type=document.getElementById("ticketType").value;
    const severity=document.getElementById("ticketSeverity").value;
    const title=document.getElementById("ticketTitle").value;
    const desc=document.getElementById("ticketDesc").value;
    tickets.push({type,severity,title,description:desc,status:"Open"});
    saveTickets(); renderTickets(); updateGreeting(); popup.style.display="none"; ticketForm.reset();
  });

  // --- Catastrophic Mode ---
  catBtn.style.display = currentRole==="owner" ? "inline-block":"none";
  catBtn.onclick=()=>{
    catastrophicOverlay.style.display="flex";
    renderCatastrophic();
  };
  closeCat.onclick=()=>{ catastrophicOverlay.style.display="none"; };

  function renderCatastrophic(){
    const stats={Low:0, Medium:0, High:0, Critical:0};
    tickets.filter(t=>t.status!=="Done").forEach(t=>{ stats[t.severity]++; });
    catastrophicStats.innerHTML="";
    for(let s in stats){
      const li = document.createElement("li");
      li.textContent=`${s}: ${stats[s]} open`;
      catastrophicStats.appendChild(li);
    }
  }

  updateGreeting();
  renderTickets();
}
