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
        Шаг 1 · Теория
      </div>
      <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
        Где граница доверия к ИИ в 1С
      </h2>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 10,
          padding: '18px 20px',
          marginBottom: 26,
          maxWidth: '74ch',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: 'var(--accent-text)' }}>Что делать на этом шаге</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          1. Нажми на каждую из 6 карточек ниже — внутри откроется «ловушка» этого инструмента.
          <br />
          2. Пролистай вниз и ответь на 3 вопроса. Ответ проверяется сразу.
          <br />
          3. Когда все 3 ответа верны — шаг зачтён, появится зелёное уведомление.
        </div>
      </div>

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
              <div
                style={{
                  marginTop: 12,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'var(--panel-3)',
                  borderRadius: 16,
                  padding: '7px 12px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--ink-2)',
                }}
              >
                Нажми, чтобы увидеть ловушку
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
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Задание: ответь на 3 вопроса</h3>
            <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>Нажми на тот вариант, который считаешь правильным. Верный ответ подсветится зелёным.</div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-text)', whiteSpace: 'nowrap' }}>Верно {lab.quizScore} из 3</span>
        </div>
        <div style={{ display: 'grid', gap: 22 }}>
          {lab.questions.map((q, qi) => (
            <div key={qi}>
              <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 10, textWrap: 'pretty' }}>
                {q.num}. {q.text}
              </div>
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
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: o.markColor, width: 14 }}>{o.mark}</span>
                    <span>{o.text}</span>
                  </button>
                ))}
              </div>
              {q.answered && (
                <div style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>↳ {q.explain}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={lab.go.l2}
          className="lab-primary-btn"
          style={{
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            border: 0,
            borderRadius: 8,
            padding: '16px 26px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            minHeight: 52,
          }}
        >
          Дальше: шаг 2 · Практика →
        </button>
      </div>
    </section>
  );
}
