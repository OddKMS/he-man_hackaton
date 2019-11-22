import {styledMap} from './styledMap';

console.log("Skeletor sucks.");

let map;
let markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        styles: styledMap
    });

    var icons = {
        atm : {
            icon : 'markers/atm.svg'
        },
        dnb : {
            icon : 'markers/dnb.svg'
        }
    };

    console.log("Set up map: ", map);
    setup();
}
window.onload = initMap();

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function findUser() {
    let infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        // Try HTML5 geolocation.
        navigator.geolocation.getCurrentPosition(function(position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('I\'m guessing your position to be here.');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(14);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function findATMs() {
    const lat = map.getBounds().getNorthEast().lat();
    const lng = map.getBounds().getSouthWest().lng();
    const position = new google.maps.LatLng(lat,lng);
    const request = {
        location: position,
        radius: '2000',
        type: ['atm']
    };
    let service;
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                const place = {
                    lat: results[i].geometry.location.lat(),
                    lng: results[i].geometry.location.lng(),
                } ;
                console.log(place);
                markers.push(new google.maps.Marker({position: place, map: map}));
            }
        }
    }
}

function setup() {
    /**
     * Buttons
     */
    document.getElementById('btn-location').addEventListener('click', () => {
        console.log('whoami');
        findUser();
    });

    document.getElementById('btn-atms').addEventListener('click', () => {
        console.log('nearby atms');
        findATMs();
    });
}