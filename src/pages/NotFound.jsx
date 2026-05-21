import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #dcfce7 50%, #ede9fe 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '24px',
    }}>
      {/* Drifting car */}
      <div style={{
        position: 'fixed', top: '15%',
        fontSize: '40px',
        animation: 'driftCar 10s linear infinite',
        opacity: 0.4,
      }}>🚗</div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 'clamp(80px, 20vw, 140px)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '16px',
          background: 'linear-gradient(90deg, var(--accent), var(--accent2), #818cf8, var(--accent))',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradMove 4s ease infinite',
        }}>404</div>

        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 700, color: 'var(--ink)', marginBottom: '14px',
        }}>
          Looks like this road doesn't exist.
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '36px', maxWidth: '420px' }}>
          You may have taken a wrong turn. Let's get you back on the right route.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/" className="btn-primary" style={{ padding: '14px 36px', fontSize: '16px' }}>
            🏠 Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
