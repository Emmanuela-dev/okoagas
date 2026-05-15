import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trees, Wind, CreditCard, ArrowRight, RefreshCcw } from 'lucide-react';
import PageWrapper, { fadeUp, fadeIn, slideLeft, slideRight, stagger } from '../components/PageWrapper';

const Calculator = () => {
  const [fuelType, setFuelType] = useState('charcoal');
  const [monthlySpend, setMonthlySpend] = useState(3000);
  const [results, setResults] = useState({ co2Saved: 0, treesSaved: 0, creditsEarned: 0 });

  const calculateImpact = () => {
    let baseEmissionFactor = fuelType === 'charcoal' ? 1.5 : fuelType === 'wood' ? 1.8 : 1.2;
    let co2SavedMonthly = (monthlySpend / 100) * baseEmissionFactor;
    let annualCO2 = (co2SavedMonthly * 12) / 1000;
    setResults({
      co2Saved: annualCO2.toFixed(2),
      treesSaved: Math.ceil(annualCO2 * 15),
      creditsEarned: Math.floor(annualCO2 * 1500),
    });
  };

  useEffect(() => { calculateImpact(); }, [fuelType, monthlySpend]);

  return (
    <PageWrapper>
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h1 className="mb-4">Impact <span className="text-primary">Calculator</span></h1>
            <p className="text-muted text-2xl mx-auto max-w-2xl">
              Calculate how much you can contribute to a cleaner environment by switching from traditional fuels to Okoa Gas.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div variants={slideLeft} className="glass" style={{ padding: '60px', borderRadius: '40px' }}>
              <div className="mb-12">
                <label className="block mb-6 font-bold text-2xl">What fuel do you currently use?</label>
                <div className="grid grid-cols-3 gap-6">
                  {['charcoal', 'wood', 'kerosene'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFuelType(type)}
                      className={fuelType === type ? 'btn-primary' : 'btn-secondary'}
                      style={{ textTransform: 'capitalize', padding: '16px', borderRadius: '16px' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <label className="block mb-6 font-bold text-2xl">
                  Monthly spend on {fuelType} (KES): <span className="text-primary">{monthlySpend}</span>
                </label>
                <input
                  type="range" min="500" max="10000" step="100"
                  value={monthlySpend}
                  onChange={e => setMonthlySpend(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', height: '12px' }}
                />
                <div className="flex justify-between text-muted mt-4" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>500</span><span>10,000+</span>
                </div>
              </div>

              <div style={{ padding: '32px', background: 'var(--background)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <p className="mb-0" style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '600' }}>
                  <RefreshCcw className="w-5 h-5 inline mr-3" />
                  Calculations are based on average household energy consumption data in Kenya.
                </p>
              </div>
            </motion.div>

            <motion.div variants={slideRight} className="flex flex-col gap-8">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                style={{ background: 'var(--secondary)', color: 'white', padding: '60px', borderRadius: '40px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}
              >
                <motion.h3 variants={fadeUp} className="mb-12" style={{ color: 'white', fontSize: '2rem' }}>Your Annual Impact</motion.h3>
                <div className="flex flex-col gap-10">
                  {[
                    { icon: <Wind className="text-primary w-10 h-10" />, value: `${results.co2Saved} Tonnes`, label: 'CO2 Emissions Avoided' },
                    { icon: <Trees className="text-primary w-10 h-10" />, value: `${results.treesSaved} Trees`, label: 'Equivalent Forest Saved' },
                    { icon: <CreditCard className="text-primary w-10 h-10" />, value: `KES ${results.creditsEarned}`, label: 'Potential Carbon Credit Value' },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="flex items-center gap-8">
                      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white mb-1" style={{ fontSize: '2rem' }}>{item.value}</h4>
                        <p className="mb-0" style={{ opacity: 0.7, fontSize: '1.1rem' }}>{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="glass" style={{ padding: '48px', borderRadius: '40px' }}>
                <h4 className="mb-4" style={{ fontSize: '1.5rem' }}>Take the Next Step</h4>
                <p className="text-muted text-xl mb-8">Start your journey to clean energy today and start earning credits.</p>
                <Link to="/get-kit" className="btn-primary w-full justify-center" style={{ padding: '20px' }}>
                  Get Your Kit Now <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Calculator;
