import Typography from '@mui/material/Typography';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataPres = {
  dataPres: any[];
};

export default function ChartAirPressure({ dataPres }: DataPres) {
  function minMax() {
    let min = 2000;
    let max = 0;
    for (let i = 0; i < dataPres.length; i++) {
      if (min > dataPres[i].pressure) min = dataPres[i].pressure;
      if (max < dataPres[i].pressure) max = dataPres[i].pressure;
    }
    return { min, max };
  }
  const { min, max } = minMax();

  return (
    <React.Fragment>
      <Typography variant="subtitle2" align="center">
        Среднесуточное атмосферное давление мм
      </Typography>
      <ResponsiveContainer width="100%" aspect={3}>
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
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
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
