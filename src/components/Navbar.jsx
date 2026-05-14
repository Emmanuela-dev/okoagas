import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Flame, Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle hash navigation when location changes
    if (location.hash) {
      const hash = location.hash.substring(1); // Remove the '#'
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure the page has rendered
    }
  }, [location]);

  const handleNavClick = (path, hash) => {
    setIsOpen(false);
    if (location.pathname === '/' && hash) {
      // If on home page, scroll to section
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (hash) {
      // Navigate to home page with hash
      navigate(`/#${hash}`);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="Okoa Gas Logo" className="w-10 h-10 group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-black tracking-tighter text-secondary">

            OKOA<span className="text-primary">GAS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <button onClick={() => handleNavClick('/', '')} className="hover:text-primary transition-colors bg-transparent border-none font-semibold p-0">Home</button>
          <button onClick={() => handleNavClick('/', 'features')} className="hover:text-primary transition-colors bg-transparent border-none font-semibold p-0 text-[1rem]">Features</button>
          <button onClick={() => handleNavClick('/', 'how-it-works')} className="hover:text-primary transition-colors bg-transparent border-none font-semibold p-0 text-[1rem]">How it Works</button>
          <Link to="/carbon-credits" className="hover:text-primary transition-colors font-semibold p-0 text-[1rem]" style={{ textDecoration: 'none', color: 'inherit' }}>Carbon Credits</Link>
          <Link to="/calculator" className="hover:text-primary transition-colors font-semibold p-0 text-[1rem]" style={{ textDecoration: 'none', color: 'inherit' }}>Calculator</Link>
          <Link to="/get-kit" className="btn-primary">
            Get Your Kit
            <ShoppingCart className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass shadow-xl py-6 flex flex-col items-center gap-6 animate-fadeIn">
          <button onClick={() => handleNavClick('/', '')} className="text-xl font-semibold bg-transparent border-none">Home</button>
          <button onClick={() => handleNavClick('/', 'features')} className="text-xl font-semibold bg-transparent border-none">Features</button>
          <button onClick={() => handleNavClick('/', 'how-it-works')} className="text-xl font-semibold bg-transparent border-none">How it Works</button>
          <Link to="/carbon-credits" onClick={() => setIsOpen(false)} className="text-xl font-semibold" style={{ textDecoration: 'none', color: 'inherit' }}>Carbon Credits</Link>
          <Link to="/calculator" onClick={() => setIsOpen(false)} className="text-xl font-semibold" style={{ textDecoration: 'none', color: 'inherit' }}>Calculator</Link>
          <Link to="/get-kit" onClick={() => setIsOpen(false)} className="btn-primary w-3/4 justify-center">
            Get Your Kit
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
