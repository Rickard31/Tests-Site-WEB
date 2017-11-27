
var res = localStorage.getItem("last test");

if(res!=null){
    var parsed = JSON.parse(res);
    $("#res-score").text(parsed.score+"/"+parsed.max);
    $("#res-time").text(parsed.time);
}