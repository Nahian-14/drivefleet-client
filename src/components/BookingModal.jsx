import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '../animations/variants';
import { useAuth } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function BookingModal({ car, onClose }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const calcTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.max(1, Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    ));
    return days * car.dailyRentPrice;
  };

  const handleBook = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      toast.error('End date must be after start date');
      return;
    }
    setLoading(true);
    try {
      const booking = {
        carId: car._id,
        carName: car.carName,
        carImage: car.imageURL,
        dailyRentPrice: car.dailyRentPrice,
        totalPrice: calcTotal(),
        userEmail: user.email,
        userName: user.displayName || 'User',
        driverNeeded,
        specialNote,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        bookingDate: new Date(),
        status: 'confirmed',
      };
      await axiosSecure.post('/api/bookings', booking);
      await axiosSecure.patch(`/api/cars/${car._id}`);
      toast.success('Booking confirmed! 🎉');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={e => e.stopPropagation()}
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '0 24px 64px rgba(14,165,233,0.2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: 'var(--ink)' }}>
              Book This Car
            </h2>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--muted)' }}
            >✕</button>
          </div>

          {/* Car Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)',
            borderRadius: '14px', padding: '14px 16px',
            marginBottom: '24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>{car.carName}</span>
            <span style={{ fontFamily: 'Space Mono, monospace', color: 'var(--accent)', fontWeight: 700 }}>
              ${car.dailyRentPrice}/day
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={e => setStartDate(e.target.value)}
                  className="input-glow"
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontFamily: 'DM Sans', fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || format(new Date(), 'yyyy-MM-dd')}
                  onChange={e => setEndDate(e.target.value)}
                  className="input-glow"
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontFamily: 'DM Sans', fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Driver Needed */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 500 }}>Driver Needed?</label>
              <label className="toggle-switch">
                <input type="checkbox" checked={driverNeeded} onChange={e => setDriverNeeded(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>

            {/* Special Note */}
            <div>
              <label style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Special Note (optional)</label>
              <textarea
                value={specialNote}
                onChange={e => setSpecialNote(e.target.value)}
                placeholder="Any special requirements..."
                className="input-glow"
                rows={3}
                style={{
                  width: '100%', padding: '10px 12px',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  fontFamily: 'DM Sans', fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Total Price */}
            {calcTotal() > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(56,189,248,0.08))',
                borderRadius: '12px', padding: '14px 16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Total Price</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '22px', fontWeight: 700, color: 'var(--accent)' }}>
                  ${calcTotal()}
                </span>
              </div>
            )}

            <button
              onClick={handleBook}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              {loading ? '⏳ Booking...' : '📅 Confirm Booking'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)' }}>
              🔒 Secure booking · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
