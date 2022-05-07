import { Box } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { yrWeatherState } from '../../recoil/yr_weather.state'
import ChartAirPressure from './ChartAirPressure'
import ChartCloud from './ChartCloud'
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
    dataWind,
    dataCloud,
    dataCloudIcon,
  }: any = setDataForChart(weatherData);
  return (
    <Box>
      <ChartTemperature dataTemperature={dataTemperature} detail={false} />

      <ChartCloud
        dataCloud={dataCloud}
        dataCloudIcon={dataCloudIcon}
        detail={false}
      />

      <ChartWind dataWind={dataWind} detail={false} />

      <ChartPrecipitationAmount dataPrecip={dataPrecip} detail={false} />

      <ChartAirPressure dataPres={dataAirPressure} detail={false} />
    </Box>
  );
}
