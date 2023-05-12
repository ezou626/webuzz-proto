/*
Serves player client html and js files
*/
const path = require("path")

var express = require('express'), 
    router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/player.html'));
});

router.get("/player.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/player.js'));
});

module.exports = router