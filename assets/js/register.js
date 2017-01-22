var xhr = new XMLHttpRequest();

function registerUser(){
  var name = document.getElementById("reg-name")
  var email = document.getElementById("reg-email");
  var pass = document.getElementById("reg-pass");
  var passCheck = document.getElementById("reg-passcheck");
  var user = { name: name.value, email:email.value, pass:pass.value, passcheck:passCheck.value}

  if(pass.value == "" || passCheck.value == "" || name.value == "" || email.value == ""){
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
    console.log(JSON.stringify(user));
    xhr.send(JSON.stringify(user));
 }

}

document.getElementById("register").addEventListener("click",registerUser);
