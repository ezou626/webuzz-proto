/*
js for the host page
*/

function checkValidId (id) {
  return id.includes("<")
    || id.includes(">");
}

function makeGame(){
  var idElement = document.getElementById("id");
  if (checkValidId(idElement.value)){
    idElement.value = "";
    document.getElementById("error").innerHTML = 
    "Your name must not contain '<' or '>'.";
  }
  fetch("/makegame", {
      method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({id: document.getElementById("game_id").value})
    }
  )
  .then((results) => {
    return results.json();
  })
  .then((data) => {
    if (data.created) {
        sessionStorage.setItem("id", data.id);
        document.getElementById("create").hidden = "hidden";
        document.getElementById("game").removeAttribute("hidden");
        document.getElementById("room").innerHTML = "Room " + sessionStorage.getItem("game_id");
    }
    else {
        document.getElementById("id").value = "";
        document.getElementById("makeError").innerHTML = "This name is already taken.";
        
    }
  })
}

window.onbeforeunload = window.onunload = 
(fetch("/delgame", {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'manual', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({id: sessionStorage.getItem("id")})
  }))