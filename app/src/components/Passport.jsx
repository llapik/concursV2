import { AUTHOR, PASSPORT, COMPONENTS, LESSON } from '../data/passport';

const mono = "'IBM Plex Mono', monospace";
const card = { border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22, marginBottom: 20 };
const h3 = { fontSize: 19, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' };

function Rows({ rows, cols }) {
  return (
    <div style={{ display: 'grid', gap: 0 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: cols, gap: 14, padding: '10px 0', borderBottom: '1px solid var(--line-3)', fontSize: 14, lineHeight: 1.5 }}>
          {r.map((c, j) => (
            <div key={j} style={{ color: j === 0 ? 'var(--ink-3)' : 'var(--ink)', fontWeight: j === 0 ? 600 : 400 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Passport() {
  const rows = AUTHOR ? [['Автор', AUTHOR], ...PASSPORT] : PASSPORT;
  return (
    <section style={{ padding: '48px 0 40px' }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--accent-text)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
        Паспорт ЭОР
      </div>
      <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
        Сведения о ресурсе и методические материалы
      </h2>

      <div style={card}>
        <h3 style={h3}>Паспорт (метаданные)</h3>
        <Rows rows={rows} cols="minmax(150px, 1fr) minmax(0, 3fr)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        <div style={card}>
          <h3 style={h3}>Студенту: как проходить</h3>
          <div style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Пройди три шага по порядку: теория → практика → проект. В каждом задании есть блок «Что делать» и кнопка возврата — сломать ничего нельзя.
            Результат виден сразу: знак «✓» или «✕» и пояснение. Счётчик «Выполнено N из 6» — вверху страницы. Хочешь увидеть, как ошибается ИИ, —
            открой вкладку «ИИ-стенд».
          </div>
        </div>
        <div style={card}>
          <h3 style={h3}>Преподавателю: оценивание</h3>
          <div style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            Выполнение видно на экране обучающегося: счётчик и отметки на плитках карты заданий. Рекомендуемая шкала (можно изменить): 6 из 6 и
            содержательный вывод — «5»; 5 из 6 — «4»; 4 из 6 — «3». Вывод шага 3 оценивается вручную: что неверно в решении ИИ, как это обнаружено,
            что специалист сделает перед принятием решения.
          </div>
        </div>
      </div>

      <div style={card}>
        <h3 style={h3}>Преподавателю: ход занятия (50 минут)</h3>
        <Rows rows={LESSON} cols="minmax(150px, 1.2fr) 80px minmax(0, 3fr)" />
      </div>

      <div style={card}>
        <h3 style={h3}>Сторонние компоненты и лицензии</h3>
        <Rows rows={COMPONENTS} cols="minmax(150px, 1.5fr) minmax(100px, 1fr) minmax(0, 2fr)" />
      </div>
    </section>
  );
}
