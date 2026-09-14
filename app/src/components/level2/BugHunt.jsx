const STEPS = [
  { key: 'clean1', label: 'ШАГ 1', clean: true, title: 'Сотрудник создаёт заявку на закупку', sub: 'Документ «ЗаявкаНаЗакупку», автор — текущий пользователь' },
  { key: 'noRole', label: 'ШАГ 2 — нажми', title: 'Заявка уходит «на согласование руководителю»', sub: 'Исполнитель задачи: не указан' },
  { key: 'noDeadline', label: 'ШАГ 3 — нажми', title: 'Согласующий рассматривает заявку', sub: 'Срок исполнения: не задан' },
  { key: 'noReject', label: 'ШАГ 4 — нажми', title: 'Развилка: «Согласовано» → дальше', sub: 'Других вариантов у развилки нет' },
  { key: 'noBudget', label: 'ШАГ 5 — нажми', title: 'Снабжение сразу оформляет заказ поставщику', sub: 'Лимит бюджета подразделения не проверяется' },
  { key: 'manualReentry', label: 'ШАГ 6 — нажми', title: 'Бухгалтер вручную перебивает данные заявки в поступление', sub: 'Ввод «на основании» не используется' },
  { key: 'clean2', label: 'ШАГ 7', clean: true, title: 'Автору заявки приходит уведомление о закрытии', sub: 'Результат фиксируется в истории документа' },
];

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
            Задание 2.1
          </div>
          <h3 style={{ fontSize: 21, fontWeight: 800, margin: '6px 0 0', letterSpacing: '-0.02em' }}>Найди 5 разрывов в схеме процесса</h3>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-text)', whiteSpace: 'nowrap' }}>Найдено {lab.foundCount} из 5</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div style={{ padding: 24, borderRight: '1px solid var(--line)' }}>
          <div
            style={{
              border: '1px solid var(--line)',
              background: 'var(--panel-2)',
              borderLeft: '4px solid var(--accent)',
              borderRadius: 8,
              padding: '14px 16px',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 6 }}>Что делать</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
              ИИ описал бизнес-процесс «Согласование заявки на закупку» для внедрения в 1С.{' '}
              <strong style={{ color: 'var(--ink)' }}>Нажимай мышкой на те шаги, где видишь разрыв или ошибку.</strong>{' '}
              Мерцающая пунктирная рамка — зона, по которой можно нажать. Ошибок ровно 5, справа появится объяснение.
            </div>
          </div>
          {lab.hintOn && (
            <div style={{ border: '1px dashed var(--accent)', borderRadius: 8, padding: '12px 14px', marginBottom: 14, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>
              Подсказка: ищи шаг без ответственного, шаг без срока, развилку с единственным выходом, повторный ручной
              ввод тех же данных и отсутствие контроля лимита бюджета.
            </div>
          )}

          <div style={{ background: 'var(--mock-bg)', border: '1px solid var(--mock-line)', borderRadius: 10, padding: 20, color: 'var(--mock-ink)', display: 'grid', gap: 10 }}>
            {STEPS.map((s) => (
              <div
                key={s.key}
                onClick={lab.hit[s.key]}
                style={{
                  cursor: 'pointer',
                  outline: s.clean ? '1px dashed var(--mock-line)' : lab.ring[s.key],
                  outlineOffset: 4,
                  borderRadius: 4,
                  padding: '8px 10px',
                  animation: s.clean ? undefined : lab.anim[s.key],
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    color: s.clean ? 'var(--mock-dim)' : 'var(--accent-text)',
                    marginBottom: 3,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--mock-dim)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Что ты нашёл</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-3)', marginBottom: 14 }}>
            Список заполняется сам, когда ты попадаешь по ошибке.
          </div>
          {lab.msg && (
            <div
              style={{
                border: `1px solid ${lab.msgBorder}`,
                background: 'var(--panel-2)',
                borderRadius: 8,
                padding: '12px 14px',
                fontSize: 13.5,
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
                  <div style={{ marginTop: 6, paddingLeft: 22, fontSize: 13, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>
                    {b.why}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button
              onClick={lab.toggleHint}
              style={{
                background: 'var(--panel-3)',
                border: '1px solid var(--line-2)',
                color: 'var(--ink)',
                borderRadius: 8,
                padding: '12px 18px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              {lab.hintLabel}
            </button>
            <button
              onClick={lab.resetBugs}
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
                minHeight: 44,
              }}
            >
              Начать заново
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
