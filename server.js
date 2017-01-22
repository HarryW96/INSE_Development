var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/"));

app.post("/user/register", function(req,res){
  console.log("Got somthing!");
  console.log(req.body.name);

  res.send("Got it!");
})

app.listen(8080);
