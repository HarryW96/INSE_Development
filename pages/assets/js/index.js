var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getLoginDetails(){
  var loginEle = document.getElementById("user-display");
  console.log("Getting user detials");
  xhr.open("GET", "/user")
  xhr.onreadystatechange = function(){
    var response = xhr.responseText;
    console.log("Server responded with: " + response);
    loginEle.innerHTML = response;
    if(xhr.status != 404){
      loginEle.setAttribute("onclick","window.location.href='/profile.html'");
    }

  }
  xhr.send();

}

window.addEventListener("load", getLoginDetails);
