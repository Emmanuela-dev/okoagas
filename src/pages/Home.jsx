import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Leaf, ArrowRight, CheckCircle, Plus, Minus, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageWrapper, { fadeUp, fadeIn, slideLeft, stagger, Reveal } from '../components/PageWrapper';

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-6" style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '24px', 
      overflow: 'hidden',
      background: 'white',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: isOpen ? '0 20px 40px -10px rgba(0,0,0,0.08)' : 'none'
    }}>
      <button 
        onClick={onClick}
        className="w-full flex justify-between items-center px-10 py-8 text-left"
        style={{ background: 'none', border: 'none' }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--secondary)', flex: 1, paddingRight: '40px', lineHeight: '1.4' }}>{question}</span>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: isOpen ? 'var(--primary)' : '#f1f5f9',
          color: isOpen ? 'white' : 'var(--secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          flexShrink: 0
        }}>
          {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-10 pb-10 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '90%' }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ['General', 'Technology & Safety', 'Payments & Credit', 'Delivery'];
  
  const faqs = {
    'General': [
      { q: 'Is there really zero upfront cost?', a: 'Yes! We provide the smart cylinder and IoT meter with no initial purchase price. You only pay for the gas consumed.' },
      { q: 'Who is eligible for Okoa Gas?', a: 'Any household in our delivery areas can apply. We aim to reach everyone from apartment dwellers to those in independent houses.' },
      { q: 'What is the "Zero Upfront Cost" promise?', a: 'It means you don\'t pay for the hardware (cylinder, meter, regulator) at the start. You only buy gas credits to start cooking.' }
    ],
    'Technology & Safety': [
      { q: 'What happens if there is a gas leak?', a: 'Our smart sensor will automatically shut off the valve and send an instant alert to your phone and our command center.' },
      { q: 'Is the IoT meter safe?', a: 'Absolutely. It is built to international safety standards, is tamper-proof, and weather-resistant.' },
      { q: 'Do I need WiFi for the meter to work?', a: 'No, our meters use their own built-in cellular connectivity to stay linked to our network.' }
    ],
    'Payments & Credit': [
      { q: 'How do I pay for gas?', a: 'You can top up your balance via M-Pesa. Simply go to the "Pay & Cook" section or follow the SMS instructions sent to you.' },
      { q: 'What is the minimum amount I can spend?', a: 'You can buy gas for as little as Ksh 10 worth. We believe in total financial flexibility.' },
      { q: 'How do I earn carbon credits?', a: 'By simply using Okoa Gas instead of charcoal or wood, you earn "Green Points" that can be redeemed for gas discounts.' }
    ],
    'Delivery': [
      { q: 'Where do you deliver?', a: 'Currently, we serve all major neighborhoods in Nairobi, including Westlands, Kilimani, Langata, and more.' },
      { q: 'How fast is delivery?', a: 'We aim to deliver within 2 hours of your first order. Refills are automated and usually happen before you even realize you\'re low!' },
      { q: 'Is installation free?', a: 'Yes, our certified technicians will set up everything in your kitchen at no extra cost.' }
    ]
  };

  return (
    <div>
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
            style={{ fontSize: '0.95rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Grid */}
      <div className="mt-8">
        <h3 className="mb-8 font-black text-2xl" style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '20px' }}>{activeCategory}</h3>
        {faqs[activeCategory].map((faq, idx) => (
          <AccordionItem 
            key={idx}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>

      {/* Still Have Questions? */}
      <div className="mt-24 text-center glass" style={{ padding: '60px', borderRadius: '40px', border: '1px dashed #e2e8f0' }}>
        <h4 className="mb-4" style={{ fontSize: '1.5rem' }}>Still have questions?</h4>
        <p className="text-muted mb-10" style={{ fontSize: '1.1rem' }}>Our support team is ready to help you 24/7 with any inquiries.</p>
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          <a href="mailto:hello@okoagas.co.ke" className="font-bold text-primary hover:underline" style={{ fontSize: '1.1rem' }}>hello@okoagas.co.ke</a>
          <span className="hidden md:block text-slate-300">|</span>
          <a href="tel:+254743800904" className="font-bold text-primary hover:underline" style={{ fontSize: '1.1rem' }}>+254 743 800 904</a>
        </div>
      </div>
    </div>
  );
};

const Counter = ({ value, suffix = '', duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  // Parse numeric value from string (e.g., "15,000" -> 15000)
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    } else {
      setDisplayValue(0);
    }
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const Home = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="section overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at center, #f0fdf4, #ffffff)', padding: '160px 0' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center">
              <Reveal width="100%">
                <h1 className="mb-10" style={{ fontSize: '5.5rem', lineHeight: '1.05', fontWeight: '900', letterSpacing: '-0.02em' }}>
                  Clean Energy <br />
                  <span className="text-primary">For Every Kitchen</span>
                </h1>
              </Reveal>
              <motion.p variants={fadeUp} className="text-2xl text-muted mb-12 max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>
                Join the revolution of IoT-enabled pay-as-you-cook gas. Zero upfront cost, total safety, and significant savings for your home.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Link to="/get-kit" className="btn-primary" style={{ padding: '20px 48px', fontSize: '1.25rem' }}>Order Your Kit <ArrowRight className="w-5 h-5 ml-2" /></Link>
                <a href="#how-it-works" className="font-bold text-secondary hover:text-primary transition-colors text-xl">How it Works</a>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-6 mt-20">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
                <p className="text-muted text-xl"><span className="text-secondary font-black">10,000+</span> Kenyan families cooking safe with Okoa Gas</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section bg-white">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-24 max-w-2xl mx-auto">
            <Reveal width="100%">
              <h2 className="mb-6" style={{ fontSize: '3.5rem' }}>Smart Cooking <span className="text-primary">Technology</span></h2>
            </Reveal>
            <p className="text-xl text-muted" style={{ lineHeight: '1.8' }}>We've integrated advanced IoT and safety features to give you a seamless and secure cooking experience.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-16">
            {[
              { icon: <Zap className="text-primary w-12 h-12" />, title: 'Pay-As-You-Cook', desc: 'Only pay for the gas you use. Our smart meters allow you to cook with as little as Ksh 10 worth of gas.' },
              { icon: <Shield className="text-primary w-12 h-12" />, title: 'Smart Leak Detection', desc: 'Built-in sensors detect even the smallest leaks and automatically shut off the valve for your safety.' },
              { icon: <Leaf className="text-primary w-12 h-12" />, title: 'Real-time Monitoring', desc: 'Check your gas balance and usage history anytime through our mobile integration.' },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -15, transition: { duration: 0.3 } }} className="glass" style={{ padding: '60px', borderRadius: '40px', background: '#fdfdfd', border: '1px solid #f1f5f9' }}>
                <div className="mb-10 p-6 bg-white rounded-3xl w-fit shadow-sm">{feature.icon}</div>
                <h3 className="mb-6" style={{ fontSize: '1.8rem' }}>{feature.title}</h3>
                <p className="text-muted mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IoT Section */}
      <section className="section" style={{ background: 'var(--secondary)', color: 'white' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Reveal width="100%">
                <h2 className="mb-8" style={{ color: 'white', fontSize: '3.5rem' }}>The Power of <span style={{ color: 'var(--primary)' }}>IoT Smart Meters</span></h2>
              </Reveal>
              <p className="mb-12 text-2xl mx-auto max-w-3xl" style={{ color: 'white', opacity: 0.9, lineHeight: '1.8' }}>
                Our revolutionary Smart IoT Meter is the brain of your Okoa Gas kit. It monitors flow, pressure, and gas levels in real-time, ensuring you never run out of gas unexpectedly.
              </p>
              <div className="grid md:grid-cols-3 gap-12 mb-20">
                {['Automated gas level alerts via SMS', 'Precision billing (per gram of gas)', 'Anti-tamper security sensors'].map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center gap-4">
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '50%' }}>
                      <CheckCircle className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: 'white' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="glass mx-auto" style={{ padding: '60px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px' }}>
              <h3 className="mb-6" style={{ color: 'white', fontSize: '2rem' }}>24/7 Safety Monitoring</h3>
              <p className="mb-8 text-lg" style={{ opacity: 0.8 }}>Your safety is our top priority. Our command center receives instant notifications if your sensor detects any irregularity.</p>
              <div style={{ padding: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                <h4 className="mb-2 text-primary" style={{ fontSize: '1.4rem' }}>Safety Guarantee</h4>
                <p className="mb-0" style={{ fontSize: '1.1rem', opacity: 0.8 }}>We provide free maintenance and regular safety inspections for all our IoT-connected kits.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carbon Credits Promo */}
      <section className="section bg-[#f8fafc]">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Reveal width="100%">
                <span className="text-primary font-bold uppercase tracking-widest mb-6 block" style={{ fontSize: '1.1rem' }}>Environmental Impact</span>
              </Reveal>
              <Reveal width="100%">
                <h2 className="mb-10" style={{ fontSize: '4.5rem', lineHeight: '1.05', fontWeight: '900' }}>Cook Clean, Save the <span className="text-primary">Planet</span></h2>
              </Reveal>
              <p className="text-muted text-2xl mb-20 mx-auto max-w-3xl" style={{ lineHeight: '1.8' }}>
                Every meal prepared with Okoa Gas helps protect Kenya's precious forests by reducing dependence on charcoal and firewood. Join 10,000+ homes making a difference.
              </p>
              
              <div style={{ position: 'relative', marginBottom: '80px' }}>
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Green Forest"
                  style={{ borderRadius: '56px', width: '100%', height: '550px', objectFit: 'cover', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)' }}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass mx-auto" 
                  style={{ position: 'absolute', bottom: '-40px', left: '0', right: '0', padding: '40px', borderRadius: '32px', maxWidth: '400px', background: 'white', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Leaf className="text-primary w-10 h-10" />
                    <span className="font-black text-3xl">2.5 Tons</span>
                  </div>
                  <p className="mb-0 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Average CO2 reduction per family annually through Okoa Gas.</p>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-20 max-w-3xl mx-auto">
                <div>
                  <h4 className="mb-4" style={{ fontSize: '4rem', color: 'var(--secondary)', fontWeight: '900' }}>
                    <Counter value="15000" suffix="+" />
                  </h4>
                  <p className="text-muted text-xl mb-0">Metric Tons of CO2 Offset</p>
                </div>
                <div>
                  <h4 className="mb-4" style={{ fontSize: '4rem', color: 'var(--secondary)', fontWeight: '900' }}>
                    <Counter value="100000" suffix="+" />
                  </h4>
                  <p className="text-muted text-xl mb-0">Trees preserved in Kenya</p>
                </div>
              </div>
              
              <div className="flex gap-8 justify-center">
                <Link to="/carbon-credits" className="btn-primary" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>Learn More About Our Impact</Link>
                <Link to="/calculator" className="btn-secondary" style={{ padding: '20px 48px', border: '2px solid #e2e8f0', fontSize: '1.1rem' }}>Try Impact Calculator <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10% Upfront */}
      <section className="section" style={{ backgroundColor: '#064e3b', color: 'white', overflow: 'hidden' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <Reveal width="100%">
                <h2 className="mb-8" style={{ color: 'white', fontSize: '4rem', fontWeight: '900' }}>Zero <span style={{ color: 'var(--primary)' }}>Upfront Cost</span> Promise</h2>
              </Reveal>
              <p className="mb-16 text-2xl mx-auto max-w-3xl" style={{ lineHeight: '1.8' }}>We believe clean energy should be accessible to everyone. That's why we offer our Smart IoT Kit with zero upfront cost.</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                {['No installation fees', 'Free maintenance for life', 'No deposit for cylinder', 'Pay as little as Ksh 10'].map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center gap-6 p-8 rounded-3xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%' }}>
                      <CheckCircle className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: 'white' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeIn} className="flex justify-center mt-12">
                <Link to="/get-kit" className="btn-primary" style={{ background: 'white', color: '#064e3b', padding: '20px 60px', fontSize: '1.25rem' }}>Get Started Now</Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="mb-4">How to get <span className="text-primary">Started</span></h2>
            <p className="text-muted">Three simple steps to transition your kitchen to clean energy.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-16 items-start">
            {[
              { step: '01', title: 'Order Your Kit', desc: 'Select your preferred gas kit size and provide your delivery details.' },
              { step: '02', title: 'Free Installation', desc: 'Our team will deliver and install the smart kit at your home for free.' },
              { step: '03', title: 'Pay & Cook', desc: 'Top up your gas balance via M-Pesa and start cooking immediately.' },
            ].map((s, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center text-center gap-8">
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.5rem', boxShadow: '0 15px 30px rgba(13, 148, 136, 0.25)' }}>
                  {s.step}
                </div>
                <div>
                  <h3 className="mb-4" style={{ fontSize: '1.6rem' }}>{s.title}</h3>
                  <p className="text-muted mb-0">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="mb-4">Voice of the <span className="text-primary">Community</span></h2>
            <p className="text-muted">Join over 10,000 families who have switched to Okoa Gas.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Wanjiku', role: 'Business Owner', img: '/testimonials/sarah.png', quote: 'The pay-as-you-cook feature has helped me manage my kitchen budget so much better. No more unexpected gas refills!' },
              { name: 'David Omari', role: 'Teacher', img: '/testimonials/david.png', quote: 'Safety was my main concern with gas, but the smart leak detection sensor gives me total peace of mind.' },
              { name: 'Mary Atieno', role: 'Home Maker', img: '/testimonials/mary.png', quote: "The installation was quick and professional. I love that I only had to pay a small 10% upfront cost for the kit." },
            ].map((t, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="glass" style={{ padding: '32px', borderRadius: '24px', background: 'white', boxShadow: '0 15px 30px -5px rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.img} alt={t.name} style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover' }} />
                  <div>
                    <p className="font-bold mb-0" style={{ fontSize: '1.1rem' }}>{t.name}</p>
                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>{t.role}</p>
                  </div>
                </div>
                <p className="text-muted" style={{ fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>"{t.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#fdfdfd]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold uppercase tracking-widest mb-4 block" style={{ fontSize: '0.9rem' }}>Questions & Answers</span>
              <h2 className="mb-6">Everything You Need <span className="text-primary">to Know</span></h2>
              <p className="text-muted max-w-xl mx-auto">Find answers to common questions about Okoa Gas programs, technology, and impact.</p>
            </div>

            <FAQSection />
          </div>
        </div>
      </section>

      {/* Availability */}
      <section className="section pt-0">
        <div className="container">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="glass" style={{ padding: '80px', borderRadius: '48px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}>
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
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
