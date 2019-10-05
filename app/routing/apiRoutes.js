var friends = require('../data/friends');

module.exports = function(app) {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post('/api/friends', function(req, res) {
        var totalDifference = 0;
        var bestMatch = {
            name: '',
            photo: '',
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var fn = userScores.map(function(a) {
            return parseInt(a, 10);
        });
        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: fn
        };
        console.log("Name: " + userName);
        console.log("User score: " + userScores);

        var sum = fn.reduce((x, y) => x + y, 0);
        console.log('Sum of users score ' + sum);
        console.log("Best match friend diff: " + bestMatch.friendDifference);
        console.log('----------------------------------------------------------------------------');

        for (let i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Difference: " + totalDifference);
            console.log("Best match friend diff: " + bestMatch.friendDifference);

            var bestFriendScore = friends[i].scores.reduce((x, y) => x + y, 0);
            console.log("Total Friend score: " + bestFriendScore);
            totalDifference += Math.abs(sum - bestFriendScore);
            console.log("New Total Difference: " + totalDifference);

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
            console.log(totalDifference + " :Total Difference");
        }

        console.log(bestMatch);
        friends.push(userData);
        console.log('New User added');
        console.log(userData);
        res.json(bestMatch);
    });

};