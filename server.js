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
    console.log(req.session.login_id);
  if(req.session.login_id == null){
    res.status(401).send();
  }
  else{
    console.log("Requested user: " + req.session.login_fName);
    res.status(200).send(req.session.login_fName + "is logged in.");
  }
});

/*
  If there's an active and valid login session then the website will return additonal infomation to the session
*/
app.get("/user/detail", function(req,res){
  var details
  if (req.session.login_id == null){
    details = {"user": "N/A", "email": "N/A", "phone": "NA"};
    console.log("No User Logged!!!");
    res.status(401).send(details);
  }
  else{
    details = {"user": req.session.login_fName,"email": req.session.login_email, "phone": req.session.login_phone}
    console.log("User details found. Sending profile to client.");
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
app.post("/user/login", function(req, res){
  var connection = mysql.createConnection(sqlLogin);
  console.log(req.body.name);
  connection.query("SELECT * FROM `user` WHERE `email` = ?",[req.body.name], function(err,results,fields){
    if(results.length == 0){
      return res.status(404).send("ERROR: NO USER FOUND!");
    }
    for(i = 0;i < results.length;i++){
      if(results[i].password == req.body.pass){
        console.log("User " + req.body.fName + " sucessfully logged in!");
        req.session.login_id = results[i].U_ID;
        req.session.login_fName = results[i].fName; //TODO loginid should be changed to loginName but as to not break other code
        req.session.login_phone = results[i].phone;
        req.session.login_email = results[i].email;
        console.log("User " + req.session.fName + " just logged in.");
        connection.end();
        res.send("Welcome " + req.session.fName);
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

//Test database
//TODO Remove for release
function databaseTestData(){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  var data = {fName: 'Bob', lName: 'Ross', dob: '2017/02/23', address: 'an address', email: 'something@something.com', phoneNum: '15468754', password: '12345'};
  var query = connection.query('INSERT INTO user SET ?', data, function(err, result){
  // Success!
  });
  console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
}

// Create a new user entry in the database using a JSON file conisting of thier submited details.
function addUserToDatabase(user){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  connection.query("INSERT INTO user SET ?", {
    fName: user.fName,
    lName: user.lName,
    dob: user.date,
    address: user.address,
    email: user.email,
    phoneNum: user.phone,
    password: user.pass}, function(err,result){
    if (err) throw err;
  });
  connection.end();
}

databaseTestData();
app.listen(8080);
