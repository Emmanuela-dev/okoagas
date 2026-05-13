import { motion } from 'framer-motion';
import { Shield, Zap, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import heroImg from '../assets/images/hero.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="section py-5" style={{ paddingTop: '160px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold tracking-tighter" style={{ fontSize: '1rem', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'block' }}>
              Clean Cooking for Every Home
            </span>
            <h1 style={{ marginBottom: '2rem', fontSize: '4rem' }}>Switch to <span className="text-primary">Clean Energy</span> with OKOA GAS</h1>
            <p className="text-muted" style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
              Safe, affordable, and reliable LPG cooking gas delivered to your doorstep. Join thousands of Kenyan homes making the switch today.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/get-kit" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                Order Your Kit <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary" style={{ padding: '16px 32px', fontWeight: '600', fontSize: '1.1rem' }}>
                How it Works
              </a>
            </div>
            
            <div className="flex items-center gap-4 justify-center" style={{ marginTop: '4rem' }}>
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#e2e8f0', border: '3px solid white' }}></div>
                ))}
              </div>
              <p className="text-muted" style={{ fontSize: '1rem' }}>
                <span className="text-secondary font-bold">10,000+</span> happy families across Kenya
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="section" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Why Choose <span className="text-primary">OKOA GAS</span>?</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
              We are committed to providing the safest and most efficient cooking experience for your home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="text-primary w-10 h-10" />, title: 'Safety First', desc: 'Our cylinders and kits undergo rigorous safety checks to ensure your home is always safe.' },
              { icon: <Zap className="text-primary w-10 h-10" />, title: 'Instant Delivery', desc: 'Fast and reliable delivery within 30 minutes of placing your order in selected areas.' },
              { icon: <Leaf className="text-primary w-10 h-10" />, title: 'Eco-Friendly', desc: 'Clean burning fuel that reduces indoor air pollution and helps protect our environment.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                style={{ padding: '40px', borderRadius: '16px', background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 style={{ marginBottom: '2rem' }}>How to get started</h2>
              <div className="flex flex-col gap-8">
                {[
                  { step: '01', title: 'Order Your Kit', desc: 'Select your preferred gas kit and provide your delivery details.' },
                  { step: '02', title: 'Make Payment', desc: 'Pay securely via M-Pesa with our instant STK push integration.' },
                  { step: '03', title: 'We Deliver & Install', desc: 'Our experts will deliver and professionally install the kit for you.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div style={{ 
                      minWidth: '50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      background: 'var(--primary)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {step.step}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                      <p className="text-muted">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Check Availability</h3>
              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Enter your neighborhood (e.g. Kilimani)" />
                <button className="btn-primary w-full justify-center">Check Now</button>
                <div className="flex items-center gap-2 text-primary" style={{ marginTop: '1rem' }}>
                  <CheckCircle className="w-5 h-5" />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Available in most parts of Nairobi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
