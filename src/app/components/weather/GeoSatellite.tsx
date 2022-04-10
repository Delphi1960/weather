import { styled } from '@mui/material/styles';
import React from 'react';

const Img = styled("img")({
  margin: 0,
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function GeoSatellite() {
  return (
    <Img
      alt="geo"
      src={
        "https://api.met.no/weatherapi/geosatellite/1.4/?area=europe&type=infrared&size=normal"
      }
    />
  );
}
