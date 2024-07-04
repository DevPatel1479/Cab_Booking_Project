// BookRide.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './BookRide.css';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import {Profile_Navbar} from './ProfileInNavbar';
import axios from 'axios';


const BookRide = () => {
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropoffLocation, setDropoffLocation] = useState(null);
    const mapContainer = useRef(null);
    const pickupGeocoderRef = useRef(null);
    const dropoffGeocoderRef = useRef(null);
    const [userProfile, setUserProfile] = useState(true);
    const navigate = useNavigate();
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");

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
        mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

        const initializeMap = () => {
            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [72.5714, 23.0225],
                zoom: 11.5
            });

            mapInstance.addControl(new mapboxgl.NavigationControl());

            mapInstance.on('load', () => {
                const pickupGeocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    countries: 'IN',
                    bbox: [68.1, 20.8, 74.5, 24.7],
                    mapboxgl: mapboxgl,
                    placeholder: 'Search for pickup location'
                });
                pickupGeocoder.on('result', handlePickupSearchResult);
                pickupGeocoder.on('error', (error) => {
                    console.error('Pickup Geocoder Error:', error);
                });

                const dropoffGeocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    countries: 'IN',
                    bbox: [68.1, 20.8, 74.5, 24.7],
                    mapboxgl: mapboxgl,
                    placeholder: 'Search for dropoff location'
                });
                dropoffGeocoder.on('result', handleDropoffSearchResult);
                dropoffGeocoder.on('error', (error) => {
                    console.error('Dropoff Geocoder Error:', error);
                });

                pickupGeocoderRef.current = pickupGeocoder;
                dropoffGeocoderRef.current = dropoffGeocoder;

                const pickupGeocoderContainer = document.getElementById('pickup-geocoder');
                const dropoffGeocoderContainer = document.getElementById('dropoff-geocoder');

                if (pickupGeocoderContainer && !pickupGeocoderContainer.hasChildNodes()) {
                    pickupGeocoderContainer.appendChild(pickupGeocoder.onAdd(mapInstance));
                }

                if (dropoffGeocoderContainer && !dropoffGeocoderContainer.hasChildNodes()) {
                    dropoffGeocoderContainer.appendChild(dropoffGeocoder.onAdd(mapInstance));
                }
            });

            return () => mapInstance.remove();
        };

        initializeMap();
    }, []);

    const handlePickupSearchResult = (event) => {
        const coordinates = event.result.geometry.coordinates;
        setPickupLocation(coordinates);
        sessionStorage.setItem('pickupCoordinates', JSON.stringify(coordinates));
        sessionStorage.setItem('pickupAddr', event.result.place_name);
    };

    const handleDropoffSearchResult = (event) => {
        const coordinates = event.result.geometry.coordinates;
        setDropoffLocation(coordinates);
        sessionStorage.setItem('dropoffCoordinates', JSON.stringify(coordinates));
        sessionStorage.setItem('dropoffAddr', event.result.place_name);
    };

    const handleSeePrices = () => {
        const cookie = new Cookies();
        const user_email = cookie.get("userEmail");
        console.log(user_email);
        if (user_email === undefined){
            navigate('/login/passenger');
        }
        else{
            navigate('/book-ride/request-cab');
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


        <div className="content" style={{backgroundColor : 'black'}}>
             
            <div className="booking-container">
                <div className="booking-form">
                    <h2>Book a Ride</h2>
                    <div id="pickup-geocoder" className="geocoder-container" />
                    <div id="dropoff-geocoder" className="geocoder-container" />
                    <button type="button" className="submit-button" onClick={handleSeePrices}>
                        See Prices
                    </button>
                </div>
                <div className="image-container">
                    <img src={require('./Passenger_img.png')} alt="Ride" className="ride-image" />
                </div>
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
        </>
    );
};

export default BookRide;
