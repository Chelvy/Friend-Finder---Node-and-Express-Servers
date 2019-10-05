var path = require('path');
module.exports = function(app) {
    // Basic route that sends the user to the home page
    // app.get('/', function(req, res) {
    //     res.sendFile(path.join(__dirname, '/../public/home.html'));
    // });
    //A GET Route to /survey to display the survey page.
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/survey.html'));
    });

    // A default, catch-all route that leads to home.html which displays the home page.
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
};