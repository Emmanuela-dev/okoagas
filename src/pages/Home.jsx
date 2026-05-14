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

      {/* Zero Upfront Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '3rem' }}>Zero <span style={{ opacity: 0.8 }}>Upfront Cost</span> Promise</h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                We believe clean energy should be accessible to everyone. That's why we offer our Smart IoT Kit with zero upfront cost. You only pay for the gas you use, as you use it.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'No installation fees',
                  'Free maintenance for life',
                  'No deposit required for the cylinder',
                  'Pay as little as Ksh 10 worth of gas'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px', borderRadius: '50%' }}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span style={{ fontWeight: '600' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <div className="glass" style={{ padding: '40px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Zap className="w-16 h-16 mx-auto mb-6 text-white" />
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Instant Activation</h3>
                <p style={{ color: 'white', opacity: 0.8 }}>Your kit is activated the moment you make your first gas purchase via M-Pesa.</p>
              </div>
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(20px)' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>How to get <span className="text-primary">Started</span></h2>
            <p className="text-muted">Three simple steps to transition your kitchen to clean energy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {[
              { step: '01', title: 'Order Your Kit', desc: 'Select your preferred gas kit size and provide your delivery details.' },
              { step: '02', title: 'Free Installation', desc: 'Our team will deliver and install the smart kit at your home for free.' },
              { step: '03', title: 'Pay & Cook', desc: 'Top up your gas balance via M-Pesa and start cooking immediately.' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-6">
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '18px', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  boxShadow: '0 10px 20px rgba(13, 148, 136, 0.2)'
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: 'var(--background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Voice of the <span className="text-primary">Community</span></h2>
            <p className="text-muted">Join over 10,000 families who have switched to Okoa Gas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Wanjiku', role: 'Business Owner', quote: 'The pay-as-you-cook feature has helped me manage my kitchen budget so much better. No more unexpected gas refills!' },
              { name: 'David Omari', role: 'Teacher', quote: 'Safety was my main concern with gas, but the smart leak detection sensor gives me total peace of mind.' },
              { name: 'Mary Atieno', role: 'Home Maker', quote: 'The installation was quick and professional. I love that I didn\'t have to pay anything upfront for the kit.' }
            ].map((t, idx) => (
              <div key={idx} className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
                <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"{t.quote}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked <span className="text-primary">Questions</span></h2>
            <div className="flex flex-col gap-6">
              {[
                { q: 'Is there really zero upfront cost?', a: 'Yes! We provide the smart cylinder and IoT meter with no initial purchase price. You only pay for the gas consumed.' },
                { q: 'How do I pay for gas?', a: 'You can top up your balance via M-Pesa. Simply go to the "Pay & Cook" section or follow the SMS instructions sent to you.' },
                { q: 'What happens if there is a gas leak?', a: 'Our smart sensor will automatically shut off the valve and send an instant alert to your phone and our command center.' },
                { q: 'Where do you deliver?', a: 'Currently, we serve all major neighborhoods in Nairobi. We are expanding to other counties soon!' }
              ].map((faq, idx) => (
                <div key={idx} style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                  <h4 style={{ marginBottom: '1rem' }}>{faq.q}</h4>
                  <p className="text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Availability Check */}
      <section className="section py-5">
        <div className="container">
          <div className="glass" style={{ padding: '60px', borderRadius: '32px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Check Availability in Your Area</h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input type="text" placeholder="Enter your neighborhood (e.g. Kilimani)" style={{ maxWidth: '400px' }} />
              <button className="btn-primary">Check Now</button>
            </div>
            <div className="flex items-center gap-2 text-primary justify-center" style={{ marginTop: '1.5rem' }}>
              <CheckCircle className="w-5 h-5" />
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Available in most parts of Nairobi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

