import BugHunt from './level2/BugHunt';
import RoiCalculator from './level2/RoiCalculator';
import CodeFixer from './level2/CodeFixer';
import BeforeAfter from './level2/BeforeAfter';

export default function Level2({ lab }) {
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
        Шаг 2 · Практика
      </div>
      <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
        Практика: 4 задания подряд
      </h2>
      <div
        style={{
          border: '1px solid var(--line)',
          background: 'var(--panel)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 10,
          padding: '18px 20px',
          marginBottom: 30,
          maxWidth: '76ch',
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: 'var(--accent-text)' }}>Что делать на этом шаге</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          Задания идут сверху вниз:{' '}
          <strong style={{ color: 'var(--ink)' }}>
            2.1 схема процесса → 2.2 расчёт окупаемости → 2.3 запрос 1С → 2.4 сравнение «до / после»
          </strong>
          . У каждого есть блок «Что делать» — прочитай его и выполняй. Порядок можно не соблюдать.
        </div>
      </div>

      <BugHunt lab={lab} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 20 }}>
        <RoiCalculator lab={lab} />
        <CodeFixer lab={lab} />
      </div>

      <BeforeAfter lab={lab} />

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={lab.go.l1}
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
          ← Назад к шагу 1
        </button>
        <button
          onClick={lab.go.l3}
          className="lab-primary-btn"
          style={{
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            border: 0,
            borderRadius: 8,
            padding: '16px 26px',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 16,
            fontWeight: 800,
            cursor: 'pointer',
            minHeight: 52,
          }}
        >
          Дальше: шаг 3 · Проект →
        </button>
      </div>
    </section>
  );
}
