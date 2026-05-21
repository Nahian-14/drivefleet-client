import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Minivan', 'Electric'];

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid #e2e8f0', borderRadius: '12px',
  fontFamily: 'DM Sans', fontSize: '14px',
};

export default function AddCar() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);

  const [form, setForm] = useState({
    carName: '', dailyRentPrice: '', carType: 'SUV',
    imageURL: '', seatCapacity: '', pickupLocation: '', description: '',
  });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const carData = {
        ...form,
        dailyRentPrice: Number(form.dailyRentPrice),
        seatCapacity: Number(form.seatCapacity),
        availability: available,
        ownerEmail: user.email,
        booking_count: 0,
        createdAt: new Date(),
      };
      await axiosSecure.post('/api/cars', carData);
      toast.success('Car listed successfully! 🚗');
      navigate('/my-added-cars');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add car');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'carName', label: 'Car Name', type: 'text', placeholder: 'e.g. Toyota Camry', icon: '🚗' },
    { name: 'dailyRentPrice', label: 'Daily Rent Price ($)', type: 'number', placeholder: '50', icon: '💵' },
    { name: 'imageURL', label: 'Image URL', type: 'url', placeholder: 'https://...', icon: '🖼️' },
    { name: 'seatCapacity', label: 'Seat Capacity', type: 'number', placeholder: '5', icon: '👤' },
    { name: 'pickupLocation', label: 'Pickup Location', type: 'text', placeholder: 'e.g. New York, NY', icon: '📍' },
  ];

  return (
    <PageWrapper>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
            List Your <span style={{ color: 'var(--accent)' }}>Car</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Add your vehicle to the DriveFleet marketplace.</p>
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {fields.map(f => (
              <div key={f.name}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>
                  {f.icon} {f.label}
                </label>
                <input
                  type={f.type} name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required className="input-glow"
                  style={inputStyle}
                />
              </div>
            ))}

            {/* Car Type */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>
                🏷️ Car Type
              </label>
              <select
                name="carType" value={form.carType} onChange={handleChange}
                className="input-glow"
                style={{ ...inputStyle, background: 'white' }}
              >
                {CAR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>
                📝 Description
              </label>
              <textarea
                name="description" value={form.description} onChange={handleChange}
                placeholder="Describe your car — features, condition, extras..."
                required rows={4} className="input-glow"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            {/* Availability */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(14,165,233,0.05)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Availability</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Is this car available for rent?</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px' }}
            >
              {loading ? '⏳ Adding Car...' : '🚗 List My Car'}
            </motion.button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
