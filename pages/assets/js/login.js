var xhr = new XMLHttpRequest;

function loginCheck(){
  var name = document.getElementById("log-user");
  var pass = document.getElementById("log-pass");
  var userDetails = {name: name.value, pass: pass.value};

  xhr.open("POST", "/user");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      alert(xhr.responseText); //Login session is stablished via hidden cookie data. Setup server-side automaticlly.
    }
  }
  xhr.send(JSON.stringify(userDetails));
  console.log(JSON.stringify(userDetails));
}

document.getElementById("login").addEventListener("click", loginCheck);
