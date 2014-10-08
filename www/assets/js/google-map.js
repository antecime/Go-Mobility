
var rendererOptions = {
  draggable: true
};

var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var num, map, data;
var requestArray = [], renderArray = [];
var geocoder;
// var infowindow_forRoutedMarker = new google.maps.InfoWindow({
//         content: i
//   });

//var paris = new google.maps.LatLng(48.8534100, 2.3488000);

// A JSON Array containing some people/routes and the destinations/stops
    // var jsonArray = {
    //     "Person 1": ["Paris", "Dole"],
    //     "Person 2": ["Marseille", "Montpellier"],
    //     "Person 3": ["Bourges", "Brest"]
    // }

$(function() 
{
    var jsonArray = {}

    var routeArray = [];

    $.ajax({
      url: "http://localhost:8888/GoMobility/www/api/v1/experience/show-last-ten-published",
    }).done(function(data) 
    {
        for (i = 0; i < data.length; i++) 
        { 

            //var origin = new google.maps.LatLng(data[i].latA, data[i].lngA);
            //var destination = new google.maps.LatLng(data[i].latB, data[i].lngB);

            var origin = data[i].start_address;
            var destination = data[i].end_address;
           // origin = reverseGeo(data[i].latA, data[i].lngA);
            //destination = reverseGeo(data[i].latB, data[i].lngB);


            console.log('origin' + origin );

            jsonArray["Person " + i] = [origin , destination];

        }
            // jsonArray["Person 1"] = ["Saint-Laurent-les-Bains, France" , "Montselgues, France"];
            // jsonArray["Person 2"] = ["Saint-Marcel-d'Ardèche, France" , "Mézilhac, France"];
            // jsonArray["Person 3"] = ["Mézilhac, France" , "Saint-Marcel-d'Ardèche, France"];
            console.log(jsonArray);   
              // Start the request making
        generateRequests(jsonArray)


    });

});


// function reverseGeo(lat,lng)
// {
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(lat, lng);
//       geocoder.geocode({'latLng': latlng}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//           if (results[1]) {
//              console.log('res ' + results[1].formatted_address);
//             //return results[1].formatted_address;
           
//           } else {
//             alert('No results found');
//           }
//         } else {
//           alert('Geocoder failed due to: ' + status);
//         }
//       });
// }

// 16 Standard Colours for navigation polylines
    // var colourArray = ['navy', 'grey', 'fuchsia', 'black', 'white', 'lime', 'maroon', 'purple', 'aqua', 'red', 'green', 'silver', 'olive', 'blue', 'yellow', 'teal'];
    // colourArray[i]
/* ---------------------- generation request ---------------------- */

// Let's make an array of requests which will become individual polylines on the map.
    function generateRequests(jsonArray) {

        requestArray = [];

        for (var route in jsonArray){
            // This now deals with one of the people / routes

            // Somewhere to store the wayoints
            var waypts = [];
            
            // 'start' and 'finish' will be the routes origin and destination
            var start, finish
            
            // lastpoint is used to ensure that duplicate waypoints are stripped
            var lastpoint

            data = jsonArray[route]

            limit = data.length
            for (var waypoint = 0; waypoint < limit; waypoint++) {
                if (data[waypoint] === lastpoint){
                    // Duplicate of of the last waypoint - don't bother
                    continue;
                }
                
                // Prepare the lastpoint for the next loop
                lastpoint = data[waypoint]

                // Add this to waypoint to the array for making the request
                waypts.push({
                    location: data[waypoint],
                    stopover: true
                });
            }

            // Grab the first waypoint for the 'start' location
            start = (waypts.shift()).location;
            // Grab the last waypoint for use as a 'finish' location
            finish = waypts.pop();
            if(finish === undefined){
                // Unless there was no finish location for some reason?
                finish = start;
            } else {
                finish = finish.location;
            }

            // Let's create the Google Maps request object
            var request = {
                origin: start,
                destination: finish,
                waypoints: waypts,
                travelMode: google.maps.TravelMode.DRIVING
            };

            // and save it in our requestArray
            requestArray.push({"route": route, "request": request});
        }

        processRequests();
    }

/* ---------------------- end of generation request ---------------------- */

/* ---------------------- process requests ---------------------- */

function processRequests() {

        // Counter to track request submission and process one at a time;
        var i = 0;


        // Used to submit the request 'i'
        function submitRequest(){
            directionsService.route(requestArray[i].request, directionResults);
        }

        // Used as callback for the above request for current 'i'
        function directionResults(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                
                // Create a unique DirectionsRenderer 'i'
                renderArray[i] = new google.maps.DirectionsRenderer();
                renderArray[i].setMap(map);

                // Some unique options from the colorArray so we can see the routes
                renderArray[i].setOptions({
                    preserveViewport: true,
                    suppressInfoWindows: false,
                    //infoWindow: infowindow_forRoutedMarker,
                    suppressMarkers: false,
                    polylineOptions: {
                        strokeWeight: 4,
                        //strokeOpacity: 0.8,
                        strokeColor: '#7ed2ec'
                    },
                    markerOptions:{
                         //anchorPoint : (0,),
                        animation: google.maps.Animation.DROP,
                        clickable : true,
                         icon:{
                            url: 'assets/images/maps/marker.svg'
                        //     path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        //     scale: 3,
                        //     strokeColor: '#0059ff'
                        }
                    }
                });



                // Use this new renderer with the result
                renderArray[i].setDirections(result);
                // and start the next request
                nextRequest();
            }

        }

/* ---------------------- end of process requests ---------------------- */


/* ---------------------- next request ---------------------- */

function nextRequest() {
            // Increase the counter
            i++;
            // Make sure we are still waiting for a request
            if(i >= requestArray.length){
                // No more to do
                return;
            }
            // Submit another request
            submitRequest();
        }

        // This request is just to kick start the whole process
        submitRequest();
    }

/* ---------------------- next request ---------------------- */


/* ---------------------- initialize ---------------------- */

function initialize() {

/* map options */  
    var ardeche = new google.maps.LatLng(44.5620651, 3.8974203);
    /* Instanciation du geocoder  */
    geocoder = new google.maps.Geocoder(); 

  var mapOptions = {
    zoom: 11,
    center: ardeche,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
                        {
                            featureType:"landscape",

                            stylers:[{
                                saturation:-300
                            },
                            {
                                lightness:-5
                            },
                            {
                                visibility:"on"
                            }]
                        },
                        {
                            featureType:"poi",
                            stylers:[{
                                saturation:-100
                            },
                            {
                                lightness:51
                            },
                            {
                                visibility:"simplified"
                            }]
                        },
                        {
                            featureType:"road.highway",
                            stylers:[{
                                saturation:-100
                            },
                            {
                                visibility:"simplified"
                            }]
                        },
                        {
                            featureType:"road.arterial",
                            stylers:[{
                                saturation:-100
                            },
                            {
                                lightness:30
                            },
                            {
                                visibility:"on"
                            }]
                        },
                        {
                            featureType:"road.local",
                            stylers:[{
                                saturation:-100
                            },
                            {
                                lightness:5
                            },
                            {
                                visibility:"on"
                            }]
                        },
                        {
                            featureType:"transit",
                            stylers:[{
                                saturation:-100
                            },
                            {
                                visibility:"simplified"
                            }]
                        },
                        {
                            featureType:"administrative.province",
                            stylers:[{
                                visibility:"off"
                            }]
                        },
                        {
                            featureType:"administrative.locality",
                            stylers:[{
                                visibility:"off"
                            }]
                        },
                        {
                            featureType:"administrative.neighborhood",
                            stylers:[{
                                visibility:"on"
                            }]
                        },
                        {
                            featureType:"water",
                            elementType:"labels",
                            stylers:[{
                                visibility:"on"
                            },
                            {
                                lightness:-25
                            },
                            {
                                saturation:-100
                            }]
                        },
                        {
                            featureType:"water",
                            elementType:"geometry",
                            stylers:[{
                                hue:"#5ea3d9"
                            },
                            {
                                lightness:-25
                            },
                            {
                                saturation:300
                            }]
                        }
                    ]

  };

/*end var options*/

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);

  // google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
  //   computeTotalDistance(directionsDisplay.getDirections());
  // });





} 

/* ---------------------- end of initialize ---------------------- */


google.maps.event.addDomListener(window, 'load', initialize);