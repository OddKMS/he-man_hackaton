console.log("Skeletor sucks.");

let map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    console.log("Set up map: ", map)
}
window.onload = initMap();