/** app.js à templater **/


$(document).ready(function (){

    /* ========== pop-in ========== */

    var panel = '<div id="config" data-role="panel" data-display="push"><div class="ui-panel-inner"><strong><a href="#course" data-transition="pop">Acceuil</a></strong><h3>Type de parcours :</h3><nav class="primary-nav"><ul><li class="config-active"><a href="#tourist-wrapper" data-transition="pop">Touristique</a></li><li><a href="#sport" data-transition="pop">Sportif</a></li><li><a href="#go-to-work" data-transition="pop">Go to work</a></li></ul></nav></div></div>';

    $(document).one('pagebeforecreate', function () {
        $.mobile.pageContainer.prepend(panel);
        $("#config").panel().enhanceWithin();
    });

    /* ========== pop-in ========== */

    $("#choice").stop().on('click',function() {
        setTimeout( "$('#validated').fadeOut();",2000);
        setTimeout( "$('#tourist').fadeIn();",2500);
    });

	/* ========== centrage des éléments ========== */

	$.fn.Center = function (){
		this.addClass('totalCenter');
		this.css({
			'margin-left' : -this.width()/2 + 'px',
			'margin-top' : -this.height()/2 + 'px'
		});
	};

	$('#connect-box').Center();

	/* ========== système d'onglets ========== */

	var anchor = window.location.hash;  // On récup l'ancre dans l'url http://......#ancre
	$('.tabs').each(function(){
		var current = null;             // Permet de connaitre l'élément courant
		var id = $(this).attr('id');    // ID de ma barre d'onglet
		// Si on a une ancre
		if(anchor != '' && $(this).find('a[href="'+anchor+'"]').length > 0){
			current = anchor;
		// Si on a une valeur de cookie
	}else if($.cookie('tab'+id) && $(this).find('a[href="'+$.cookie('tab'+id)+'"]').length > 0){
		current = $.cookie('tab'+id);
		// Sinon current = premier lien
	}else{
		current = $(this).find('a:first').attr('href');
	}
	
		$(this).find('a[href="'+current+'"]').addClass('active');   // On ajoute la classe active sur le lien qui correspond
		$(current).siblings().hide();                               // On masque les éléments
		$(this).find('a').click(function(){
			var link = $(this).attr('href'); 
		   // On a cliqué sur l'élément déja active
		   if(link == current){
		   	return false;
		   }else{
			   // On ajoute la class active sur l'onglet courant et on la supprime des autres onglets
			   $(this).addClass('active').siblings().removeClass('active'); 
			   $(link).show().siblings().hide();    // On masque/affiche les div suivant les cas
			   current = link;                      // On change la valeur de l'onglet courant
			   $.cookie('tab'+id,current);          // On stocke l'onglet courant dans les cookie
			}
		});
	});


});

/* ========== custom Google Map ========== */

var map;
//var panel;
var initialize;
var calculate;
var direction;
var directionsService = new google.maps.DirectionsService();

initialize = function(){
  var latLng = new google.maps.LatLng(48.8534100, 2.3488000); // Correspond au coordonnées de Paris
  var myOptions = {
	zoom      			: 15, // Zoom par défaut
	center    			: latLng, // Coordonnées de départ de la carte de type latLng 
	mapTypeId 			: google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
	maxZoom   			: 20,
	mapTypeControl		: false,
    streetViewControl	: false,
    MapTypeId 			: google.maps.MapTypeId.ROADMAP,
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

map      = new google.maps.Map(document.getElementById('map'), myOptions);
panel    = document.getElementById('panel');

var marker = new google.maps.Marker({
	position : latLng,
	map      : map,
	title    : "Paris"
});

var contentMarker = [
'<div id="containerTabs">',
'<div id="tabs">',
'<ul>',
'<li><a href="#tab-1"><span>Lorem</span></a></li>',
'<li><a href="#tab-2"><span>Ipsum</span></a></li>',
'<li><a href="#tab-3"><span>Dolor</span></a></li>',
'</ul>',
'<div id="tab-1">',
'<h3>Lille</h3><p>Suspendisse quis magna dapibus orci porta varius sed sit amet purus. Ut eu justo dictum elit malesuada facilisis. Proin ipsum ligula, feugiat sed faucibus a, <a href="http://www.google.fr">google</a> sit amet mauris. In sit amet nisi mauris. Aliquam vestibulum quam et ligula pretium suscipit ullamcorper metus accumsan.</p>',
'</div>',
'<div id="tab-2">',
'<h3>Aliquam vestibulum</h3><p>Aliquam vestibulum quam et ligula pretium suscipit ullamcorper metus accumsan.</p>',
'</div>',
'<div id="tab-3">',
'<h3>Pretium suscipit</h3><ul><li>Lorem</li><li>Ipsum</li><li>Dolor</li><li>Amectus</li></ul>',
'</div>',
'</div>',
'</div>'
].join('');

var infoWindow = new google.maps.InfoWindow({
	content  : contentMarker,
	position : latLng
});

google.maps.event.addListener(marker, 'click', function() {
	infoWindow.open(map,marker);
});

  google.maps.event.addListener(infoWindow, 'domready', function(){ // infoWindow est biensûr notre info-bulle
  	$("#tabs").tabs();
  });
  
  
  direction = new google.maps.DirectionsRenderer({
  	map   : map,
	//panel : panel // Dom element pour afficher les instructions d'itinéraire
});

};

calculate = function(){

	var selectedMode = document.getElementById('mode').value;
	origin      = document.getElementById('origin').value; // Le point départ
	destination = document.getElementById('destination').value; // Le point d'arrivé
	if(origin && destination){
		var request = {
			origin      : origin,
			destination : destination,
			travelMode: google.maps.TravelMode[selectedMode] // Mode de conduite
		}
		var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
		directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
			if(status == google.maps.DirectionsStatus.OK){
				direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
			}
		});
	}
};

google.maps.event.addDomListener(window, 'load', initialize);





