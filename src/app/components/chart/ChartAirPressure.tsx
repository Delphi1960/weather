import Box from '@mui/material/Box'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type DataPres = {
  dataPres: any[];
  detail: boolean;
};

export default function ChartAirPressure({ dataPres, detail }: DataPres) {
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
          fontSize: { xs: 12, sm: 14, md: 16 },
          color: "#164c03",
        }}
      >
        {detail
          ? " Атмосферное давление мм"
          : " Среднесуточное атмосферное давление мм"}
      </Box>

      {/* aspect={2.5} соотношение осей */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={dataPres}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" strokeWidth={1} />
          {detail ? (
            <>
              <XAxis xAxisId="0" dataKey="time" tick={{ fontSize: 10 }} />
              <XAxis
                xAxisId="1"
                dataKey="day"
                allowDuplicatedCategory={false}
                tick={{ fontSize: 10 }}
              />
            </>
          ) : (
            <XAxis
              dataKey="day"
              allowDuplicatedCategory={false}
              tick={{ fontSize: 10 }}
            />
          )}
          <YAxis
            type="number"
            domain={[min - 1, max + 1]}
            tick={{ fontSize: 10 }}
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
            dataKey="pressure"
            stroke="#1f6c01"
            strokeWidth={1.3}
            activeDot={{ r: 6 }}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
