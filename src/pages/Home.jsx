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
      <section className="section flex items-center min-h-[90vh]" style={{ paddingTop: '160px' }}>
        <div className="container">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="text-primary font-bold uppercase tracking-widest mb-6 block" style={{ fontSize: '0.9rem' }}>
              Clean Cooking for Every Home
            </span>
            <h1 className="mb-8">Switch to <span className="text-primary">Clean Energy</span> with OKOA GAS</h1>
            <p className="text-muted text-2xl mb-12">
              Safe, affordable, and reliable LPG cooking gas delivered to your doorstep. Join thousands of Kenyan homes making the switch today.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/get-kit" className="btn-primary">
                Order Your Kit <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                How it Works
              </a>
            </div>
            
            <div className="flex items-center gap-4 justify-center mt-16">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', border: '3px solid white' }}></div>
                ))}
              </div>
              <p className="text-muted">
                <span className="text-secondary font-bold">10,000+</span> happy families across Kenya
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="section bg-white">
        <div className="container">
          <div className="text-center mb-20 max-w-xl mx-auto">
            <h2 className="mb-4">Smart Cooking <span className="text-primary">Technology</span></h2>
            <p className="text-muted">
              We've integrated advanced IoT and safety features to give you a seamless and secure cooking experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Zap className="text-primary w-12 h-12" />, 
                title: 'Pay-As-You-Cook', 
                desc: 'Only pay for the gas you use. Our smart meters allow you to cook with as little as Ksh 10 worth of gas.' 
              },
              { 
                icon: <Shield className="text-primary w-12 h-12" />, 
                title: 'Smart Leak Detection', 
                desc: 'Built-in sensors detect even the smallest leaks and automatically shut off the valve for your safety.' 
              },
              { 
                icon: <Leaf className="text-primary w-12 h-12" />, 
                title: 'Real-time Monitoring', 
                desc: 'Check your gas balance and usage history anytime through our mobile integration.' 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="glass"
                style={{ padding: '48px', borderRadius: '24px' }}
              >
                <div className="mb-8">{feature.icon}</div>
                <h3 className="mb-4">{feature.title}</h3>
                <p className="text-muted mb-0">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IoT & Safety Detail Section */}
      <section className="section" style={{ background: 'var(--secondary)', color: 'white' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ color: 'white' }}>The Power of <span className="text-primary">IoT Smart Meters</span></h2>
              <p className="mb-8 text-2xl" style={{ opacity: 0.8 }}>
                Our revolutionary Smart IoT Meter is the brain of your Okoa Gas kit. It monitors flow, pressure, and gas levels in real-time, ensuring you never run out of gas unexpectedly.
              </p>
              <ul className="flex flex-col gap-6" style={{ listStyle: 'none' }}>
                <li className="flex gap-4 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span className="text-2xl">Automated gas level alerts via SMS</span>
                </li>
                <li className="flex gap-4 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span className="text-2xl">Precision billing (per gram of gas)</span>
                </li>
                <li className="flex gap-4 items-center">
                  <CheckCircle className="text-primary w-6 h-6" />
                  <span className="text-2xl">Anti-tamper security sensors</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass" 
              style={{ padding: '60px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <h3 className="mb-6" style={{ color: 'white' }}>24/7 Safety Monitoring</h3>
              <p className="mb-8" style={{ opacity: 0.8 }}>
                Your safety is our top priority. Our command center receives instant notifications if your sensor detects any irregularity.
              </p>
              <div style={{ padding: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                <h4 className="mb-2 text-primary" style={{ fontSize: '1.2rem' }}>Safety Guarantee</h4>
                <p className="mb-0" style={{ fontSize: '1rem', opacity: 0.8 }}>We provide free maintenance and regular safety inspections for all our IoT-connected kits.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carbon Credits Promo Section */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Green Forest" 
                  style={{ borderRadius: '32px', width: '100%', height: '500px', objectFit: 'cover', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15)' }}
                />
                <div className="glass" style={{ position: 'absolute', bottom: '30px', right: '30px', padding: '30px', borderRadius: '20px', maxWidth: '300px' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="text-primary w-8 h-8" />
                    <span className="font-bold text-2xl">2.5 Tons Saved</span>
                  </div>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>Average CO2 reduction per family annually.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold uppercase tracking-widest mb-4 block" style={{ fontSize: '0.9rem' }}>Environmental Impact</span>
              <h2 className="mb-6">Cook Clean, Save the <span className="text-primary">Planet</span></h2>
              <p className="text-muted text-2xl mb-12">
                Every meal prepared with Okoa Gas helps protect Kenya's precious forests by reducing dependence on charcoal and firewood. Join our Carbon Credits initiative and be part of the solution.
              </p>
              
              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="mb-2" style={{ fontSize: '2rem', color: 'var(--secondary)' }}>15,000+</h4>
                  <p className="text-muted mb-0">Metric Tons of CO2 Offset</p>
                </div>
                <div>
                  <h4 className="mb-2" style={{ fontSize: '2rem', color: 'var(--secondary)' }}>100k+</h4>
                  <p className="text-muted mb-0">Trees preserved across Kenya</p>
                </div>
              </div>

              <div className="flex gap-6">
                <Link to="/carbon-credits" className="btn-primary">Learn More</Link>
                <Link to="/calculator" className="btn-secondary">
                   Try Impact Calculator <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zero Upfront Section */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white', overflow: 'hidden' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6" style={{ color: 'white', fontSize: '3.5rem' }}>Zero <span style={{ opacity: 0.8 }}>Upfront Cost</span> Promise</h2>
              <p className="mb-12 text-2xl" style={{ opacity: 0.9 }}>
                We believe clean energy should be accessible to everyone. That's why we offer our Smart IoT Kit with zero upfront cost. You only pay for the gas you use, as you use it.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  'No installation fees',
                  'Free maintenance for life',
                  'No deposit required for the cylinder',
                  'Pay as little as Ksh 10 worth of gas'
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl" style={{ fontWeight: '600' }}>{item}</span>
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
              <div className="glass" style={{ padding: '60px', borderRadius: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Zap className="w-20 h-20 mx-auto mb-8 text-white" />
                <h3 className="mb-4" style={{ color: 'white', fontSize: '2rem' }}>Instant Activation</h3>
                <p className="mb-0" style={{ color: 'white', opacity: 0.8, fontSize: '1.1rem' }}>Your kit is activated the moment you make your first gas purchase via M-Pesa.</p>
              </div>
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="mb-4">How to get <span className="text-primary">Started</span></h2>
            <p className="text-muted">Three simple steps to transition your kitchen to clean energy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 items-start">
            {[
              { step: '01', title: 'Order Your Kit', desc: 'Select your preferred gas kit size and provide your delivery details.' },
              { step: '02', title: 'Free Installation', desc: 'Our team will deliver and install the smart kit at your home for free.' },
              { step: '03', title: 'Pay & Cook', desc: 'Top up your gas balance via M-Pesa and start cooking immediately.' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-8">
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '24px', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '1.5rem',
                  boxShadow: '0 15px 30px rgba(13, 148, 136, 0.25)'
                }}>
                  {step.step}
                </div>
                <div>
                  <h3 className="mb-4" style={{ fontSize: '1.6rem' }}>{step.title}</h3>
                  <p className="text-muted mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="mb-4">Voice of the <span className="text-primary">Community</span></h2>
            <p className="text-muted">Join over 10,000 families who have switched to Okoa Gas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Sarah Wanjiku', role: 'Business Owner', quote: 'The pay-as-you-cook feature has helped me manage my kitchen budget so much better. No more unexpected gas refills!' },
              { name: 'David Omari', role: 'Teacher', quote: 'Safety was my main concern with gas, but the smart leak detection sensor gives me total peace of mind.' },
              { name: 'Mary Atieno', role: 'Home Maker', quote: 'The installation was quick and professional. I love that I didn\'t have to pay anything upfront for the kit.' }
            ].map((t, idx) => (
              <div key={idx} className="glass" style={{ padding: '48px', borderRadius: '32px' }}>
                <p className="text-muted mb-8" style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>"{t.quote}"</p>
                <div>
                  <p className="font-bold mb-1" style={{ fontSize: '1.2rem' }}>{t.name}</p>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center mb-16">Frequently Asked <span className="text-primary">Questions</span></h2>
            <div className="flex flex-col gap-8">
              {[
                { q: 'Is there really zero upfront cost?', a: 'Yes! We provide the smart cylinder and IoT meter with no initial purchase price. You only pay for the gas consumed.' },
                { q: 'How do I pay for gas?', a: 'You can top up your balance via M-Pesa. Simply go to the "Pay & Cook" section or follow the SMS instructions sent to you.' },
                { q: 'What happens if there is a gas leak?', a: 'Our smart sensor will automatically shut off the valve and send an instant alert to your phone and our command center.' },
                { q: 'Where do you deliver?', a: 'Currently, we serve all major neighborhoods in Nairobi. We are expanding to other counties soon!' }
              ].map((faq, idx) => (
                <div key={idx} style={{ padding: '32px', borderBottom: '1px solid var(--border)' }}>
                  <h4 className="mb-4" style={{ fontSize: '1.25rem' }}>{faq.q}</h4>
                  <p className="text-muted mb-0">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Availability Check */}
      <section className="section pt-0">
        <div className="container">
          <div className="glass" style={{ padding: '80px', borderRadius: '48px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}>
            <h2 className="mb-6">Check Availability in Your Area</h2>
            <p className="text-muted mb-12 max-w-xl mx-auto">Enter your location to see if Okoa Gas is available in your neighborhood yet.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <input type="text" placeholder="Enter your neighborhood (e.g. Kilimani)" style={{ maxWidth: '500px', padding: '18px 24px', borderRadius: '16px' }} />
              <button className="btn-primary">Check Now</button>
            </div>
            <div className="flex items-center gap-3 text-primary justify-center mt-12">
              <CheckCircle className="w-6 h-6" />
              <span style={{ fontSize: '1rem', fontWeight: '700' }}>Available in most parts of Nairobi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Home;

