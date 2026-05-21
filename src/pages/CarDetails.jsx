import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL;

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/cars/${id}`)
      .then(({ data }) => setCar(data))
      .catch(() => navigate('/not-found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book a car');
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;
  if (!car) return null;

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--muted)' }}>
          <Link to="/explore-cars" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← Explore Cars</Link>
          <span>/</span>
          <span>{car.carName}</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '48px', alignItems: 'start',
        }} className="hero-grid">
          {/* Image */}
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(14,165,233,0.12)',
          }}>
            {car.imageURL ? (
              <img
                src={car.imageURL}
                alt={car.carName}
                style={{
                  width: '100%', height: '360px', objectFit: 'cover',
                  transition: 'transform 0.4s',
                  display: 'block',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.target.style.transform = ''}
              />
            ) : (
              <div style={{
                height: '360px',
                background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '80px',
              }}>🚗</div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                background: car.availability ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.15)',
                color: car.availability ? '#16a34a' : '#64748b',
                borderRadius: '20px', padding: '5px 14px', fontSize: '13px', fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                animation: 'badgePop 0.5s cubic-bezier(0.22,1,0.36,1) both',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: car.availability ? '#22c55e' : '#94a3b8',
                  animation: car.availability ? 'pulseRing 1.8s infinite' : 'none',
                  display: 'inline-block',
                }} />
                {car.availability ? 'Available' : 'Unavailable'}
              </span>
              <span style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: 'white', borderRadius: '20px', padding: '5px 14px',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em',
                animation: 'badgePop 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both',
              }}>
                {car.carType}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700, color: 'var(--ink)', marginBottom: '8px',
            }}>
              {car.carName}
            </h1>

            <div style={{
              fontFamily: 'Space Mono, monospace', fontSize: '34px',
              fontWeight: 700, color: 'var(--accent)', marginBottom: '24px',
            }}>
              ${car.dailyRentPrice}
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)', fontFamily: 'DM Sans' }}>/day</span>
            </div>

            {/* Specs Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px', marginBottom: '24px',
            }}>
              {[
                { label: 'Seats', value: `${car.seatCapacity} passengers`, icon: '👤' },
                { label: 'Location', value: car.pickupLocation, icon: '📍' },
                { label: 'Type', value: car.carType, icon: '🚗' },
                { label: 'Total Bookings', value: car.booking_count || 0, icon: '📋' },
              ].map(spec => (
                <div key={spec.label} style={{
                  background: 'rgba(14,165,233,0.06)',
                  borderRadius: '12px', padding: '12px 14px',
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>
                    {spec.icon} {spec.label}
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '14px' }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '28px', fontSize: '15px' }}>
              {car.description}
            </p>

            {/* Book Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleBookNow}
              disabled={!car.availability}
              style={{
                width: '100%', padding: '16px',
                background: car.availability
                  ? 'linear-gradient(135deg, var(--accent), var(--accent2))'
                  : '#e2e8f0',
                color: car.availability ? 'white' : '#94a3b8',
                border: 'none', borderRadius: '26px',
                fontFamily: 'DM Sans', fontWeight: 600, fontSize: '17px',
                cursor: car.availability ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                marginBottom: '12px',
                boxShadow: car.availability ? '0 8px 24px rgba(14,165,233,0.28)' : 'none',
                transition: 'box-shadow 0.2s',
              }}
            >
              📅 {car.availability ? 'Book Now' : 'Currently Unavailable'}
            </motion.button>

            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)' }}>
              🔒 Secure booking · Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {showModal && <BookingModal car={car} onClose={() => setShowModal(false)} />}
    </PageWrapper>
  );
}
