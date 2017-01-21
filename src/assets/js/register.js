
function registerUser(){
  var name = document.getElementById("reg-name").value;
  var email = document.getElementById("reg-email").value;
  var pass = document.getElementById("reg-pass").value;
  var passCheck = document.getElementById("reg-passcheck").value;
  console.log(name + email + pass + passCheck);
}




document.getElementById("register").addEventListener("click",registerUser);
