const express = require("express")
const path = require("path")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

//Credit to nodyou on StackOverflow
//This gets a public ip
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
const ips = {};
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!ips[name]) {
                ips[name] = [];
            }
            ips[name].push(net.address);
        }
    }
}
//end credits

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//big mistake in not making separate files for endpoints big rip L bozo
//will fix in better versions later
games = {}

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/index.html'));
});

app.get("/icon.png", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/icon.png'));
});

app.get("/index.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/index.js'));
});

app.get("/player", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/player.html'));
});

app.get("/player.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/player.js'));
});

app.get("/host", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/host.html'));
});

app.get("/host.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/host.js'));
});

app.post("/makegame", (req, res, next) => {
    if(!(req.body.id in games)){
        games[req.body.id] = {}
        games[req.body.id].ready = false
        res.send({created: true, id: req.body.id})
    }
    else{
        res.send({created: false, id: req.body.id})
    }
});

//make teams and update variables
app.post("/setup", (req, res, next) => {
    if((req.body.id in games)){
        teamNum = Object.keys(req.body.teams).length
        if(teamNum > 1){
            games[req.body.id][teams] = req.body.teams//object with teams as names
            var i = 1;
            for(team in games[req.body.id][teams]){
                games[req.body.id][teams][team] = {score: 0, id: i};
                i++;
            }
            games[req.body.id].ready = true;
            games[req.body.id].update = false;
            res.send({done: true, teams: req.body.teams, id: req.body.id});
        }
    }
    else{
        res.send({done: false, id: req.body.id})
    }
});

//done
app.post("/delgame", (req, res, next) => {
    if(req.body.id in games){
        delete games[req.body.id];
        res.send({deleted: true, id: req.body.id})
    }
    else{
        res.send({deleted: false, id: req.body.id})
    }
});

//done
app.post("/joingame", (req, res, next) => {
    if(req.body.id in games){
        if(games.id.ready){  
            if(!(Object.values(games[req.body.id]).includes(req.body.name))){
                games[req.body.id][req.body.name] = {team: 0, penalty: false}
                res.send({joined: true, id: req.body.id, name:req.body.name})
            }
            else{
                res.send({joined: false, id: req.body.id, name:req.body.name, 
                    error: "This name was already taken."})
            }
        }
        else{
            res.send({joined: false, id: req.body.id, name:req.body.name, 
                error: "Teams have not been created."})
        }
    }
    else{
        res.send({joined: false, id: req.body.id, name: req.body.name, 
            error: "Game was not found."})
    }
});

//not done
app.post("/buzz", (req, res, next) => {
    if(req.body.id in games){
        if(!(req.body.name in games[req.body.id])){
            res.send({joined: true, id: req.body.id, name:req.body.name})
        }
        else{
            res.send({joined: false, id: req.body.id, name:req.body.name, 
                error: "This name was already taken."})
        }
    }
    else{
        res.send({joined: false, id: req.body.id, name: req.body.name, 
            error: "Game was not found. The host may have ended it."})
    }
});

app.get("/getscore", (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    let sendScore = setInterval(() => {
        for(id in games){
            game = games.id
            if(game.update = true){
                table = "";
                for(team in game.teams){
                    table += `<tr><th>${team.name}</th><th>${team.score}</th></tr>`;
                }
                display = "<table>"+table+"</table>";
                res.write(`data: ${JSON.stringify({sb: display, id: id})}`);
            }
        }
    }, 100);
    res.on('close', () => {
        clearInterval(sendScore);
        res.end();
    });
});

app.post("/leavegame", (req, res, next) => {
    if(req.body.id in games){
        if(games[req.body.id].has(req.body.name)){
            games[req.body.id].delete(req.body.name);
            res.send({left: true, id: req.body.id, name:req.body.name});
        }
        else{
            res.send({left: false, id: req.body.id, name:req.body.name});
        }
    }
    else{
        res.send({left: false, id: req.body.id, name: req.body.name});
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log(`Join at http://${ips["Wi-Fi"][0]}:${PORT}`);
});