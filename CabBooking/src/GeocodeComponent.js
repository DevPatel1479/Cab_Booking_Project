import React, { useEffect, useState } from 'react';

function GeocodeComponent() {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://geocode.search.hereapi.com/v1/geocode?q=Ahmedabad,India&limit=1&apiKey=Q1r25zwTmasSlZr62SRP91JsUtR5Q6G6-8dj_g_mcuI`
                );
                const data = await response.json();
                if (data.items && data.items.length > 0 && data.items[0].position) {
                    const { lat, lng } = data.items[0].position;
                    setCoordinates({ lat, lng });
                } else {
                    console.error('Invalid response data:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (coordinates) {
            const platform = new window.H.service.Platform({
                apikey: 'Q1r25zwTmasSlZr62SRP91JsUtR5Q6G6-8dj_g_mcuI'
            });
            const defaultLayers = platform.createDefaultLayers();
            const map = new window.H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
                center: coordinates,
                zoom: 14,
                pixelRatio: window.devicePixelRatio || 1
            });

            // Wait for the map to be fully loaded
            map.addEventListener('mapviewchangeend', () => {
                // Add a marker to the map
                const marker = new window.H.map.Marker(coordinates);
                map.addObject(marker);
            });

            return () => {
                map.dispose();
            };
        }
    }, [coordinates]);

    return (
        <div>
            {coordinates ? (
                <div>
                    <p>Latitude: {coordinates.lat}</p>
                    <p>Longitude: {coordinates.lng}</p>
                    <div id="map" style={{ width: '100%', height: '400px' }} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default GeocodeComponent;
