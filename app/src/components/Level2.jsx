import BugHunt from './level2/BugHunt';
import ContrastMeter from './level2/ContrastMeter';
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
        Уровень 2 · Джуниор
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 10px' }}>Четыре кейса, а не тесты</h2>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '62ch', margin: '0 0 34px', textWrap: 'pretty' }}>
        Каждый кейс проверяется настоящей логикой: карта проблем в разметке, формула WCAG, разбор твоего кода.
      </p>

      <BugHunt lab={lab} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 20 }}>
        <ContrastMeter lab={lab} />
        <CodeFixer lab={lab} />
      </div>

      <BeforeAfter lab={lab} />
    </section>
  );
}
