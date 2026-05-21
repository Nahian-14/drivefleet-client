import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const socialStyle = {
    width: 38, height: 38, borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#94a3b8', fontSize: '16px', cursor: 'pointer',
    transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)',
    textDecoration: 'none',
  };

  const linkStyle = {
    color: '#94a3b8', textDecoration: 'none',
    fontSize: '14px', transition: 'color 0.2s',
    display: 'block', marginBottom: '8px',
  };

  return (
    <footer style={{
      background: 'rgba(15,23,42,0.97)',
      color: '#94a3b8',
      padding: '60px 0 24px',
      marginTop: '80px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px',
              }}>🚗</div>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700, fontSize: '18px', color: 'white',
              }}>
                Drive<span style={{ color: 'var(--accent)' }}>Fleet</span>
              </span>
            </Link>
            <p style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              Premium car rentals for every journey. Trusted by thousands of drivers worldwide.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FaFacebook />, href: '#' },
                { icon: <FaInstagram />, href: '#' },
                { icon: <FaXTwitter />, href: '#' },
                { icon: <FaYoutube />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i} href={s.href} style={socialStyle}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = ''; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '16px', fontSize: '16px' }}>Navigate</h4>
            {['Home', 'Explore Cars', 'Add Car', 'My Bookings', 'My Added Cars'].map(l => (
              <a
                key={l} href="#" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '16px', fontSize: '16px' }}>Support</h4>
            {['FAQ', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map(l => (
              <a
                key={l} href="#" style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '16px', fontSize: '16px' }}>Contact</h4>
            <p style={{ fontSize: '13px', marginBottom: '8px' }}>📧 hello@drivefleet.com</p>
            <p style={{ fontSize: '13px', marginBottom: '8px' }}>📞 +1 (555) 123-4567</p>
            <p style={{ fontSize: '13px', marginBottom: '8px' }}>📍 123 Fleet Street, NY</p>
            <p style={{ fontSize: '13px' }}>🕐 Mon–Sat 9AM–6PM</p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '13px' }}>
            © 2025 DriveFleet. All rights reserved.
          </p>
          <p style={{ fontSize: '13px' }}>
            Made with ❤️ for car lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
