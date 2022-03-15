import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { drawerState } from '../../recoil/drawer.state';
import { buttonOkLocation, coordLocation } from '../../recoil/yr_weather.state';
import Drawer from '../drawer/Drawer';
import SelectLocation from '../weather/SelectLocation';

export default function MuiAppBar() {
  const [isDrawerOpen, setDrawerIsOpen] = useRecoilState(drawerState);
  const buttonOkState = useRecoilValue(buttonOkLocation);
  const coord = useRecoilValue(coordLocation);
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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleOk = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
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
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={handleClickOpen}
          >
            <SearchIcon />
          </IconButton>

          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Find locations</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                <SelectLocation />
              </Box>
              <Typography variant="body2">{coord}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleOk} disabled={buttonOkState}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  );
}
