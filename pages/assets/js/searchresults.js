var xhr = new XMLHttpRequest();

function getSearchResults(){

  var searchDisplay = document.getElementByID("searched");
  var img1 = document.getElementByID("event-img1");
  var title1 = document.getElementByID("search-title1");
  var desc1 = document.getElementByID("search-desc1");
  var img2 = document.getElementByID("event-img2");
  var title2 = document.getElementByID("search-title2");
  var desc2 = document.getElementByID("search-desc2");
  var img3 = document.getElementByID("event-img3");
  var title3 = document.getElementByID("search-title3");
  var desc3 = document.getElementByID("search-desc3");
  var img4 = document.getElementByID("event-img4");
  var title4 = document.getElementByID("search-title4");
  var desc4 = document.getElementByID("search-desc4");
  var img5 = document.getElementByID("event-img5");
  var title5 = document.getElementByID("search-title5");
  var desc5 = document.getElementByID("search-desc5");

  xhr.open("GET", "/event?eventSearch=" + eventSearch);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // Populate elements if valid
        
        var eventData = JSON.parse(xhr.responseText)[0]
        
        img1.src = eventData[0].image;
        title1.innerText = eventData[0].eventName;
        desc1.innerText = eventData[0].descrp;

        img2.src = eventData[1].image;
        title2.innerText = eventData[1].eventName;
        desc2.innerText = eventData[1].descrp;

        img3.src = eventData[2].image;
        title3.innerText = eventData[2].eventName;
        desc3.innerText = eventData[2].descrp;

        img4.src = eventData[3].image;
        title4.innerText = eventData[3].eventName;
        desc4.innerText = eventData[3].descrp;

        img5.src = eventData[4].image;
        title5.innerText = eventData[4].eventName;
        desc5.innerText = eventData[4].descrp;


        /* Placeholder code for image functionallity
        if(profileData.image != null){
          imageEle.setAttribute("src", profileData.image);
        }
        */
      }

      else if(xhr.status == 401){
        var searchResultsParent = getElementsByClassName("search-result");
        searchDisplay.innerText = "No events found!";

        searchResultsParent.removeChild(img1);
        searchResultsParent.removeChild(title1);
        searchResultsParent.removeChild(desc1);
        searchResultsParent.removeChild(img2);
        searchResultsParent.removeChild(title2);
        searchResultsParent.removeChild(desc2);
        searchResultsParent.removeChild(img3);
        searchResultsParent.removeChild(title3);
        searchResultsParent.removeChild(desc3);
        searchResultsParent.removeChild(img4);
        searchResultsParent.removeChild(title4);
        searchResultsParent.removeChild(desc4);
        searchResultsParent.removeChild(img5);
        searchResultsParent.removeChild(title5);
        searchResultsParent.removeChild(desc5);
      }
    }
  }
  xhr.send(null);
}

window.addEventListener("load", getSearchResults)