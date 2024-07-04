// PassengerList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PassengerList.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);

  useEffect(() => {
    // Fetching data from API using Axios
    axios.get('http://localhost:4050/passenger_details')
      .then((response) => {
        if (response.data && typeof response.data === 'object') {
          const passengersArray = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key]
          }));
          setPassengers(passengersArray); // Set passengers state with fetched data
        } else {
          console.error('Unexpected data format received:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching passenger data: ', error);
      });
  }, []);

  const openPassengerInfo = (passenger) => {
    setSelectedPassenger(passenger);
  };

  const closePassengerInfo = () => {
    setSelectedPassenger(null);
  };

  return (
    <div className="passenger-list">
      <h2>Passenger List</h2>
      <div className="passenger-container">
        {passengers.length > 0 ? (
          passengers.map((passenger) => (
            <div className="passenger-box" key={passenger.id}>
              <div className="passenger-content">
                <div className="profile-image">
                  {passenger.profilePhoto ? (
                    <img src={passenger.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '80px', color: '#ccc' }} />
                  )}
                </div>
                <div className="passenger-details">
                  <p><span className="bold">Name:</span> {passenger.name}</p>
                  <button className="info-button" onClick={() => openPassengerInfo(passenger)}>
                    View Full Info
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {selectedPassenger && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePassengerInfo}>&times;</span>
            <div className="profile-image">
              {selectedPassenger.profilePhoto ? (
                <img src={selectedPassenger.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '80px', color: '#ccc' }} />
              )}
            </div>
            <p><span className="bold">Name:</span> {selectedPassenger.name}</p>
            <p><span className="bold">Email:</span> {selectedPassenger.email}</p>
            <p><span className="bold">Phone Number:</span> {selectedPassenger.phoneNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerList;
