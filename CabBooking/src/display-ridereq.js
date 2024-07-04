import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayRideRequest = () => {
  const [rideRequests, setRideRequests] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideRequests = async () => {
      setLoading(true); // Set loading to true before API call
      try {
        const response = await axios.get('http://192.168.0.128:9800/api/get-ride-requests');
        console.log(response.data.numberOfNodes);
        setRideRequests(response.data.numberOfNodes);
      } catch (error) {
        console.error('Error fetching ride requests:', error);
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    // Fetch ride requests initially
    fetchRideRequests();

    // Fetch ride requests every 5 seconds
    const interval = setInterval(fetchRideRequests, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Ride Requests</h1>
      {rideRequests ? (
        <ul>
          <p>Number of rides request: {rideRequests}</p>
        </ul>
      ) : (
        <p>No ride requests available</p>
      )}
    </div>
  );
};

export default DisplayRideRequest;
