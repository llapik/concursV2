export function savedHours(roi) {
  const delta = Number(roi.before) - Number(roi.after);
  const h = (Number(roi.docs) * delta) / 60;
  return isFinite(h) ? h : 0;
}

export function savedMoney(roi) {
  return savedHours(roi) * Number(roi.rate);
}

export function payback(roi) {
  const m = savedMoney(roi);
  const cost = Number(roi.cost);
  if (!isFinite(m) || m <= 0 || !isFinite(cost) || cost < 0) return null;
  return cost / m;
}

export function fmt(n) {
  if (!isFinite(n)) return '—';
  return Math.round(n).toLocaleString('ru-RU');
}
