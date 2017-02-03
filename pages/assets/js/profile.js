var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getUserProfile(){
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var phoneEle = document.getElementById("profile-phone");

  xhr.open("GET", "/user/detail")
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.statusCode == 404){
        console.log("No Active User!")
      }
      else{
        console.log("UNDER DEVELOPMENT")
        alert("Active user found! We're sorry but this page is under development.")

      }
    }
  }
  xhr.send();
}

window.addEventListener("load", getUserProfile);
