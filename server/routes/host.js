/*
Serves host client html and js files
*/
const path = require("path")

var express = require('express'), 
    router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/host.html'));
});

router.get("/host.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/host.js'));
});

module.exports = router