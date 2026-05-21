import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { useAuth } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useScrollReveal } from '../hooks/useScrollReveal';
import toast from 'react-hot-toast';

function CarRow({ car, index, onDelete }) {
  const ref = useScrollReveal(index * 0.08);
  return (
    <div ref={ref} style={{ opacity: 0 }} className="glass-card" style={{
      padding: '20px', marginBottom: '16px',
      display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
    }}>
      <div style={{ width: 80, height: 60, borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
        {car.imageURL ? (
          <img src={car.imageURL} alt={car.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🚗</div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: '140px' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
          {car.carName}
        </h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--muted)' }}>
          <span>{car.carType}</span>
          <span>·</span>
          <span>📍 {car.pickupLocation}</span>
          <span>·</span>
          <span>📋 {car.booking_count || 0} bookings</span>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '16px', color: 'var(--accent)', marginBottom: '4px' }}>
          ${car.dailyRentPrice}/day
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 600, borderRadius: '20px', padding: '3px 10px',
          background: car.availability ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.15)',
          color: car.availability ? '#16a34a' : '#64748b',
        }}>
          {car.availability ? '● Available' : '○ Unavailable'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Link
          to={`/update-car/${car._id}`}
          className="btn-outline"
          style={{ padding: '8px 18px', fontSize: '13px' }}
        >
          ✏️ Update
        </Link>
        <button
          onClick={() => onDelete(car)}
          style={{
            padding: '8px 18px', fontSize: '13px',
            background: 'transparent', border: '2px solid #ef4444',
            color: '#ef4444', borderRadius: '26px',
            cursor: 'pointer', fontWeight: 600, fontFamily: 'DM Sans',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#ef4444'; }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default function MyAddedCars() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/api/cars/user/${user.email}`)
      .then(({ data }) => setCars(data))
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosSecure.delete(`/api/cars/${deleteTarget._id}`);
      setCars(prev => prev.filter(c => c._id !== deleteTarget._id));
      toast.success('Car listing removed');
    } catch {
      toast.error('Failed to delete car');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <PageWrapper>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
              My <span style={{ color: 'var(--accent)' }}>Listed Cars</span>
            </h1>
            <p style={{ color: 'var(--muted)' }}>Manage your vehicle listings.</p>
          </div>
          <Link to="/add-car" className="btn-primary" style={{ padding: '11px 24px' }}>
            ➕ Add New Car
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>🚗</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', marginBottom: '10px', color: 'var(--ink)' }}>
              No listings yet
            </h3>
            <p style={{ marginBottom: '28px' }}>Add your first car to start earning.</p>
            <Link to="/add-car" className="btn-primary">➕ Add Your First Car</Link>
          </div>
        ) : (
          <AnimatePresence>
            {cars.map((car, i) => (
              <motion.div
                key={car._id}
                exit={{ opacity: 0, x: -24, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <CarRow car={car} index={i} onDelete={setDeleteTarget} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {deleteTarget && (
        <ConfirmDeleteModal
          carName={deleteTarget.carName}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </PageWrapper>
  );
}
