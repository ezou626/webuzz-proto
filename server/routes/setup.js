const path = require('path')
module.exports = function(app, game) {
    app.post("/setup", (req, res, next) => {
        if((req.body.id in games)){
            games[req.body.id]["team1"] = {score: 0, id: 1, players: {}};
            games[req.body.id]["team2"] = {score: 0, id: 2, players: {}};
            games[req.body.id].ready = true;
            games[req.body.id].update = false;
            games[req.body.id].started = false;
            res.send({done: true, id: req.body.id});
        }
        else{
            res.send({done: false, id: req.body.id})
        }
    });
}



























































































































