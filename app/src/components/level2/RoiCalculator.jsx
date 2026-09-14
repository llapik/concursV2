export default function RoiCalculator({ lab }) {
  return (
    <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Задание 2.2
      </div>
      <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>Посчитай окупаемость автоматизации</h3>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel-2)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 8,
          padding: '14px 16px',
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 6 }}>Что делать</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          ИИ написал в презентации: «автоматизация окупится за 2 месяца». Проверь это сам. Меняй числа в полях и
          добейся, чтобы <strong style={{ color: 'var(--ink)' }}>срок окупаемости был 12 месяцев или меньше</strong> —
          тогда проект можно защищать перед заказчиком.
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
        {lab.roiFields.map((f, i) => (
          <label key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 130px', alignItems: 'center', gap: 14, fontSize: 14, color: 'var(--ink-2)' }}>
            <span>{f.label}</span>
            <input
              type="number"
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              style={{
                width: 130,
                background: 'var(--field)',
                border: '1px solid var(--line-2)',
                borderRadius: 6,
                padding: '11px 12px',
                color: 'var(--ink)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14,
                minHeight: 44,
              }}
            />
          </label>
        ))}
      </div>

      <div style={{ background: 'var(--panel-2)', border: '1px solid var(--line-2)', borderRadius: 10, padding: 16, display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14 }}>
          <span style={{ color: 'var(--ink-3)' }}>Экономия времени</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{lab.savedHours} ч / мес</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14 }}>
          <span style={{ color: 'var(--ink-3)' }}>Экономия в деньгах</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{lab.savedMoney} ₽ / мес</span>
        </div>
        <div style={{ height: 1, background: 'var(--line)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Срок окупаемости</span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: lab.paybackColor }}>{lab.paybackText}</span>
        </div>
        <div style={{ height: 8, background: 'var(--line-3)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              inset: '0 auto 0 0',
              background: lab.paybackColor,
              borderRadius: 4,
              transition: 'width 0.35s ease, background 0.35s ease',
              width: lab.paybackPct,
            }}
          />
          <div style={{ position: 'absolute', top: -3, bottom: -3, width: 2, background: 'var(--ink)', opacity: 0.7, left: '50%' }} />
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>↑ отметка в середине — граница 12 месяцев. Полоска должна остаться левее.</div>
        <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: lab.paybackColor, textWrap: 'pretty' }}>{lab.paybackVerdict}</div>
      </div>

      <button
        onClick={lab.resetRoi}
        className="lab-outline-btn lab-outline-btn--ink"
        style={{
          marginTop: 14,
          background: 'transparent',
          border: '1px solid var(--line-2)',
          color: 'var(--ink-2)',
          borderRadius: 8,
          padding: '12px 18px',
          fontFamily: 'Manrope, sans-serif',
          fontSize: 14,
          cursor: 'pointer',
          minHeight: 44,
        }}
      >
        Вернуть исходные цифры
      </button>
    </div>
  );
}
