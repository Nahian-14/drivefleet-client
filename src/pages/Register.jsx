import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

export default function Register() {
  const { registerUser, updateUserProfile, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [pwError, setPwError] = useState('');

  const rules = [
    { label: 'At least 1 uppercase letter', test: /[A-Z]/ },
    { label: 'At least 1 lowercase letter', test: /[a-z]/ },
    { label: 'Minimum 6 characters', test: /.{6,}/ },
  ];

  const validatePassword = (pw) => {
    if (!rules[0].test.test(pw)) return 'Password must have at least 1 uppercase letter';
    if (!rules[1].test.test(pw)) return 'Password must have at least 1 lowercase letter';
    if (!rules[2].test.test(pw)) return 'Password must be at least 6 characters';
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) { setPwError(error); return; }
    setLoading(true);
    try {
      await registerUser(email, password);
      await updateUserProfile(name, photoURL);
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.code === 'auth/email-already-in-use' ? 'Email already registered' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success('Welcome! 🎉');
      navigate('/');
    } catch {
      toast.error('Google login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dcfce7 0%, #e0f2fe 50%, #ede9fe 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.95)',
          borderRadius: '28px', padding: '40px',
          width: '100%', maxWidth: '440px',
          boxShadow: '0 16px 64px rgba(14,165,233,0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', margin: '0 auto 12px',
          }}>🚗</div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif', fontSize: '26px',
            fontWeight: 700, color: 'var(--ink)', marginBottom: '6px',
          }}>Create Account</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Join DriveFleet today</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Full Name', icon: '👤', value: name, setter: setName, type: 'text', placeholder: 'John Doe' },
            { label: 'Email Address', icon: '✉️', value: email, setter: setEmail, type: 'email', placeholder: 'you@example.com' },
            { label: 'Photo URL (optional)', icon: '🖼️', value: photoURL, setter: setPhotoURL, type: 'url', placeholder: 'https://...' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}>
                {f.label}
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>{f.icon}</span>
                <input
                  type={f.type}
                  value={f.value}
                  onChange={e => f.setter(e.target.value)}
                  placeholder={f.placeholder}
                  required={f.label !== 'Photo URL (optional)'}
                  className="input-glow"
                  style={{
                    width: '100%', padding: '11px 14px 11px 40px',
                    border: '1.5px solid #e2e8f0', borderRadius: '12px',
                    fontFamily: 'DM Sans', fontSize: '14px',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Password */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px' }}>🔑</span>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setPwError(''); }}
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
                placeholder="••••••••"
                required
                className="input-glow"
                style={{
                  width: '100%', padding: '11px 40px 11px 40px',
                  border: `1.5px solid ${pwError ? '#ef4444' : '#e2e8f0'}`, borderRadius: '12px',
                  fontFamily: 'DM Sans', fontSize: '14px',
                }}
              />
              <button
                type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
              >{showPw ? '🙈' : '👁️'}</button>
            </div>

            {/* Inline error */}
            {pwError && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>⚠️ {pwError}</p>
            )}

            {/* Live validation rules */}
            <AnimatePresence>
              {(pwFocused || password) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}
                >
                  {rules.map(rule => {
                    const passes = rule.test.test(password);
                    return (
                      <motion.div
                        key={rule.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          fontSize: '12px',
                          color: passes ? '#16a34a' : '#94a3b8',
                          transition: 'color 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>{passes ? '✅' : '❌'}</span>
                        {rule.label}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '16px', marginTop: '4px' }}
          >
            {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
          </motion.button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>

        <motion.button
          onClick={handleGoogle}
          whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '12px',
            background: 'white', border: '1.5px solid #e2e8f0',
            borderRadius: '12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontFamily: 'DM Sans', fontWeight: 600, fontSize: '14px', color: 'var(--ink)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </motion.button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
