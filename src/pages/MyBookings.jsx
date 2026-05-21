import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PageWrapper from '../components/PageWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

export default function MyBookings() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/api/bookings/${user.email}`)
      .then(({ data }) => setBookings(data))
      .finally(() => setLoading(false));
  }, [user.email]);

  const statusColor = (s) => s === 'confirmed' ? { bg: 'rgba(34,197,94,0.1)', color: '#16a34a' } : { bg: 'rgba(148,163,184,0.15)', color: '#64748b' };

  return (
    <PageWrapper>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
            My <span style={{ color: 'var(--accent)' }}>Bookings</span>
          </h1>
          <p style={{ color: 'var(--muted)' }}>All your car rental history in one place.</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', margin: '0 auto 20px',
              animation: 'pulseRing 2s infinite',
            }}>📋</div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', marginBottom: '10px', color: 'var(--ink)' }}>
              No bookings yet
            </h3>
            <p style={{ marginBottom: '28px' }}>Your next adventure is just a click away.</p>
            <Link to="/explore-cars" className="btn-primary">🚗 Explore Cars</Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div style={{ display: 'none' }} className="hidden md:block">
              <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      {['Car', 'Daily Price', 'Total Price', 'Booking Date', 'Dates', 'Driver', 'Status'].map(h => (
                        <th key={h} style={{
                          padding: '14px 16px', textAlign: 'left',
                          fontSize: '12px', fontWeight: 700,
                          color: 'var(--muted)', textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => {
                      const sc = statusColor(b.status);
                      return (
                        <tr key={b._id} className="booking-row" style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: 48, height: 36, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                {b.carImage ? (
                                  <img src={b.carImage} alt={b.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🚗</div>
                                )}
                              </div>
                              <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{b.carName}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: 'var(--muted)' }}>${b.dailyRentPrice}/day</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', fontWeight: 700, color: 'var(--accent)' }}>${b.totalPrice}</span>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--muted)' }}>
                            {b.bookingDate ? format(new Date(b.bookingDate), 'MMM d, yyyy') : '—'}
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--muted)' }}>
                            {b.startDate ? format(new Date(b.startDate), 'MMM d') : '—'} → {b.endDate ? format(new Date(b.endDate), 'MMM d') : '—'}
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                            <span style={{
                              background: b.driverNeeded ? 'rgba(14,165,233,0.1)' : 'rgba(148,163,184,0.1)',
                              color: b.driverNeeded ? 'var(--accent)' : 'var(--muted)',
                              borderRadius: '20px', padding: '3px 10px', fontSize: '12px', fontWeight: 600,
                            }}>
                              {b.driverNeeded ? '🚗 Yes' : '🙅 No'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              background: sc.bg, color: sc.color,
                              borderRadius: '20px', padding: '4px 12px',
                              fontSize: '12px', fontWeight: 700,
                              textTransform: 'capitalize',
                            }}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookings.map(b => {
                const sc = statusColor(b.status);
                return (
                  <div key={b._id} className="glass-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                      <div style={{ width: 56, height: 42, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        {b.carImage ? (
                          <img src={b.carImage} alt={b.carName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🚗</div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>{b.carName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                          Booked {b.bookingDate ? format(new Date(b.bookingDate), 'MMM d, yyyy') : '—'}
                        </div>
                      </div>
                      <span style={{
                        background: sc.bg, color: sc.color,
                        borderRadius: '20px', padding: '3px 10px',
                        fontSize: '11px', fontWeight: 700, height: 'fit-content',
                        textTransform: 'capitalize',
                      }}>{b.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                      <div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '2px' }}>TOTAL PRICE</div>
                        <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'var(--accent)', fontSize: '16px' }}>${b.totalPrice}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '2px' }}>DAILY RATE</div>
                        <div style={{ fontFamily: 'Space Mono, monospace', color: 'var(--muted)' }}>${b.dailyRentPrice}/day</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '2px' }}>TRIP DATES</div>
                        <div style={{ color: 'var(--ink)', fontWeight: 500 }}>
                          {b.startDate ? format(new Date(b.startDate), 'MMM d') : '—'} – {b.endDate ? format(new Date(b.endDate), 'MMM d') : '—'}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '2px' }}>DRIVER</div>
                        <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{b.driverNeeded ? '✅ Included' : '❌ Not needed'}</div>
                      </div>
                    </div>

                    {b.specialNote && (
                      <div style={{
                        marginTop: '12px', padding: '10px 12px',
                        background: 'rgba(14,165,233,0.05)', borderRadius: '8px',
                        fontSize: '13px', color: 'var(--muted)',
                        borderLeft: '3px solid var(--accent)',
                      }}>
                        💬 {b.specialNote}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
