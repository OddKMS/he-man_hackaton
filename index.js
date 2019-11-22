import {styledMap} from './styledMap';

console.log("Skeletor sucks.");

let map;
function initMap() {
    const userPosition = findUser();
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
    try {
    // Try HTML5 geolocation.
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
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
    } catch (error) {
            handleLocationError(false, infoWindow, map.getCenter());
    }

}

function setup() {
    /**
     * Buttons
     */
    document.getElementById('btn-location').addEventListener('click', () => {
        console.log('whoami')
        findUser();
    })
}