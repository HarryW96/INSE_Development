var xhr = new XMLHttpRequest();

// Gets the user details and applies validation on them.
// If valid will pass data to the server to register the user.
function registerUser(){
  var name = document.getElementById("reg-name");
  var email = document.getElementById("reg-email");
  var phone = document.getElementById("reg-phone");
  var pass = document.getElementById("reg-pass");
  var passCheck = document.getElementById("reg-passcheck");
  var user = { name: name.value, email:email.value,phone:phone.value, pass:pass.value, passcheck:passCheck.value}

  if(pass.value == "" || passCheck.value == "" || name.value == "" || email.value == "" || phone.value == ""){
    alert("Please fill all fields");
  }
  else if(pass.value != passCheck.value){
    alert("Passwords do not match");
    pass.value = "";
    passCheck.value = "";
  }
  else{
    console.log("Started send process");
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
