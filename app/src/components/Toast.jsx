export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 26,
        transform: 'translateX(-50%)',
        zIndex: 60,
        background: 'var(--panel)',
        border: '1px solid var(--ok)',
        borderLeft: '4px solid var(--ok)',
        borderRadius: 10,
        padding: '14px 20px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
        animation: 'lab-pop 0.22s ease-out',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: 'var(--ok)' }}>✓</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{toast}</span>
    </div>
  );
}
