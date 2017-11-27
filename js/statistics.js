
var stats = localStorage.getItem("test stats");

if(stats!=null){
    var parsed = JSON.parse(stats);
    $("#amount-of-tests-taken").text("You took "+parsed.quantity + " tests");
    $("#average-test-result").text("Your average score is " + convertToProcents(parsed.rate) + "%");
}

function convertToProcents(number){
    var t = parseFloat(number)*100;
    return t.toString().substr(0,4);
}