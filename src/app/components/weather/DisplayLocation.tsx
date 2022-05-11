import Box from '@mui/material/Box'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { nameLocation } from '../../recoil/location.state'
import { yrWeatherState } from '../../recoil/yr_weather.state'
import SelectLocationMenu from '../select-location/SelectLocationMenu'

export default function DisplayLocation() {
  const place = useRecoilValue(nameLocation);
  // const coord = useRecoilValue(coordLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;
  // console.log(coord, place);
  return (
    <Box sx={{ ml: 2, mt: -2, mb: 1, textAlign: "left" }}>
      {/* <Box component="span" sx={{ textAlign: "left", color: "black" }}>
        Location:{" "}
      </Box> */}
      <Box
        component="span"
        sx={{
          textAlign: "left",
          color: "blue",
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        <SelectLocationMenu place={place} />
      </Box>
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
