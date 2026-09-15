// Positioned to hug the vertical gutter between the two hero columns (the
// grid gap is always empty there), so the chips never sit on top of text.
const BITS = [
  { symbol: '1С', top: '3%', offset: -8, color: 'var(--accent-text)', size: 36, duration: 17, delay: 0, rotate: 7 },
  { symbol: '₽', top: '16%', offset: 10, color: 'var(--cyan)', size: 30, duration: 21, delay: 2.4, rotate: -8 },
  { symbol: 'ИИ', top: '31%', offset: -6, color: 'var(--dim)', size: 32, duration: 19, delay: 1.1, rotate: 5 },
  { symbol: '⚙', top: '46%', offset: 8, color: 'var(--accent-text)', size: 28, duration: 15, delay: 3.6, rotate: -6 },
  { symbol: 'БП', top: '60%', offset: -9, color: 'var(--cyan)', size: 34, duration: 23, delay: 0.8, rotate: 8 },
  { symbol: 'СКД', top: '73%', offset: 7, color: 'var(--dim)', size: 36, duration: 18, delay: 2.9, rotate: -6 },
  { symbol: '→', top: '86%', offset: -7, color: 'var(--accent-text)', size: 26, duration: 20, delay: 1.6, rotate: 4 },
  { symbol: '%', top: '95%', offset: 9, color: 'var(--cyan)', size: 26, duration: 16, delay: 4.2, rotate: -5 },
];

export default function FloatingBits() {
  return (
    <div className="lab-floaters" aria-hidden="true">
      {BITS.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: `calc(50% - ${b.size / 2 - b.offset}px)`,
            width: b.size,
            height: b.size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${b.color}`,
            borderRadius: b.symbol.length > 1 ? 10 : '50%',
            color: b.color,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: b.symbol.length > 2 ? 10 : 13,
            fontWeight: 600,
            background: 'var(--panel)',
            opacity: 0.4,
            animation: `lab-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
            '--lab-float-rotate': `${b.rotate}deg`,
          }}
        >
          {b.symbol}
        </span>
      ))}
    </div>
  );
}
