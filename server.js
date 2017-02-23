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
  }
  else{
    console.log("Requested user: " + req.session.loginid);
    res.status(200).send(req.session.loginid);
  }
});

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
//TODO Change to GET instead of POST
app.post("/user", function(req,res){
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
  res.send(req.body.fName + " was registered sucessfully.");
  console.log(req.body.fName + " was registered sucessfully.");
  res.end("done")
})

//Test database
function databaseUserTestData(){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  var data = {fName: 'Bob', lName: 'Ross', dob: '2017/02/23', address: 'an address', email: 'something@something.com', phoneNum: '15468754', password: '12345'};
  var query = connection.query('INSERT INTO posts SET ?', data, function(err, result){
  // Success!
  });
  console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
}

function databaseEventTestData(){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect();
  var data = {event_Name: "ut massa quis augue luctus", eDate:"2016-03-27", location:"Ngluweng Dua", capacity:3966, descrp:"Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
              event_name:"nunc donec quis", eDate:"2016-02-29", location:"Petushki", capacity:1835, descrp:"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
              event_name:"varius ut", eDate:"2016-07-29", location:"Nuuk", capacity:4738, descrp:"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
              event_name:"mus etiam vel", eDate:"2016-08-14", location:"Longford", capacity:5594, descrp:"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
              event_name:"eros suspendisse accumsan tortor", eDate:"2016-04-18", location:"Nunutba", capacity:4160, descrp:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
              event_name:"ipsum integer", eDate:"2016-04-11", location:"Skrzydlna", capacity:3575, descrp:"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
              event_name:"accumsan tellus nisi", eDate:"2016-07-25", location:"Tempaling", capacity:2718, descrp:"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
              event_name:"ut suscipit", eDate:"2017-02-12", location:"Azeitão", capacity:1683, descrp:"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
              event_name:"enim lorem ipsum dolor sit", eDate:"2017-02-08", location:"Krajan", capacity:5755, descrp:"Sed ante. Vivamus tortor. Duis mattis egestas metus.",
              event_name:"consectetuer eget rutrum at lorem", eDate:"2016-09-18", location:"Otorohanga", capacity:4457, descrp:"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
              event_name:"amet eros suspendisse", eDate:"2016-10-22", location:"Daşoguz", capacity:1675, descrp:"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
              event_name:"cum sociis natoque penatibus", eDate:"2016-04-24", location:"Huangmei", capacity:2786, descrp:"Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
              event_name:"fringilla rhoncus mauris", eDate:"2016-09-01", location:"Ivry-sur-Seine", capacity:4249, descrp:"Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
              event_name:"cubilia curae", eDate:"2016-10-02", location:"Pervoavgustovskiy", capacity:2508, descrp:"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
              event_name:"fringilla rhoncus", eDate:"2016-08-11", location:"Mongaguá", capacity:1078, descrp:"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."
};

  var query = connection.query('INSERT INTO event SET ?', data, function(err, result){
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
