import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Book Trips</Typography>
            <Typography variant="h4">1486</Typography>
            <Typography variant="body2" color="success.main">+36.59%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Cancelled Trips</Typography>
            <Typography variant="h4">247</Typography>
            <Typography variant="body2" color="error.main">-14.74%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Available Cars</Typography>
            <Typography variant="h4">30</Typography>
            <Typography variant="body2" color="success.main">+13.08%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Total Earning</Typography>
            <Typography variant="h4">$33,493</Typography>
            <Typography variant="body2" color="success.main">+47.82%</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Active Drivers By Time</Typography>
        <Paper sx={{ padding: 2 }}>
          {/* Insert your chart component here */}
          <Typography>Chart goes here</Typography>
        </Paper>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Map</Typography>
        <Paper sx={{ padding: 2 }}>
          {/* Insert your map component here */}
          <Typography>Map goes here</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
