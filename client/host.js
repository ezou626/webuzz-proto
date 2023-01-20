function makeGame(){
  if(document.getElementById("id").value.includes("<") || 
  document.getElementById("id").value.includes(">")){
    document.getElementById("id").value = "";
    document.getElementById("error").innerHTML = 
    "Your name must not contain '<' or '>'.";
  }
  fetch("/makegame", {
      method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({id: document.getElementById("id").value})
    }).then((results) => {
      return results.json();
  })
  .then((data) => {
      if(data.created){
          sessionStorage.setItem("id", data.id);
          document.getElementById("create").hidden = "hidden";
      }
      else{
          document.getElementById("id").value = "";
          document.getElementById("makeError").innerHTML = "This name is already taken.";
      }
  })
}

function setup() {
  fetch("/setup", {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'manual',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({id: document.getElementById("id").value})
    }).then((results) => {
      return results.json();
  })
  .then((data) => {
    if(data.done){
        document.getElementById("game").removeAttribute("hidden");
        document.getElementById("room").innerHTML = "Room " + sessionStorage.getItem("id");
    }
    else{
        document.getElementById("id").value = "";
        document.getElementById("makeError").innerHTML = "There was an error in creating the room.";
    }
  })
}

window.onbeforeunload = window.onunload = 
(fetch("/delgame", {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({id: sessionStorage.getItem("id")})
  }))