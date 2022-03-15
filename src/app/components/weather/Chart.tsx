import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useRecoilValue } from 'recoil';

import { yrWeatherState } from '../../recoil/yr_weather.state';
import DailyReport from './DailyReport';
import GetWeatherApi from './GetWeatherApi';

export default function Chart() {
  GetWeatherApi();
  const loadWeather = useRecoilValue(yrWeatherState);
  const { minDayTemp, maxDayTemp } = DailyReport();
  const data: any = [];
  loadWeather?.properties.timeseries
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

  // const data = [
  //   { day: "10", min: -5, max: 0 },
  //   { day: "11", min: -6, max: -2 },
  //   { day: "12", min: -6, max: 3 },
  //   { day: "13", min: -1, max: 4 },
  //   { day: "14", min: -1, max: 5 },
  //   { day: "15", min: 1, max: 10 },
  //   { day: "16", min: 2, max: 8 },
  //   { day: "17", min: -2, max: 3 },
  //   { day: "18", min: -5, max: 2 },
  //   { day: "19", min: -1, max: 6 },
  // ];

  // console.log(data);
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box>
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
