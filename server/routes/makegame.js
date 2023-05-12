/*
This function handles game creation, adding a game object with key game_id in the global games object
*/
module.exports = function(app, games) {
    app.post("/makegame", (request, response, next) => {
        if(!(request.body.id in games)){
            games[request.body.id] = {
                //TODO: Add multi-team functionality
                team1: {score: 0, players: {}},
                team2: {score: 0, players: {}},
                update: false,
                started: false
            };
            response.send({created: true, id: request.body.id});
        }
        else{
            response.send({created: false, id: request.body.id});
        }
    });
}