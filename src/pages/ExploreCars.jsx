import { useState, useEffect } from 'react';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API = import.meta.env.VITE_API_URL;
const CAR_TYPES = ['All', 'SUV', 'Sedan', 'Luxury', 'Hatchback', 'Electric', 'Minivan'];

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (filter !== 'All') params.type = filter;
        const { data } = await axios.get(`${API}/api/cars`, { params });
        setCars(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchCars, 300);
    return () => clearTimeout(timer);
  }, [search, filter]);

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700,
            color: 'var(--ink)', marginBottom: '8px',
          }}>
            Explore <span style={{ color: 'var(--accent)' }}>All Cars</span>
            <span style={{
              marginLeft: '16px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: 'white', borderRadius: '20px',
              padding: '4px 14px', fontSize: '16px',
              fontFamily: 'Space Mono, monospace',
              verticalAlign: 'middle',
            }}>
              {cars.length}
            </span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
            Browse our full fleet — available and unavailable vehicles.
          </p>
        </div>

        {/* Search & Filter */}
        <div style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.95)',
          borderRadius: '20px', padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search by car name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-glow"
              style={{
                width: '100%', padding: '11px 14px 11px 40px',
                border: '1.5px solid #e2e8f0', borderRadius: '26px',
                fontFamily: 'DM Sans', fontSize: '15px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CAR_TYPES.map(t => (
              <button
                key={t}
                className={`filter-pill${filter === t ? ' active' : ''}`}
                onClick={() => setFilter(t)}
                style={{ padding: '7px 16px', fontSize: '13px' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', marginBottom: '10px', color: 'var(--ink)' }}>
              No cars found
            </h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {cars.map((car, i) => <CarCard key={car._id} car={car} index={i} />)}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
