var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getUserProfile(){
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var phoneEle = document.getElementById("profile-phone");

  xhr.open("GET", "/user/detail");
  xhr.onreadystatechange = function(){
    var profileData = JSON.parse(xhr.responseText);
    console.log(profileData);

    nameEle.innerText = profileData.user;
    emailEle.innerText = profileData.email;
    phoneEle.innerText = profileData.phone;
  }
  xhr.send();
  console.log("HEYO")
}

window.addEventListener("load", getUserProfile);
