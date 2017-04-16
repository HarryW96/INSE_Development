function buildTicket(){
  xhr = new XMLHttpRequest();

  var id = getQueryVariable("id");
  var eventName = document.getElementById("event-name");
  var eventDate = document.getElementById("event-date");
  var eventPerson = document.getElementById("event-username");
  var eventImage = document.getElementById("event-img");
  xhr.open("GET","/ticket?id=" + id);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      var ticket = JSON.parse(xhr.responseText)[0];
      eventName.innerText = ticket.event_name;
      eventDate.innerText = ticket.event_date;
      eventPerson.innerText = ticket.user_name;
      if(ticket.event_img != null){
        eventImage.setAttribute("src","../ticket/img?q=" + ticket.event_img);
      }
    }
  }
  xhr.send();
}


function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

window.onload = function(){
  buildTicket();
}
