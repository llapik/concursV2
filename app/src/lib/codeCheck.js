export function runCodeChecks(code) {
  return [
    { label: 'У изображения есть осмысленный alt', ok: /<img[^>]*\salt\s*=\s*"[^"]+"/i.test(code) },
    { label: 'Поле e-mail использует type="email"', ok: /type\s*=\s*"email"/i.test(code) },
    { label: 'У поля есть видимая метка <label>', ok: /<label[^>]*>/i.test(code) },
    {
      label: 'Сетка адаптивна (repeat/auto-fit/minmax), а не четыре жёстких колонки',
      ok: /(auto-fit|auto-fill|minmax\()/i.test(code) && !/grid-template-columns:\s*1fr 1fr 1fr 1fr/i.test(code),
    },
  ];
}
