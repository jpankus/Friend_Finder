var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// express config
// connect to express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// the routes to use to find info 

require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// listens to the port 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});