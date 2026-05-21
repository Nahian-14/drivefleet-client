export default function LoadingSpinner({ fullPage = true }) {
  if (fullPage) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        <div className="spinner" />
        <p style={{ color: 'var(--muted)', fontFamily: 'DM Sans', fontSize: '14px' }}>
          Loading…
        </p>
      </div>
    );
  }
  return <div className="spinner" />;
}
