import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const gradients = [
  'linear-gradient(135deg, #e0f2fe, #dcfce7)',
  'linear-gradient(135deg, #ede9fe, #fce7f3)',
  'linear-gradient(135deg, #fef9c3, #fed7aa)',
  'linear-gradient(135deg, #dcfce7, #d1fae5)',
  'linear-gradient(135deg, #dbeafe, #ede9fe)',
  'linear-gradient(135deg, #fce7f3, #fae8ff)',
];

export default function CarCard({ car, index = 0 }) {
  const ref = useScrollReveal(index * 0.1);
  const grad = gradients[index % gradients.length];

  return (
    <div ref={ref} style={{ opacity: 0 }} className="car-card">
      <div className="card-img-wrapper">
        {car.imageURL ? (
          <img src={car.imageURL} alt={car.carName} loading="lazy" />
        ) : (
          <div style={{
            background: grad,
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '52px'
          }}>🚗</div>
        )}
        <div className="img-overlay" />
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: 'white', borderRadius: '20px',
          padding: '4px 12px', fontSize: '11px', fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>
          {car.carType || 'Car'}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '17px', fontWeight: 700,
          color: 'var(--ink)', marginBottom: '10px'
        }}>
          {car.carName}
        </h3>

        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '12px', fontSize: '13px',
          color: 'var(--muted)', marginBottom: '16px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className={`avail-dot ${car.availability ? 'available' : 'unavailable'}`} />
            {car.availability ? 'Available' : 'Unavailable'}
          </span>
          <span>·</span>
          <span>👤 {car.seatCapacity} seats</span>
          <span>·</span>
          <span>📍 {car.pickupLocation}</span>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '18px', fontWeight: 700,
            color: 'var(--accent)'
          }}>
            ${car.dailyRentPrice}<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>/day</span>
          </span>
          <Link
            to={`/cars/${car._id}`}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
