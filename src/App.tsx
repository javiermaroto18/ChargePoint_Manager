import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Landing from './components/pages/Landing';
import ECharge from './components/echarge/ECharge';
import ReservationsPage from './components/reservations/ReservationsPage';
import SupportPage from './components/support/SupportPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/stations" element={<ECharge />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;