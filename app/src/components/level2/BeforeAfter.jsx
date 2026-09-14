export default function BeforeAfter({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: '22px 22px 26px' }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Задание 2.4
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>Сравни процесс «до» и «после»</h3>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel-2)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 8,
          padding: '14px 16px',
          marginBottom: 18,
          maxWidth: '74ch',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 6 }}>Что делать</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          Прочитай две колонки построчно: <strong style={{ color: 'var(--ink)' }}>слева</strong> — как счёт поставщика
          обрабатывают вручную сегодня, <strong style={{ color: 'var(--ink)' }}>справа</strong> — та же работа после
          доработки в 1С. Ниже выписано, что именно изменилось и откуда берутся цифры для задания 2.2.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        <div style={{ background: 'var(--mock-bg)', border: '1px solid var(--mock-line)', borderRadius: 10, padding: 22, color: 'var(--mock-ink)' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--mock-dim)', marginBottom: 8 }}>
            ДО — ВРУЧНУЮ
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 16 }}>Счёт от поставщика: как сейчас</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {lab.before.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', minHeight: 46 }}>
                <span style={{ flex: 'none', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--mock-dim)', paddingTop: 2 }}>{b.n}</span>
                <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--mock-dim)', textWrap: 'pretty' }}>{b.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--mock-line)', fontSize: 14, color: 'var(--mock-dim)' }}>
            12 минут на счёт · 3 участника · контроль в Excel
          </div>
        </div>

        <div style={{ background: 'var(--mock-bg)', border: '1px solid var(--accent)', borderRadius: 10, padding: 22, color: 'var(--mock-ink)' }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--accent-text)', marginBottom: 8 }}>
            ПОСЛЕ — ДОРАБОТКА В 1С
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 16 }}>Счёт от поставщика: как станет</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {lab.after.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', minHeight: 46 }}>
                <span style={{ flex: 'none', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--accent-text)', paddingTop: 2 }}>{a.n}</span>
                <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--mock-ink)', textWrap: 'pretty' }}>{a.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--mock-line)', fontSize: 14, fontWeight: 700 }}>
            3 минуты на счёт · 2 участника · контроль отчётом в 1С
          </div>
        </div>
      </div>

      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {lab.diffs.map((d, i) => (
          <div key={i} style={{ borderTop: '2px solid var(--accent)', paddingTop: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{d.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>{d.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
