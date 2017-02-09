var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getLoginDetails(){
  var loginEle = document.getElementById("user-display");
  console.log("Getting user detials");
  xhr.open("GET", "/user")
  xhr.onreadystatechange = function(){
    if(xhr.readyState = XMLHttpRequest.DONE){
      if(xhr.status == 200){
        var response = xhr.responseText;
        loginEle.innerHTML = response;
      }
      else if(xhr.status == 401){
        loginEle.innerText = "Login"
      }
    }
  }
  xhr.send();
}

function logout(){
  var logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click"){
    session.clear();
  }
}

window.addEventListener("load", getLoginDetails);
