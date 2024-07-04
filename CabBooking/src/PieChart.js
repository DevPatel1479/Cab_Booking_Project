// PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ totalBookings, totalCancellations }) => {
  const data = {
    labels: ['Total Bookings', 'Total Cancellations'],
    datasets: [
      {
        data: [totalBookings, totalCancellations],
        backgroundColor: ['#36a2eb', '#ff6384'],
        hoverBackgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 20,
        fontSize: 12,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '300px', margin: 'auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
