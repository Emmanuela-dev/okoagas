import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Package, CreditCard, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';

const GetKit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    county: 'Nairobi',
    area: '',
    houseNo: '',
    kitSize: '6kg',
    accessories: ['Regulator', 'Hose Pipe']
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleMpesaPayment = async () => {
    setLoading(true);
    try {
      const amount = formData.kitSize === '6kg' ? 4500 : 7500;
      const response = await fetch('/api/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          amount: amount,
          accountReference: 'OKOA-' + formData.name.substring(0, 10).replace(/\s/g, '')
        })
      });

      const data = await response.json();
      
      if (data.ResponseCode === '0') {
        // Success code for STK push request accepted
        setSuccess(true);
      } else {
        alert('Payment request failed: ' + (data.CustomerMessage || 'Unknown error'));
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred while processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { icon: <User />, label: 'Details' },
    { icon: <MapPin />, label: 'Location' },
    { icon: <Package />, label: 'Kit' },
    { icon: <CreditCard />, label: 'Payment' }
  ];

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Progress Bar */}
        <div className="flex justify-between items-center" style={{ marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20px', left: '0', width: '100%', height: '2px', background: '#e2e8f0', zIndex: -1 }}></div>
          <div style={{ position: 'absolute', top: '20px', left: '0', width: `${((step-1)/3)*100}%`, height: '2px', background: 'var(--primary)', zIndex: -1, transition: 'width 0.3s ease' }}></div>
          
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: step > idx + 1 ? 'var(--primary)' : (step === idx + 1 ? 'var(--primary)' : 'white'),
                color: step > idx + 1 || step === idx + 1 ? 'white' : 'var(--text-muted)',
                border: step >= idx + 1 ? 'none' : '2px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: step === idx + 1 ? '0 0 0 4px rgba(13, 148, 136, 0.2)' : 'none'
              }}>
                {step > idx + 1 ? <Check className="w-5 h-5" /> : s.icon}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: step === idx + 1 ? '700' : '500', color: step === idx + 1 ? 'var(--primary)' : 'var(--text-muted)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="glass" style={{ padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Check className="w-10 h-10" />
                </div>
                <h2>Order Placed Successfully!</h2>
                <p className="text-muted" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                  Your OKOA GAS kit is on its way. Our team will contact you shortly for installation.
                </p>
                <button onClick={() => window.location.href = '/'} className="btn-primary">Return Home</button>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Personal Details</h2>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe" 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number (M-Pesa)</label>
                        <input 
                          type="text" 
                          placeholder="0712 345 678" 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Delivery Location</h2>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Neighborhood/Area</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Westlands, Nairobi" 
                          value={formData.area} 
                          onChange={e => setFormData({...formData, area: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Apartment/House No.</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Block A, Apt 4" 
                          value={formData.houseNo} 
                          onChange={e => setFormData({...formData, houseNo: e.target.value})} 
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                      <h3 style={{ marginBottom: '1rem' }}>Find your location on the map</h3>
                      <div style={{ width: '100%', height: '320px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <iframe
                          title="Delivery location map"
                          src={`https://www.google.com/maps?q=${encodeURIComponent(formData.area || 'Nairobi, Kenya')}&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 style={{ marginBottom: '1.5rem' }}>Select Your Kit</h2>
                    <div className="flex flex-col gap-4">
                      {[
                        { id: '6kg', name: 'Starter Kit (6kg)', price: 'Ksh 4,500' },
                        { id: '13kg', name: 'Family Kit (13kg)', price: 'Ksh 7,500' }
                      ].map(kit => (
                        <div 
                          key={kit.id}
                          onClick={() => setFormData({...formData, kitSize: kit.id})}
                          style={{ 
                            padding: '20px', 
                            borderRadius: '12px', 
                            border: `2px solid ${formData.kitSize === kit.id ? 'var(--primary)' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'between',
                            alignItems: 'center',
                            background: formData.kitSize === kit.id ? '#f0fdfa' : 'white'
                          }}
                        >
                          <div>
                            <p style={{ fontWeight: '700' }}>{kit.name}</p>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Includes full cylinder, regulator, and hose.</p>
                          </div>
                          <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{kit.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Complete Payment</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>
                      Click below to receive an M-Pesa STK push on your phone <strong>{formData.phone}</strong>.
                    </p>
                    <div className="glass" style={{ padding: '20px', borderRadius: '16px', marginBottom: '2rem', textAlign: 'left' }}>
                      <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                        <span>Kit Selection:</span>
                        <span style={{ fontWeight: '700' }}>{formData.kitSize === '6kg' ? '6kg Starter' : '13kg Family'}</span>
                      </div>
                      <div className="flex justify-between" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ fontWeight: '700' }}>Total Amount:</span>
                        <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem' }}>
                          Ksh {formData.kitSize === '6kg' ? '4,500' : '7,500'}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      className="btn-primary w-full justify-center" 
                      onClick={handleMpesaPayment}
                      disabled={loading}
                      style={{ padding: '16px' }}
                    >
                      {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                      ) : (
                        'Pay via M-PESA'
                      )}
                    </button>
                  </div>
                )}

                {!success && (
                  <div className="flex justify-between" style={{ marginTop: '2.5rem' }}>
                    {step > 1 ? (
                      <button className="flex items-center gap-2 text-muted font-bold" onClick={prevStep}>
                        <ChevronLeft className="w-5 h-5" /> Back
                      </button>
                    ) : <div></div>}
                    
                    {step < 4 && (
                      <button className="btn-primary" onClick={nextStep}>
                        Next <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GetKit;
