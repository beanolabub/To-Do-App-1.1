  
var xmlHttp

function show(id)
{ 
    xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null)
    {
        alert ("Your browser does not support AJAX!");
        return;
    } 
    var url="update.php?id="+id;
    url=url+"&sid="+Math.random();
    xmlHttp.onreadystatechange=stateChanged;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function stateChanged() 
{ 
    if (xmlHttp.readyState==4)
    { 
        document.getElementById("changed").innerHTML=xmlHttp.responseText;
    }
}


function loadDoc(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML =
        this.responseText;
      }
    };
    xhttp.open("GET", "change.php?id="+id, true);
    xhttp.send();
  }