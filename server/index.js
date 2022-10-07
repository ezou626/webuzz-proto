const express = require("express")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 3000

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

app.get("/host", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../client/host.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});