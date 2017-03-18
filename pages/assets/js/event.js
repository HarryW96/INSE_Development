var xhr = new XMLHttpRequest();

function getEventPage(){
  var titleEle = document.getElementById("event_heading");
  var imageEle = document.getElementById("event_image");
  var descrpEle = document.getElementById("event_description");

  xhr.open("GET", "/event");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){ //TODO replace all (xhr.readystate && xhr.statusCode) with this new format
      console.log("Ready!");
      if(xhr.status == 200){
        console.log("Ready to update event page!");
        var profileData = JSON.parse(xhr.responseText);

        //may need to use spans in html to place data in right place for date's and times
        titleEle.innerText = //JSON Data
        descrpEle.innerText = //JSON Data
      }
      else if(xhr.status == 401){
        window.location = "./event.html";
        titleEle.innerText = "No event here!";
        descrpEle.innerText = "";
      }
    }
  }
  xhr.send(null);
}