import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Flame className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-secondary">
            OKOA<span className="text-primary">GAS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
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
          <Link to="/" onClick={() => setIsOpen(false)} className="text-xl font-semibold">Home</Link>
          <Link to="/#features" onClick={() => setIsOpen(false)} className="text-xl font-semibold">Features</Link>
          <Link to="/get-kit" onClick={() => setIsOpen(false)} className="btn-primary w-3/4 justify-center">
            Get Your Kit
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
