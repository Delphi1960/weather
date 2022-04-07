import Typography from '@mui/material/Typography';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataTemp = {
  dataTemp: any[];
};

export default function ChartTemperature({ dataTemp }: DataTemp) {
  return (
    <React.Fragment>
      <Typography variant="body1" align="center">
        Минимальная и максимальная суточная температура С°
      </Typography>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={dataTemp}
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
    </React.Fragment>
  );
}
