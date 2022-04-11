import Box from '@mui/material/Box';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataPres = {
  dataPres: any[];
};

export default function ChartAirPressure({ dataPres }: DataPres) {
  function minMax() {
    let min = 2000;
    let max = 0;
    for (let i = 0; i < dataPres.length; i++) {
      let press = Number(dataPres[i].pressure);
      if (min > press) min = press;
      if (max < press) max = press;
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
        }}
      >
        Среднесуточное атмосферное давление мм
      </Box>
      {/* aspect={2} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2.5}>
        <LineChart
          data={dataPres}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            domain={[min - 5, max + 5]}
            tick={{ fontSize: 12 }}
            // tickCount={20}
            // allowDecimals={false}
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="blue"
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
