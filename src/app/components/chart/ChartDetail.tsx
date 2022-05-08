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
import setDataForChartDetail from './setDataForChartDetail'

type DateProp = {
  dtChart: string;
};
export default function ChartDetail({ dtChart }: DateProp) {
  const weatherData = useRecoilValue(yrWeatherState)!;

  const {
    dataTemperature,
    dataWindSpeed,
    dataCloud,
    dataCloudIcon,
    dataPrecip,
    dataAirPressure,
    dataAverageHumidity,
  }: any = setDataForChartDetail(weatherData, dtChart);
  // console.log(dataWindSpeed, dataWindDirection);
  return (
    <Grid container>
      <Grid item lg={4} sm={6} xs={12}>
        <ChartTemperature dataTemperature={dataTemperature} detail={true} />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <ChartCloud
          dataCloud={dataCloud}
          dataCloudIcon={dataCloudIcon}
          detail={true}
        />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <ChartWind dataWind={dataWindSpeed} detail={true} />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartPrecipitationAmount dataPrecip={dataPrecip} detail={true} />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartHumidity
          dataAverageHumidity={dataAverageHumidity}
          detail={true}
        />
      </Grid>

      <Grid item lg={4} sm={6} xs={12}>
        <ChartAirPressure dataPres={dataAirPressure} detail={true} />
      </Grid>
    </Grid>
  );
}
