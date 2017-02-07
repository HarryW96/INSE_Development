var xhr = new XMLHttpRequest();

// Will show who's currently logged in
function getUserProfile(){
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var phoneEle = document.getElementById("profile-phone");

  xhr.open("GET", "/user/detail");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){ //TODO replace all (xhr.readystate && xhr.statusCode) with this new format
      var profileData = JSON.parse(xhr.responseText);

      nameEle.innerText = profileData.user;
      emailEle.innerText = profileData.email;
      phoneEle.innerText = profileData.phone;
    }
  }
  xhr.send(null);
  console.log("HEYO")
}

window.addEventListener("load", getUserProfile);
