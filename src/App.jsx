import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GetKit from './pages/GetKit';
import CarbonCredits from './pages/CarbonCredits';
import Calculator from './pages/Calculator';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-kit" element={<GetKit />} />
            <Route path="/carbon-credits" element={<CarbonCredits />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </main>
        
        <footer style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '24px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ minWidth: '160px' }}>
                <h2 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '6px' }}>OKOA<span className="text-primary">GAS</span></h2>
                <p style={{ opacity: 0.7, fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>
                  IoT-enabled clean cooking for Africa.
                </p>
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem' }}>
                  <li><Link to="/" style={{ opacity: 0.7 }}>Home</Link></li>
                  <li><Link to="/get-kit" style={{ opacity: 0.7 }}>Get a Kit</Link></li>
                  <li><Link to="/#features" style={{ opacity: 0.7 }}>Technology</Link></li>
                  <li><Link to="/#how-it-works" style={{ opacity: 0.7 }}>How it Works</Link></li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sustainability</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem' }}>
                  <li><Link to="/carbon-credits" style={{ opacity: 0.7 }}>Carbon Credits</Link></li>
                  <li><Link to="/calculator" style={{ opacity: 0.7 }}>Impact Calculator</Link></li>
                  <li><Link to="/#features" style={{ opacity: 0.7 }}>Safety Monitoring</Link></li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: 'white', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h3>
                <div style={{ opacity: 0.7, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ margin: 0 }}>hello@okoagas.co.ke</p>
                  <p style={{ margin: 0 }}>+254 700 000 000</p>
                  <p style={{ margin: 0 }}>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '16px', paddingTop: '12px', textAlign: 'center', opacity: 0.5, fontSize: '0.78rem' }}>
              &copy; {new Date().getFullYear()} Okoa Gas Limited. All rights reserved. Made with &hearts; for a Greener Kenya.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
