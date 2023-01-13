const path = require("path")
module.exports = function(app, games) {
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
}