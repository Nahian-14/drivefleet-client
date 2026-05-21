import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dropRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore-cars', label: 'Explore Cars' },
  ];

  const privateLinks = user ? [
    { to: '/add-car', label: 'Add Car' },
    { to: '/my-bookings', label: 'My Bookings' },
    { to: '/my-added-cars', label: 'My Cars' },
  ] : [];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.78)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(148,210,255,0.3)',
      animation: 'navDrop 0.5s cubic-bezier(0.22,1,0.36,1) both',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'pulseRing 2.5s infinite',
            fontSize: '18px',
          }}>🚗</div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700, fontSize: '20px',
            color: 'var(--ink)',
          }}>
            Drive<span style={{ color: 'var(--accent)' }}>Fleet</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden md:flex">
          {[...navLinks, ...privateLinks].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  overflow: 'hidden', border: '2px solid var(--accent)',
                  cursor: 'pointer', background: 'none', padding: 0,
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                title={user.displayName || user.email}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '15px',
                  }}>
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </button>

              {dropOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '52px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.95)',
                  borderRadius: '16px', padding: '8px',
                  boxShadow: '0 16px 48px rgba(14,165,233,0.18)',
                  minWidth: '180px',
                  animation: 'fadeUp 0.2s ease',
                }}>
                  <div style={{ padding: '8px 12px 4px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>
                      {user.displayName || 'User'}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                      {user.email}
                    </div>
                  </div>
                  {[
                    { to: '/add-car', label: '➕ Add Car' },
                    { to: '/my-bookings', label: '📋 My Bookings' },
                    { to: '/my-added-cars', label: '🚗 My Added Cars' },
                  ].map(({ to, label }) => (
                    <Link
                      key={to} to={to}
                      onClick={() => setDropOpen(false)}
                      style={{
                        display: 'block', padding: '9px 12px',
                        textDecoration: 'none', color: 'var(--muted)',
                        borderRadius: '10px', fontSize: '14px',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.08)'; e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--muted)'; }}
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'block', width: '100%', padding: '9px 12px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#ef4444', borderRadius: '10px', fontSize: '14px',
                      textAlign: 'left', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '9px 22px', fontSize: '14px' }}>
              Login
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '22px', color: 'var(--ink)',
            }}
            className="md:hidden"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid #f1f5f9',
          padding: '16px 24px',
          animation: 'fadeIn 0.2s ease',
        }}>
          {[...navLinks, ...privateLinks].map(({ to, label }) => (
            <NavLink
              key={to} to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
