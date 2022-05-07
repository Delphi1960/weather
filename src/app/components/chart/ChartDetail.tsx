import { Box } from '@mui/material'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { yrWeatherState } from '../../recoil/yr_weather.state'
import ChartAirPressure from './ChartAirPressure'
import ChartCloud from './ChartCloud'
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
  }: any = setDataForChartDetail(weatherData, dtChart);
  // console.log(dataWindSpeed, dataWindDirection);
  return (
    <Box>
      <ChartTemperature dataTemperature={dataTemperature} detail={true} />
      <ChartCloud
        dataCloud={dataCloud}
        dataCloudIcon={dataCloudIcon}
        detail={true}
      />
      <ChartWind dataWind={dataWindSpeed} detail={true} />

      <ChartPrecipitationAmount dataPrecip={dataPrecip} detail={true} />

      <ChartAirPressure dataPres={dataAirPressure} detail={true} />
    </Box>
  );
}
