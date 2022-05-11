import { Storm } from '@mui/icons-material'
import ModeNight from '@mui/icons-material/ModeNight'
import StackedLineChart from '@mui/icons-material/StackedLineChart'
import Thermostat from '@mui/icons-material/Thermostat'
import WbSunny from '@mui/icons-material/WbSunny'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ListMenu(): ReactElement {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? "primary" : "inherit";
  const isActiveFontColor = (path: string) =>
    location.pathname === path ? "blue" : "secondary.color";

  return (
    <List>
      <ListItem
        button
        selected={location.pathname === "/"}
        component={Link}
        to="/"
      >
        <ListItemIcon>
          <WbSunny color={isActive("/")} />
        </ListItemIcon>
        <ListItemText
          primary={"Погода сейчас"}
          sx={{ color: isActiveFontColor("/") }}
        />
      </ListItem>

      {/* =============================================================================== */}
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/weathertable"}
        component={Link}
        to="/weathertable"
      >
        <ListItemIcon>
          <Thermostat color={isActive("/weathertable")} />
        </ListItemIcon>
        <ListItemText
          primary={"Прогноз погоды"}
          sx={{ color: isActiveFontColor("/weathertable") }}
        />
      </ListItem>

      {/* =============================================================================== */}
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/chart"}
        component={Link}
        to="/chart"
      >
        <ListItemIcon>
          <StackedLineChart color={isActive("/chart")} />
        </ListItemIcon>
        <ListItemText
          primary={"Графики"}
          sx={{ color: isActiveFontColor("/chart") }}
        />
      </ListItem>
      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/moonphase"}
        component={Link}
        to="/moonphase"
      >
        <ListItemIcon>
          <ModeNight color={isActive("/moonphase")} />
        </ListItemIcon>
        <ListItemText
          primary={"Лунный календарь"}
          sx={{ color: isActiveFontColor("/moonphase") }}
        />
      </ListItem>

      {/* =============================================================================== */}
      {/* =============================================================================== */}
      {/* <ListItem
        button
        selected={location.pathname === "/selectlocation"}
        component={Link}
        to="/selectlocation"
      >
        <ListItemIcon>
          <LocationOn color={isActive("/selectlocation")} />
        </ListItemIcon>
        <ListItemText
          primary={"Выбор места"}
          sx={{ color: isActiveFontColor("/selectlocation") }}
        />
      </ListItem> */}

      {/* =============================================================================== */}
      <ListItem
        button
        selected={location.pathname === "/geosatellite"}
        component={Link}
        to="/geosatellite"
      >
        <ListItemIcon>
          <Storm color={isActive("/geosatellite")} />
        </ListItemIcon>
        <ListItemText
          primary={"Геоспутник"}
          sx={{ color: isActiveFontColor("/geosatellite") }}
        />
      </ListItem>

      {/* =============================================================================== */}

      {/* =============================================================================== */}
    </List>
  );
}
