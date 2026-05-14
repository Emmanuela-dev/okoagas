import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 style={{ marginBottom: '1rem' }}>Impact <span className="text-primary">Calculator</span></h1>
              <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                Calculate how much you can contribute to a cleaner environment by switching from traditional fuels to Okoa Gas.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Input Form */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass" 
              style={{ padding: '40px', borderRadius: '24px' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>What fuel do you currently use?</label>
                <div className="grid grid-cols-3 gap-4">
                  {['charcoal', 'wood', 'kerosene'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFuelType(type)}
                      className={fuelType === type ? 'btn-primary' : 'btn-secondary'}
                      style={{ textTransform: 'capitalize', padding: '12px' }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
                  Monthly spend on {fuelType} (KES): <span className="text-primary">{monthlySpend}</span>
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="100"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
                <div className="flex justify-between text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                  <span>500</span>
                  <span>10,000+</span>
                </div>
              </div>

              <div style={{ padding: '20px', background: 'var(--background)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: '600' }}>
                  <RefreshCcw className="w-4 h-4 inline mr-2" />
                  Calculations are based on average household energy consumption data in Kenya.
                </p>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <div style={{ background: 'var(--secondary)', color: 'white', padding: '40px', borderRadius: '24px' }}>
                <h3 style={{ color: 'white', marginBottom: '2rem' }}>Your Annual Impact</h3>
                
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                      <Wind className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.5rem' }}>{results.co2Saved} Tonnes</h4>
                      <p style={{ opacity: 0.7 }}>CO2 Emissions Avoided</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                      <Trees className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.5rem' }}>{results.treesSaved} Trees</h4>
                      <p style={{ opacity: 0.7 }}>Equivalent Forest Saved</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                      <CreditCard className="text-primary w-8 h-8" />
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.5rem' }}>KES {results.creditsEarned}</h4>
                      <p style={{ opacity: 0.7 }}>Potential Carbon Credit Value</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass" style={{ padding: '30px', borderRadius: '24px' }}>
                <h4 style={{ marginBottom: '1rem' }}>Take the Next Step</h4>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                  Start your journey to clean energy today and start earning credits.
                </p>
                <a href="/get-kit" className="btn-primary w-full justify-center">
                  Get Your Kit Now <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
