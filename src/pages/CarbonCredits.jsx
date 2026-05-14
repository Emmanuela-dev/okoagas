import { motion } from 'framer-motion';
import { Leaf, Globe, TrendingUp, Award, CheckCircle, ShieldCheck } from 'lucide-react';

const CarbonCredits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="fade-in" style={{ paddingTop: '100px' }}>
      {/* Hero Section */}
      <section className="section bg-primary text-white" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="container">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="w-16 h-16 mx-auto mb-6" style={{ color: 'white' }} />
            <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Carbon <span style={{ opacity: 0.8 }}>Credits</span></h1>
            <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              Join the green revolution. Every meal you cook with Okoa Gas reduces your carbon footprint and helps preserve Kenya's forests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="text-primary" />, value: '2.5 Tonnes', label: 'CO2 Saved per Household/Year' },
              { icon: <TrendingUp className="text-primary" />, value: '15,000+', label: 'Total Credits Generated' },
              { icon: <Award className="text-primary" />, value: 'Gold Standard', label: 'Certified Methodology' }
            ].map((stat, idx) => (
              <div key={idx} className="glass" style={{ padding: '30px', textAlign: 'center', borderRadius: '16px' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.value}</h2>
                <p className="text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 style={{ marginBottom: '2rem' }}>How You Earn <span className="text-primary">Credits</span></h2>
              <div className="flex flex-col gap-8">
                {[
                  { title: 'Switch to LPG', desc: 'Replacing charcoal or wood with Okoa Gas eliminates harmful black carbon emissions.' },
                  { title: 'Smart Monitoring', desc: 'Our IoT meters precisely track your gas usage to verify your CO2 savings.' },
                  { title: 'Certification', desc: 'The saved emissions are bundled and certified as high-quality carbon credits.' },
                  { title: 'Shared Value', desc: 'A portion of the credit value is passed back to you through discounted gas and kit maintenance.' }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex gap-4">
                    <CheckCircle className="text-primary flex-shrink-0" />
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                borderRadius: '24px',
                padding: '40px',
                color: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}>
                <ShieldCheck className="w-12 h-12 mb-4" />
                <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Verified Impact</h3>
                <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
                  Our carbon project is registered with international standards, ensuring that every tonne of CO2 reduction is real, measurable, and permanent.
                </p>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                    "By switching to Okoa Gas, we've saved the equivalent of 20 trees this year alone."
                  </p>
                  <p style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 'bold' }}>— Happy Okoa User, Nairobi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-5" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '60px', borderRadius: '32px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Ready to See Your Impact?</h2>
            <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '1.2rem' }}>
              Use our calculator to see exactly how much you can save the planet (and your pocket) by switching today.
            </p>
            <a href="/calculator" className="btn-primary mx-auto" style={{ padding: '16px 40px' }}>
              Try the Impact Calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarbonCredits;
