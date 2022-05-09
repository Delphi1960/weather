import Box from '@mui/material/Box'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { nameLocation } from '../../recoil/location.state'
import { yrWeatherState } from '../../recoil/yr_weather.state'

export default function DisplayLocation() {
  const place = useRecoilValue(nameLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;

  return (
    <Box sx={{ ml: 2, mt: -2, mb: 1, textAlign: "left", fontSize: 16 }}>
      <Box component="span" sx={{ textAlign: "left", color: "black" }}>
        Location:{" "}
      </Box>
      <Box
        component="span"
        sx={{
          textAlign: "left",
          color: "blue",
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        <Link to="/selectlocation"> {place}</Link>
      </Box>{" "}
      <Box
        component="span"
        sx={{
          textAlign: "left",
          fontSize: 14,
        }}
      >
        ( Обновлено{" "}
        {new Date(weatherData.properties.meta.updated_at).toLocaleString(
          "ru-RU",
          {
            hour: "numeric",
            minute: "numeric",
          }
        )}
        ){"  "}
      </Box>
    </Box>
  );
}
