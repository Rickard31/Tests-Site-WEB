$(function () {
    const point = new google.maps.LatLng(50.4646612,30.5201337);

    var mapProp = {
        center: point,
        zoom: 15
    };

    var html_element = document.getElementById("google-map");
    var map = new google.maps.Map(html_element,  mapProp);
    var map = new google.maps.Map(html_element,  mapProp);
    new google.maps.Marker({
        position: point,
        map: map
    });
})