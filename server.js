// Express and AJAX
var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
// Database and MySQL
var mysql = require("mysql");
//Initalization
app.use(express.static(__dirname + "/pages"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: 'nurf this',
  resave: false,
  saveUninitialized: true,
  //cookie: {secure:true}
}));
//Code Body

// Sets
app.get("/test", function(req,res){
  if(!req.session.test){
    req.session.test = 0;
  }
  req.session.test = req.session.test + 1;
  console.log(req.session.test);
  res.send("done");
});

app.get("/test/test", function(req,res){
  console.log(req.session.hi);
  res.send("done");
});

//Check login details
app.post("/user", function(req,res){
  req.session.user = req.body.user;
  console.log("Logged in as "  + req.session.user);
})

//Register a new user
app.post("/user/register", function(req,res){
  addUserToDatabase(req.body);
  res.send(req.body.name + " was registered sucessfully.");
  console.log(req.body.name + " was registered sucessfully.")
  console.log(req.session.lastpage);
  res.end("done")
})

// Create a new user entry in the database using a JSON file conisting of thier submited details.
function addUserToDatabase(user){
  var connection = mysql.createConnection({
    host: "localhost",
    user: "bookit",
    password: "1234",
    database: "test"
  })
  connection.connect();
  connection.query("INSERT INTO user SET ?", {Name: user.name, Email: user.email, Password: user.pass}, function(err,result){
    if (err) throw err;
  });
  connection.end();
}

app.listen(8080);
