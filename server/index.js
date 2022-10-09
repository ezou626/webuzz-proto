const express = require("express")
const path = require("path")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.post("/player", (req, res, next) => {
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
        res.send({created: true, id: req.body.id})
    }
    else{
        res.send({created: false, id: req.body.id})
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});