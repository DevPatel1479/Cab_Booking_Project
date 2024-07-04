import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoadingScreen from './finding_driver';
import goImage from './images/go.png';
import autoImage from './images/auto.PNG';
import bikeImage from './images/bike.PNG';
import xlImage from './images/XL.jpeg';

const Uber = ({ distance }) => {
  const [selectedRide, setSelectedRide] = useState('Go Ride Go');
  const [currentTime, setCurrentTime] = useState('');
  const [isNight, setIsNight] = useState(false); // State to track whether it's night or day
  const [originalPrices, setOriginalPrices] = useState({}); // State to store original prices

  const rideOptions = [
    {
      name: 'Go Ride Go',
      time: getCurrentTime() + ' • 5 min', // Call function to get current time
      getPrice: () => '₹' + calculatePrice(distance, isNight, 4),
      getOriginalPrice: () => '₹' + getOriginalPrice('Go Ride Go', distance, isNight, 4),
      imgSrc: goImage,
      passengers: 4,
    },
    {
      name: 'Go Ride Auto',
      time: getCurrentTime() + ' • 1 min', // Call function to get current time
      getPrice: () => '₹' + calculatePrice(distance, isNight, 3),
      getOriginalPrice: () => '₹' + getOriginalPrice('Go Ride Auto', distance, isNight, 3),
      imgSrc: autoImage,
      passengers: 3,
    },
    {
      name: 'Go Ride Moto',
      time: getCurrentTime() + ' • 2 min', // Call function to get current time
      getPrice: () => '₹' + calculatePrice(distance, isNight, 1),
      getOriginalPrice: () => '₹' + getOriginalPrice('Go Ride Moto', distance, isNight, 1),
      imgSrc: bikeImage,
      passengers: 1,
    },
    {
      name: 'Go Ride XL',
      time: getCurrentTime() + ' • 10 min', // Call function to get current time
      getPrice: () => '₹' + calculatePrice(distance, isNight, 7),
      imgSrc: xlImage,
      passengers: 7,
    },
  ];

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure two digits
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    return `${hours}:${minutes}`;
  }

  // Function to calculate the price including adjustments for distance, time of day, and passengers
  function calculatePrice(distance, isNight, passengers) {
    const basePricePerKm = 10;
    const variabilityFactor = passengers * 15;
    let baseFare = distance * basePricePerKm + variabilityFactor;
  
    if (isNight) {
      baseFare *= 1.2; // Apply 20% surcharge for night time
    }
  
    if (distance < 5) {
      baseFare *= 0.8; // Apply 20% discount for distances under 5 km
    } else {
      baseFare *= 1.2; // Apply 20% premium for distances 5 km and above
    }
  
    return baseFare.toFixed(2); // Return rounded fare to two decimal places
  }
  
  function getOriginalPrice(name, distance, isNight, passengers) {
    // Check sessionStorage for existing price
    const storedPrice = sessionStorage.getItem(`${name}_${distance}_${isNight}_${passengers}`);
    if (storedPrice) {
      return storedPrice;
    }
  
    const basePrice = parseFloat(calculatePrice(distance, isNight, passengers)); // Parse the base price as float
  
    // Apply a fixed increment to simulate a higher original price
    const originalPrice = (basePrice * 1.25).toFixed(2); // Increase by 25% (adjust as needed)
  
    // Store in sessionStorage for future use
    sessionStorage.setItem(`${name}_${distance}_${isNight}_${passengers}`, originalPrice);
  
    return originalPrice;
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0'); // Ensure two digits
      const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
      setCurrentTime(`${hours}:${minutes}`);

      // Determine if it's night (for example, between 10 PM and 6 AM)
      const currentHour = now.getHours();
      setIsNight(currentHour < 6 || currentHour >= 22); // Assuming night is between 10 PM to 6 AM
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleSelectRide = (rideName) => {
    setSelectedRide(rideName);
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '20px auto',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      overflowY: 'auto',
      maxHeight: '70vh',
      boxSizing: 'border-box',
    },
    rideOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      marginBottom: '10px',
      cursor: 'pointer',
    },
    rideOptionSelected: {
      border: '2px solid black',
    },
    rideOptionImg: {
      width: '50px',
      height: 'auto',
      marginRight: '10px',
    },
    rideInfo: {
      flexGrow: 1,
    },
    rideInfoH3: {
      margin: 0,
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
    },
    rideInfoP: {
      margin: '5px 0',
      color: '#666',
    },
    rideInfoPrice: {
      fontSize: '1.2rem',
      color: 'green',
    },
    rideInfoOriginalPrice: {
      textDecoration: 'line-through',
      color: '#aaa',
    },
    passengerInfo: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      color: 'black',
    },
    passengerIcon: {
      marginRight: '5px',
    },
    chooseButton: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '10px', // Add space between the button and the container edge
    },
  };
  const handleOnClick = ()=>{
    console.log("button clicked... ");
    <LoadingScreen/>
  }
  return (
    <div style={styles.container}>
      {rideOptions.map((ride) => (
        <div
          key={ride.name}
          style={{
            ...styles.rideOption,
            ...(selectedRide === ride.name ? styles.rideOptionSelected : {}),
          }}
          onClick={() => handleSelectRide(ride.name)}
        >
          <img src={ride.imgSrc} alt={ride.name} style={styles.rideOptionImg} />
          <div style={styles.rideInfo}>
            <h3 style={styles.rideInfoH3}>
              {ride.name}
              <div style={styles.passengerInfo}>
                <FontAwesomeIcon icon={faUser} style={styles.passengerIcon} />
                <span>{ride.passengers}</span>
              </div>
            </h3>
            {ride.time && <p style={styles.rideInfoP}>{ride.time}</p>}
            <p style={styles.rideInfoP}>
              <span style={styles.rideInfoPrice}>{ride.getPrice()}</span>{' '}
              {ride.getOriginalPrice && (
                <span style={styles.rideInfoOriginalPrice}>{ride.getOriginalPrice()}</span>
              )}
            </p>
          </div>
        </div>
      ))}
      <button style={styles.chooseButton}   onClick={handleOnClick}>Request {selectedRide}</button>
    </div>
  );
};

export default Uber;
