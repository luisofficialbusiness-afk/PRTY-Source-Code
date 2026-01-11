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

/* ====== GAME LAUNCHER ====== */
function launchGame(url){
  // Open a new blank window
  const win = window.open("about:blank");

  // Inject iframe with your game
  win.document.write(`
    <html>
    <head>
      <title>PRTY Game</title>
      <style>
        body{margin:0;background:black;}
        iframe{border:none;width:100vw;height:100vh;}
      </style>
    </head>
    <body>
      <iframe src="${url}"></iframe>
    </body>
    </html>
  `);
}
