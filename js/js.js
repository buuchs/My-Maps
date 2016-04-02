var map;
var panel;
var initialize;
var calculate;
var direction;

$(document).ready(function() {
    new WOW().init();
    $('select').material_select();
});

function initMap() {
// Variable de style de la map
    var styles = [
        {
            stylers: [
                { hue: "#00ffe6" },
                { saturation: -20 }
            ]
        },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { lightness: 100 },
                { visibility: "simplified" }
            ]
        },{
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    // creer un nouveau StyledMapType
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(55.6468, 37.581),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.750000, lng: 4.850000},
        zoom: 8,
        fullscreenControl : true
}, mapOptions);

    direction = new google.maps.DirectionsRenderer({
        map   : map,
        panel : document.getElementById('panel'),
        draggable : true
    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));

    first = document.getElementById('origin');
    second = document.getElementById('destination');

    var searchBox = new google.maps.places.SearchBox(first, {
        bounds: defaultBounds
    });

    var searchBoxs = new google.maps.places.SearchBox(second, {
        bounds: defaultBounds
    });

    if(localStorage.getItem('panel') !== null){
        $('#save').val('Restore');
        $('.clear').html('<input id="reset" class="wow bounceInRight col s6 btn waves-effect waves-light red lighten-2" type="button" value="clear">');
    }else{
        $('#save').val('Save');
    }

    $('#reset').click(function(){
        localStorage.clear();
        window.location.reload();
    });

    $('#save').click(function(){
        var input = JSON.parse(localStorage.getItem('panel'));
        if(input !== null){
            $('#panel').html(localStorage.getItem('panel'));
        }else if($('#origin').val() !== null && $('#destination').val() !== null){
            localStorage.setItem('panel', JSON.stringify([
                panel = $('#panel').html()
            ]));
            window.location.reload();
        }
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
             };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Votre Position actuelle.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Erreur: le service de geolocalisation à echoué .' :
            'Erreur: Votre navigateur ne supporte pas la geolocalisation');
    }
    calculate = function(){
        var selectedMode = document.getElementById('mode').value;

        origin      = document.getElementById('origin').value; // Le point départ
        destination = document.getElementById('destination').value; // Le point d'arrivé
        if(document.getElementById('check').checked) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    origin = document.getElementById('origin').value = pos.lat + ', ' +  pos.lng;
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }

        if(origin && destination){
            var request = {
                origin      : origin,
                destination : destination,
                travelMode  : google.maps.TravelMode[selectedMode] // Type de transport
            };
            var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
            directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
                if(status == google.maps.DirectionsStatus.OK){
                    direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
                }
            });
        } //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
    };


    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}
