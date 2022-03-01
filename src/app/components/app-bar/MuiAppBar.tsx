import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { drawerState } from '../../recoil/drawer.state';
import Drawer from '../drawer/Drawer';

export default function MuiAppBar() {
  const [isDrawerOpen, setDrawerIsOpen] = useRecoilState(drawerState);
  const handleToggleDrawer = () => setDrawerIsOpen(!isDrawerOpen);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const handleCurrentClick = () => {
    navigate("/");
  };
  const handleDaylyClick = () => {
    navigate("/weathertable");
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

          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={handleCurrentClick}>
              сейчас
            </Button>
            <Button color="inherit" onClick={handleDaylyClick}>
              прогноз
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Tooltip title="Location search">
            <IconButton
              size="large"
              aria-label="search"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleSearch}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Поиск места</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  );
}
