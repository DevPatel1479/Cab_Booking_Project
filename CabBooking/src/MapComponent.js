import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Mapbox token (replace with your own token)
mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [72.5714, 23.0225], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });

    // Add navigation control (optional)
    map.addControl(new mapboxgl.NavigationControl());

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default MapComponent;
