export default function ContrastMeter({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Кейс 2.2
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>Замер вместо угадайки</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-3)', margin: '0 0 18px', textWrap: 'pretty' }}>
        Задача: подобрать цвет текста на фоне карточки так, чтобы контраст был не ниже{' '}
        <strong style={{ color: 'var(--ink)' }}>4.5:1</strong> (WCAG 2.1, AA, основной текст). Считает браузер, не
        ИИ.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--dim)' }}>
          Текст
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="color"
              value={lab.fg}
              onChange={(e) => lab.setFg(e.target.value)}
              style={{ width: 44, height: 44, border: '1px solid var(--line-2)', borderRadius: 6, background: 'var(--field)', padding: 3, cursor: 'pointer' }}
            />
            <input
              type="text"
              value={lab.fg}
              onChange={(e) => lab.setFg(e.target.value)}
              style={{
                width: 96,
                background: 'var(--field)',
                border: '1px solid var(--line-2)',
                borderRadius: 6,
                padding: '11px 10px',
                color: 'var(--ink)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
              }}
            />
          </span>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--dim)' }}>
          Фон
          <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="color"
              value={lab.bg}
              onChange={(e) => lab.setBg(e.target.value)}
              style={{ width: 44, height: 44, border: '1px solid var(--line-2)', borderRadius: 6, background: 'var(--field)', padding: 3, cursor: 'pointer' }}
            />
            <input
              type="text"
              value={lab.bg}
              onChange={(e) => lab.setBg(e.target.value)}
              style={{
                width: 96,
                background: 'var(--field)',
                border: '1px solid var(--line-2)',
                borderRadius: 6,
                padding: '11px 10px',
                color: 'var(--ink)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
              }}
            />
          </span>
        </label>
      </div>

      <div style={{ borderRadius: 10, padding: 18, border: '1px solid var(--line-2)', color: lab.fg, background: lab.bg }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Пример заголовка</div>
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>Основной текст 14px — именно он должен пройти порог 4.5:1.</div>
      </div>

      <div style={{ marginTop: 16, height: 8, background: 'var(--line-3)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            background: lab.ratioColor,
            borderRadius: 4,
            transition: 'width 0.35s ease, background 0.35s ease',
            width: lab.ratioPct,
          }}
        />
        <div style={{ position: 'absolute', top: -3, bottom: -3, width: 2, background: 'var(--ink)', opacity: 0.7, left: '21%' }} />
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--dim)', marginTop: 4 }}>порог AA 4.5:1 ↑</div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 600, color: lab.ratioColor }}>{lab.ratioText}</div>
        <div style={{ display: 'grid', gap: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
          <span style={{ color: lab.aaColor }}>{lab.aaLabel}</span>
          <span style={{ color: lab.aaaColor }}>{lab.aaaLabel}</span>
          <span style={{ color: lab.largeColor }}>{lab.largeLabel}</span>
        </div>
      </div>
    </div>
  );
}
