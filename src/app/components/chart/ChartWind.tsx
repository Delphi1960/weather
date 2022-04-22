import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataWind = {
  dataWind: any[];
};

export default function ChartWind({ dataWind }: DataWind) {
  function minMax() {
    let min = 2000;
    let max = 0;
    for (let i = 0; i < dataWind.length; i++) {
      let wind = Number(dataWind[i].wind);
      if (min > wind) min = wind;
      if (max < wind) max = wind;
    }
    return { min, max };
  }
  const { min, max } = minMax();

  return (
    <React.Fragment>
      <Box
        component="span"
        sx={{
          display: "block",
          textAlign: "center",
          fontSize: { xs: 12, sm: 14, md: 16, lg: 18 },
          color: "#164c03",
        }}
      >
        Максимальная скорость ветра м/сек
      </Box>

      {/* aspect={2.5} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2.5}>
        <LineChart
          data={dataWind}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" strokeWidth={1} />
          <XAxis
            dataKey="day"
            angle={-30}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
          />
          <YAxis
            type="number"
            domain={[min - 1, max + 1]}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
            allowDecimals={false}
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="wind"
            stroke="#03334d"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
          />
          {/* <Line
            type="monotone"
            dataKey="t_max"
            stroke="red"
            activeDot={{ r: 6 }}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
