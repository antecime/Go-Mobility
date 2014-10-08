$(function()
{
    var start = $('#start').text();
    var end =  $('#end').text();

    console.log(start);

    calcRoute(start,end);

});


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function calcRoute(start,end) 
{
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function initialize() 
{
  directionsDisplay = new google.maps.DirectionsRenderer();
  var ardeche = new google.maps.LatLng(44.8152705, 4.3737855);
  var mapOptions = {
    zoom:13,
    center: ardeche
  }

  map = new google.maps.Map(document.getElementById("map-canvas-exp"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

google.maps.event.addDomListener(window, 'load', initialize);

