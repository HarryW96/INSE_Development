// Express and AJAX
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// Database and MySQL
var mysql = require("mysql");
//Initalization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/"));
//Code Body

app.post("/user/register", function(req,res){
  console.log(req.body);
  addUserToDatabase(req.body);


  res.send("Got it!");
})

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
