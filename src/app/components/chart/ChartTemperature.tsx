import Typography from '@mui/material/Typography';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataTemp = {
  dataTemp: any[];
};

export default function ChartTemperature({ dataTemp }: DataTemp) {
  function minMax() {
    let min = 200;
    let max = -200;
    for (let i = 0; i < dataTemp.length; i++) {
      if (min > dataTemp[i].t_min) min = dataTemp[i].t_min;
      if (max < dataTemp[i].t_max) max = dataTemp[i].t_max;
    }
    return { min, max };
  }
  const { min, max } = minMax();

  return (
    <React.Fragment>
      <Typography variant="subtitle2" align="center">
        Минимальная и максимальная суточная температура С°
      </Typography>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={dataTemp}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            tick={{ fontSize: 12 }}
            domain={[min - 2, max + 2]}
          />
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
    </React.Fragment>
  );
}
