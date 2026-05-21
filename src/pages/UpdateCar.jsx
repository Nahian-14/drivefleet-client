import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Minivan', 'Electric'];

export default function UpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    dailyRentPrice: '', description: '', availability: true,
    imageURL: '', carType: 'SUV', pickupLocation: '',
  });

  useEffect(() => {
    axiosSecure.get(`/api/cars/${id}`)
      .then(({ data }) => {
        setForm({
          dailyRentPrice: data.dailyRentPrice,
          description: data.description,
          availability: data.availability,
          imageURL: data.imageURL,
          carType: data.carType,
          pickupLocation: data.pickupLocation,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosSecure.put(`/api/cars/${id}`, {
        ...form, dailyRentPrice: Number(form.dailyRentPrice),
      });
      toast.success('Car updated successfully!');
      navigate('/my-added-cars');
    } catch {
      toast.error('Failed to update car');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: '12px',
    fontFamily: 'DM Sans', fontSize: '14px',
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PageWrapper>
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
            Update <span style={{ color: 'var(--accent)' }}>Listing</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>Edit your car details below.</p>
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>💵 Daily Rent Price ($)</label>
              <input type="number" name="dailyRentPrice" value={form.dailyRentPrice} onChange={handleChange} required className="input-glow" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>🏷️ Car Type</label>
              <select name="carType" value={form.carType} onChange={handleChange} className="input-glow" style={{ ...inputStyle, background: 'white' }}>
                {CAR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>📍 Pickup Location</label>
              <input type="text" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} required className="input-glow" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>🖼️ Image URL</label>
              <input type="url" name="imageURL" value={form.imageURL} onChange={handleChange} className="input-glow" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '7px' }}>📝 Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="input-glow" style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(14,165,233,0.05)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>Availability</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Is this car available for rent?</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={form.availability} onChange={e => setForm(prev => ({ ...prev, availability: e.target.checked }))} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => navigate('/my-added-cars')} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                disabled={saving}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '13px' }}
              >
                {saving ? '⏳ Saving...' : '✅ Save Changes'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
