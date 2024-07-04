import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPlaces = () => {
  const [coords, setCoords] = useState(null);
  const [response, setResponse] = useState(null);
  const [getLocation, setLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        sendLocation({ latitude, longitude });
              
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getPhoneCoords();
    }, 1000); // Call getPhoneCoords every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  const sendLocation = async ({ latitude, longitude }) => {
    try {
      const response = await axios.post('https://28dd-2401-4900-3617-ee81-5c9d-1f6d-2b8f-8ecc.ngrok-free.app/update-location', {
        latitude,
        longitude,
      });
      
      console.log(response.data);
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  const getPhoneCoords = async()=>{
    try {
        const resp = await axios.get('http://localhost:3040/get-coordinates');
        
        setLocation(resp);
        setResponse(resp)
      } catch (error) {
        console.error('Error fetching phone coordinates:', error);
      }
  }

  return (
    <div>
      {coords && (
        <p>
          Latitude: {coords.latitude}, Longitude: {coords.longitude}
        </p>
      )}
      {getLocation && (
        <p>
          Response := Latitude: {getLocation.data.latitude} , Longitude : {getLocation.data.longitude}
        </p>
      )}
    </div>
  );
};

export default SearchPlaces;
