import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import {Link} from 'react-router-dom';
let theme = window.localStorage.getItem("theme")
export const mainListItems = (

  <div>
    <Link to="/dashboard" style={{textDecoration: 'none', color: theme === "dark" ? 'white' : 'black'}}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
   <Link to='/customers' style={{textDecoration: 'none', color: theme === "dark" ? 'white' : 'black'}}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
   </Link>
   <Link to="/product" style={{textDecoration: 'none', color: theme === "dark" ? 'white' : 'black'}}>
    <ListItem button>
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
   </Link>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Settings</ListSubheader>

    <Link to="/users" style={{textDecoration: 'none',color: theme === "dark" ? 'white' : 'black'}}>
    <ListItem button href="/users">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);
