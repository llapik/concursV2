export default function BugHunt({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
      <div
        style={{
          padding: '20px 22px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Кейс 2.1
          </div>
          <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 0', letterSpacing: '-0.02em' }}>Найди баг юзабилити</h3>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--accent-text)' }}>
          найдено {lab.foundCount} / 5
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div style={{ padding: 24, borderRight: '1px solid var(--line)' }}>
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
            Форма «сгенерирована ИИ» · кликай по проблемным зонам
          </div>

          <div style={{ background: '#1e2029', border: '1px solid #2f333e', borderRadius: 10, padding: 22, color: '#e8e9ee' }}>
            <div
              onClick={lab.hit.clean1}
              style={{ cursor: 'pointer', outline: lab.ring.clean1, outlineOffset: 4, borderRadius: 4 }}
            >
              <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 4, color: '#e8e9ee' }}>Запись на консультацию</div>
              <div style={{ fontSize: 13, color: '#a8adb9' }}>Заполните форму, и мы свяжемся с вами</div>
            </div>

            <div
              onClick={lab.hit.noLabel}
              style={{
                marginTop: 18,
                cursor: 'pointer',
                outline: lab.ring.noLabel,
                outlineOffset: 6,
                borderRadius: 4,
                animation: lab.anim.noLabel,
              }}
            >
              <input
                type="text"
                placeholder="Введите имя"
                readOnly
                style={{
                  width: '100%',
                  background: '#14151a',
                  border: '1px solid #3a3e4a',
                  borderRadius: 6,
                  padding: '11px 12px',
                  color: '#e8e9ee',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 14,
                  pointerEvents: 'none',
                }}
              />
            </div>

            <div
              onClick={lab.hit.tabOrder}
              style={{
                marginTop: 12,
                cursor: 'pointer',
                outline: lab.ring.tabOrder,
                outlineOffset: 6,
                borderRadius: 4,
                animation: lab.anim.tabOrder,
              }}
            >
              <label style={{ display: 'block', fontSize: 12, color: '#a8adb9', marginBottom: 5 }}>Телефон</label>
              <input
                type="text"
                tabIndex={7}
                placeholder="+7"
                readOnly
                style={{
                  width: '100%',
                  background: '#14151a',
                  border: '1px solid #3a3e4a',
                  borderRadius: 6,
                  padding: '11px 12px',
                  color: '#e8e9ee',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 14,
                  pointerEvents: 'none',
                }}
              />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#6c7280', marginTop: 4 }}>
                tabindex="7"
              </div>
            </div>

            <div
              onClick={lab.hit.lowContrast}
              style={{
                marginTop: 14,
                cursor: 'pointer',
                outline: lab.ring.lowContrast,
                outlineOffset: 6,
                borderRadius: 4,
                animation: lab.anim.lowContrast,
              }}
            >
              <div style={{ fontSize: 12, color: '#4d515c' }}>Мы не передаём данные третьим лицам</div>
            </div>

            <div
              onClick={lab.hit.tinyTarget}
              style={{
                marginTop: 14,
                cursor: 'pointer',
                outline: lab.ring.tinyTarget,
                outlineOffset: 6,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                animation: lab.anim.tinyTarget,
              }}
            >
              <span style={{ width: 11, height: 11, border: '1px solid #6c7280', borderRadius: 2, display: 'inline-block', flex: 'none' }} />
              <span style={{ fontSize: 12, color: '#a8adb9' }}>Согласен с обработкой данных</span>
            </div>

            <div
              onClick={lab.hit.hierarchy}
              style={{
                marginTop: 20,
                cursor: 'pointer',
                outline: lab.ring.hierarchy,
                outlineOffset: 6,
                borderRadius: 4,
                display: 'flex',
                gap: 10,
                animation: lab.anim.hierarchy,
              }}
            >
              <span style={{ background: '#f2b03d', color: '#14151a', borderRadius: 6, padding: '12px 20px', fontSize: 14, fontWeight: 800 }}>
                Отмена
              </span>
              <span style={{ background: 'transparent', color: '#8a90a0', border: '1px solid #3a3e4a', borderRadius: 6, padding: '12px 20px', fontSize: 14 }}>
                Записаться
              </span>
            </div>

            <div
              onClick={lab.hit.clean2}
              style={{ marginTop: 18, cursor: 'pointer', outline: lab.ring.clean2, outlineOffset: 4, borderRadius: 4 }}
            >
              <div style={{ fontSize: 12, color: '#a8adb9' }}>
                Нужна помощь? <a href="#">Напишите нам</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 24 }}>
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
            Журнал проверки
          </div>
          {lab.msg && (
            <div
              style={{
                border: `1px solid ${lab.msgBorder}`,
                background: 'var(--panel-2)',
                borderRadius: 8,
                padding: '12px 14px',
                fontSize: 13,
                lineHeight: 1.5,
                color: 'var(--ink-2)',
                marginBottom: 14,
                animation: 'lab-pop 0.18s ease-out',
                textWrap: 'pretty',
              }}
            >
              {lab.msg}
            </div>
          )}
          <div style={{ display: 'grid', gap: 8 }}>
            {lab.bugList.map((b, i) => (
              <div key={i} style={{ border: `1px solid ${b.border}`, background: 'var(--panel-2)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: b.markColor }}>{b.mark}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: b.titleColor }}>{b.title}</span>
                </div>
                {b.found && (
                  <div style={{ marginTop: 6, paddingLeft: 22, fontSize: 13, lineHeight: 1.5, color: 'var(--dim)', textWrap: 'pretty' }}>
                    {b.why}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={lab.resetBugs}
            className="lab-outline-btn lab-outline-btn--ink"
            style={{
              marginTop: 16,
              background: 'transparent',
              border: '1px solid var(--line-2)',
              color: 'var(--dim)',
              borderRadius: 8,
              padding: '10px 16px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              cursor: 'pointer',
              minHeight: 44,
            }}
          >
            Сбросить кейс
          </button>
        </div>
      </div>
    </div>
  );
}
