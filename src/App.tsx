import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Dashboard } from '@/pages/Dashboard';
import { Scenarios } from '@/pages/Scenarios';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scenarios" element={<Scenarios />} />
      </Routes>
    </Router>
  );
}

export default App;
