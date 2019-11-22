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

    console.log("Set up map: ", map);
    setup();

    findUser();
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

var infowindow = new google.maps.InfoWindow({
    content: ""
});

function findATMs(listener) {
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
                console.log(results[i])
                let marker = new google.maps.Marker({
                    title: results[i].name,
                    address: results[i].vicinity,
                    position: place,
                    map: map,
                    icon: {
                        anchor: new google.maps.Point(16, 16),
                        url: 'data:image/svg+xml;utf-8, \
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="64" height="64" viewBox="0 0 24 24"> \
                            <path fill="white" stroke="yellow" stroke-width=".1" d="M8,9V10.5H10.25V15H11.75V10.5H14V9H8M6,9H3A1,1 0 0,0 2,10V15H3.5V13.5H5.5V15H7V10A1,1 0 0,0 6,9M5.5,12H3.5V10.5H5.5V12M21,9H16.5A1,1 0 0,0 15.5,10V15H17V10.5H18V14H19.5V10.5H20.5V15H22V10A1,1 0 0,0 21,9Z" /> \
                          </svg>'
                    }
                });
                marker.addListener('click', function() {
                    infowindow.setContent(marker.title + ' ' + marker.address)
                    infowindow.open(map, marker);
                });
                markers.push(marker);
            }
        }
    }
}

function findBankBranches() {
    const lat = map.getBounds().getCenter().lat();
    const lng = map.getBounds().getCenter().lng();
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
                console.log(results[i]);
                const marker = new google.maps.Marker({
                    title: results[i].name,
                    address: results[i].vicinity,
                    position: place,
                    map: map,
                    icon: {
                        anchor: new google.maps.Point(16, 16),
                        url: 'data:image/svg+xml;utf-8, \
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 93.0362 64" width="100" height="80"> \
                            <path fill="white" stroke="yellow" d="M89.668 31.9442a10.6487 10.6487 0 0 0-1.8465-1.2184l-.178-.0887.1554-.1337a8.7063 8.7063 0 0 0 2.7652-6.848c-.006-3.3331-1.1437-5.82-3.413-7.3936-1.9135-1.3528-4.5588-2.0142-8.092-2.0079l-10.1326.0182a1.081 1.081 0 0 0-1.0645 1.0685l.0597 33.2203a1.0667 1.0667 0 0 0 1.0685 1.0646l11.577-.0208c3.644-.0065 6.5758-.7897 8.684-2.3266a8.6558 8.6558 0 0 0 2.7937-3.4054 11.2675 11.2675 0 0 0 .9913-4.868 8.967 8.967 0 0 0-3.3681-7.0605zM71.1547 17.5795l7.9106-.0142q4.1997-.0076 6.202 1.3885c.8454.5985 2.003 1.752 2.0083 4.7074.0095 5.2883-4.1672 5.7179-5.4338 5.7201l-10.6659.0192zm9.4066 28.7366l-9.355.0168-.0244-13.6438 10.6659-.0191c4.6219-.0083 7.8707 2.6072 7.8774 6.3407.0033 1.8.0131 7.289-9.1639 7.3054z" /> \
                            <path fill="white" stroke="yellow" d="M22.4948 19.6221a14.0642 14.0642 0 0 0-5.5848-4.101 16.8443 16.8443 0 0 0-6.2238-1.1443l-9.6215.0173A1.086 1.086 0 0 0 0 15.4853L.0597 48.683a1.0668 1.0668 0 0 0 1.0686 1.0646l9.6214-.0173a16.3939 16.3939 0 0 0 6.2197-1.1667 13.8015 13.8015 0 0 0 5.57-4.0994c3.3924-4.1833 3.894-9.4508 3.889-12.2284-.0043-2.3544-.3927-8.2876-3.9336-12.6136zm-2.5144 22.758a11.615 11.615 0 0 1-9.2366 4.0615l-7.3773.0133-.0516-28.7535 7.3772-.0132a11.5412 11.5412 0 0 1 9.2512 4.0271c2.9396 3.5948 3.1714 8.9716 3.1742 10.5264.0042 2.3338-.3878 6.7559-3.137 10.1384z" /> \
                            <path fill="white" stroke="yellow" d="M59.9016 0l.0877 48.7976a.9801.9801 0 0 1-.6872.956.7852.7852 0 0 1-.311.0678 1.011 1.011 0 0 1-.8229-.4217L36.3643 21.7303l.076 42.2638L33.1294 64l-.0879-48.9083a.9989.9989 0 0 1 .7094-.956.706.706 0 0 1 .311-.045 1.0218 1.0218 0 0 1 .8229.3978l21.8038 27.6922L56.6128.0059z" /> \
                            </svg>'
                    }
                });
                marker.addListener('click', function() {
                    infowindow.setContent(marker.title + ' ' + marker.address)
                    infowindow.open(map, marker);
                });
                markers.push(marker);
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