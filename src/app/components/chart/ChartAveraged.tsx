import { Grid } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { yrWeatherState } from '../../recoil/yr_weather.state'
import ChartAirPressure from './ChartAirPressure'
import ChartCloud from './ChartCloud'
import ChartHumidity from './ChartHumidity'
import ChartPrecipitationAmount from './ChartPrecipitationAmount'
import ChartTemperature from './ChartTemperature'
import ChartWind from './ChartWind'
import setDataForChart from './setDataForChart'

export default function ChartAveraged() {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const {
    dataTemperature,
    dataAirPressure,
    dataPrecip,
    dataWindSpeed,
    dataCloud,
    dataCloudIcon,
    dataAverageHumidity,
  }: any = setDataForChart(weatherData);
  return (
    <Grid container>
      <Grid item lg={4} sm={6} xs={12}>
        <ChartTemperature dataTemperature={dataTemperature} detail={false} />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartCloud
          dataCloud={dataCloud}
          dataCloudIcon={dataCloudIcon}
          detail={false}
        />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartWind dataWind={dataWindSpeed} detail={false} />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartPrecipitationAmount dataPrecip={dataPrecip} detail={false} />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartHumidity
          dataAverageHumidity={dataAverageHumidity}
          detail={false}
        />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartAirPressure dataPres={dataAirPressure} detail={false} />
      </Grid>
    </Grid>
  );
}
