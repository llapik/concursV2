import { useEffect, useRef, useState } from 'react';
import { SCENARIOS, askAi } from '../lib/aiStand';

const mono = "'IBM Plex Mono', monospace";

export default function AiStand({ lab }) {
  const [text, setText] = useState('');
  const [sent, setSent] = useState('');
  const [busy, setBusy] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [shown, setShown] = useState(0);
  const [checked, setChecked] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const send = async (value) => {
    const q = (value ?? text).trim();
    if (!q || busy) return;
    clearInterval(timer.current);
    setSent(q);
    setScenario(null);
    setShown(0);
    setChecked(false);
    setBusy(true);
    const ans = await askAi(q);
    setBusy(false);
    setScenario(ans);
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= ans.lines.length) clearInterval(timer.current);
    }, 160);
  };

  const done = scenario && shown >= scenario.lines.length;
  const bad = new Set(checked && scenario ? scenario.issues.map((i) => i.line) : []);

  return (
    <section style={{ padding: '48px 0 40px' }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--accent-text)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
        Демо · ИИ-стенд
      </div>
      <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
        Спроси ИИ — и проверь, что он ответил
      </h2>
      <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 20px', marginBottom: 20, maxWidth: '78ch' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: 'var(--accent-text)' }}>Что делать</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          1. Нажми на один из запросов или впиши свой. 2. Нажми «Отправить запрос». 3. Прочитай ответ ИИ и нажми{' '}
          <strong style={{ color: 'var(--ink)' }}>«Проверить ответ ИИ»</strong> — стенд покажет, где ответ выглядит правдоподобно, но неверен.
        </div>
      </div>

      <div style={{ border: '1px dashed var(--accent)', background: 'var(--panel)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, maxWidth: '78ch' }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>Это демонстрационный режим</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-3)' }}>
          Стенд не подключается к реальному ИИ-сервису. Ответы подготовлены заранее и повторяют ошибки, которые на практике допускают языковые
          модели. Так каждый запрос даёт один и тот же разбор, ошибка всегда есть, а данные никуда не передаются — как на лётном тренажёре:
          сначала учатся на безопасной модели, потом работают с реальной системой.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, alignItems: 'start' }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Запрос к ИИ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => { setText(s.prompt); send(s.prompt); }}
                className="lab-chip"
                style={{ background: 'var(--panel-2)', border: '1px solid var(--line-2)', color: 'var(--ink-2)', borderRadius: 20, padding: '10px 14px', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', minHeight: 44, textAlign: 'left' }}
              >
                {s.prompt}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', fontFamily: mono, fontSize: 11, color: 'var(--dim)', marginBottom: 6, letterSpacing: '0.08em' }}>
            ЗАПРОС К ИИ →
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="например: составь запрос по остаткам склада"
            style={{ width: '100%', background: 'var(--field)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '12px 14px', color: 'var(--ink)', fontFamily: mono, fontSize: 13, minHeight: 48 }}
          />
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => send()}
              disabled={busy}
              className="lab-primary-btn"
              style={{ background: 'var(--accent)', color: 'var(--on-accent)', border: 0, borderRadius: 8, padding: '12px 20px', fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 800, cursor: busy ? 'default' : 'pointer', minHeight: 48, opacity: busy ? 0.7 : 1 }}
            >
              ▶ Отправить запрос
            </button>
          </div>
        </div>

        <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22, minHeight: 260 }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Ответ ИИ</div>
          {!sent && <div style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55 }}>Здесь появится ответ. Выбери запрос слева.</div>}
          {sent && (
            <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--dim)', marginBottom: 10 }}>
              запрос → <span style={{ color: 'var(--accent-text)' }}>{sent}</span>
            </div>
          )}
          {busy && <div style={{ fontSize: 14, color: 'var(--ink-3)' }} role="status">ИИ формирует ответ…</div>}
          {scenario && (
            <div role="status">
              <div style={{ fontFamily: mono, fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{scenario.kind}</div>
              <div style={{ background: 'var(--field)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '12px 0', overflowX: 'auto' }}>
                {scenario.lines.slice(0, shown).map((ln, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: mono, fontSize: 12.5, lineHeight: 1.7, whiteSpace: 'pre', padding: '0 14px',
                      background: bad.has(i) ? 'var(--accent-soft)' : 'transparent',
                      borderLeft: bad.has(i) ? '3px solid var(--accent)' : '3px solid transparent',
                      color: 'var(--ink-2)',
                    }}
                  >
                    {bad.has(i) ? '⚠ ' : ''}{ln || ' '}
                  </div>
                ))}
              </div>
              {done && scenario.issues.length > 0 && !checked && (
                <button
                  onClick={() => setChecked(true)}
                  className="lab-primary-btn"
                  style={{ marginTop: 14, background: 'var(--accent)', color: 'var(--on-accent)', border: 0, borderRadius: 8, padding: '12px 20px', fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 800, cursor: 'pointer', minHeight: 48 }}
                >
                  ✓ Проверить ответ ИИ
                </button>
              )}
              {done && scenario.issues.length === 0 && (
                <div style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-3)' }}>Выбери один из четырёх запросов слева.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {checked && scenario && (
        <div style={{ marginTop: 20, border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 14, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Разбор ответа ИИ</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-text)' }}>Найдено проблем: {scenario.issues.length}</div>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {scenario.issues.map((it, i) => (
              <div key={i} style={{ border: '1px solid var(--line)', background: 'var(--panel-2)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 4 }}><span style={{ color: 'var(--bad)' }}>✕ </span>{it.title}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-3)' }}>{it.why}</div>
              </div>
            ))}
          </div>
          {scenario.task && (
            <button
              onClick={() => lab.setTab(scenario.task.tab)}
              className="lab-outline-btn"
              style={{ marginTop: 16, background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '12px 18px', fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', minHeight: 48 }}
            >
              Потренироваться: {scenario.task.label} →
            </button>
          )}
        </div>
      )}
    </section>
  );
}
