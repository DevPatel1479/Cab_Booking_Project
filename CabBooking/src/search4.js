import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './search4.css';
import Uber from './uber';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Profile_Navbar } from './ProfileInNavbar';


function Maps() {
    const [map, setMap] = useState(null);
    const [pickupMarker, setPickupMarker] = useState(null);
    const [dropoffMarker, setDropoffMarker] = useState(null);
    const [pickupCoordinates, setPickupCoordinates] = useState(
        JSON.parse(sessionStorage.getItem('pickupCoordinates'))
    );
    const [dropoffCoordinates, setDropoffCoordinates] = useState(
        JSON.parse(sessionStorage.getItem('dropoffCoordinates'))
    );
    const [cabFare, setCabFare] = useState(0);
    const [distance, setDistance] = useState(null);
    const [pickupAddr, setPickupAddr] = useState(sessionStorage.getItem('pickupAddr') || '');
    const [dropoffAddr, setDropoffAddr] = useState(sessionStorage.getItem('dropoffAddr') || '');
    const mapContainer = useRef(null);
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");
    const [userProfile, setUserProfile] = useState(true);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (user_email){
                    
                    const response = await axios.post('http://localhost:3000/api/user_profile', { email: user_email });
                    setUserProfile(response.data);
    
                }

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        if (user_email) {
            fetchUserProfile();
        }
    }, [user_email]);    

    useEffect(() => {
        const TOKEN = process.env.REACT_APP_TOKEN;
        mapboxgl.accessToken = TOKEN;

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [72.5714, 23.0225],
            zoom: 11.5
        });

        mapInstance.addControl(new mapboxgl.NavigationControl());

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

        mapInstance.on('load', () => {
            setMap(mapInstance);

            const pickupGeocoder = new MapboxGeocoder({
                accessToken: TOKEN,
                countries: 'IN',
                bbox: [68.1, 20.8, 74.5, 24.7],
                mapboxgl: mapboxgl,
                placeholder: 'Search for pickup location'
            });
            pickupGeocoder.on('result', handlePickupSearchResult);

            const dropoffGeocoder = new MapboxGeocoder({
                accessToken: TOKEN,
                countries: 'IN',
                bbox: [68.1, 20.8, 74.5, 24.7],
                mapboxgl: mapboxgl,
                placeholder: 'Search for dropoff location'
            });
            dropoffGeocoder.on('result', handleDropoffSearchResult);

            document.getElementById('pickup-geocoder').appendChild(pickupGeocoder.onAdd(mapInstance));
            document.getElementById('dropoff-geocoder').appendChild(dropoffGeocoder.onAdd(mapInstance));

            // Set initial markers if coordinates exist in session storage
            if (pickupCoordinates) {
                setPickupLocation(pickupCoordinates);
                pickupGeocoder.setInput(pickupAddr);
            }

            if (dropoffCoordinates) {
                setDropoffLocation(dropoffCoordinates);
                dropoffGeocoder.setInput(dropoffAddr);
            }
        });

        return () => mapInstance.remove();
    }, []);

    useEffect(() => {
        // Check if map and coordinates are set before adding markers
        if (map && pickupCoordinates) {
            addPickupMarker(pickupCoordinates);
        }
        if (map && dropoffCoordinates) {
            addDropoffMarker(dropoffCoordinates);
        }
    }, [map, pickupCoordinates, dropoffCoordinates]);

    const handlePickupSearchResult = (event) => {
        const coordinates = event.result.geometry.coordinates;
        const address = event.result.place_name;
        setPickupAddr(address);
        sessionStorage.setItem('pickupAddr', address);
        setPickupLocation(coordinates);
    };

    const handleDropoffSearchResult = (event) => {
        const coordinates = event.result.geometry.coordinates;
        const address = event.result.place_name;
        setDropoffAddr(address);
        sessionStorage.setItem('dropoffAddr', address);
        setDropoffLocation(coordinates);
    };

    const setPickupLocation = (coordinates) => {
        setPickupCoordinates(coordinates);
        sessionStorage.setItem('pickupCoordinates', JSON.stringify(coordinates));

        if (map) {
            map.flyTo({ center: coordinates, zoom: 14 });
            addPickupMarker(coordinates);
        }

        if (coordinates && dropoffCoordinates) {
            drawRoute(coordinates, dropoffCoordinates);
        }
    };

    const setDropoffLocation = (coordinates) => {
        setDropoffCoordinates(coordinates);
        sessionStorage.setItem('dropoffCoordinates', JSON.stringify(coordinates));

        if (map) {
            map.flyTo({ center: coordinates, zoom: 14 });
            addDropoffMarker(coordinates);
        }

        if (pickupCoordinates && coordinates) {
            drawRoute(pickupCoordinates, coordinates);
        }
    };

    const addPickupMarker = (coordinates) => {
        if (pickupMarker) {
            pickupMarker.setLngLat(coordinates);
        } else {
            const newPickupMarker = new mapboxgl.Marker({ color: 'green', draggable: true })
                .setLngLat(coordinates)
                .addTo(map)
                .on('dragend', () => {
                    const lngLat = newPickupMarker.getLngLat();
                    setPickupLocation([lngLat.lng, lngLat.lat]);
                });
            setPickupMarker(newPickupMarker);
        }
    };

    const addDropoffMarker = (coordinates) => {
        if (dropoffMarker) {
            dropoffMarker.setLngLat(coordinates);
        } else {
            const newDropoffMarker = new mapboxgl.Marker({ color: 'red', draggable: true })
                .setLngLat(coordinates)
                .addTo(map)
                .on('dragend', () => {
                    const lngLat = newDropoffMarker.getLngLat();
                    setDropoffLocation([lngLat.lng, lngLat.lat]);
                });
            setDropoffMarker(newDropoffMarker);
        }
    };

    const drawRoute = (pickup, dropoff) => {
        if (!map) {
            console.error('Map instance is not available.');
            return;
        }
    
        const TOKEN = process.env.REACT_APP_TOKEN;
        const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.join(',')};${dropoff.join(',')}?geometries=geojson&access_token=${TOKEN}`;
    
        fetch(directionsRequest)
            .then(response => response.json())
            .then(data => {
                const route = data.routes[0].geometry;
    
                if (map.getSource('route')) {
                    map.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: route
                    });
                } else {
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route
                        }
                    });
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 5,
                            'line-opacity': 0.75
                        }
                    });
                }
    
                calculateFare(data.routes[0].distance);
            })
            .catch(error => {
                console.error('Error fetching directions:', error);
            });
    };
    

    const calculateFare = (distance) => {
        let fare = distance / 1000; // Example fare calculation
        setDistance(fare);
        setCabFare(fare.toFixed(2));
    };

    const handleCabSelection = () => {
        if (pickupCoordinates && dropoffCoordinates) {
            drawRoute(pickupCoordinates, dropoffCoordinates);
        }
    };

    return (
        <>
         {userProfile && user_email ? (
            // <NavbarProfile/>
            <Profile_Navbar profile = {userProfile}/>
      ) : (
        <Navbar/>
      )}

        <div className="container">
            <div ref={mapContainer} id="map"></div>
            <div className="search-container">
                <div className="geocoder-container" id="pickup-geocoder"></div>
                <div className="geocoder-container" id="dropoff-geocoder"></div>
                <div className="cab-selection">
                    <label>Select Cab Type:</label>
                    <div>
                        {handleCabSelection()}
                        <Uber distance={distance} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Maps;
