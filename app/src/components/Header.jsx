import logo from '../assets/logo-mgpk.png';

function NavButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="lab-nav-btn"
      style={{
        position: 'relative',
        background: 'transparent',
        border: 0,
        color: 'var(--ink-2)',
        fontFamily: 'Manrope, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: 6,
      }}
    >
      {label}
      {active && (
        <span
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 2,
            height: 2,
            background: 'var(--accent)',
          }}
        />
      )}
    </button>
  );
}

export default function Header({ lab }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--header-bg)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={logo}
            alt="Московский государственный образовательный комплекс МГПК"
            style={{
              height: 34,
              width: 'auto',
              display: 'block',
              background: 'var(--logo-pad)',
              borderRadius: 5,
              padding: '2px 4px',
            }}
          />
          <span style={{ width: 1, height: 26, background: 'var(--line)' }} />
          <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em' }}>UI/UX LAB</span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: 'var(--accent-text)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ИИ под проверкой
          </span>
        </div>

        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <NavButton label="Карта" active={lab.isMap} onClick={lab.go.map} />
          <NavButton label="1 · Стажёр" active={lab.isL1} onClick={lab.go.l1} />
          <NavButton label="2 · Джуниор" active={lab.isL2} onClick={lab.go.l2} />
          <NavButton label="3 · Мидл" active={lab.isL3} onClick={lab.go.l3} />
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={lab.toggleTheme}
            aria-label="Переключить тему"
            className="lab-theme-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1px solid var(--line-2)',
              color: 'var(--ink)',
              borderRadius: 22,
              padding: '0 14px',
              minHeight: 44,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: `inset ${lab.themeDotShadow}`,
              }}
            />
            <span>{lab.themeLabel}</span>
          </button>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--dim)' }}>
            портфолио {lab.doneCount}/6
          </span>
          <div style={{ width: 120, height: 6, background: 'var(--line-3)', borderRadius: 3, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                background: 'var(--accent)',
                borderRadius: 3,
                transition: 'width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                width: lab.pct,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
