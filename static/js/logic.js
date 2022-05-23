// Add console.log to check to see if our code is working
console.log("Working!"); 

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    "Streets": streets,
    "Satellite": satellite
};

// Create the map object with the center and zoom level
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/ipbrieske/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//styling the neighborhood borders
var myStyle = {
    "color": "blue", 
    "fillColor": "yellow", 
    "opacity": 0.5, 
    "weight": 1, 
    "stroke": "black"
};

//Grabbing our GeoJSON Data
d3.json(torontoHoods).then(function(data) {
    console.log(data.features);
    //Creating a GeoJSON layer with the retrieved data
    for (var i = 0; i < data.features.length; i++) {
        L.geoJSON(data.features[i], {
            style: myStyle
        })
        .bindPopup("<h3>Neighborhood: " + data.features[i].properties.AREA_NAME)
        .addTo(map);
    };
});

// Then we add our controller with map layers
L.control.layers(baseMaps).addTo(map);