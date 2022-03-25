import { Drawer } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Bootstrap from './Bootstrap'
import AppBar from './components/app-bar/AppBar'
import Chart from './components/chart'
import NotFound from './components/not-found'
import SelectLocation from './components/select-location'
import MoonPhase from './components/weather/MoonPhase'
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
          <Route path="/weathertable" element={<WeatherTable />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/moonphase" element={<MoonPhase />} />

          <Route path="/selectlocation" element={<SelectLocation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Bootstrap>
    </div>
  );
}
