import { LocationOn } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/system'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { nameLocation } from '../../recoil/location.state'
import { coordLocation } from '../../recoil/yr_weather.state'
import { LocalStorageManager } from '../../utils/localStorage'
import { searchLocation } from './ua_cities'

type Place = {
  place: string;
};

export default function SelectLocation1({ place }: Place) {
  const navigate = useNavigate();

  const setItemValue = useSetRecoilState(nameLocation);
  const setCoord = useSetRecoilState(coordLocation);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log();
    setAnchorEl(null);
  };
  const addMap = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setItemValue(value);
    LocalStorageManager.setItem("location", value);
    handleClose();
    const coord = searchLocation.find((city) => city.location === value)?.coord;
    if (coord !== undefined) {
      LocalStorageManager.setItem("coord", coord);
      setCoord(coord);
      navigate("/");
    }
  };
  const sortLocation = searchLocation.sort((a, b) =>
    a.location > b.location ? 1 : -1
  );
  // console.log(sortLocation);
  const options = sortLocation.map((city) => city.location);

  return (
    <>
      <Tooltip title="Select location">
        <IconButton
          size="large"
          aria-label="search"
          color="inherit"
          onClick={handleClick}
        >
          <LocationOn />
          <Box component="span" sx={{ fontSize: 16, fontWeight: "bold" }}>
            {place}
          </Box>
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: "auto",
            width: "auto",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Одесса"}
            onClick={(e) => addMap(e, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
