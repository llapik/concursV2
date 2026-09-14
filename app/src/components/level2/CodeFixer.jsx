export default function CodeFixer({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Задание 2.3
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>Почини запрос, который написал ИИ</h3>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel-2)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 8,
          padding: '14px 16px',
          marginBottom: 14,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 6 }}>Что делать — 4 правки</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>
          1. Убрать <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>*</span> и перечислить нужные поля через
          запятую
          <br />
          2. Заменить соединение через запятую на{' '}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ЛЕВОЕ СОЕДИНЕНИЕ … ПО …</span>
          <br />
          3. Добавить отбор:{' '}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ГДЕ Заявка.Дата МЕЖДУ &НачалоПериода И &КонецПериода</span>
          <br />
          4. Передать дату в саму виртуальную таблицу:{' '}
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>.Остатки(&КонецПериода, )</span>
          <br />
          Затем нажми жёлтую кнопку «Проверить».
        </div>
      </div>
      <textarea
        value={lab.code}
        onChange={(e) => lab.setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: 230,
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
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
            minHeight: 48,
          }}
        >
          ✓ Проверить мой запрос
        </button>
        <button
          onClick={lab.resetCode}
          className="lab-outline-btn lab-outline-btn--ink"
          style={{
            background: 'transparent',
            border: '1px solid var(--line-2)',
            color: 'var(--ink-2)',
            borderRadius: 8,
            padding: '12px 18px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 14,
            cursor: 'pointer',
            minHeight: 48,
          }}
        >
          Вернуть как было
        </button>
      </div>
      <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
        {lab.codeResults.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 13.5, lineHeight: 1.5 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: r.color }}>{r.mark}</span>
            <span style={{ color: 'var(--ink-2)', textWrap: 'pretty' }}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
