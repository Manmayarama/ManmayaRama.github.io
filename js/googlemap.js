// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 12
        , // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(37.540830, -122.298880), // Alice Springs
        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                "featureType": "all"
                , "elementType": "geometry.fill"
                , "stylers": [
                    {
                        "visibility": "on"
					}
                    , {
                        "saturation": "11"
					}
				]
			}
            , {
                "featureType": "administrative"
                , "elementType": "labels.text.fill"
                , "stylers": [
                    {
                        "color": "#101010"
					}
				]
			}
            , {
                "featureType": "administrative.country"
                , "elementType": "labels.text.fill"
                , "stylers": [
                    {
                        "lightness": "-30"
					}
				]
			}
            , {
                "featureType": "administrative.neighborhood"
                , "elementType": "geometry"
                , "stylers": [
                    {
                        "saturation": "-43"
					}
                    , {
                        "lightness": "-19"
					}
                    , {
                        "gamma": "1.87"
					}
				]
			}
            , {
                "featureType": "administrative.neighborhood"
                , "elementType": "labels.text"
                , "stylers": [
                    {
                        "weight": "3.96"
					}
                    , {
                        "gamma": "1.88"
					}
                    , {
                        "lightness": "-12"
					}
                    , {
                        "saturation": "-100"
					}
				]
			}
            , {
                "featureType": "landscape"
                , "elementType": "all"
                , "stylers": [
                    {
                        "color": "#f2f2f2"
					}
				]
			}
            , {
                "featureType": "poi"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "road"
                , "elementType": "all"
                , "stylers": [
                    {
                        "saturation": -100
					}
                    , {
                        "lightness": 45
					}
				]
			}
            , {
                "featureType": "road.highway"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "simplified"
					}
				]
			}
            , {
                "featureType": "road.arterial"
                , "elementType": "labels.icon"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "transit"
                , "elementType": "all"
                , "stylers": [
                    {
                        "visibility": "off"
					}
				]
			}
            , {
                "featureType": "water"
                , "elementType": "all"
                , "stylers": [
                    {
                        "color": "#101010"
					}
                    , {
                        "visibility": "on"
					}
				]
			}
            , {
                "featureType": "water"
                , "elementType": "geometry"
                , "stylers": [
                    {
                        "saturation": "9"
					}
                    , {
                        "color": "#BBBBBB"
					}
				]
			}
		]
    };
    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('annie-contactMap');
    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.707867, -74.008657)
        , map: map
        , title: 'San Mateo'
    });
}