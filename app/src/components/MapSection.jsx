export default function MapSection({ lab }) {
  return (
    <section style={{ padding: '64px 0 40px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 48,
          alignItems: 'end',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: 'var(--accent-text)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Тренажёр-детектив · 09.02.11
          </div>
          <h1
            style={{
              fontSize: 58,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              fontWeight: 800,
              margin: '0 0 22px',
              textWrap: 'pretty',
            }}
          >
            ИИ сгенерировал интерфейс.
            <br />
            Найди, что он <span style={{ color: 'var(--accent-text)' }}>упустил</span>.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--ink-3)',
              maxWidth: '56ch',
              margin: '0 0 28px',
              textWrap: 'pretty',
            }}
          >
            Здесь не проверяют, умеешь ли ты пользоваться ИИ-инструментами. Здесь проверяют, умеешь ли ты{' '}
            <strong style={{ color: 'var(--ink)' }}>критически оценить результат</strong> — юзабилити, доступность и
            код нельзя сдать «как ИИ сгенерировал».
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={lab.go.l2}
              className="lab-primary-btn"
              style={{
                background: 'var(--accent)',
                color: 'var(--on-accent)',
                border: 0,
                borderRadius: 8,
                padding: '14px 22px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                minHeight: 48,
              }}
            >
              Начать с уровня 2 →
            </button>
            <button
              onClick={lab.go.l1}
              className="lab-outline-btn"
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                border: '1px solid var(--line-2)',
                borderRadius: 8,
                padding: '14px 22px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 48,
              }}
            >
              Сначала теория
            </button>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            border: '1px solid var(--line)',
            background: 'var(--panel)',
            borderRadius: 12,
            padding: 20,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 28,
              background: 'linear-gradient(180deg, transparent, var(--accent-soft), transparent)',
              opacity: 0.9,
              animation: 'lab-sweep 6s linear infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'relative',
              background: 'var(--field)',
              border: '1px solid var(--line-2)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 18,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12.5,
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              minHeight: 56,
            }}
          >
            <span style={{ color: 'var(--accent-text)' }}>промпт → </span>
            {lab.typed}
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                background: 'var(--accent)',
                verticalAlign: -2,
                animation: 'lab-caret 1s step-end infinite',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: 'var(--dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Что внутри работает по-настоящему
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'Контраст считается по формуле WCAG 2.1 в браузере',
              'Клики сверяются с картой реальных проблем в разметке',
              'Код проверяется разбором того, что студент написал',
              'Прогресс хранится локально — без бэкенда',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'var(--cyan)', fontSize: 12 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ margin: '56px 0 0', display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Карта дизайнера</h2>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--dim)' }}>
          пройденные кейсы складываются в мини-портфолио
        </span>
      </div>
      <div
        style={{
          marginTop: 18,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14,
        }}
      >
        {lab.tiles.map((t, i) => (
          <button
            key={i}
            onClick={t.go}
            className="lab-tile"
            style={{
              textAlign: 'left',
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: 18,
              cursor: 'pointer',
              color: 'var(--ink)',
              fontFamily: 'Manrope, sans-serif',
              minHeight: 128,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em' }}>
                {t.code}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: t.stampColor }}>{t.stamp}</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>{t.title}</span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--dim)', textWrap: 'pretty' }}>{t.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
