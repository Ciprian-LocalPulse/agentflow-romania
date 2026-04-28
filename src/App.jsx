import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Properties from './pages/Properties';
import Viewings from './pages/Viewings';
import FollowUp from './pages/FollowUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaduri" element={<CRM />} />
        <Route path="/proprietati" element={<Properties />} />
        <Route path="/vizionari" element={<Viewings />} />
        <Route path="/followup" element={<FollowUp />} />
        {/* Rute fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}