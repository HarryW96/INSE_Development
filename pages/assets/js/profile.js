var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getUserProfile(){
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var phoneEle = document.getElementById("profile-phone");

  xhr.open("GET", "/user/detail");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.statusCode == 200){
      console.log(xhr.responseText);
      console.log("hi")
      nameEle.innerText = xhr.responseText.user;
      emailEle.innerText = xhr.responseText.email;
      phoneEle.innerText = xhr.responseText.phone;
    }
  }
  xhr.send();
  console.log("HEYO")
}

window.addEventListener("load", getUserProfile);
