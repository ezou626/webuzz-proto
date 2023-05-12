/*
Serves client home page files
*/
const path = require("path")

var express = require('express'), 
    router = express.Router()

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/index.html'));
});

router.get("/icon.png", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/icon.png'));
});

router.get("/index.js", (req, res, next) => {
    res.sendFile(path.join(__dirname,'../../client/index.js'));
});

module.exports = router