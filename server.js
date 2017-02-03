// Express and AJAX
var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
// Database and MySQL
var mysql = require("mysql");
var sqlLogin = {
  host: "localhost",
  user: "bookit",
  password: "1234",
  database: "test"
};
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

//Checks if there's a currently logged in user and sends back what user is logged in.
app.get("/user", function(req,res){
    console.log(req.session.loginid);
  if(req.session.loginid == undefined){
    res.send("No_Active_Login");
  }
  else{
    console.log("Requested user: " + req.session.loginid);
    res.send(req.session.loginid);
  }
})


//Check login details for when user logs in first time
app.post("/user", function(req,res){
  //checkUserLogin(req.body, req.session);
  var connection = mysql.createConnection(sqlLogin);

  connection.query("SELECT * FROM `user` WHERE `Name` = ?",[req.body.name], function(err,results,fields){
    if(results.length == 0){
      res.end("ERROR: NO USER FOUND!");
    }
    for(i = 0;i < results.length;i++){
      if(results[i].Password == req.body.pass){
        console.log("User " + req.body.name + " sucessfully logged in!");
        req.session.loginid = results[i].Name;
        console.log(req.session.loginid);
        connection.end();
        res.send("Welcome " + req.body.name);
      }
    }

  });
});

//Register a new user
app.post("/user/register", function(req,res){
  addUserToDatabase(req.body);
  res.send(req.body.name + " was registered sucessfully.");
  console.log(req.body.name + " was registered sucessfully.")
  res.end("done")
})


// Gets user details from database and compares to submited data. Will return user ID if there's a match
// function checkUserLogin(user,session){
//   var connection = mysql.createConnection(sqlLogin);
//
//   connection.query("SELECT * FROM `user` WHERE `Name` = ?",[user.name], function(err,results,fields){
//     for(i = 0;i < results.length;i++){
//       if(results[i].Password == user.pass){
//         console.log("User " + user.name + " sucessfully logged in!");
//         session.loginid = results[i].ID;
//         console.log(session.loginid);
//         return true;
//       }
//     }
//     console.log("User details where invalid");
//   })
//
//   connection.end();
//
// }

// Create a new user entry in the database using a JSON file conisting of thier submited details.
function addUserToDatabase(user){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  connection.query("INSERT INTO user SET ?", {Name: user.name, Email: user.email, Password: user.pass}, function(err,result){
    if (err) throw err;
  });
  connection.end();
}

app.listen(8080);
