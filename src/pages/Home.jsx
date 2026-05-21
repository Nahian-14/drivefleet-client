import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useScrollReveal } from '../hooks/useScrollReveal';

const API = import.meta.env.VITE_API_URL;

const CAR_TYPES = ['All', 'SUV', 'Sedan', 'Luxury', 'Hatchback', 'Electric', 'Minivan'];

function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--base)',
      padding: '80px 24px',
      minHeight: '90vh',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Animated blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
        animation: 'blobPulse 8s ease-in-out infinite',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(220,252,231,0.6) 0%, transparent 70%)',
        animation: 'blobPulse 6s ease-in-out reverse infinite',
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1,
      }} className="hero-grid">
        {/* Left */}
        <div>
          {/* Eyebrow badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(14,165,233,0.1)', borderRadius: '20px',
            padding: '8px 16px', marginBottom: '24px',
            animation: 'badgePop 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulseRing 2.5s infinite',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)' }}>
              Trusted by 10,000+ drivers
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 54px)',
            fontWeight: 700, lineHeight: 1.15,
            color: 'var(--ink)',
            animation: 'fadeUp 0.6s ease 0.15s both',
            marginBottom: '20px',
          }}>
            Your journey<br />
            <span className="gradient-text">begins here.</span>
          </h1>

          <p style={{
            fontSize: '17px', color: 'var(--muted)', lineHeight: 1.7,
            animation: 'fadeUp 0.6s ease 0.25s both',
            marginBottom: '32px',
            maxWidth: '440px',
          }}>
            Discover premium vehicles for every adventure. From city cruisers to luxury rides — find your perfect match and hit the road today.
          </p>

          <div style={{
            display: 'flex', gap: '16px', flexWrap: 'wrap',
            animation: 'fadeUp 0.6s ease 0.35s both',
            marginBottom: '40px',
          }}>
            <Link to="/explore-cars" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
              Explore Cars →
            </Link>
            <a href="#why" className="btn-outline" style={{ fontSize: '16px', padding: '13px 28px' }}>
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div style={{
            animation: 'fadeUp 0.6s ease 0.45s both',
            borderTop: '1px solid #e2e8f0',
            paddingTop: '24px',
            display: 'flex', gap: '32px', flexWrap: 'wrap',
          }}>
            {[
              { num: '500+', label: 'Vehicles' },
              { num: '50+', label: 'Cities' },
              { num: '4.9★', label: 'Rating' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700, fontSize: '22px', color: 'var(--accent)'
                }}>{s.num}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hero Car Card */}
        <div style={{ animation: 'floatY 5s ease-in-out infinite' }}>
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
            {/* Float badge top-right */}
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'white', borderRadius: '12px', padding: '8px 12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              zIndex: 2, animation: 'slideRight 0.5s ease 0.5s both',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ fontSize: '16px' }}>🔥</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>28 trips today</span>
            </div>

            <div style={{
              height: '220px',
              background: 'linear-gradient(135deg, #e0f2fe, #dcfce7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '80px', overflow: 'hidden',
            }}>
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80"
                alt="Hero car"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>

            <div style={{ padding: '20px 24px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <div>
                  <div style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px'
                  }}>Luxury SUV</div>
                  <div style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '20px',
                    fontWeight: 700, color: 'var(--ink)'
                  }}>Mercedes GLE</div>
                </div>
                <span style={{
                  fontFamily: 'Space Mono, monospace', fontWeight: 700,
                  fontSize: '20px', color: 'var(--accent)'
                }}>$120/day</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(34,197,94,0.1)', color: '#16a34a',
                  borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 600,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
                    animation: 'pulseRing 1.8s infinite',
                    display: 'inline-block',
                  }} />
                  Available Now
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>· 5 seats · New York</span>
              </div>
            </div>

            {/* Float badge bottom-left */}
            <div style={{
              margin: '0 24px 24px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: '10px', padding: '8px 14px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              animation: 'slideRight 0.5s ease 0.7s both',
            }}>
              <span style={{ fontSize: '16px' }}>⭐</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Booked 12× this week</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const ref1 = useScrollReveal(0);
  const ref2 = useScrollReveal(0.12);
  const ref3 = useScrollReveal(0.24);

  const cards = [
    { icon: '🛡️', bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', title: 'Safe & Insured', desc: 'Every vehicle is fully insured and inspected. Drive with complete peace of mind.' },
    { icon: '📅', bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', title: 'Flexible Booking', desc: 'Book for a day, a week, or a month. Modify or cancel anytime with no hassle.' },
    { icon: '📍', bg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', title: 'City-Wide Pickup', desc: 'Pickup locations across 50+ cities. We bring the car to you, wherever you are.' },
  ];

  return (
    <section id="why" style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, rgba(209,250,229,0.4), rgba(224,242,254,0.5))',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700,
            color: 'var(--ink)', marginBottom: '12px',
          }}>
            Why Choose <span style={{ color: 'var(--accent)' }}>DriveFleet</span>?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
            We make car rental effortless, safe, and enjoyable.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[ref1, ref2, ref3].map((ref, i) => (
            <div key={i} ref={ref} style={{ opacity: 0 }} className="why-card">
              <div className="icon-tile" style={{ background: cards[i].bg }}>{cards[i].icon}</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '20px',
                fontWeight: 700, color: 'var(--ink)', marginBottom: '10px',
              }}>{cards[i].title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.65 }}>{cards[i].desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { n: '01', title: 'Search & Choose', desc: 'Browse our fleet, filter by type, and find the perfect car for your trip.' },
    { n: '02', title: 'Book Instantly', desc: 'Select your dates, add any extras, and confirm your booking in seconds.' },
    { n: '03', title: 'Hit the Road', desc: 'Pick up your car from a convenient location and enjoy your journey.' },
  ];

  return (
    <section style={{ padding: '80px 24px', background: 'var(--base)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700,
            color: 'var(--ink)', marginBottom: '12px',
          }}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Three simple steps to your next adventure.</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px', position: 'relative',
        }}>
          {steps.map((step, i) => (
            <div key={i} className="step-card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="step-number">{step.n}</div>
              {i < 2 && (
                <div style={{
                  display: 'none', // hidden on mobile, shown via after pseudoelement concept
                }} />
              )}
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontSize: '19px',
                fontWeight: 700, color: 'var(--ink)', marginBottom: '10px',
              }}>{step.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (filter !== 'All') params.type = filter;
        const { data } = await axios.get(`${API}/api/cars`, { params });
        setCars(data.slice(0, 6));
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
      <HeroSection />

      {/* Available Cars */}
      <section style={{ padding: '80px 24px', background: 'var(--base)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700,
              color: 'var(--ink)', marginBottom: '10px',
            }}>
              Featured <span style={{ color: 'var(--accent)' }}>Vehicles</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '28px' }}>
              Handpicked for your next trip
            </p>

            {/* Search */}
            <div style={{
              display: 'flex', gap: '12px', justifyContent: 'center',
              flexWrap: 'wrap', marginBottom: '20px',
            }}>
              <div style={{ position: 'relative', maxWidth: '340px', width: '100%' }}>
                <span style={{
                  position: 'absolute', left: '14px', top: '50%',
                  transform: 'translateY(-50%)', fontSize: '16px',
                }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-glow"
                  style={{
                    width: '100%', padding: '12px 14px 12px 40px',
                    border: '1.5px solid #e2e8f0', borderRadius: '26px',
                    fontFamily: 'DM Sans', fontSize: '15px',
                    background: 'rgba(255,255,255,0.85)',
                  }}
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {CAR_TYPES.map(t => (
                <button
                  key={t}
                  className={`filter-pill${filter === t ? ' active' : ''}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : cars.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--muted)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '18px' }}>No cars found. Try a different search.</p>
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

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/explore-cars" className="btn-primary" style={{ padding: '14px 36px', fontSize: '16px' }}>
              View All Cars →
            </Link>
          </div>
        </div>
      </section>

      <WhySection />
      <HowItWorksSection />
    </PageWrapper>
  );
}
