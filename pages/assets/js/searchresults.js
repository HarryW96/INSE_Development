var xhr = new XMLHttpRequest();

function getSearchResults(){

  var eventSearch = document.getElementById("search-large").value;

  var searchDisplay = document.getElementById("searched");
  var img1 = document.getElementById("event-img1");
  var title1 = document.getElementById("search-title1");
  var desc1 = document.getElementById("search-desc1");
  var img2 = document.getElementById("event-img2");
  var title2 = document.getElementById("search-title2");
  var desc2 = document.getElementById("search-desc2");
  var img3 = document.getElementById("event-img3");
  var title3 = document.getElementById("search-title3");
  var desc3 = document.getElementById("search-desc3");
  var img4 = document.getElementById("event-img4");
  var title4 = document.getElementById("search-title4");
  var desc4 = document.getElementById("search-desc4");
  var img5 = document.getElementById("event-img5");
  var title5 = document.getElementById("search-title5");
  var desc5 = document.getElementById("search-desc5");

  xhr.open("GET", "/event?eventSearch=" + eventSearch);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // Populate elements if valid

        var eventJSON = xhr.responseText;
        var eventData = JSON.parse(xhr.responseText);

        console.log(eventJSON);

      if(eventData != null){

        searchDisplay.innerText = eventSearch;

        //first event shown
        if(eventData[0] != null){
          if(eventData[0].image != null){
            img1.setAttribute("src", eventData[0].image);
          }

          else if(eventData[0].image = null){
            img1.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title1.innerText = eventData[0].event_Name;
          desc1.innerText = eventData[0].descrp;
        }

        else if(eventData[0] = null){
          img1.style.display = "none";
          title1.style.display = "none";
          desc1.style.display = "none";
        }

        //second event shown
        if(eventData[1] !=null){
          if(eventData[1].image != null){
            img2.setAttribute("src", eventData[1].image);
          }

          else if(eventData[1].image = null){
            img2.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title2.innerText = eventData[1].event_Name;
          desc2.innerText = eventData[1].descrp;
        }

        else if(eventData[1] = null){
          img2.style.display = "none";
          title2.style.display = "none";
          desc2.style.display = "none";
        }


        //third event shown
        if(eventData[2] != null){
          if(eventData[2].image != null){
            img3.setAttribute("src", eventData[2].image);
          }

          else if(eventData[2].image = null){
            img3.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title3.innerText = eventData[2].event_Name;
          desc3.innerText = eventData[2].descrp;
        }

        //remove if no data returned
        else if(eventData[2] = null){
          img3.style.display = "none";
          title3.style.display = "none";
          desc3.style.display = "none";
        }

        //fourth event shown
        if(eventData[3] != null){
          if(eventData[3].image != null){
            img4.setAttribute("src", eventData[3].image);
          }

          else if(eventData[3].image = null){
            img4.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title4.innerText = eventData[3].event_Name;
          desc4.innerText = eventData[3].descrp;
        }

        else if(eventData[3] = null){
          img4.style.display = "none";
          title4.style.display = "none";
          desc4.style.display = "none";
        }

        //fifth event shown
        if(eventData[4] != null){

          if(eventData[4].image != null){
            img5.setAttribute("src", eventData[4].image);
          }

          else if(eventData[4].image = null){
            img5.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title5.innerText = eventData[4].event_Name;
          desc5.innerText = eventData[4].descrp;
        }

        else if(eventData[4] = null){
          img5.style.display = "none";
          title5.style.display = "none";
          desc5.style.display = "none";
        }
      }

      else if(eventData = null){
         var searchResultsParent = getElementById("search-result");

         searchResultsParent.style.display = "none";
      }
    }

      else if(xhr.status == 401){
        var searchResultsParent = getElementById("search-result");
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