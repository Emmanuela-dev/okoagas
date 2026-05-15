import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Globe, TrendingUp, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import PageWrapper, { fadeUp, fadeIn, slideLeft, slideRight, stagger } from '../components/PageWrapper';

const CarbonCredits = () => (
  <PageWrapper>
    {/* Hero */}
    <section className="section text-white text-center" style={{ padding: '120px 0', backgroundColor: '#065f46' }}>
      <div className="container">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Leaf className="w-20 h-20 mx-auto mb-8 text-white" />
          <h1 className="text-white mb-6" style={{ fontSize: '4.5rem' }}>Carbon <span style={{ opacity: 0.8 }}>Credits</span></h1>
          <p className="text-2xl mx-auto max-w-2xl" style={{ opacity: 0.9 }}>
            Join the green revolution. Every meal you cook with Okoa Gas reduces your carbon footprint and helps preserve Kenya's forests.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="section-sm">
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: <Globe className="text-primary w-10 h-10" />, value: '2.5 Tonnes', label: 'CO2 Saved per Household/Year' },
            { icon: <TrendingUp className="text-primary w-10 h-10" />, value: '15,000+', label: 'Total Credits Generated' },
            { icon: <Award className="text-primary w-10 h-10" />, value: 'Gold Standard', label: 'Certified Methodology' },
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeUp} className="glass" style={{ padding: '32px', textAlign: 'center', borderRadius: '24px' }}>
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <h2 className="mb-1" style={{ fontSize: '2rem' }}>{stat.value}</h2>
              <p className="text-muted mb-0" style={{ fontSize: '0.9rem', fontWeight: '700' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* How it Works */}
    <section className="section bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.h2 variants={fadeUp} className="mb-12">How You Earn <span className="text-primary">Credits</span></motion.h2>
            <div className="flex flex-col gap-10">
              {[
                { title: 'Switch to LPG', desc: 'Replacing charcoal or wood with Okoa Gas eliminates harmful black carbon emissions.' },
                { title: 'Smart Monitoring', desc: 'Our IoT meters precisely track your gas usage to verify your CO2 savings.' },
                { title: 'Certification', desc: 'The saved emissions are bundled and certified as high-quality carbon credits.' },
                { title: 'Shared Value', desc: 'A portion of the credit value is passed back to you through discounted gas and kit maintenance.' },
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-6">
                  <CheckCircle className="text-primary flex-shrink-0 w-8 h-8" />
                  <div>
                    <h4 className="mb-2" style={{ fontSize: '1.4rem' }}>{item.title}</h4>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="glass" style={{
              background: 'linear-gradient(135deg, var(--secondary) 0%, #1e293b 100%)',
              borderRadius: '40px', padding: '60px', color: 'white',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)'
            }}>
              <ShieldCheck className="w-16 h-16 mb-8 text-primary" />
              <h3 className="mb-6" style={{ color: 'white', fontSize: '2rem' }}>Verified Impact</h3>
              <p className="mb-12 text-2xl" style={{ opacity: 0.8 }}>
                Our carbon project is registered with international standards, ensuring that every tonne of CO2 reduction is real, measurable, and permanent.
              </p>
              <div style={{ padding: '32px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', borderLeft: '4px solid var(--primary)' }}>
                <p className="mb-4" style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9 }}>
                  "By switching to Okoa Gas, we've saved the equivalent of 20 trees this year alone."
                </p>
                <p className="mb-0 font-bold" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>— Happy Okoa User, Nairobi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section py-20 text-center">
      <div className="container">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          className="glass" style={{ padding: '100px 60px', borderRadius: '48px', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.08)' }}>
          <h2 className="mb-6">Ready to See Your Impact?</h2>
          <p className="text-muted text-2xl mb-12 max-w-2xl mx-auto">
            Use our calculator to see exactly how much you can save the planet (and your pocket) by switching today.
          </p>
          <Link to="/calculator" className="btn-primary" style={{ padding: '18px 48px' }}>
            Try the Impact Calculator
          </Link>
        </motion.div>
      </div>
    </section>
  </PageWrapper>
);

export default CarbonCredits;
