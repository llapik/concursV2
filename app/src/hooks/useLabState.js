import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AFTER_STEPS,
  BEFORE_STEPS,
  BROKEN_CODE,
  BUGS,
  CARDS,
  CHECKLIST,
  CHIPS,
  CLEAN,
  DEFAULT_ROI,
  DIFFS,
  PROMPTS,
  QUESTIONS,
  ROI_FIELDS,
  STORAGE_KEY,
  TILE_META,
  TITLES,
} from '../data/content';
import { fmt, payback, savedHours, savedMoney } from '../lib/roi';
import { runCodeChecks } from '../lib/codeCheck';

const INITIAL_STATE = {
  tab: 'map',
  done: {},
  openCard: null,
  picks: {},
  found: {},
  msg: '',
  msgOk: true,
  roi: { ...DEFAULT_ROI },
  code: BROKEN_CODE,
  codeResults: [],
  chosen: {},
  checked: {},
  reflection: '',
  fs: 1,
  theme: 'dark',
  typed: '',
  toast: '',
  hintOn: false,
};

const BUG_IDS = ['noRole', 'noDeadline', 'noReject', 'noBudget', 'manualReentry'];

export function useLabState() {
  const [state, setStateRaw] = useState(INITIAL_STATE);
  const toastTimer = useRef(null);

  const setState = useCallback((patch) => {
    setStateRaw((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  }, []);

  // Load saved progress once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        setState({
          done: s.done || {},
          reflection: s.reflection || '',
          checked: s.checked || {},
          chosen: s.chosen || {},
          fs: s.fs || 1,
          theme: s.theme || 'dark',
        });
      }
    } catch {
      /* ignore malformed/unavailable storage */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist whenever the saved-progress fields change.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          done: state.done,
          reflection: state.reflection,
          checked: state.checked,
          chosen: state.chosen,
          fs: state.fs,
          theme: state.theme,
        }),
      );
    } catch {
      /* ignore unavailable storage */
    }
  }, [state.done, state.reflection, state.checked, state.chosen, state.fs, state.theme]);

  // Hero "typed query" loop.
  useEffect(() => {
    const typer = { ti: 0, ci: 0, erasing: false, hold: 0 };
    const timer = setInterval(() => {
      const full = PROMPTS[typer.ti % PROMPTS.length];
      if (!typer.erasing) {
        typer.ci += 1;
        if (typer.ci >= full.length) {
          typer.erasing = true;
          typer.hold = 14;
        }
      } else if (typer.hold > 0) {
        typer.hold -= 1;
        return;
      } else {
        typer.ci -= 2;
        if (typer.ci <= 0) {
          typer.ci = 0;
          typer.erasing = false;
          typer.ti += 1;
        }
      }
      setState({ typed: PROMPTS[typer.ti % PROMPTS.length].slice(0, Math.max(0, typer.ci)) });
    }, 70);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mark = useCallback(
    (id) => {
      setState((prev) => {
        if (prev.done[id]) return {};
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setState({ toast: '' }), 3600);
        return { done: { ...prev.done, [id]: true }, toast: TITLES[id] || 'Задание зачтено' };
      });
    },
    [setState],
  );

  const pb = useMemo(() => payback(state.roi), [state.roi]);

  // Auto-grading: mirrors the source's audit() check run after every relevant change.
  useEffect(() => {
    if (pb !== null && pb <= 12) mark('roi');
  }, [pb, mark]);

  useEffect(() => {
    const okCount = Object.keys(state.checked).filter((k) => state.checked[k]).length;
    if (okCount >= 8) mark('checklist');
  }, [state.checked, mark]);

  useEffect(() => {
    const correctCount = QUESTIONS.filter((q, i) => state.picks[i] === q.correct).length;
    if (correctCount === QUESTIONS.length) mark('quiz');
  }, [state.picks, mark]);

  useEffect(() => {
    const keyHits = CHIPS.filter((c) => c.key && state.chosen[c.id]).length;
    if (keyHits === 6 && !state.chosen.trendy) mark('prompt');
  }, [state.chosen, mark]);

  const hitZone = useCallback(
    (id) => {
      if (CLEAN[id]) {
        setState({ msg: CLEAN[id], msgOk: false });
        return;
      }
      const bug = BUGS.find((b) => b.id === id);
      if (!bug) return;
      setState((prev) => {
        const found = { ...prev.found, [id]: true };
        if (Object.keys(found).length === BUGS.length) mark('bugs');
        return { found, msg: 'Верно: ' + bug.title.toLowerCase() + '. ' + bug.why, msgOk: true };
      });
    },
    [setState, mark],
  );

  const checkCode = useCallback(() => {
    setState((prev) => {
      const checks = runCodeChecks(prev.code);
      if (checks.every((x) => x.ok)) mark('code');
      return { codeResults: checks };
    });
  }, [setState, mark]);

  const doneCount = Object.keys(state.done).length;
  const foundCount = Object.keys(state.found).length;
  const quizScore = QUESTIONS.filter((q, i) => state.picks[i] === q.correct).length;
  const checklistCount = Object.keys(state.checked).filter((k) => state.checked[k]).length;

  const ring = {};
  const anim = {};
  BUG_IDS.forEach((id) => {
    ring[id] = state.found[id] ? '2px solid var(--ok)' : '1px dashed var(--accent)';
    anim[id] = state.found[id] ? 'none' : 'lab-breathe 3.2s ease-in-out infinite';
  });

  let paybackVerdict;
  let paybackColor;
  if (pb === null) {
    paybackVerdict = 'Экономии нет: после автоматизации времени уходит столько же или больше. Уменьши минуты «после».';
    paybackColor = 'var(--bad)';
  } else if (pb <= 12) {
    paybackVerdict = 'Окупаемость ' + pb.toFixed(1) + ' мес — проект защитить можно. Задание зачтено.';
    paybackColor = 'var(--ok)';
  } else {
    paybackVerdict = 'Окупаемость ' + pb.toFixed(1) + ' мес — дольше года. Либо экономия мала, либо внедрение слишком дорогое.';
    paybackColor = 'var(--bad)';
  }

  const chosenChips = CHIPS.filter((c) => state.chosen[c.id]);
  const promptText = chosenChips.length
    ? 'Задача: автоматизировать согласование заявок на закупку в 1С.\n\n' + chosenChips.map((c) => '— ' + c.line).join('\n')
    : 'Нажимай на требования слева — постановка задачи соберётся здесь.';
  const keyHits = CHIPS.filter((c) => c.key && state.chosen[c.id]).length;
  const hasFluff = !!state.chosen.trendy;
  let verdict;
  let verdictColor;
  if (keyHits === 0) {
    verdict = 'Пока это не постановка задачи. Без цели, объектов конфигурации и критериев приёмки ИИ придумает всё сам.';
    verdictColor = 'var(--dim)';
  } else if (keyHits < 6) {
    verdict = 'Покрыто ' + keyHits + ' из 6 обязательных требований. Чего-то не хватает — ИИ заполнит пробелы по своему усмотрению.';
    verdictColor = 'var(--accent-text)';
  } else if (hasFluff) {
    verdict = 'Требования собраны полностью, но «сделать по-современному» ничего не задаёт и проверить это нельзя — такую формулировку лучше убрать.';
    verdictColor = 'var(--accent-text)';
  } else {
    verdict = 'Это уже техзадание: каждое требование можно проверить при приёмке. Задание зачтено.';
    verdictColor = 'var(--ok)';
  }

  return {
    theme: state.theme,
    themeLabel: state.theme === 'dark' ? 'Тёмная' : 'Светлая',
    themeDotShadow: state.theme === 'dark' ? '-4px 0 0 0 var(--panel)' : '0 0 0 0 transparent',
    toggleTheme: () => setState((prev) => ({ theme: prev.theme === 'dark' ? 'light' : 'dark' })),

    typed: state.typed,
    toast: state.toast,

    isMap: state.tab === 'map',
    isL1: state.tab === 'l1',
    isL2: state.tab === 'l2',
    isL3: state.tab === 'l3',
    go: {
      map: () => setState({ tab: 'map' }),
      l1: () => setState({ tab: 'l1' }),
      l2: () => setState({ tab: 'l2' }),
      l3: () => setState({ tab: 'l3' }),
    },

    doneCount,
    pct: Math.round((doneCount / 6) * 100) + '%',

    tiles: TILE_META.map((t) => ({
      code: t.code,
      title: t.title,
      desc: t.desc,
      stamp: state.done[t.id] ? 'выполнено ✓' : 'не пройдено',
      stampColor: state.done[t.id] ? 'var(--ok)' : 'var(--dim)',
      go: () => setState({ tab: t.tab }),
    })),

    cards: CARDS.map((c, i) => ({
      tag: c.tag,
      title: c.title,
      body: c.body,
      trap: c.trap,
      accent: c.accent || 'var(--cyan)',
      open: state.openCard === i,
      closed: state.openCard !== i,
      toggle: () => setState((prev) => ({ openCard: prev.openCard === i ? null : i })),
    })),

    questions: QUESTIONS.map((q, qi) => {
      const picked = state.picks[qi];
      return {
        num: qi + 1,
        text: q.text,
        explain: q.explain,
        answered: picked !== undefined,
        options: q.options.map((text, oi) => {
          const isPicked = picked === oi;
          const isRight = oi === q.correct;
          let bg = 'var(--panel-2)';
          let border = 'var(--line-2)';
          let mark2 = '';
          let markColor = 'var(--dim)';
          if (picked !== undefined && isRight) {
            border = 'var(--ok)';
            mark2 = '✓';
            markColor = 'var(--ok)';
          }
          if (isPicked && !isRight) {
            border = 'var(--bad)';
            mark2 = '✕';
            markColor = 'var(--bad)';
          }
          if (isPicked) bg = 'var(--panel-3)';
          return {
            text,
            bg,
            border,
            mark: mark2,
            markColor,
            pick: () => setState((prev) => ({ picks: { ...prev.picks, [qi]: oi } })),
          };
        }),
      };
    }),
    quizScore,

    ring,
    anim,
    hit: Object.fromEntries([...BUG_IDS, 'clean1', 'clean2'].map((id) => [id, () => hitZone(id)])),
    foundCount,
    msg: state.msg,
    msgBorder: state.msgOk ? 'var(--ok)' : 'var(--accent)',
    bugList: BUGS.map((b) => ({
      title: state.found[b.id] ? b.title : 'Ошибка не найдена',
      why: b.why,
      found: !!state.found[b.id],
      mark: state.found[b.id] ? '✓' : '·',
      markColor: state.found[b.id] ? 'var(--ok)' : 'var(--dim)',
      titleColor: state.found[b.id] ? 'var(--ink)' : 'var(--dim)',
      border: state.found[b.id] ? 'var(--ok-line)' : 'var(--line)',
    })),
    resetBugs: () => setState({ found: {}, msg: '' }),
    hintOn: state.hintOn,
    hintLabel: state.hintOn ? 'Скрыть подсказку' : 'Показать подсказку',
    toggleHint: () => setState((prev) => ({ hintOn: !prev.hintOn })),

    roiFields: ROI_FIELDS.map((f) => ({
      label: f.label,
      value: state.roi[f.id],
      set: (v) => setState((prev) => ({ roi: { ...prev.roi, [f.id]: v === '' ? '' : Number(v) } })),
    })),
    savedHours: fmt(savedHours(state.roi)),
    savedMoney: fmt(savedMoney(state.roi)),
    paybackText: pb === null ? '—' : pb.toFixed(1) + ' мес',
    paybackPct: pb === null ? '100%' : Math.min(100, (pb / 24) * 100).toFixed(1) + '%',
    paybackColor,
    paybackVerdict,
    resetRoi: () => setState({ roi: { ...DEFAULT_ROI } }),

    code: state.code,
    setCode: (v) => setState({ code: v }),
    checkCode,
    resetCode: () => setState({ code: BROKEN_CODE, codeResults: [] }),
    codeResults: state.codeResults.map((x) => ({ label: x.label, mark: x.ok ? '✓' : '✕', color: x.ok ? 'var(--ok)' : 'var(--bad)' })),

    before: BEFORE_STEPS,
    after: AFTER_STEPS,
    diffs: DIFFS,

    chips: CHIPS.map((c) => ({
      label: c.label,
      bg: state.chosen[c.id] ? 'var(--accent-soft)' : 'var(--panel-2)',
      border: state.chosen[c.id] ? 'var(--accent)' : 'var(--line-2)',
      color: state.chosen[c.id] ? 'var(--accent-text)' : 'var(--ink-2)',
      toggle: () => setState((prev) => ({ chosen: { ...prev.chosen, [c.id]: !prev.chosen[c.id] } })),
    })),
    chosenCount: chosenChips.length,
    promptText,
    verdict,
    verdictColor,

    checklist: CHECKLIST.map((text, i) => ({
      text,
      mark: state.checked[i] ? '✓' : '□',
      markColor: state.checked[i] ? 'var(--ok)' : 'var(--dim)',
      color: state.checked[i] ? 'var(--ink)' : 'var(--ink-3)',
      toggle: () => setState((prev) => ({ checked: { ...prev.checked, [i]: !prev.checked[i] } })),
    })),
    checklistCount,

    reflection: state.reflection,
    reflectionLen: state.reflection.length,
    setReflection: (v) => setState({ reflection: v }),

    fsBg1: state.fs === 1 ? 'var(--accent-soft)' : 'transparent',
    fsBg2: state.fs === 2 ? 'var(--accent-soft)' : 'transparent',
    fsBg3: state.fs === 3 ? 'var(--accent-soft)' : 'transparent',
    zoom: state.fs === 3 ? 1.3 : state.fs === 2 ? 1.15 : 1,
    fontS: () => setState({ fs: 1 }),
    fontM: () => setState({ fs: 2 }),
    fontL: () => setState({ fs: 3 }),
  };
}
