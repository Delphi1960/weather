import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { drawerState } from '../../recoil/drawer.state';
import Drawer from '../drawer/Drawer';

export default function MuiAppBar() {
  const [isDrawerOpen, setDrawerIsOpen] = useRecoilState(drawerState);
  const handleToggleDrawer = () => setDrawerIsOpen(!isDrawerOpen);

  const navigate = useNavigate();
  const handleCurrentClick = () => {
    navigate("/");
  };
  const handleDaylyClick = () => {
    navigate("/weathertable");
  };
  const handleChartClick = () => {
    navigate("/chart");
  };

  const location = useLocation();
  const isActiveFontColor = (path: string) =>
    location.pathname === path ? "yellow" : "white";

  const handleClickLocation = () => {
    navigate("/selectlocation");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleToggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Button
              onClick={handleCurrentClick}
              sx={{
                color: isActiveFontColor("/"),
                display: "block",
              }}
            >
              сейчас
            </Button>
            <Button
              onClick={handleDaylyClick}
              sx={{
                color: isActiveFontColor("/weathertable"),
                display: "block",
              }}
            >
              прогноз
            </Button>
            <Button
              onClick={handleChartClick}
              sx={{
                color: isActiveFontColor("/chart"),
                display: "block",
              }}
            >
              график
            </Button>
          </Box>
          <Tooltip title="Select location">
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={handleClickLocation}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  );
}
