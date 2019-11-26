// API used - Leaflet

// weather info (bottom panel)
var icon = new Skycons({color: '#222'})
const statusElement = document.querySelector('[data-status]')
const locationElement = document.querySelector('[data-location]')
const temperatureElement = document.querySelector('[data-temperature]')
const windElement = document.querySelector('[data-wind]')
const humidityElement = document.querySelector('[data-humidity]')

// tile layer
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl_one = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const tileUrl_two = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png';

// Initialize the map
var latitude = 0;
var longitude = 0;
var zoomLevel = 5; // (0 - zoomed out, -18 - zoomed in)

var map = L.map('map', {
    center: [latitude, longitude],
    zoom: zoomLevel 
});

L.control.scale().addTo(map);
var marker = L.marker([latitude, longitude]).addTo(map); // Set the marker

// Add tile to the map
var tiles = L.tileLayer(tileUrl_one, {attribution});
tiles.addTo(map);

icon.set('weatherIcon', 'clear-day')
icon.play()

// Create Search Box & add on top of the map
var searchControl = new L.esri.Controls.Geosearch().addTo(map);
var results = new L.LayerGroup().addTo(map);

searchControl.on('results', function(data){
    results.clearLayers();

    // only display the first result
    const place = data.results[0].address;
    latitude = data.results[0].latlng.lat;
    longitude = data.results[0].latlng.lng;

    marker.setLatLng([latitude, longitude]); // Refresh marker position
    map.setView([latitude, longitude], 15) // Refresh map center position

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place)
        saveWeatherData(data, place)
    })
});

function setWeatherData(data, place){
    locationElement.textContent = place
    statusElement.textContent = data.summary
    temperatureElement.textContent = data.temperature
    windElement.textContent = data.windSpeed
    humidityElement.textContent = data.humidity
    icon.set('weatherIcon', data.icon)
    icon.play()
}

function saveWeatherData() {

}

function deleteWeatherData() {
    
}