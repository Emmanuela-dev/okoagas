import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator as CalcIcon, Trees, Wind, CreditCard, ArrowRight, RefreshCcw } from 'lucide-react';

const Calculator = () => {
  const [fuelType, setFuelType] = useState('charcoal');
  const [monthlySpend, setMonthlySpend] = useState(3000);
  const [results, setResults] = useState({
    co2Saved: 0,
    treesSaved: 0,
    creditsEarned: 0
  });

  const calculateImpact = () => {
    // Basic estimation logic
    // Charcoal emissions are high: ~3.5kg CO2 per 1kg charcoal
    // LPG is ~3kg CO2 per 1kg LPG but much more efficient (less energy needed for same cooking)
    // Average saving is ~60% compared to charcoal
    
    let baseEmissionFactor = fuelType === 'charcoal' ? 1.5 : fuelType === 'wood' ? 1.8 : 1.2;
    let co2SavedMonthly = (monthlySpend / 100) * baseEmissionFactor; // rough estimate: 1.5kg saved per 100ksh spent on biomass
    
    let annualCO2 = (co2SavedMonthly * 12) / 1000; // in tonnes
    let annualTrees = annualCO2 * 15; // ~15 trees to offset 1 tonne CO2 per year
    let annualCredits = annualCO2 * 1500; // ~1500 KES value per tonne (carbon credit price)

    setResults({
      co2Saved: annualCO2.toFixed(2),
      treesSaved: Math.ceil(annualTrees),
      creditsEarned: Math.floor(annualCredits)
    });
  };

  useEffect(() => {
    calculateImpact();
  }, [fuelType, monthlySpend]);

  return (
    <div className="fade-in pt-20" style={{ minHeight: '100vh' }}>
      <section className="section">
        <div className="container">
          <div className="text-center mb-20">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="mb-4">Impact <span className="text-primary">Calculator</span></h1>
              <p className="text-muted text-2xl mx-auto max-w-2xl">
                Calculate how much you can contribute to a cleaner environment by switching from traditional fuels to Okoa Gas.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Input Form */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass" 
              style={{ padding: '60px', borderRadius: '40px' }}
            >
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
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="100"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', height: '12px' }}
                />
                <div className="flex justify-between text-muted mt-4" style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  <span>500</span>
                  <span>10,000+</span>
                </div>
              </div>

              <div style={{ padding: '32px', background: 'var(--background)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <p className="mb-0" style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '600' }}>
                  <RefreshCcw className="w-5 h-5 inline mr-3 animate-spin-slow" />
                  Calculations are based on average household energy consumption data in Kenya.
                </p>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col gap-8"
            >
              <div style={{ background: 'var(--secondary)', color: 'white', padding: '60px', borderRadius: '40px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2)' }}>
                <h3 className="mb-12" style={{ color: 'white', fontSize: '2rem' }}>Your Annual Impact</h3>
                
                <div className="flex flex-col gap-10">
                  <div className="flex items-center gap-8">
                    <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Wind className="text-primary w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1" style={{ fontSize: '2rem' }}>{results.co2Saved} Tonnes</h4>
                      <p className="mb-0" style={{ opacity: 0.7, fontSize: '1.1rem' }}>CO2 Emissions Avoided</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Trees className="text-primary w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1" style={{ fontSize: '2rem' }}>{results.treesSaved} Trees</h4>
                      <p className="mb-0" style={{ opacity: 0.7, fontSize: '1.1rem' }}>Equivalent Forest Saved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CreditCard className="text-primary w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1" style={{ fontSize: '2rem' }}>KES {results.creditsEarned}</h4>
                      <p className="mb-0" style={{ opacity: 0.7, fontSize: '1.1rem' }}>Potential Carbon Credit Value</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass" style={{ padding: '48px', borderRadius: '40px' }}>
                <h4 className="mb-4" style={{ fontSize: '1.5rem' }}>Take the Next Step</h4>
                <p className="text-muted text-xl mb-8">
                  Start your journey to clean energy today and start earning credits.
                </p>
                <Link to="/get-kit" className="btn-primary w-full justify-center" style={{ padding: '20px' }}>
                  Get Your Kit Now <ArrowRight className="w-6 h-6 ml-3" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
