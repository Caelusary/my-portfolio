'use strict';

/* =========================================================
   MACHINE PROBLEMS PAGE
   Browser versions of the three machine problem simulators. The rules
   and the scheduling logic follow the original Node.js programs:
   - fcfs:    MP 01, FCFS only
   - sched:   MP 02, FCFS or SJF, plus a side-by-side compare
   - bankers: MP 03, every order of the processes marked SAFE or UNSAFE
   ========================================================= */
(() => {
  const MIN_PROCESSES = 3;
  const MAX_PROCESSES = 10;
  // Banker's orders are listed in pages, since 10 processes have 3,628,800.
  const ORDER_PAGE = 100;

  // The sample inputs from the machine problem handouts.
  const SAMPLE_SCHED = [['P1', 2, 8], ['P2', 0, 4], ['P3', 3, 2], ['P4', 9, 5], ['P5', 6, 7]];
  const SAMPLE_BANKERS = { total: 10, rows: [['P1', 8, 1], ['P2', 5, 3], ['P3', 9, 3]] };

  const t = (key, vars = {}) => {
    let text = typeof getTranslation === 'function' ? getTranslation(key) : key;
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, value);
    return text;
  };

  // Builds an element. i18n keys go in data-i18n so the language toggle
  // re-translates them in place.
  function h(tag, { cls, i18n, text, attrs } = {}, children = []) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (i18n) {
      node.dataset.i18n = i18n;
      node.textContent = t(i18n);
    } else if (text !== undefined) {
      node.textContent = text;
    }
    if (attrs) for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
    for (const child of children) if (child) node.append(child);
    return node;
  }

  const fmt = (n) => String(Math.round(n * 100) / 100);

  /* ---------------- Scheduling (same as fcfs_sjf.js) ---------------- */

  function scheduleFCFS(processes) {
    let clock = 0;
    return [...processes]
      .sort((a, b) => a.arrival - b.arrival)
      .map((p) => {
        const start = Math.max(clock, p.arrival);
        clock = start + p.burst;
        return { ...p, start, completion: clock, turnaround: clock - p.arrival, waiting: start - p.arrival };
      });
  }

  // Among the processes that have arrived, run the shortest burst; ties go to
  // the earlier arrival. With nothing ready, the clock jumps to the next arrival.
  function scheduleSJF(processes) {
    const remaining = [...processes];
    const scheduled = [];
    let clock = 0;

    while (remaining.length > 0) {
      const ready = remaining.filter((p) => p.arrival <= clock);
      if (ready.length === 0) {
        clock = Math.min(...remaining.map((p) => p.arrival));
        continue;
      }
      ready.sort((a, b) => a.burst - b.burst || a.arrival - b.arrival);
      const next = ready[0];
      const start = clock;
      clock = start + next.burst;
      scheduled.push({ ...next, start, completion: clock, turnaround: clock - next.arrival, waiting: start - next.arrival });
      remaining.splice(remaining.indexOf(next), 1);
    }
    return scheduled;
  }

  const average = (rows, key) => rows.reduce((sum, r) => sum + r[key], 0) / rows.length;

  /* ---------------- Banker's (same as bankers.js) ---------------- */

  // An order is safe when every process, in turn, needs no more than what is
  // free at that point; finishing it frees what it was holding.
  function* orders(processes, available, only) {
    const used = new Array(processes.length).fill(false);
    const order = [];

    function* visit(free, safe) {
      if (only === 'safe' && !safe) return;
      if (order.length === processes.length) {
        if (only !== 'unsafe' || !safe) yield { order: [...order], safe };
        return;
      }
      for (let i = 0; i < processes.length; i++) {
        if (used[i]) continue;
        const p = processes[i];
        used[i] = true;
        order.push(p.id);
        yield* visit(free + p.hold, safe && p.need <= free);
        order.pop();
        used[i] = false;
      }
    }
    yield* visit(available, true);
  }

  // Counts safe orders without listing them: what is free depends only on
  // which processes have finished, so each subset is visited once (2^n, not n!).
  function countSafe(processes, available) {
    const n = processes.length;
    const ways = new Float64Array(1 << n);
    const held = new Float64Array(1 << n);
    ways[0] = 1;
    for (let mask = 0; mask < 1 << n; mask++) {
      if (mask) {
        const low = mask & -mask;
        held[mask] = held[mask ^ low] + processes[31 - Math.clz32(low)].hold;
      }
      if (!ways[mask]) continue;
      const free = available + held[mask];
      for (let i = 0; i < n; i++) {
        if (!(mask & (1 << i)) && processes[i].need <= free) ways[mask | (1 << i)] += ways[mask];
      }
    }
    return ways[(1 << n) - 1];
  }

  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  /* ---------------- Validation (same rules as the CLI) ---------------- */

  function wholeNumber(value, labelKey) {
    if (value === '') return t('mp.err.empty', { label: t(labelKey) });
    if (!/^\d+$/.test(value)) return t('mp.err.whole', { label: t(labelKey) });
    return null;
  }

  function checkIds(rows, errors) {
    const seen = new Set();
    rows.forEach((row) => {
      const id = row.inputs.id.value.trim();
      let error = null;
      if (id === '') error = t('mp.err.empty', { label: t('mp.col.id') });
      else if (/\s/.test(id)) error = t('mp.err.idSpace');
      else if (seen.has(id.toUpperCase())) error = t('mp.err.idDup', { v: id });
      seen.add(id.toUpperCase());
      if (error) errors.push([row.inputs.id, error]);
    });
  }

  /* ---------------- Process editor ---------------- */

  // columns: [{ key, labelKey, readOnly }]. Rows are kept between 3 and 10.
  function createEditor(columns, onChange) {
    const rows = [];
    const list = h('div', { cls: 'mp-rows' });
    const head = h('div', { cls: 'mp-rows-head', attrs: { 'aria-hidden': 'true' } }, [
      h('span', { text: '#' }),
      ...columns.map((c) => h('span', { i18n: c.labelKey })),
      h('span'),
    ]);
    head.style.setProperty('--cols', columns.length);
    const addBtn = h('button', { cls: 'mp-add-row', attrs: { type: 'button' } }, [
      h('i', { cls: 'fa-solid fa-plus', attrs: { 'aria-hidden': 'true' } }),
      h('span', { i18n: 'mp.add' }),
    ]);

    function refresh() {
      rows.forEach((row, i) => {
        row.num.textContent = String(i + 1);
        row.remove.disabled = rows.length <= MIN_PROCESSES;
        for (const c of columns) row.inputs[c.key].setAttribute('aria-label', `${t(c.labelKey)}, ${t('mp.process')} ${i + 1}`);
        row.remove.setAttribute('aria-label', `${t('mp.remove')} ${t('mp.process')} ${i + 1}`);
      });
      addBtn.disabled = rows.length >= MAX_PROCESSES;
    }

    function addRow(values = []) {
      const row = { inputs: {} };
      row.num = h('span', { cls: 'mp-row-num' });
      row.el = h('div', { cls: 'mp-row-edit' });
      row.el.style.setProperty('--cols', columns.length);
      row.el.append(row.num);
      columns.forEach((c, i) => {
        const input = h('input', {
          cls: 'mp-input',
          attrs: c.key === 'id'
            ? { type: 'text', autocomplete: 'off', spellcheck: 'false', maxlength: '8' }
            : { type: 'text', inputmode: 'numeric', autocomplete: 'off', maxlength: '6' },
        });
        if (c.readOnly) {
          input.readOnly = true;
          input.tabIndex = -1;
          input.classList.add('mp-input--computed');
        }
        input.value = values[i] ?? '';
        input.addEventListener('input', () => {
          input.removeAttribute('aria-invalid');
          onChange();
        });
        row.inputs[c.key] = input;
        row.el.append(input);
      });
      row.remove = h('button', { cls: 'mp-icon-btn', attrs: { type: 'button' } }, [
        h('i', { cls: 'fa-solid fa-xmark', attrs: { 'aria-hidden': 'true' } }),
      ]);
      row.remove.addEventListener('click', () => {
        rows.splice(rows.indexOf(row), 1);
        row.el.remove();
        refresh();
        onChange();
      });
      row.el.append(row.remove);
      rows.push(row);
      list.append(row.el);
      refresh();
      return row;
    }

    addBtn.addEventListener('click', () => {
      const row = addRow([`P${rows.length + 1}`]);
      row.inputs[columns[1].key].focus();
      onChange();
    });

    function load(data) {
      rows.splice(0).forEach((row) => row.el.remove());
      data.forEach((values) => addRow(values));
      onChange();
    }

    return { el: h('div', { cls: 'mp-editor' }, [head, list, addBtn]), rows, load, refresh };
  }

  /* ---------------- Shared output pieces ---------------- */

  function stat(labelKey, value, extra) {
    return h('div', { cls: 'mp-stat' }, [
      h('span', { cls: 'mp-stat-label', i18n: labelKey }),
      h('span', { cls: 'mp-stat-value', text: value }),
      extra,
    ]);
  }

  function table(headKeys, bodyRows) {
    return h('div', { cls: 'mp-table-wrap' }, [
      h('table', { cls: 'mp-table' }, [
        h('thead', {}, [h('tr', {}, headKeys.map((k) => h('th', { i18n: k, attrs: { scope: 'col' } })))]),
        h('tbody', {}, bodyRows.map((cells) => h('tr', {}, cells.map((c, i) => h(i === 0 ? 'th' : 'td', { text: String(c), attrs: i === 0 ? { scope: 'row' } : undefined }))))),
      ]),
    ]);
  }

  // Each process keeps one colour across the chart and both compare charts.
  // Yellows and greens are skipped: white labels don't read on them.
  const HUES = [248, 300, 195, 340, 18, 275, 215, 325, 180, 355];
  const hueFor = (ids) => new Map(ids.map((id, i) => [id, HUES[i % HUES.length]]));

  function gantt(scheduled, hues) {
    const bars = h('div', { cls: 'mp-gantt-bars' });
    const ticks = h('div', { cls: 'mp-gantt-ticks', attrs: { 'aria-hidden': 'true' } });
    const end = scheduled[scheduled.length - 1].completion;
    const segments = [];
    let clock = 0;
    for (const p of scheduled) {
      if (p.start > clock) segments.push({ idle: true, from: clock, to: p.start });
      segments.push({ p, from: p.start, to: p.completion });
      clock = p.completion;
    }

    const addTick = (time) => {
      const tick = h('span', { text: String(time) });
      tick.style.left = `${(time / end) * 100}%`;
      ticks.append(tick);
    };
    addTick(0);
    segments.forEach((s, i) => {
      const seg = h('span', {
        cls: s.idle ? 'mp-seg mp-seg--idle' : 'mp-seg',
        text: s.idle ? '' : s.p.id,
        attrs: { title: s.idle ? `${t('mp.idle')} ${s.from}-${s.to}` : `${s.p.id}: ${s.from}-${s.to}` },
      });
      seg.style.flexGrow = String(s.to - s.from);
      seg.style.setProperty('--i', i);
      if (!s.idle) seg.style.setProperty('--seg-h', hues.get(s.p.id));
      bars.append(seg);
      addTick(s.to);
    });

    // Wide enough that the shortest bar still fits its label; scrolls inside
    // its own box on phones instead of squeezing.
    const chart = h('div', { cls: 'mp-gantt' }, [bars, ticks]);
    const shortest = Math.min(...segments.map((s) => s.to - s.from));
    chart.style.minWidth = `${Math.ceil((end / shortest) * 34)}px`;
    const label = scheduled.map((p) => `${p.id} ${p.start}-${p.completion}`).join(', ');
    return h('div', { cls: 'mp-gantt-wrap', attrs: { role: 'img', 'aria-label': `${t('mp.gantt')}: ${label}` } }, [chart]);
  }

  // Plays the chart once it is on screen (and again on every run after).
  const playObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-played');
        playObserver.unobserve(e.target);
      });
    }, { threshold: 0.3 })
    : null;

  function play(output) {
    output.querySelectorAll('.mp-gantt').forEach((chart) => {
      if (playObserver) playObserver.observe(chart);
      else chart.classList.add('is-played');
    });
  }

  function showErrors(box, errors) {
    box.replaceChildren();
    if (!errors.length) {
      box.hidden = true;
      return;
    }
    errors.forEach(([input]) => input.setAttribute('aria-invalid', 'true'));
    box.append(h('p', { cls: 'mp-errors-title', i18n: 'mp.err.title' }));
    box.append(h('ul', {}, errors.map(([, message]) => h('li', { text: message }))));
    box.hidden = false;
    errors[0][0].focus();
  }

  // One card, two panes: inputs (with Run in their header) beside results
  // (with any view switch in theirs). Both headers share a baseline and both
  // panes share the card's height, so the columns always line up.
  //   top:         extra inputs above the process rows (Banker's totals)
  //   resultsHead: a control for the results header (MP 02's algorithm switch)
  function shell(sim, editor, { top = null, resultsHead = null }, run) {
    const runBtn = h('button', { cls: 'mp-btn mp-btn--run', attrs: { type: 'button' } }, [
      h('i', { cls: 'fa-solid fa-play', attrs: { 'aria-hidden': 'true' } }),
      h('span', { i18n: 'mp.run' }),
    ]);
    const sampleBtn = h('button', { cls: 'mp-icon-btn mp-icon-btn--head', attrs: { type: 'button', 'aria-label': t('mp.sample'), title: t('mp.sample') } }, [
      h('i', { cls: 'fa-solid fa-rotate-left', attrs: { 'aria-hidden': 'true' } }),
    ]);
    sampleBtn.dataset.i18nAriaLabel = 'mp.sample';
    sampleBtn.dataset.i18nTitle = 'mp.sample';
    // The rules live in the page's markup (readable without JS); here they
    // move next to the inputs they govern.
    const rules = sim.closest('.mp-row')?.querySelector('.mp-rules-block') || null;
    const errors = h('div', { cls: 'mp-errors', attrs: { role: 'alert' } });
    errors.hidden = true;
    const output = h('div', { cls: 'mp-output', attrs: { 'aria-live': 'polite' } });

    runBtn.addEventListener('click', () => run(true));
    sim.append(
      h('section', { cls: 'mp-pane mp-pane--input' }, [
        h('div', { cls: 'mp-pane-head' }, [
          h('h3', { cls: 'mp-pane-title', i18n: 'mp.inputs' }),
          h('div', { cls: 'mp-head-actions' }, [sampleBtn, runBtn]),
        ]),
        h('div', { cls: 'mp-pane-body' }, [top, editor.el, errors, rules]),
      ]),
      h('section', { cls: 'mp-pane mp-pane--output' }, [
        h('div', { cls: 'mp-pane-head' }, [h('h3', { cls: 'mp-pane-title', i18n: 'mp.results' }), resultsHead]),
        h('div', { cls: 'mp-pane-body' }, [output]),
      ]),
    );
    return { output, errors, sampleBtn };
  }

  /* ---------------- MP 01 / MP 02: scheduling ---------------- */

  function initScheduling(sim, withChoice) {
    let mode = 'fcfs';
    let last = null;
    const editor = createEditor([
      { key: 'id', labelKey: 'mp.col.id' },
      { key: 'arrival', labelKey: 'mp.col.arrival' },
      { key: 'burst', labelKey: 'mp.col.burst' },
    ], () => {});

    let choice = null;
    if (withChoice) {
      choice = h('div', { cls: 'mp-segmented', attrs: { role: 'group', 'aria-label': t('mp.algo.label') } });
      choice.dataset.i18nAriaLabel = 'mp.algo.label';
      for (const value of ['fcfs', 'sjf', 'compare']) {
        const btn = h('button', { cls: 'mp-seg-btn', i18n: `mp.algo.${value}`, attrs: { type: 'button', 'aria-pressed': String(value === mode) } });
        btn.addEventListener('click', () => {
          mode = value;
          choice.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          if (last) run(true);
        });
        choice.append(btn);
      }
    }

    const { output, errors, sampleBtn } = shell(sim, editor, { resultsHead: choice }, (fresh) => run(fresh));
    sampleBtn.addEventListener('click', () => {
      editor.load(SAMPLE_SCHED);
      run(true);
    });

    function read() {
      const errs = [];
      checkIds(editor.rows, errs);
      const arrivals = new Set();
      editor.rows.forEach((row) => {
        const a = row.inputs.arrival.value.trim();
        const aErr = wholeNumber(a, 'mp.col.arrival') || (arrivals.has(Number(a)) ? t('mp.err.arrDup', { v: a }) : null);
        if (aErr) errs.push([row.inputs.arrival, aErr]);
        arrivals.add(Number(a));
        const b = row.inputs.burst.value.trim();
        const bErr = wholeNumber(b, 'mp.col.burst') || (Number(b) < 1 ? t('mp.err.burstMin') : null);
        if (bErr) errs.push([row.inputs.burst, bErr]);
      });
      if (errs.length) return { errs };
      return {
        processes: editor.rows.map((row) => ({
          id: row.inputs.id.value.trim(),
          arrival: Number(row.inputs.arrival.value),
          burst: Number(row.inputs.burst.value),
        })),
      };
    }

    function result(titleKey, scheduled, hues, better) {
      const wait = average(scheduled, 'waiting');
      const tat = average(scheduled, 'turnaround');
      const badge = (key) => (better && better[key] ? h('span', { cls: 'mp-better', i18n: 'mp.lower' }) : null);
      return h('div', { cls: 'mp-result' }, [
        titleKey ? h('h3', { cls: 'mp-result-title', i18n: titleKey }) : null,
        h('div', { cls: 'mp-stats' }, [
          stat('mp.avgWaiting', fmt(wait), badge('waiting')),
          stat('mp.avgTurnaround', fmt(tat), badge('turnaround')),
        ]),
        h('p', { cls: 'mp-out-label', i18n: 'mp.gantt' }),
        gantt(scheduled, hues),
        table(
          ['mp.col.id', 'mp.col.arrival', 'mp.col.burst', 'mp.col.start', 'mp.col.completion', 'mp.col.turnaround', 'mp.col.waiting'],
          scheduled.map((p) => [p.id, p.arrival, p.burst, p.start, p.completion, p.turnaround, p.waiting]),
        ),
      ]);
    }

    function run(fresh) {
      if (fresh) {
        const { errs, processes } = read();
        showErrors(errors, errs || []);
        if (errs) return;
        last = processes;
      }
      const hues = hueFor(last.map((p) => p.id));
      output.replaceChildren();
      if (mode === 'compare') {
        const a = scheduleFCFS(last);
        const b = scheduleSJF(last);
        const lower = (key) => {
          const x = average(a, key);
          const y = average(b, key);
          return x === y ? [false, false] : [x < y, y < x];
        };
        const [aw, bw] = lower('waiting');
        const [at, bt] = lower('turnaround');
        output.append(h('div', { cls: 'mp-compare' }, [
          result('mp.algo.fcfs', a, hues, { waiting: aw, turnaround: at }),
          result('mp.algo.sjf', b, hues, { waiting: bw, turnaround: bt }),
        ]));
      } else {
        output.append(result(null, mode === 'sjf' ? scheduleSJF(last) : scheduleFCFS(last), hues));
      }
      play(output);
    }

    editor.load(SAMPLE_SCHED);
    run(true);
    return () => last && run(false);
  }

  /* ---------------- MP 03: Banker's ---------------- */

  function initBankers(sim) {
    let last = null;
    let filter = 'all';

    const totalInput = h('input', { cls: 'mp-input', attrs: { type: 'text', inputmode: 'numeric', autocomplete: 'off', maxlength: '6', id: 'mpTotal' } });
    const availableOut = h('output', { cls: 'mp-available-value', attrs: { for: 'mpTotal' } });

    // Need = maximum - holding, filled in as you type.
    const updateDerived = () => {
      let held = 0;
      editor.rows.forEach((row) => {
        const max = row.inputs.max.value.trim();
        const hold = row.inputs.hold.value.trim();
        const ok = /^\d+$/.test(max) && /^\d+$/.test(hold);
        row.inputs.need.value = ok ? String(Number(max) - Number(hold)) : '';
        if (/^\d+$/.test(hold)) held += Number(hold);
      });
      const total = totalInput.value.trim();
      availableOut.textContent = /^\d+$/.test(total) ? String(Number(total) - held) : '–';
    };

    const editor = createEditor([
      { key: 'id', labelKey: 'mp.col.id' },
      { key: 'max', labelKey: 'mp.col.max' },
      { key: 'hold', labelKey: 'mp.col.hold' },
      { key: 'need', labelKey: 'mp.col.need', readOnly: true },
    ], () => updateDerived());

    totalInput.addEventListener('input', () => {
      totalInput.removeAttribute('aria-invalid');
      updateDerived();
    });

    const top = h('div', { cls: 'mp-bankers-top' }, [
      h('label', { cls: 'mp-field', attrs: { for: 'mpTotal' } }, [h('span', { i18n: 'mp.total' }), totalInput]),
      h('div', { cls: 'mp-field mp-field--readout' }, [h('span', { i18n: 'mp.available' }), availableOut]),
    ]);

    const { output, errors, sampleBtn } = shell(sim, editor, { top }, (fresh) => run(fresh));
    const loadSample = () => {
      totalInput.value = String(SAMPLE_BANKERS.total);
      editor.load(SAMPLE_BANKERS.rows);
    };
    sampleBtn.addEventListener('click', () => {
      loadSample();
      filter = 'all';
      run(true);
    });

    function read() {
      const errs = [];
      const totalText = totalInput.value.trim();
      const totalErr = wholeNumber(totalText, 'mp.total') || (Number(totalText) < 1 ? t('mp.err.totalMin') : null);
      if (totalErr) errs.push([totalInput, totalErr]);
      const total = Number(totalText);
      checkIds(editor.rows, errs);
      let unallocated = total;
      editor.rows.forEach((row) => {
        const max = row.inputs.max.value.trim();
        let maxErr = wholeNumber(max, 'mp.col.max');
        if (!maxErr && Number(max) < 1) maxErr = t('mp.err.maxMin');
        if (!maxErr && !totalErr && Number(max) > total) maxErr = t('mp.err.maxTotal', { v: total });
        if (maxErr) errs.push([row.inputs.max, maxErr]);

        const hold = row.inputs.hold.value.trim();
        let holdErr = wholeNumber(hold, 'mp.col.hold');
        if (!holdErr && !maxErr && Number(hold) > Number(max)) holdErr = t('mp.err.holdMax', { v: max });
        if (!holdErr && !totalErr && Number(hold) > unallocated) holdErr = t('mp.err.holdLeft', { v: Math.max(unallocated, 0) });
        if (holdErr) errs.push([row.inputs.hold, holdErr]);
        else unallocated -= Number(hold);
      });
      if (errs.length) return { errs };
      const processes = editor.rows.map((row) => {
        const max = Number(row.inputs.max.value);
        const hold = Number(row.inputs.hold.value);
        return { id: row.inputs.id.value.trim(), max, hold, need: max - hold };
      });
      return { processes, available: total - processes.reduce((s, p) => s + p.hold, 0) };
    }

    function orderList(state) {
      const list = h('ol', { cls: 'mp-orders' });
      const more = h('button', { cls: 'mp-btn mp-btn--ghost mp-more', attrs: { type: 'button' } });
      const count = h('p', { cls: 'mp-orders-count' });
      const totalFor = filter === 'safe' ? state.safe : filter === 'unsafe' ? state.total - state.safe : state.total;
      if (totalFor === 0) {
        return h('p', { cls: 'mp-orders-count', i18n: filter === 'safe' ? 'mp.noneSafe' : 'mp.noneUnsafe' });
      }
      const source = orders(state.processes, state.available, filter);
      let shown = 0;

      const pull = () => {
        const frag = document.createDocumentFragment();
        for (let i = 0; i < ORDER_PAGE; i++) {
          const next = source.next();
          if (next.done) break;
          shown++;
          const { order, safe } = next.value;
          frag.append(h('li', { cls: safe ? 'is-safe' : '' }, [
            h('span', { cls: 'mp-order' }, order.map((id) => h('span', { text: id }))),
            h('span', { cls: safe ? 'mp-pill mp-pill--safe' : 'mp-pill mp-pill--unsafe', i18n: safe ? 'mp.state.safe' : 'mp.state.unsafe' }),
          ]));
        }
        list.append(frag);
        count.textContent = t('mp.showing', { n: shown.toLocaleString(), total: totalFor.toLocaleString() });
        more.hidden = shown >= totalFor;
        more.textContent = t('mp.showMore', { n: Math.min(ORDER_PAGE, totalFor - shown).toLocaleString() });
      };
      more.addEventListener('click', pull);
      pull();
      return h('div', {}, [list, h('div', { cls: 'mp-orders-foot' }, [count, more])]);
    }

    function run(fresh) {
      if (fresh) {
        const { errs, processes, available } = read();
        showErrors(errors, errs || []);
        if (errs) return;
        last = { processes, available, total: factorial(processes.length), safe: countSafe(processes, available) };
      }
      const state = last;
      const isSafe = state.safe > 0;
      const chips = h('div', { cls: 'mp-filter', attrs: { role: 'group' } });
      chips.dataset.i18nAriaLabel = 'mp.filter.label';
      chips.setAttribute('aria-label', t('mp.filter.label'));
      const counts = { all: state.total, safe: state.safe, unsafe: state.total - state.safe };
      for (const value of ['all', 'safe', 'unsafe']) {
        const chip = h('button', { cls: 'filter-chip', attrs: { type: 'button', 'aria-pressed': String(value === filter) } }, [
          h('span', { i18n: `mp.filter.${value}` }),
          h('span', { cls: 'filter-count', text: counts[value].toLocaleString() }),
        ]);
        chip.addEventListener('click', () => {
          filter = value;
          run(false);
        });
        chips.append(chip);
      }

      output.replaceChildren(h('div', { cls: 'mp-result' }, [
        // Available is already live in the inputs panel, so the result leads
        // with the count and the verdict side by side.
        h('div', { cls: 'mp-stats' }, [
          stat('mp.safeCount', t('mp.ofTotal', { n: state.safe.toLocaleString(), total: state.total.toLocaleString() })),
          h('p', { cls: isSafe ? 'mp-verdict is-safe' : 'mp-verdict is-unsafe', i18n: isSafe ? 'mp.verdict.safe' : 'mp.verdict.unsafe' }),
        ]),
        h('p', { cls: 'mp-out-label', i18n: 'mp.orders' }),
        chips,
        orderList(state),
      ]));
    }

    loadSample();
    run(true);
    return () => last && run(false);
  }

  /* ---------------- Boot ---------------- */

  // Runs after script.js's own DOMContentLoaded setup, so the saved language
  // is already applied when the first results are drawn.
  function boot() {
    const rerenders = [];
    document.querySelectorAll('[data-mp]').forEach((sim) => {
      const kind = sim.dataset.mp;
      if (kind === 'fcfs') rerenders.push(initScheduling(sim, false));
      if (kind === 'sched') rerenders.push(initScheduling(sim, true));
      if (kind === 'bankers') rerenders.push(initBankers(sim));
    });

    // Results hold formatted text (counts, messages), so redraw them in the new
    // language; plain labels are handled by the page's own data-i18n pass.
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setTimeout(() => rerenders.forEach((redraw) => redraw())));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
