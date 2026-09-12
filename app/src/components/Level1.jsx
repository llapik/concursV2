export default function Level1({ lab }) {
  return (
    <section style={{ padding: '48px 0 40px' }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          color: 'var(--accent-text)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        Уровень 1 · Стажёр
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 10px' }}>Где граница доверия</h2>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: 'var(--ink-3)',
          maxWidth: '62ch',
          margin: '0 0 30px',
          textWrap: 'pretty',
        }}
      >
        Шесть карточек — по одному инструменту и одной ловушке. Нажми на карточку, чтобы увидеть, что именно ИИ
        делает за тебя, а что остаётся твоей ответственностью.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {lab.cards.map((c, i) => (
          <div
            key={i}
            onClick={c.toggle}
            className="lab-card"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderLeft: `3px solid ${c.accent}`,
              borderRadius: 10,
              padding: 18,
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: 'var(--dim)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {c.tag}
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em', marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-3)', textWrap: 'pretty' }}>{c.body}</div>
            {c.open && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--line-2)' }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: 'var(--accent-text)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Ловушка
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', textWrap: 'pretty' }}>{c.trap}</div>
              </div>
            )}
            {c.closed && (
              <div style={{ marginTop: 12, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)' }}>
                нажми → ловушка
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 44, border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 12, padding: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 18,
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Быстрая самопроверка</h3>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--dim)' }}>
            верно {lab.quizScore} из 3 · реакция сразу
          </span>
        </div>
        <div style={{ display: 'grid', gap: 22 }}>
          {lab.questions.map((q, qi) => (
            <div key={qi}>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5, marginBottom: 10, textWrap: 'pretty' }}>{q.text}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((o, oi) => (
                  <button
                    key={oi}
                    onClick={o.pick}
                    className="lab-option-btn"
                    style={{
                      textAlign: 'left',
                      background: o.bg,
                      border: `1px solid ${o.border}`,
                      color: 'var(--ink)',
                      borderRadius: 8,
                      padding: '12px 14px',
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: 14,
                      cursor: 'pointer',
                      minHeight: 44,
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: o.markColor, width: 14 }}>
                      {o.mark}
                    </span>
                    <span>{o.text}</span>
                  </button>
                ))}
              </div>
              {q.answered && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: 'var(--dim)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    textWrap: 'pretty',
                  }}
                >
                  ↳ {q.explain}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
