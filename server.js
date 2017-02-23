// Express and AJAX
var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");
// Database and MySQL
var mysql = require("mysql");
// TODO Replace login details with proper bookit database. Thx adam :)
var sqlLogin = {
  host: "localhost",
  user: "bookit",
  password: "1234",
  database: "bookit"
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
  if(req.session.loginid == null){
    res.status(401).send();
  else{
    console.log("Requested user: " + req.session.loginid);
  }
    res.status(200).send(req.session.loginid);
  }
})

/*
  If there's an active and valid login session then the website will return additonal infomation to the session
*/
app.get("/user/detail", function(req,res){
  var details
  if (req.session.loginid == null){
    details = {"user": "N/A", "email": "N/A", "phone": "NA"};
    console.log("No User Logged!!!");
    res.status(401).send(details);
  }
  else{
    details = {"user": req.session.loginid,"email": req.session.loginEmail, "phone": req.session.loginPhone}
    console.log("User details found. Sending profile to client");
    res.status(200).send(JSON.stringify(details));
  }
});
/*
  Destroys the current session of the active user and returns an error message if there's no user
*/
app.get("/user/logout", function(req,res){
  if(req.session.loginid == null){
    res.status(200).send("No user logged in.");
  }
  else{
    req.session.destroy();
    res.status(200).send("User sucessfully logged out!");
  }
});

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
        req.session.loginid = results[i].Name; //TODO loginid should be changed to loginName but as to not break other code
        req.session.loginPhone = results[i].Phone;
        req.session.loginEmail = results[i].Email;
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
  console.log(req.body.name + " was registered sucessfully.");
  res.end("done")
})

// Create a new user entry in the database using a JSON file conisting of thier submited details.
function addUserToDatabase(user){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  connection.query("INSERT INTO user SET ?", {Name: user.name, Email: user.email,Phone: user.phone, Password: user.pass}, function(err,result){
    if (err) throw err;
  });
  connection.end();
}

app.listen(8080);
