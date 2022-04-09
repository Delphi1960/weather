import Typography from '@mui/material/Typography';
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataPrecip = {
  dataPrecip: any[];
};

export default function ChartPrecipitationAmount({ dataPrecip }: DataPrecip) {
  function minMax() {
    let max = 0;
    for (let i = 0; i < dataPrecip.length; i++) {
      if (max < dataPrecip[i].precipitation) max = dataPrecip[i].precipitation;
    }
    return { max };
  }
  const { max } = minMax();
  const yMax = Math.ceil(max);
  return (
    <React.Fragment>
      <Typography variant="subtitle2" align="center">
        Суточное количество осадков мм
      </Typography>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={dataPrecip}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis
            type="number"
            domain={[0, yMax]}
            allowDecimals={true}
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
            dataKey="precipitation"
            stroke="blue"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
