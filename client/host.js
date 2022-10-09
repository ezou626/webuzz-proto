function makeGame(){
    fetch("/makegame", {
        method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'manual', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({id: document.getElementById("id").value})
      }).then((results) => {
        return results.json();
    })
    .then((data) => {
        if(data.created){
            document.getElementById("title").innerHTML = "Room " + data.id;
            localStorage.setItem("id", data.id)
            document.getElementById("setup").innerHTML = "";
        }
        else{
            document.getElementById("id").value = ""
            document.getElementById("makeError").innerHTML = "This name is already taken."
        }
    })
}