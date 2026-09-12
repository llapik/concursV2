export default function Level3({ lab }) {
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
        Уровень 3 · Мидл
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 10px' }}>Промпт как техзадание</h2>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '64ch', margin: '0 0 30px', textWrap: 'pretty' }}>
        Сценарий: <strong style={{ color: 'var(--ink)' }}>форма записи к врачу для людей старшего возраста</strong>. Собери
        промпт так, чтобы ИИ сразу выдал доступный интерфейс, а не просто красивый.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
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
            Блоки требований · выбрано {lab.chosenCount} из 8
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {lab.chips.map((ch, i) => (
              <button
                key={i}
                onClick={ch.toggle}
                className="lab-chip"
                style={{
                  background: ch.bg,
                  border: `1px solid ${ch.border}`,
                  color: ch.color,
                  borderRadius: 20,
                  padding: '10px 14px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: 'var(--dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Собранный промпт
          </div>
          <div
            style={{
              background: 'var(--field)',
              border: '1px solid var(--line-2)',
              borderRadius: 8,
              padding: 14,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12.5,
              lineHeight: 1.7,
              color: 'var(--ink-2)',
              minHeight: 120,
              whiteSpace: 'pre-wrap',
            }}
          >
            {lab.promptText}
          </div>
          <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.55, color: lab.verdictColor, textWrap: 'pretty' }}>{lab.verdict}</div>
        </div>

        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Чек-лист Нильсена
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--accent-text)' }}>{lab.nielsenCount} / 10</div>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {lab.nielsen.map((n, i) => (
              <button
                key={i}
                onClick={n.toggle}
                className="lab-nielsen-btn"
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  background: 'transparent',
                  border: 0,
                  borderBottom: '1px solid var(--line-3)',
                  color: 'var(--ink)',
                  padding: '10px 2px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 13.5,
                  lineHeight: 1.45,
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: n.markColor, flex: 'none', width: 16 }}>{n.mark}</span>
                <span style={{ color: n.color, textWrap: 'pretty' }}>{n.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
        <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Рефлексия (проверяет педагог)</h3>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-3)', margin: '0 0 14px', maxWidth: '70ch', textWrap: 'pretty' }}>
          Где ИИ мог обмануть глаз, но не решить проблему пользователя? Приведи пример из кейсов уровня 2.
        </p>
        <textarea
          value={lab.reflection}
          onChange={(e) => lab.setReflection(e.target.value)}
          placeholder="Мой ответ…"
          style={{
            width: '100%',
            minHeight: 140,
            background: 'var(--field)',
            border: '1px solid var(--line-2)',
            borderRadius: 8,
            padding: 14,
            color: 'var(--ink)',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 15,
            lineHeight: 1.6,
            resize: 'vertical',
          }}
        />
        <div style={{ marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)' }}>
          сохраняется локально · {lab.reflectionLen} символов
        </div>
      </div>
    </section>
  );
}
