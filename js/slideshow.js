
var index = 0;
changeSlide();
//console.log($(".slide"));
function changeSlide(){
    var x = $(".slide");
    for(var i = 0; i<x.length; i++){
        $(x[i]).css({'display': ' none'});
    }
    index++;
    if (index > x.length) {index = 1}
    $(x[index-1]).css({'display': ' inline-block'});
    //console.log(x);
}

var slideShow = setInterval(changeSlide, 2000);