export default function BeforeAfter({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: '22px 22px 26px' }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Кейс 2.4
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>До / После</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-3)', margin: '0 0 18px', maxWidth: '66ch', textWrap: 'pretty' }}>
        Слева — сырой вариант ИИ, справа — человеческая доработка. Тащи ползунок и смотри, что именно изменилось и
        почему.
      </p>

      <div style={{ position: 'relative', border: '1px solid #2f333e', borderRadius: 10, overflow: 'hidden', background: '#1e2029', color: '#e8e9ee' }}>
        <div style={{ padding: 28, minHeight: 260, color: '#e8e9ee' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>Тариф «Базовый»</div>
          <div style={{ fontSize: 13, color: '#4d515c', lineHeight: 1.4, marginBottom: 18 }}>
            Всё, что нужно для старта. Отмена в любой момент.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: '#8a90a0', border: '1px solid #3a3e4a', borderRadius: 4, padding: '6px 10px' }}>
              Оформить
            </span>
            <span style={{ fontSize: 11, color: '#6c7280' }}>руб. 490/мес</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6c7280' }}>Доступ</span>
            <span style={{ fontSize: 11, color: '#6c7280' }}>Поддержка</span>
            <span style={{ fontSize: 11, color: '#6c7280' }}>Отчёты</span>
            <span style={{ fontSize: 11, color: '#6c7280' }}>Экспорт</span>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: '#1e2029', color: '#e8e9ee', clipPath: lab.clip }}>
          <div style={{ padding: 28, minHeight: 260, color: '#e8e9ee' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>Тариф «Базовый»</div>
            <div style={{ fontSize: 15, color: '#c9ccd6', lineHeight: 1.55, marginBottom: 20, maxWidth: '44ch' }}>
              Всё, что нужно для старта. Отмена в любой момент.
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#14151a',
                  background: '#f2b03d',
                  borderRadius: 8,
                  padding: '14px 22px',
                  minHeight: 48,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Оформить подписку
              </span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#e8e9ee' }}>490 ₽ / мес</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
              <span style={{ fontSize: 14, color: '#c9ccd6' }}>Доступ</span>
              <span style={{ fontSize: 14, color: '#c9ccd6' }}>Поддержка</span>
              <span style={{ fontSize: 14, color: '#c9ccd6' }}>Отчёты</span>
              <span style={{ fontSize: 14, color: '#c9ccd6' }}>Экспорт</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: '#f2b03d', pointerEvents: 'none', left: lab.handleLeft }} />
        <div style={{ position: 'absolute', top: 12, left: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#a8adb9' }}>
          СЫРОЙ ВЫВОД ИИ
        </div>
        <div style={{ position: 'absolute', top: 12, right: 16, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#f2b03d' }}>
          ДОРАБОТКА ДИЗАЙНЕРА
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={lab.slider}
        onChange={(e) => lab.setSlider(Number(e.target.value))}
        aria-label="Сравнение до и после"
        style={{ width: '100%', marginTop: 16, height: 44, cursor: 'ew-resize' }}
      />

      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {lab.diffs.map((d, i) => (
          <div key={i} style={{ borderTop: '2px solid var(--accent)', paddingTop: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{d.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--dim)', textWrap: 'pretty' }}>{d.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
