const STEPS = [
  {
    text: (
      <>
        Открой <strong style={{ color: 'var(--ink)' }}>Шаг 1 · Теория</strong> — прочитай 6 карточек и ответь на 3 вопроса.
      </>
    ),
  },
  {
    text: (
      <>
        Пройди <strong style={{ color: 'var(--ink)' }}>Шаг 2 · Практика</strong> — 4 задания: схема процесса, расчёт
        окупаемости, запрос 1С, сравнение «до / после».
      </>
    ),
  },
  {
    text: (
      <>
        Сдай <strong style={{ color: 'var(--ink)' }}>Шаг 3 · Проект</strong> — собери постановку задачи для ИИ и напиши
        вывод.
      </>
    ),
  },
];

export default function MapSection({ lab }) {
  return (
    <section style={{ padding: '56px 0 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: 'var(--accent-text)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 18,
            }}
          >
            Симулятор · ОП.13 Автоматизация бизнес-процессов
          </div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.035em', fontWeight: 800, margin: '0 0 20px', textWrap: 'pretty' }}>
            ИИ предложил решение в 1С.
            <br />
            Найди, где он <span style={{ color: 'var(--accent-text)' }}>ошибся</span>.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '56ch', margin: '0 0 24px', textWrap: 'pretty' }}>
            ИИ быстро рисует схемы процессов, пишет запросы и код на встроенном языке 1С — и так же быстро ошибается.
            Твоя работа: <strong style={{ color: 'var(--ink)' }}>проверить, посчитать и исправить</strong>.
          </p>

          <div style={{ border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 12, padding: '18px 20px', marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Как проходить — 3 шага</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flex: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: 'var(--on-accent)',
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--ink-2)' }}>{s.text}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed var(--line-2)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-3)' }}>
              Каждое выполненное задание попадает в счётчик «Выполнено» сверху. Сломать ничего нельзя — у любого задания
              есть кнопка «Начать заново».
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={lab.go.l1}
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
              ▶ Начать с шага 1
            </button>
            <button
              onClick={lab.go.l2}
              className="lab-outline-btn"
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                border: '1px solid var(--line-2)',
                borderRadius: 8,
                padding: '16px 26px',
                fontFamily: 'Manrope, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 52,
              }}
            >
              Сразу к практике
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
          <div style={{ border: '1px solid var(--accent)', background: 'var(--panel)', borderRadius: 12, padding: 22 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Привет, студент</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              Это симулятор по дисциплине <strong style={{ color: 'var(--ink)' }}>ОП.13 «Автоматизация бизнес-процессов»</strong>.
              Здесь ты не учишься пользоваться ИИ — <strong style={{ color: 'var(--ink)' }}>здесь ты учишься проверять то, что
              ИИ выдал</strong>: схему процесса, расчёт окупаемости, запрос и код в 1С.
            </div>
            <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 3 }}>Зачем это нужно</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  На работе за ошибку ИИ отвечает не ИИ, а специалист, который её пропустил. Симулятор учит замечать
                  такие ошибки до того, как они попадут в базу заказчика.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 3 }}>Что ты сделаешь</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  Найдёшь 5 разрывов в бизнес-процессе, пересчитаешь окупаемость автоматизации, исправишь запрос на
                  языке 1С и соберёшь постановку задачи для ИИ.
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-text)', marginBottom: 3 }}>Сколько времени</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  Около 40 минут на все 6 заданий. Можно закрыть страницу и вернуться — прогресс сохранится.
                </div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', border: '1px solid var(--line)', background: 'var(--panel)', borderRadius: 12, padding: 20, overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 28,
                background: 'linear-gradient(180deg, transparent, var(--accent-soft), transparent)',
                animation: 'lab-sweep 6s linear infinite',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'relative',
                background: 'var(--field)',
                border: '1px solid var(--line-2)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 18,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12.5,
                lineHeight: 1.5,
                color: 'var(--ink-2)',
                minHeight: 56,
              }}
            >
              <span style={{ color: 'var(--accent-text)' }}>запрос к ИИ → </span>
              {lab.typed}
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 14,
                  background: 'var(--accent)',
                  verticalAlign: -2,
                  animation: 'lab-caret 1s step-end infinite',
                }}
              />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>Проверку делает не ИИ, а сам симулятор</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                'Окупаемость считается по твоим цифрам прямо в браузере',
                'Клики по схеме сверяются с картой реальных разрывов процесса',
                'Запрос проверяется разбором того, что написал студент',
                'Прогресс хранится в браузере — без интернета и без сервера',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'var(--cyan)', fontSize: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: '52px 0 0', display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Все 6 заданий</h2>
        <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>нажми на любую плитку, чтобы открыть задание</span>
      </div>
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {lab.tiles.map((t, i) => (
          <button
            key={i}
            onClick={t.go}
            className="lab-tile"
            style={{
              textAlign: 'left',
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: 18,
              cursor: 'pointer',
              color: 'var(--ink)',
              fontFamily: 'Manrope, sans-serif',
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                {t.code}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: t.stampColor, whiteSpace: 'nowrap' }}>{t.stamp}</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>{t.title}</span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>{t.desc}</span>
            <span style={{ marginTop: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--accent-text)' }}>Открыть задание →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
