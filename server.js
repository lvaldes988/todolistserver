var port = process.env.POST || 7070;// ste the port look for an enviroment var 
//always stra first the database
var express = require('express');//requiere express modue so u can start the express server
var app = express();
var bodyParser = require ("body-parser");//middle word calles baodyparsrs,


var database = require('./database') //requiere the database we crete from database file
//app.get('/', function (req, res) {
//  res.send('Hello World')
//});
 
//app.listen(7070)

//app.use(function (req,  res, next){
  //  res.header("Access-Control-Allow-Origin", "*");
    //next();
//});

//app.use(bodyParser.urlencoded({ extended: true}));

//security of the webbsite

// Add headers
app.use(function (req, res, next) {//set the sequrity to ur website

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7070');//requiere the port 8088

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)***LOGIN IN LOG OUT SESSIONS*****
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//INITIALIZING BODYPARSER
app.use(bodyParser.urlencoded({ extended: true}));
//SET UO EJS FOR TEMPLATES**WE MUCT HAVE A FOLDE CALL VIEW IN THE ROOT
app.set('view enjine', 'ejs');
//EXPOSE ALL THE CONTENT IN UR WEBSITE
app.use("/assets", express.static(__dirname + "/assets"));
//CALL OUR FUNTION THE APP AND THE DATABASE ****INITIALIZE THE ROUTES****
require('./app/routes')(app, database);
//SERVER START THE PORT 
app.listen(port, function(err){
    if(err)console.log('error', err);

    console.log("server listening on port" + port);
});