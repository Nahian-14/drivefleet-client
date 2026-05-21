import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '../animations/variants';

export default function ConfirmDeleteModal({ carName, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onCancel}>
        <motion.div
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={e => e.stopPropagation()}
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            width: '100%',
            maxWidth: '420px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', marginBottom: '10px' }}>
            Remove Listing?
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '28px', fontSize: '15px' }}>
            Are you sure you want to remove <strong>{carName}</strong> from your listings? This cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={onCancel} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              style={{
                flex: 1, padding: '12px',
                background: '#ef4444', color: 'white',
                border: 'none', borderRadius: '26px',
                fontWeight: 600, cursor: 'pointer', fontSize: '15px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
              onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
            >
              {loading ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
