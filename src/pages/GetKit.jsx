import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Package, CreditCard, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';
import PageWrapper, { fadeUp, fadeIn } from '../components/PageWrapper';

const COMPANY_WHATSAPP_NUMBER = import.meta.env.VITE_COMPANY_WHATSAPP_NUMBER || '254743800904';

const GetKit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', county: 'Nairobi', area: '', houseNo: '',
    kitSize: '6kg', accessories: ['Regulator', 'Hose Pipe']
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleMpesaPayment = async () => {
    setLoading(true);
    try {
      const amount = formData.kitSize === '6kg' ? 500 : 1000;
      const orderDetails = {
        name: formData.name,
        phone: formData.phone,
        county: formData.county,
        area: formData.area,
        houseNo: formData.houseNo,
        kitSize: formData.kitSize,
        accessories: formData.accessories,
        amount,
      };
      const response = await fetch('/api/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          amount,
          accountReference: `OKOA-${formData.name.substring(0, 10).replace(/\s/g, '')}`,
          orderDetails,
        })
      });
      const data = await response.json();
      if (data.ResponseCode === '0') {
        setSuccess(true);
        const message = [
          'New Okoa Gas order',
          `Name: ${formData.name}`,
          `Phone: ${formData.phone}`,
          `Location: ${formData.area}, ${formData.county}`,
          `House No: ${formData.houseNo}`,
          `Kit: ${formData.kitSize}`,
          `Accessories: ${formData.accessories.join(', ')}`,
          `Amount: Ksh ${amount}`,
        ].join('\n');

        const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
      else alert('Payment request failed: ' + (data.CustomerMessage || 'Unknown error'));
    } catch (error) {
      alert('An error occurred while processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { icon: <User />, label: 'Details' },
    { icon: <MapPin />, label: 'Location' },
    { icon: <Package />, label: 'Kit' },
    { icon: <CreditCard />, label: 'Payment' },
  ];

  return (
    <PageWrapper>
      <div className="container" style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '100vh' }}>
        <div className="mx-auto" style={{ maxWidth: '700px' }}>

          {/* Progress Bar */}
          <motion.div variants={fadeUp} className="flex justify-between items-center mb-16" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '24px', left: '0', width: '100%', height: '3px', background: '#e2e8f0', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', top: '24px', left: '0', width: `${((step - 1) / 3) * 100}%`, height: '3px', background: 'var(--primary)', zIndex: -1, transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
            {steps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: step >= idx + 1 ? 'var(--primary)' : 'white',
                  color: step >= idx + 1 ? 'white' : 'var(--text-muted)',
                  border: step >= idx + 1 ? 'none' : '2px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: step === idx + 1 ? '0 0 0 6px rgba(74, 222, 128, 0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {step > idx + 1 ? <Check className="w-6 h-6" /> : s.icon}
                </div>
                <span className="text-2xl" style={{ fontWeight: step === idx + 1 ? '800' : '500', color: step === idx + 1 ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} className="glass" style={{ padding: '60px', borderRadius: '40px', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3rem' }}>
                    <Check className="w-12 h-12" />
                  </div>
                  <h2 className="mb-6">Order Placed Successfully!</h2>
                  <p className="text-muted text-2xl mb-12">Your OKOA GAS kit is on its way. Our team will contact you shortly for installation.</p>
                  <Link to="/" className="btn-primary" style={{ padding: '18px 48px' }}>Return Home</Link>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 1 && (
                    <div>
                      <h2 className="mb-8">Personal Details</h2>
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block mb-3 font-bold text-xl">Full Name</label>
                          <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '16px 20px', borderRadius: '12px' }} />
                        </div>
                        <div>
                          <label className="block mb-3 font-bold text-xl">Phone Number (M-Pesa)</label>
                          <input type="text" placeholder="0712 345 678" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ padding: '16px 20px', borderRadius: '12px' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="mb-8">Delivery Location</h2>
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block mb-3 font-bold text-xl">Neighborhood/Area</label>
                          <input type="text" placeholder="e.g. Westlands, Nairobi" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} style={{ padding: '16px 20px', borderRadius: '12px' }} />
                        </div>
                        <div>
                          <label className="block mb-3 font-bold text-xl">Apartment/House No.</label>
                          <input type="text" placeholder="e.g. Block A, Apt 4" value={formData.houseNo} onChange={e => setFormData({ ...formData, houseNo: e.target.value })} style={{ padding: '16px 20px', borderRadius: '12px' }} />
                        </div>
                      </div>
                      <div className="mt-12">
                        <h3 className="mb-6">Confirm your location</h3>
                        <div style={{ width: '100%', height: '350px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <iframe
                            title="Delivery location map"
                            src={`https://www.google.com/maps?q=${encodeURIComponent(formData.area || 'Nairobi, Kenya')}&output=embed`}
                            width="100%" height="100%" style={{ border: 0 }}
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 className="mb-8">Select Your Kit</h2>
                      <div className="flex flex-col gap-6">
                        {[
                          { id: '6kg', name: '6kg Starter Kit', price: 'Ksh 0 Upfront', sub: 'Pay only for gas consumed' },
                          { id: '13kg', name: '13kg Family Kit', price: 'Ksh 0 Upfront', sub: 'Pay only for gas consumed' },
                        ].map(kit => (
                          <motion.div
                            key={kit.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, kitSize: kit.id })}
                            style={{
                              padding: '32px', borderRadius: '20px',
                              border: `2px solid ${formData.kitSize === kit.id ? 'var(--primary)' : '#e2e8f0'}`,
                              cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              background: formData.kitSize === kit.id ? '#f0fdfa' : 'white',
                              transition: 'border-color 0.2s, background 0.2s',
                            }}
                          >
                            <div>
                              <p className="font-bold text-xl mb-1">{kit.name}</p>
                              <p className="text-muted mb-0" style={{ fontSize: '1rem' }}>{kit.sub}</p>
                            </div>
                            <span className="text-2xl" style={{ fontWeight: '900', color: 'var(--primary)' }}>{kit.price}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="text-center">
                      <h2 className="mb-4">Complete Payment</h2>
                      <p className="text-muted text-xl mb-12">
                        Click below to receive an M-Pesa STK push on your phone <strong>{formData.phone}</strong>.
                      </p>
                      <p className="text-muted mb-8" style={{ fontSize: '1rem' }}>
                        After payment, your order details will be sent to the company number for follow-up and installation.
                      </p>
                      <div className="glass mb-12" style={{ padding: '32px', borderRadius: '24px', textAlign: 'left', border: '1px solid var(--border)' }}>
                        <div className="flex justify-between mb-4">
                          <span className="text-xl">Hardware Cost:</span>
                          <span className="text-xl font-bold text-primary">FREE (Zero Upfront)</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span className="text-xl">Installation & Setup:</span>
                          <span className="text-xl font-bold text-primary">FREE</span>
                        </div>
                        <div className="flex justify-between pt-6 mt-6" style={{ borderTop: '1px solid #e2e8f0' }}>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold">Initial Gas Credit:</span>
                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Loaded directly to your meter</span>
                          </div>
                          <span className="text-secondary" style={{ fontWeight: '900', fontSize: '2rem' }}>
                            Ksh {formData.kitSize === '6kg' ? '500' : '1,000'}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn-primary w-full justify-center"
                        onClick={handleMpesaPayment}
                        disabled={loading}
                        style={{ padding: '20px', borderRadius: '18px' }}
                      >
                        {loading ? <><Loader2 className="w-6 h-6 animate-spin mr-3" /> Processing...</> : 'Pay via M-PESA'}
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between mt-16">
                    {step > 1 ? (
                      <button className="flex items-center gap-2 text-muted font-bold text-xl hover:text-secondary transition-colors" onClick={prevStep}>
                        <ChevronLeft className="w-6 h-6" /> Back
                      </button>
                    ) : <div />}
                    {step < 4 && (
                      <button className="btn-primary" onClick={nextStep}>
                        Next Step <ChevronRight className="w-6 h-6 ml-2" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default GetKit;
