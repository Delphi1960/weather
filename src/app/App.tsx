import { Drawer } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Bootstrap from './Bootstrap';
import AppBar from './components/app-bar/AppBar';
import Chart from './components/chart';
import NotFound from './components/not-found';
import SelectLocation from './components/select-location';
import MoonPhase from './components/weather/MoonPhase';
import WeatherMainTable from './components/weather/WeatherMainTable';
import WeatherNow from './components/weather/WeatherNow';

export default function App() {
  return (
    <div className="App">
      <Bootstrap>
        <AppBar />
        <Drawer />
        <Routes>
          <Route path="/" element={<WeatherNow />} />
          <Route path="/weathertable" element={<WeatherMainTable />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/moonphase" element={<MoonPhase />} />

          <Route path="/selectlocation" element={<SelectLocation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Bootstrap>
    </div>
  );
}
