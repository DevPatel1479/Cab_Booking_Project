import React from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

const Dash_Navbar = () => {
  return (
    <Drawer variant="permanent">
      <Toolbar />
      <List>
        {['Dashboard', 'Drivers', 'Riders', 'Rides', 'Payment', 'Referral System', 'Promo Code', 'Reports'].map((text) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(' ', '-')}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Dash_Navbar;
