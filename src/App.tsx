import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CasePage from './pages/CasePage';
import InventoryPage from './pages/InventoryPage';
import ProfilePage from './pages/ProfilePage';
import UpgradePage from './pages/UpgradePage';

function App() {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case/:slug" element={<CasePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/upgrade" element={<UpgradePage />} />
      </Routes>
    </div>
  );
}

export default App;

