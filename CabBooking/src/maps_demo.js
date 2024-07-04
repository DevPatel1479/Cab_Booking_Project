import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');

    if (mapContainer._leaflet_id) {
      mapContainer._leaflet_id = null; // Clear the map container
    }

    // Create a map instance
    const map = L.map('map').setView([0, 0], 13); // Set default view to (0, 0)

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Get current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const source = [latitude, longitude];
        const destination = [latitude + 0.1, longitude + 0.1]; // Example destination

        // Set map view to current position
        map.setView([latitude, longitude], 13);

        // Add source marker with custom icon
        const sourceIcon = L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        L.marker(source, { icon: sourceIcon }).addTo(map)
          .bindPopup('You are here')
          .openPopup();

        // Add destination marker with custom icon
        const destinationIcon = L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        L.marker(destination, { icon: destinationIcon }).addTo(map)
          .bindPopup('Destination')
          .openPopup();

        // Add routing control
        L.Routing.control({
          waypoints: [
            L.latLng(source[0], source[1]),
            L.latLng(destination[0], destination[1])
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: 'blue', opacity: 0.8, weight: 5 }]
          },
          createMarker: function () { return null; } // Function that returns null to prevent marker creation
        }).addTo(map);

        // Hide route selection box using CSS
        const routeContainer = document.querySelector('.leaflet-routing-container');
        if (routeContainer) {
          routeContainer.style.display = 'none';
        }
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
