var xhr = new XMLHttpRequest();

// Gets the user details and applies validation on them.
// If valid will pass data to the server to register the user.
function registerUser(){
  //console.log("Reg started");
  var fName = document.getElementById("reg-fname").value;
  var lName = document.getElementById("reg-lname").value;
  var date = document.getElementById("reg-date").value;
  var address = document.getElementById("reg-address").value;
  var city = document.getElementById("reg-city").value;
  var postcode = document.getElementById("reg-postcode").value;
  var email = document.getElementById("reg-email").value;
  var phone = document.getElementById("reg-phone").value;
  var pass = document.getElementById("reg-pass").value;
  var passCheck = document.getElementById("reg-passcheck").value;


  if(pass == "" || passCheck == "" || fName == "" || lName == "" || date == "" || address == "" || city == "" || postcode == "" || email == "" || phone == ""){
    alert("Please fill all fields");
    pass = "";
    passCheck = "";
  }
  else if(pass != passCheck){
    alert("Passwords do not match");
    pass = "";
    passCheck = "";
  }
  else{
    var user = {
    "fName": fName,
    "lName": lName,
    "date": date,
    "address": address,
    "city": city,
    "postcode": postcode,
    "email": email,
    "phone": phone,
    "pass": pass,
    "passCheck": passCheck}
    //console.log("Started send process");
    xhr.open("POST", "/user/register");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user));
 }

// Notify the user that they've been registered
 xhr.onreadystatechange = function(){
   if(xhr.readyState == XMLHttpRequest.DONE){
     alert(xhr.responseText);
   }
 }

}

document.getElementById("register").addEventListener("click",registerUser);
