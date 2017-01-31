var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getLoginDetails(){
  var loginEle = document.getElementById("user-display");
  console.log("Getting user detials");
  xhr.open("GET", "/user")
  xhr.onreadystatechange = function(){
    var response = xhr.responseText;
    console.log("Server responded with: " + response);
    console.log(response);
    loginEle.innerHTML = response;
  }
  xhr.send();

}

window.addEventListener("load", getLoginDetails);
