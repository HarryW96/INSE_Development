console.log("Hello!");

var xhr = new XMLHttpRequest();

function getCookies(){
  console.log("Getting cookies!");
  xhr.open("GET","/test");
  xhr.send();
}

window.addEventListener("load", getCookies);
