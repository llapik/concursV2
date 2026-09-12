const NORMS = [
  'Методические рекомендации ФГБОУ ДПО ИРПО по применению технологий ИИ в рамках модуля в соответствии с ФГОС СПО (2025)',
  'Указ Президента РФ от 10.10.2019 № 490',
  'Распоряжение Правительства РФ от 28.07.2017 № 1632-р',
  'Приказ Минпросвещения России от 24.08.2022 № 762',
  'ФГОС СПО 09.02.11',
];

function FontSizeButton({ label, size, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: '1px solid var(--line-2)',
        color: 'var(--ink)',
        borderRadius: 6,
        minWidth: 44,
        minHeight: 44,
        fontFamily: 'Manrope, sans-serif',
        fontSize: size,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export default function Footer({ lab }) {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--footer)', marginTop: 40 }}>
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '32px 24px 44px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 28,
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>UI/UX Lab: ИИ под проверкой</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--dim)', textWrap: 'pretty' }}>
            Электронный образовательный ресурс. Специальность 09.02.11, МДК «Проектирование и разработка интерфейсов
            пользователей» и «Разработка кода информационных систем». Сквозной модуль по применению технологий ИИ.
          </div>
          <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.6, color: 'var(--dim)', textWrap: 'pretty' }}>
            Реальных обращений к ИИ-сервисам ресурс не выполняет: весь «ИИ»-контент подготовлен заранее.
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: 'var(--dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Нормативное обоснование
          </div>
          <div style={{ display: 'grid', gap: 7, fontSize: 12.5, lineHeight: 1.5, color: 'var(--dim)' }}>
            {NORMS.map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: 'var(--dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Доступность
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--dim)', marginBottom: 12 }}>Масштаб интерфейса:</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <FontSizeButton label="A" size={13} bg={lab.fsBg1} onClick={lab.fontS} />
            <FontSizeButton label="A" size={15} bg={lab.fsBg2} onClick={lab.fontM} />
            <FontSizeButton label="A" size={18} bg={lab.fsBg3} onClick={lab.fontL} />
          </div>
        </div>
      </div>
    </footer>
  );
}
