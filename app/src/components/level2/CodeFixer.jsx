export default function CodeFixer({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Кейс 2.3
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>Почини код</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-3)', margin: '0 0 14px', textWrap: 'pretty' }}>
        Сниппет «от ИИ» с четырьмя дефектами. Правь прямо здесь и нажми «Проверить» — разбирается именно твой код.
      </p>
      <textarea
        value={lab.code}
        onChange={(e) => lab.setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: 210,
          background: 'var(--field)',
          border: '1px solid var(--line-2)',
          borderRadius: 8,
          padding: 14,
          color: 'var(--ink-2)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12.5,
          lineHeight: 1.6,
          resize: 'vertical',
        }}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <button
          onClick={lab.checkCode}
          className="lab-primary-btn"
          style={{
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            border: 0,
            borderRadius: 8,
            padding: '12px 18px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            fontWeight: 800,
            cursor: 'pointer',
            minHeight: 44,
          }}
        >
          Проверить
        </button>
        <button
          onClick={lab.resetCode}
          className="lab-outline-btn lab-outline-btn--ink"
          style={{
            background: 'transparent',
            border: '1px solid var(--line-2)',
            color: 'var(--dim)',
            borderRadius: 8,
            padding: '12px 18px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            cursor: 'pointer',
            minHeight: 44,
          }}
        >
          Вернуть исходник
        </button>
      </div>
      <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
        {lab.codeResults.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 13, lineHeight: 1.5 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: r.color }}>{r.mark}</span>
            <span style={{ color: 'var(--ink-2)', textWrap: 'pretty' }}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
