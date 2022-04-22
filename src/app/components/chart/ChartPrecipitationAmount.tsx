import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataPrecip = {
  dataPrecip: any[];
};

export default function ChartPrecipitationAmount({ dataPrecip }: DataPrecip) {
  function minMax() {
    let max = 0;
    for (let i = 0; i < dataPrecip.length; i++) {
      let precip = Number(dataPrecip[i].precipitation);
      if (max < precip) max = precip;
    }

    return { max };
  }

  const { max } = minMax();
  const yMax = Math.ceil(max);
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
        Суточное количество осадков мм
      </Box>
      {/* aspect={2} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2.5}>
        <LineChart
          data={dataPrecip}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            angle={-30}
            tick={{ fontSize: 12 }}
            tickCount={10}
            interval={0}
          />
          <YAxis
            type="number"
            domain={[0, yMax]}
            tick={{ fontSize: 12 }}
            tickCount={10}
            // interval={0}
            allowDecimals={true}
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
          />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="precipitation"
            stroke="blue"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
