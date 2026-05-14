import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Leaf, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


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
            <h2 style={{ marginBottom: '1rem' }}>Smart Cooking <span className="text-primary">Technology</span></h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
              We've integrated advanced IoT and safety features to give you a seamless and secure cooking experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="text-primary w-10 h-10" />, 
                title: 'Pay-As-You-Cook', 
                desc: 'Only pay for the gas you use. Our smart meters allow you to cook with as little as Ksh 10 worth of gas.' 
              },
              { 
                icon: <Shield className="text-primary w-10 h-10" />, 
                title: 'Smart Leak Detection', 
                desc: 'Built-in sensors detect even the smallest leaks and automatically shut off the valve for your safety.' 
              },
              { 
                icon: <Leaf className="text-primary w-10 h-10" />, 
                title: 'Real-time Monitoring', 
                desc: 'Check your gas balance and usage history anytime through our mobile integration.' 
              }
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

      {/* IoT & Safety Detail Section */}
      <section className="section" style={{ background: 'var(--secondary)', color: 'white' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>The Power of <span className="text-primary">IoT Smart Meters</span></h2>
              <p style={{ opacity: 0.8, fontSize: '1.1rem', marginBottom: '2rem' }}>
                Our revolutionary Smart IoT Meter is the brain of your Okoa Gas kit. It monitors flow, pressure, and gas levels in real-time, ensuring you never run out of gas unexpectedly.
              </p>
              <ul className="flex flex-col gap-4" style={{ listStyle: 'none' }}>
                <li className="flex gap-3 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span>Automated gas level alerts via SMS</span>
                </li>
                <li className="flex gap-3 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span>Precision billing (per gram of gas)</span>
                </li>
                <li className="flex gap-3 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span>Anti-tamper security sensors</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass" 
              style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>24/7 Safety Monitoring</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
                Your safety is our top priority. Our command center receives instant notifications if your sensor detects any irregularity.
              </p>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Safety Guarantee</h4>
                <p style={{ fontSize: '0.9rem' }}>We provide free maintenance and regular safety inspections for all our IoT-connected kits.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carbon Credits Promo Section */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Green Forest" 
                  style={{ borderRadius: '24px', width: '100%', height: '400px', objectFit: 'cover' }}
                />
                <div className="glass" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '20px', borderRadius: '16px', maxWidth: '250px' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="text-primary w-6 h-6" />
                    <span className="font-bold">2.5 Tons Saved</span>
                  </div>
                  <p style={{ fontSize: '0.8rem' }}>Average CO2 reduction per family annually.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>Environmental Impact</span>
              <h2 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Cook Clean, Save the <span className="text-primary">Planet</span></h2>
              <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                Every meal prepared with Okoa Gas helps protect Kenya's precious forests by reducing dependence on charcoal and firewood. Join our Carbon Credits initiative and be part of the solution.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>15,000+</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>Metric Tons of CO2 Offset</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.5rem', color: 'var(--secondary)' }}>100k+</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>Trees preserved across Kenya</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/carbon-credits" className="btn-primary">Learn More</Link>
                <Link to="/calculator" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   Try Impact Calculator <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
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
