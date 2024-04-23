import React, { useState } from 'react';

function RidePlanner() {
  const [pickupLocation, setPickupLocation] = useState('');

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  return (
    <div>
      <h2>Plan your ride</h2>
      <div>
        <label htmlFor="pickupLocation">Pickup now</label>
        <input
          type="text"
          id="pickupLocation"
          value={pickupLocation}
          onChange={handlePickupLocationChange}
          placeholder="Enter pickup location"
        />
      </div>
      <div>
        <label htmlFor="forMe">For me</label>
        <input type="checkbox" id="forMe" />
      </div>
      <div>
        {/* Here you can render the list of locations dynamically */}
        {/* For simplicity, I'm just showing a static list */}
        <ul>
          <li>Airport School</li>
          <li>Jalaram Hospital</li>
          {/* Add more locations as needed */}
        </ul>
      </div>
      {/* You can add more elements like buttons, maps, etc. */}
    </div>
  );
}
export default RidePlanner;