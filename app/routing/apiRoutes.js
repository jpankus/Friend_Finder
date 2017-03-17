var friendsData = require("../data/friends.js");

//Routing
module.exports = function(app) {
    // api request for the friends JSON file.
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    //this code is for when the user submits their survey form and submits that data to the server.
    app.post("/api/friends", function(req, res) {
        // newFriend is the user that filled out the survey
        var newFriend = req.body;

        // compute best match from scores
        var bestMatch = {};

        for (var i = 0; i < newFriend.scores.length; i++) {
            if (newFriend.scores[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if (newFriend.scores[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        // compare the scores and find best match

        var bestMatchIndex = 0;
        //find the best match
        var bestMatchDifference = 40;

        for (var i = 0; i < friendsData.length; i++) {
            var totalDifference = 0;

            for (var index = 0; index < friendsData[i].scores.length; index++) {
                var differenceOneScore = Math.abs(friendsData[i].scores[index] - newFriend.scores[index]);
                totalDifference += differenceOneScore;
            }

            if (totalDifference < bestMatchDifference) {
                bestMatchIndex = i;
                bestMatchDifference = totalDifference;
            }
        }

        bestMatch = friendsData[bestMatchIndex];
        friendsData.push(newFriend);

        // return match
        res.json(bestMatch);
    });

};

