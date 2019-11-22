import {styledMap} from './styledMap';

console.log("Skeletor sucks.");

let map;
let markers = [];

var icons = {
    atm : {
        icon : './markers/atm.svg'
    },
    dnb : {
        icon : 'markers/dnb.svg'
    }
};

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
    const lat = map.getBounds().getCenter().lat();
    const lng = map.getBounds().getCenter().lng();
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

            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            for (let i = 0; i < results.length; i++) {
                const place = {
                    lat: results[i].geometry.location.lat(),
                    lng: results[i].geometry.location.lng(),
                };
                console.log(results[i]);
                markers.push(new google.maps.Marker({
                    position: place,
                    map: map,
                    icon: {
                        anchor: new google.maps.Point(16, 16),
                        url: 'data:image/svg+xml;utf-8, \
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="64" height="64" viewBox="0 0 24 24"> \
                            <path fill="white" stroke="yellow" stroke-width=".5" d="M8,9V10.5H10.25V15H11.75V10.5H14V9H8M6,9H3A1,1 0 0,0 2,10V15H3.5V13.5H5.5V15H7V10A1,1 0 0,0 6,9M5.5,12H3.5V10.5H5.5V12M21,9H16.5A1,1 0 0,0 15.5,10V15H17V10.5H18V14H19.5V10.5H20.5V15H22V10A1,1 0 0,0 21,9Z" /> \
                          </svg>'
                    }
                }));
            }
        }
    }
}

function findBankBranches() {
    const lat = map.getBounds().getNorthEast().lat();
    const lng = map.getBounds().getSouthWest().lng();
    const position = new google.maps.LatLng(lat,lng);
    const request = {
        location: position,
        radius: '2000',
        name: 'DNB'
    };
    let service;
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            for (let i = 0; i < results.length; i++) {
                const place = {
                    lat: results[i].geometry.location.lat(),
                    lng: results[i].geometry.location.lng(),
                } ;
                console.log(place);
                markers.push(new google.maps.Marker({
                    position: place,
                    map: map
                }));
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

    document.getElementById('btn-branches').addEventListener('click', () => {
        console.log('nearby branches');
        findBankBranches();
    });
}