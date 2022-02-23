import { AccountBalance } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ListMenu(): ReactElement {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? "primary" : "inherit";
  const isActiveFontColor = (path: string) =>
    location.pathname === path ? "blue" : "secondary.color";

  return (
    <List>
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/"}
        component={Link}
        to="/"
      >
        <ListItemIcon>
          <AccountBalance color={isActive("/")} />
        </ListItemIcon>
        <ListItemText
          primary={"Кратко"}
          sx={{ color: isActiveFontColor("/") }}
        />
      </ListItem>

      {/* =============================================================================== */}

      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/WeatherForecast"}
        component={Link}
        to="/weather"
      >
        <ListItemIcon>
          <AccountBalance color={isActive("/WeatherForecast")} />
        </ListItemIcon>
        <ListItemText
          primary={"Подробно"}
          sx={{ color: isActiveFontColor("/WeatherForecast") }}
        />
      </ListItem>

      {/* =============================================================================== */}
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/WeatherTable"}
        component={Link}
        to="/weathertable"
      >
        <ListItemIcon>
          <AccountBalance color={isActive("/WeatherTable")} />
        </ListItemIcon>
        <ListItemText
          primary={"Таблица"}
          sx={{ color: isActiveFontColor("/WeatherTable") }}
        />
      </ListItem>

      {/* =============================================================================== */}

      {/* =============================================================================== */}
    </List>
  );
}
