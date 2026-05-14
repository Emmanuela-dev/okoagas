import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        
        <footer style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '100px 0 40px' }}>
          <div className="container">
            <div className="grid md:grid-cols-4 gap-16">
              <div className="md:col-span-1">
                <h2 className="mb-6" style={{ color: 'white', fontSize: '1.75rem' }}>OKOA<span className="text-primary">GAS</span></h2>
                <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Revolutionizing energy access in Africa through IoT-enabled clean cooking solutions.
                </p>
              </div>
              <div>
                <h3 className="mb-6" style={{ color: 'white', fontSize: '1.25rem' }}>Platform</h3>
                <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
                  <li><Link to="/" style={{ opacity: 0.7, hover: { opacity: 1 } }}>Home</Link></li>
                  <li><Link to="/get-kit" style={{ opacity: 0.7 }}>Get a Kit</Link></li>
                  <li><Link to="/#features" style={{ opacity: 0.7 }}>Technology</Link></li>
                  <li><Link to="/#how-it-works" style={{ opacity: 0.7 }}>How it Works</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-6" style={{ color: 'white', fontSize: '1.25rem' }}>Sustainability</h3>
                <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
                  <li><Link to="/carbon-credits" style={{ opacity: 0.7 }}>Carbon Credits</Link></li>
                  <li><Link to="/calculator" style={{ opacity: 0.7 }}>Impact Calculator</Link></li>
                  <li><Link to="/#features" style={{ opacity: 0.7 }}>Safety Monitoring</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="mb-6" style={{ color: 'white', fontSize: '1.25rem' }}>Contact</h3>
                <div className="flex flex-col gap-4" style={{ opacity: 0.8 }}>
                  <p>Email: hello@okoagas.co.ke</p>
                  <p>Phone: +254 700 000 000</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '80px', paddingTop: '40px', textAlign: 'center', opacity: 0.6, fontSize: '1rem' }}>
              &copy; {new Date().getFullYear()} Okoa Gas Limited. All rights reserved. Made with &hearts; for a Greener Kenya.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
