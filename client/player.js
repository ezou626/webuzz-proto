var listener = null
function joinGame(){
    if(document.getElementById("id").value.includes("<") || 
    document.getElementById("id").value.includes(">") || 
    document.getElementById("name").value.includes("<") || 
    document.getElementById("name").value.includes(">")){
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("error").innerHTML = 
        "Your name must not contain '<' or '>'.";
    };
    results = fetch("/joingame", {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'manual', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({id: document.getElementById("id").value, 
        name: document.getElementById("name").value})
      }).then((results) => {
        return results.json();
    })
    .then((data) => {
        if(data.joined){
            document.getElementById("title").innerHTML = "Room " + data.id;
            document.getElementById("player").innerHTML = "Player " + data.name;
            sessionStorage.setItem("id", data.id);
            sessionStorage.setItem("name", data.name);
            document.getElementById("setup").hidden = "hidden";
            listener = getListener();
        }
        else{
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("error").innerHTML = data.error;
        }
    });
  }

function getListener(){
  var source = new EventSource("/getscore");
  source.onmessage = function(event) {
    document.getElementById("score").innerHTML = event.data;
  };
  return source;
}

window.onbeforeunload = window.onunload = 
(fetch("/leavegame", {
    method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({id: sessionStorage.getItem("id"), name: sessionStorage.getItem("name")})
  }))