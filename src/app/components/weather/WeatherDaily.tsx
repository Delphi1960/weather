import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import DailyReport from './DailyReport';
import GetWeatherApi from './GetWeatherApi';
import WeatherForecastDailyTable from './WeatherForecastDailyTable';
import { Icons } from './weathericon';
import WetherHourly from './WetherHourly';

type IconsKey = keyof typeof Icons;

export default function WeatherDaily() {
  GetWeatherApi();
  const loadWeather = useRecoilValue(yrWeatherState);

  // let date = new Date(loadWeather.daily[0].dt * 1000);
  // let dt = date.toLocaleString("ru-RU", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  //   weekday: "long",
  //   era: "long",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });
  console.log(loadWeather);

  const {
    minDayTemp,
    maxDayTemp,
    maxDayWind,
    // minDayWind,
    maxDayPrecip,
    averageHumidity,
    ico00,
    ico06,
    ico12,
    ico18,
  } = DailyReport();

  return (
    <Box>
      {loadWeather?.properties.timeseries
        .filter(function (item, ind) {
          let dt1;
          let dt2;
          if (ind === 0) {
            dt1 = new Date(loadWeather?.properties.timeseries[ind].time);
            return dt1.toLocaleDateString();
          } else {
            dt1 = new Date(loadWeather?.properties.timeseries[ind - 1].time);
          }
          dt2 = new Date(loadWeather?.properties.timeseries[ind].time);
          return dt1.toLocaleDateString() !== dt2.toLocaleDateString();
        })
        .map((daily, ind) => (
          <Box sx={{ width: "100%" }} key={ind}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WeatherForecastDailyTable
                  date={new Date(daily.time).toLocaleString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    weekday: "short",
                  })}
                  icon={[
                    Icons[ico00[ind] as IconsKey],
                    Icons[ico06[ind] as IconsKey],
                    Icons[ico12[ind] as IconsKey],
                    Icons[ico18[ind] as IconsKey],
                  ]}
                  tempMin={minDayTemp[ind]}
                  tempMax={maxDayTemp[ind]}
                  pricip={maxDayPrecip[ind]}
                  windMax={Math.round(maxDayWind[ind])}
                  // windMin={Math.round(minDayWind[ind])}

                  relative_humidity={Math.round(averageHumidity[ind])}
                  pres={Math.round(
                    daily.data.instant.details.air_pressure_at_sea_level * 0.75
                  )}
                />
              </AccordionSummary>

              <AccordionDetails>
                {/*================================ */}

                <WetherHourly dtDaily={daily.time} />

                {/*================================ */}
                <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                  Восход -
                  {/* {new Date(daily.sunrise * 1000).toLocaleString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })} */}
                  . Закат -
                  {/* {new Date(daily.sunset * 1000).toLocaleString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })} */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
    </Box>
  );
}
