var friendData = require('../data/friends.js');
var path = require('path');

var totalDifference = 0;

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});



	app.post('/api/friends', function(req, res){

		var greatMatch = {
			name: "",
			image: "",
			matchDifference: 1000
		};
		var usrData 	= req.body;
		var usrName 	= usrData.name;
		var usrImage 	= usrData.image;
		var usrScores 	= usrData.scores;

		var totalDifference = 0;

		//loop through the friends array
		for(var i = 0; i < [friendData].length-1; i++){
			console.log(friendData[i].name);
			totalDifference = 0;

			//loop through that friends score and the users score
			for(var j = 0; j < 10; j++){
				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friendData[i].scores[j]));
				if (totalDifference <= greatMatch.friendDifference){

					// make the bestMatch to be the new friend. 
					greatMatch.name = friendData[i].name;
					greatMatch.photo = friendData[i].photo;
					greatMatch.matchDifference = totalDifference;
				}
			}
		}

		friendData.push(usrData);
 
		res.json(greatMatch);
	});
};