import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BROKEN_CODE,
  BUGS,
  CARDS,
  CHIPS,
  CLEAN,
  DIFFS,
  NIELSEN,
  PROMPTS,
  QUESTIONS,
  STORAGE_KEY,
  TILE_META,
  TITLES,
} from '../data/content';
import { contrastRatio } from '../lib/contrast';
import { runCodeChecks } from '../lib/codeCheck';

const INITIAL_STATE = {
  tab: 'map',
  done: {},
  openCard: null,
  picks: {},
  found: {},
  msg: '',
  msgOk: true,
  fg: '#7a8090',
  bg: '#1e2029',
  code: BROKEN_CODE,
  codeResults: [],
  slider: 50,
  chosen: {},
  nielsen: {},
  reflection: '',
  fs: 1,
  theme: 'dark',
  typed: '',
  toast: '',
};

const BUG_IDS = ['noLabel', 'tabOrder', 'lowContrast', 'tinyTarget', 'hierarchy'];

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
          nielsen: s.nielsen || {},
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
          nielsen: state.nielsen,
          chosen: state.chosen,
          fs: state.fs,
          theme: state.theme,
        }),
      );
    } catch {
      /* ignore unavailable storage */
    }
  }, [state.done, state.reflection, state.nielsen, state.chosen, state.fs, state.theme]);

  // Hero prompt type/erase loop.
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
        return { done: { ...prev.done, [id]: true }, toast: TITLES[id] || 'Кейс зачтён' };
      });
    },
    [setState],
  );

  const ratio = useMemo(() => contrastRatio(state.fg, state.bg), [state.fg, state.bg]);

  // Auto-grading: mirrors the source's audit() check run after every relevant change.
  useEffect(() => {
    if (ratio !== null && ratio >= 4.5) mark('contrast');
  }, [ratio, mark]);

  useEffect(() => {
    const okCount = Object.keys(state.nielsen).filter((k) => state.nielsen[k]).length;
    if (okCount >= 8) mark('nielsen');
  }, [state.nielsen, mark]);

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

  const setSlider = useCallback(
    (v) => {
      setState({ slider: v });
      if (v > 90 || v < 10) mark('beforeafter');
    },
    [setState, mark],
  );

  const doneCount = Object.keys(state.done).length;
  const foundCount = Object.keys(state.found).length;
  const quizScore = QUESTIONS.filter((q, i) => state.picks[i] === q.correct).length;
  const nielsenCount = Object.keys(state.nielsen).filter((k) => state.nielsen[k]).length;

  const ring = {};
  const anim = {};
  BUG_IDS.forEach((id) => {
    ring[id] = state.found[id] ? '2px solid #7fd98a' : '1px dashed #383c48';
    anim[id] = state.found[id] ? 'none' : 'lab-breathe 3.2s ease-in-out infinite';
  });
  ring.clean1 = '1px dashed var(--line-2)';
  ring.clean2 = '1px dashed var(--line-2)';

  const chosenChips = CHIPS.filter((c) => state.chosen[c.id]);
  const promptText = chosenChips.length
    ? 'Спроектируй форму записи к врачу.\n\n' + chosenChips.map((c) => '— ' + c.line).join('\n')
    : 'Выбери блоки требований слева — промпт соберётся здесь.';
  const keyHits = CHIPS.filter((c) => c.key && state.chosen[c.id]).length;
  const hasFluff = !!state.chosen.trendy;
  let verdict;
  let verdictColor;
  if (keyHits === 0) {
    verdict = 'Пока это не ТЗ. Без портрета пользователя и измеримых требований ИИ выдаст «просто красиво».';
    verdictColor = 'var(--dim)';
  } else if (keyHits < 6) {
    verdict = 'Покрыто ' + keyHits + ' из 6 обязательных требований. Не хватает измеримых критериев — ИИ заполнит пробелы по своему усмотрению.';
    verdictColor = 'var(--accent)';
  } else if (hasFluff) {
    verdict = 'Требования собраны полностью. «Современно и стильно» ничего не задаёт — такие формулировки лучше убрать: они не проверяемы.';
    verdictColor = 'var(--accent)';
  } else {
    verdict = 'Это уже техзадание: каждое требование можно проверить после генерации. Кейс зачтён.';
    verdictColor = 'var(--ok)';
  }

  return {
    theme: state.theme,
    themeLabel: state.theme === 'dark' ? 'Тёмная' : 'Светлая',
    themeDotShadow: state.theme === 'dark' ? '-4px 0 0 0 var(--panel)' : '0 0 0 0 transparent',
    toggleTheme: () => setState((prev) => ({ theme: prev.theme === 'dark' ? 'light' : 'dark' })),

    typed: state.typed,
    toast: state.toast,
    anim,

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
      stamp: state.done[t.id] ? 'в портфолио ✓' : 'не пройден',
      stampColor: state.done[t.id] ? 'var(--ok)' : 'var(--dim)',
      go: () => setState({ tab: t.tab }),
    })),

    cards: CARDS.map((c, i) => ({
      tag: c.tag,
      title: c.title,
      body: c.body,
      trap: c.trap,
      accent: c.accent,
      open: state.openCard === i,
      closed: state.openCard !== i,
      toggle: () => setState((prev) => ({ openCard: prev.openCard === i ? null : i })),
    })),

    questions: QUESTIONS.map((q, qi) => {
      const picked = state.picks[qi];
      return {
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
    hit: Object.fromEntries([...BUG_IDS, 'clean1', 'clean2'].map((id) => [id, () => hitZone(id)])),
    foundCount,
    msg: state.msg,
    msgBorder: state.msgOk ? 'var(--ok)' : 'var(--accent)',
    bugList: BUGS.map((b) => ({
      title: state.found[b.id] ? b.title : 'Проблема не найдена',
      why: b.why,
      found: !!state.found[b.id],
      mark: state.found[b.id] ? '✓' : '·',
      markColor: state.found[b.id] ? 'var(--ok)' : 'var(--dim)',
      titleColor: state.found[b.id] ? 'var(--ink)' : 'var(--dim)',
      border: state.found[b.id] ? 'var(--ok-line)' : 'var(--line)',
    })),
    resetBugs: () => setState({ found: {}, msg: '' }),

    fg: state.fg,
    bg: state.bg,
    setFg: (v) => setState({ fg: v }),
    setBg: (v) => setState({ bg: v }),
    ratioText: ratio === null ? '—' : ratio.toFixed(2) + ':1',
    ratioPct: ratio === null ? '0%' : Math.min(100, (ratio / 21) * 100).toFixed(1) + '%',
    ratioColor: ratio === null ? 'var(--dim)' : ratio >= 4.5 ? 'var(--ok)' : 'var(--bad)',
    aaLabel: ratio !== null && ratio >= 4.5 ? 'AA основной текст — пройден' : 'AA основной текст — не пройден',
    aaColor: ratio !== null && ratio >= 4.5 ? 'var(--ok)' : 'var(--bad)',
    aaaLabel: ratio !== null && ratio >= 7 ? 'AAA — пройден' : 'AAA (7:1) — не пройден',
    aaaColor: ratio !== null && ratio >= 7 ? 'var(--ok)' : 'var(--dim)',
    largeLabel: ratio !== null && ratio >= 3 ? 'AA крупный текст (3:1) — пройден' : 'AA крупный текст (3:1) — не пройден',
    largeColor: ratio !== null && ratio >= 3 ? 'var(--ok)' : 'var(--bad)',

    code: state.code,
    setCode: (v) => setState({ code: v }),
    checkCode,
    resetCode: () => setState({ code: BROKEN_CODE, codeResults: [] }),
    codeResults: state.codeResults.map((x) => ({ label: x.label, mark: x.ok ? '✓' : '✕', color: x.ok ? 'var(--ok)' : 'var(--bad)' })),

    slider: state.slider,
    setSlider,
    clip: 'inset(0 0 0 ' + state.slider + '%)',
    handleLeft: state.slider + '%',
    diffs: DIFFS,

    chips: CHIPS.map((c) => ({
      label: c.label,
      bg: state.chosen[c.id] ? 'var(--accent-soft)' : 'var(--panel-2)',
      border: state.chosen[c.id] ? 'var(--accent)' : 'var(--line-2)',
      color: state.chosen[c.id] ? 'var(--accent)' : 'var(--ink-2)',
      toggle: () => setState((prev) => ({ chosen: { ...prev.chosen, [c.id]: !prev.chosen[c.id] } })),
    })),
    chosenCount: chosenChips.length,
    promptText,
    verdict,
    verdictColor,

    nielsen: NIELSEN.map((text, i) => ({
      text,
      mark: state.nielsen[i] ? '✓' : '□',
      markColor: state.nielsen[i] ? 'var(--ok)' : 'var(--dim)',
      color: state.nielsen[i] ? 'var(--ink)' : 'var(--dim)',
      toggle: () => setState((prev) => ({ nielsen: { ...prev.nielsen, [i]: !prev.nielsen[i] } })),
    })),
    nielsenCount,

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
