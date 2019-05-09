

var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes/routes.js'); //importing route
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/age-gender_page')));
app.use(express.static(path.join(__dirname, '/public/home_page')));
app.use(express.static(path.join(__dirname, '/public/result_page')));
app.use(express.static(path.join(__dirname, '/public/symptom-page')));

routes(app);  //register the route file

// Binding to a port
app.listen(3000, ()=>{
    console.log('Server started on port 3000');
});
