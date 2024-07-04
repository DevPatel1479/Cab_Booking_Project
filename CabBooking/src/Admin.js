import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import MapComponent from './MapComponent'; // Assuming you have a MapComponent to render the map
import './Admin.css'; // Assuming you have a CSS file for styling
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PassengerList from './PassengerDataInfo';


const Admin = () => {
  // Example data for bookings and cancellations
  
  const totalBookings = 350;
  const totalCancellations = 50;


  // Data for the pie chart
  const chartOptions = {
    labels: ['Bookings', 'Cancellations'],
    options: {
      colors: ['#36a2eb', '#ff6384'],
      legend: {
        show: true,
        position: 'bottom',
      },
    },
    series: [totalBookings, totalCancellations],
  };

  // State for user profile dropdown
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  // Toggle profile options dropdown
  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };
  return (
    <div className="admin-panel">

      <div className="menu-bar-left">
        <div className="menu-heading">
          <h3>Menu</h3>
        </div>
        <ul className="menu-list">
          <li>
            <Link to="/admin/passengers">Passenger Details</Link>
          </li>
          <li>
            <Link to="/admin/drivers">Driver Details</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </div>

      <div className="main-content">
        {/* User Profile Section */}
        <div className="user-profile">
          <div className="profile-icon" onClick={toggleProfileOptions}>
            <div className="profile-initial">D</div> {/* Replace with actual user's initial */}
            {showProfileOptions && (
              <div className="profile-options">
                <ul>
                  <li>
                    <Link to="/admin/profile">View Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Overview Section */}
        <div className="dashboard-overview">
          <h2>Dashboard Overview</h2>
          <div className="chart-container">
            <ReactApexChart
              options={chartOptions.options}
              series={chartOptions.series}
              type="pie"
              height={350}
            />
          </div>
          <div className="stats">
            <div className="stat-item">
              <span>Total Bookings: {totalBookings}</span>
            </div>
            <div className="stat-item">
              <span>Total Cancellations: {totalCancellations}</span>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ()=>{
    return (
        <div>
            <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/admin/passengers" element={<PassengerList/>} />
                <Route path="/admin/drivers" element={<MapComponent />} />
            </Routes>

        </div>


    );
}

export default AdminPanel;
