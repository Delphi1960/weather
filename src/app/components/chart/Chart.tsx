import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useRecoilValue } from 'recoil'

import { nameLocation } from '../../recoil/location.state'
import { yrWeatherState } from '../../recoil/yr_weather.state'
import dailyReport from '../../utils/dailyReport'

export default function Chart() {
  const place = useRecoilValue(nameLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;
  const { minDayTemp, maxDayTemp } = dailyReport(weatherData);
  const data: any = [];
  weatherData?.properties.timeseries
    .filter(function (item, ind) {
      let dt1;
      let dt2;
      if (ind === 0) {
        dt1 = new Date(weatherData?.properties.timeseries[ind].time);
        return dt1.toLocaleDateString();
      } else {
        dt1 = new Date(weatherData?.properties.timeseries[ind - 1].time);
      }
      dt2 = new Date(weatherData?.properties.timeseries[ind].time);
      return dt1.toLocaleDateString() !== dt2.toLocaleDateString();
    })
    .map((daily, ind) =>
      data.push({
        day: `${new Date(daily.time).toLocaleString("ru-RU", {
          day: "numeric",
          month: "short",
        })}`,
        t_min: minDayTemp[ind],
        t_max: maxDayTemp[ind],
      })
    );

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box component="div" sx={{ ml: 2, textAlign: "left" }}>
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
            {place}
          </Box>
        </Box>{" "}
        <Typography variant="body1" align="center">
          Минимальная и максимальная суточная температура С°
        </Typography>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="t_min"
              stroke="blue"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="t_max"
              stroke="red"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ThemeProvider>
  );
}
