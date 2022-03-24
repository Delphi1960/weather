import { Drawer } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Bootstrap from './Bootstrap'
import AppBar from './components/app-bar/AppBar'
import Chart from './components/weather/Chart'
import SelectLocation from './components/weather/SelectLocation'
import WeatherNow from './components/weather/WeatherNow'
import WeatherTable from './components/weather/WeatherTable'

export default function App() {
  return (
    <div className="App">
      <Bootstrap>
        <AppBar />
        <Drawer />
        <Routes>
          <Route path="/" element={<WeatherNow />} />
          {/* <Route path="/weather" element={<WeatherDaily />} /> */}
          <Route path="/weathertable" element={<WeatherTable />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/selectlocation" element={<SelectLocation />} />
        </Routes>
      </Bootstrap>
    </div>
  );
}