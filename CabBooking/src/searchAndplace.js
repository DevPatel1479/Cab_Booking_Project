import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './search4.css'; // Assuming you have custom CSS for styling
import axios from 'axios'; // Import axios for HTTP requests

function Maps() {
    const [map, setMap] = useState(null);
    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const pickupMarker = useRef(null);
    const mapContainer = useRef(null);

    useEffect(() => {
        const TOKEN = process.env.REACT_APP_TOKEN;
        mapboxgl.accessToken = TOKEN;

        const initializeMap = () => {
            const storedMapState = sessionStorage.getItem('mapState');
            let initialCenter = [72.5714, 23.0225];
            let initialZoom = 11.5;

            if (storedMapState) {
                try {
                    const parsedState = JSON.parse(storedMapState);
                    initialCenter = parsedState.center;
                    initialZoom = parsedState.zoom;
                } catch (error) {
                    console.error('Error parsing stored map state:', error);
                }
            }

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: initialCenter,
                zoom: initialZoom
            });

            mapInstance.on('load', () => {
                setMap(mapInstance);

                // Add navigation control
                mapInstance.addControl(new mapboxgl.NavigationControl());

                // Add geolocate control
                const geolocate = new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true,
                    showUserHeading: true
                });
                mapInstance.addControl(geolocate);

                geolocate.on('geolocate', (e) => {
                    const { latitude, longitude } = e.coords;
                    setPickupLocation([longitude, latitude]);
                });

                // Set initial pickup location as the map center
                const initialCoordinates = mapInstance.getCenter().toArray();
                setPickupLocation(initialCoordinates);

                // Add marker for pickup location
                pickupMarker.current = new mapboxgl.Marker({ color: 'green' })
                    .setLngLat(initialCoordinates)
                    .addTo(mapInstance);
            });

            return mapInstance;
        };

        const mapInstance = initializeMap();

        return () => {
            if (mapInstance) {
                mapInstance.remove();
                // Save map state to sessionStorage when unmounting
                const mapState = {
                    center: mapInstance.getCenter().toArray(),
                    zoom: mapInstance.getZoom()
                };
                sessionStorage.setItem('mapState', JSON.stringify(mapState));
            }
        };
    }, []);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setPickupLocation([longitude, latitude]);
                sendLocation({ latitude, longitude });
            },
            (error) => console.error('Error obtaining geolocation:', error),
            { enableHighAccuracy: true }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getPhoneCoords();
        }, 1000); // Fetch phone coordinates every 5 seconds (adjust as needed)

        return () => clearInterval(intervalId);
    }, []);

    const sendLocation = async ({ latitude, longitude }) => {
        try {
            const response = await axios.post('https://c7ea-103-240-204-117.ngrok-free.app/update-location', {
                latitude,
                longitude,
            });

            console.log('Sent location:', response.data);
        } catch (error) {
            console.error('Error sending location:', error);
        }
    };

    const getPhoneCoords = async () => {
        try {
            const resp = await axios.get('http://localhost:3040/get-coordinates');
            setPickupLocation([resp.data.longitude, resp.data.latitude]);
            console.log('Fetched coordinates:', resp.data);
        } catch (error) {
            console.error('Error fetching phone coordinates:', error);
        }
    };

    const setPickupLocation = (coordinates) => {
        setPickupCoordinates(coordinates);
        console.log('Setting pickup location to:', coordinates);
        console.log(map);
        if (map && pickupMarker.current) {
            pickupMarker.current.setLngLat(coordinates);
        } else if (map) {
            pickupMarker.current = new mapboxgl.Marker({ color: 'green' })
                .setLngLat(coordinates)
                .addTo(map);
        }
    };

    return (
        <div className="container">
            <div ref={mapContainer} id="map" style={{ width: '100%', height: '100vh' }}></div>
        </div>
    );
}

export default Maps;
