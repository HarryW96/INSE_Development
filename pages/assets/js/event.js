var xhr = new XMLHttpRequest();

function getEventPage(){
  var titleEle = document.getElementById("event_heading");
  var imageEle = document.getElementById("event_image");
  var descrpEle = document.getElementById("event_description");
  var capacityEle = document.getElementById("event_capacity");
  var locationEle = document.getElementById("event_location");
  var imageEle = document.getElementById("event_image_selector");
  var eventID = window.location.search.substring(1);

  xhr.open("GET", "/event?eventID=" + eventID);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // Populate elements if valid
        var profileData = JSON.parse(xhr.responseText)[0]
        titleEle.innerText = profileData.event_Name;
        descrpEle.innerText = profileData.descrp;
        capacityEle.innerText = profileData.capacity;
        locationEle.innerText = profileData.location;


        /* Placeholder code for image functionallity
        if(profileData.image != null){
          imageEle.setAttrabute("src",profileData.image);
        }
        */
      }
      else if(xhr.status == 401){
        titleEle.innerText = "No event here!";
        descrpEle.innerText = "";
        capacityEle.innerText = "";
      }
    }
  }
  xhr.send(null);
}

window.addEventListener("load", getEventPage)
