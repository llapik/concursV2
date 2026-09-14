import logo from '../assets/logo-mgpk.png';

function NavButton({ label, badge, badgeBg, badgeColor, active, onClick }) {
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
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: badgeBg,
          color: badgeColor,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          marginRight: 7,
        }}
      >
        {badge}
      </span>
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
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '12px 24px', display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={logo}
              alt="Московский государственный образовательный комплекс"
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
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>1С LAB</span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: 'var(--accent-text)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              ИИ под проверкой
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
            <button
              onClick={lab.toggleTheme}
              aria-label="Переключить тему оформления"
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
                fontFamily: 'Manrope, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
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
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              Выполнено {lab.doneCount} из 6
            </span>
            <div style={{ width: 110, height: 6, background: 'var(--line-3)', borderRadius: 3, overflow: 'hidden' }}>
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

        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap', borderTop: '1px solid var(--line)', paddingTop: 6 }}>
          <NavButton label="Главная" badge="★" badgeBg="var(--line-3)" badgeColor="var(--ink)" active={lab.isMap} onClick={lab.go.map} />
          <NavButton
            label="Шаг 1 · Теория"
            badge="1"
            badgeBg="var(--accent)"
            badgeColor="var(--on-accent)"
            active={lab.isL1}
            onClick={lab.go.l1}
          />
          <NavButton
            label="Шаг 2 · Практика"
            badge="2"
            badgeBg="var(--accent)"
            badgeColor="var(--on-accent)"
            active={lab.isL2}
            onClick={lab.go.l2}
          />
          <NavButton
            label="Шаг 3 · Проект"
            badge="3"
            badgeBg="var(--accent)"
            badgeColor="var(--on-accent)"
            active={lab.isL3}
            onClick={lab.go.l3}
          />
        </nav>
      </div>
    </header>
  );
}
