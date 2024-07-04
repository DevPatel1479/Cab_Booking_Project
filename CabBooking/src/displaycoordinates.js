import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('https://7b39-43-250-157-64.ngrok-free.app');

const DisplayCoordinates = () => {
  const [latitude, setLatitude] = useState('Waiting for coordinates...');
  const [longitude, setLongitude] = useState('Waiting for coordinates...');

  useEffect(() => {
    socket.on('receiveCoordinates', (data) => {
      setLatitude(data.latitude);
      setLongitude(data.longitude);
    });

    return () => {
      socket.off('receiveCoordinates');
    };
  }, []);

  return (
    <div>
      <h1>Driver's Current Location:</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
    </div>
  );
};

export default DisplayCoordinates;
