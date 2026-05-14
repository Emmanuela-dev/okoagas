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
        
        {/* Simple Footer */}
        <footer style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>OKOA<span className="text-primary">GAS</span></h2>
                <p style={{ opacity: 0.7 }}>Bringing clean, safe, and affordable cooking energy to every Kenyan home.</p>
              </div>
              <div>
                <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h3>
                <ul className="flex flex-col gap-2" style={{ listStyle: 'none' }}>
                  <li><a href="/" style={{ opacity: 0.7 }}>Home</a></li>
                  <li><a href="/#features" style={{ opacity: 0.7 }}>Features</a></li>
                  <li><a href="/get-kit" style={{ opacity: 0.7 }}>Get a Kit</a></li>
                </ul>
              </div>
              <div>
                <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact</h3>
                <p style={{ opacity: 0.7 }}>Email: hello@okoagas.co.ke</p>
                <p style={{ opacity: 0.7 }}>Phone: +254 700 000 000</p>
                <p style={{ opacity: 0.7 }}>Nairobi, Kenya</p>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Okoa Gas Limited. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
