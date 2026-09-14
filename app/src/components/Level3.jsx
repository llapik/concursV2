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
        Шаг 3 · Проект
      </div>
      <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
        Проект: постановка задачи для ИИ
      </h2>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 10,
          padding: '18px 20px',
          marginBottom: 28,
          maxWidth: '76ch',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: 'var(--accent-text)' }}>Задача</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          Заказчик просит <strong style={{ color: 'var(--ink)' }}>автоматизировать согласование заявок на закупку в
          1С</strong>. Нажимай на кнопки-требования слева — из них соберётся готовая постановка задачи для ИИ. Цель:
          набрать все 6 обязательных требований и не брать пустые формулировки. Подпись внизу подскажет, чего не
          хватает.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Шаг А. Нажми на нужные требования</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-3)', marginBottom: 14 }}>
            Выбрано {lab.chosenCount} из 8. Жёлтая кнопка = требование добавлено. Нажми ещё раз, чтобы убрать.
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
          <div style={{ marginTop: 20, fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Шаг Б. Читай, что получилось</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-3)', marginBottom: 8 }}>
            Это и есть твоя постановка задачи — её можно скопировать и отдать ИИ.
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
              minHeight: 130,
              whiteSpace: 'pre-wrap',
            }}
          >
            {lab.promptText}
          </div>
          <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, lineHeight: 1.55, color: lab.verdictColor, textWrap: 'pretty' }}>{lab.verdict}</div>
        </div>

        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Шаг В. Проверь результат по чек-листу приёмки</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-3)' }}>
                10 пунктов, по которым доработку в 1С принимают у исполнителя. Нажимай на строку, если пункт выполнен.
                Нужно отметить минимум 8.
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-text)', whiteSpace: 'nowrap' }}>{lab.checklistCount} / 10</div>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {lab.checklist.map((n, i) => (
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
        <h3 style={{ fontSize: 19, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Шаг Г. Напиши вывод (его читает преподаватель)</h3>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: '0 0 14px', maxWidth: '72ch', textWrap: 'pretty' }}>
          Вопрос: где ИИ выдал правдоподобный, но нерабочий результат? Приведи пример из заданий шага 2 и объясни,
          чем это грозит заказчику. Хватит 3–5 предложений. Текст сохраняется сам.
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
        <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-3)' }}>Сохранено автоматически · написано {lab.reflectionLen} символов</div>
      </div>

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={lab.go.l2}
          className="lab-outline-btn"
          style={{
            background: 'transparent',
            border: '1px solid var(--line-2)',
            color: 'var(--ink)',
            borderRadius: 8,
            padding: '14px 22px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: 48,
          }}
        >
          ← Назад к шагу 2
        </button>
        <button
          onClick={lab.go.map}
          className="lab-primary-btn"
          style={{
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            border: 0,
            borderRadius: 8,
            padding: '14px 22px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
            minHeight: 48,
          }}
        >
          Готово — на главную ✓
        </button>
      </div>
    </section>
  );
}
