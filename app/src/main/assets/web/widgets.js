/* Game Theory Steps — interactive widgets: payoff matrices, charts, simulators.
   Charts are plain SVG so the app works offline with no libraries. */
var W = (function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  // ---------- small helpers ----------
  function h(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function s(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function fmt(x, d) {
    if (!isFinite(x)) return "–";
    d = d == null ? 2 : d;
    var r = Number(x.toFixed(d));
    return String(r);
  }
  function frac(x) {
    // show simple fractions where exact
    for (var den = 1; den <= 12; den++) {
      var num = Math.round(x * den);
      if (Math.abs(num / den - x) < 1e-9) return den === 1 ? String(num) : num + "/" + den;
    }
    return fmt(x, 3);
  }
  function slider(label, min, max, step, val, onInput, unit) {
    var wrap = h("label", { class: "sl" });
    var top = h("div", { class: "sl-top" });
    var name = h("span", null, label);
    var out = h("b", null, fmt(val, 2) + (unit || ""));
    top.appendChild(name); top.appendChild(out);
    var inp = h("input", { type: "range", min: min, max: max, step: step, value: val });
    inp.addEventListener("input", function () {
      out.textContent = fmt(+inp.value, 2) + (unit || "");
      onInput(+inp.value);
    });
    wrap.appendChild(top); wrap.appendChild(inp);
    wrap.set = function (v) { inp.value = v; out.textContent = fmt(v, 2) + (unit || ""); };
    return wrap;
  }
  function numInput(val, onChange) {
    var i = h("input", { type: "number", step: "any", value: val, class: "num", inputmode: "decimal" });
    i.addEventListener("input", function () { var v = parseFloat(i.value); if (isFinite(v)) onChange(v); });
    return i;
  }
  var PAL = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)", "var(--c6)", "var(--c7)"];

  // ---------- line chart ----------
  function niceTicks(min, max, n) {
    var span = max - min || 1, step = Math.pow(10, Math.floor(Math.log10(span / n)));
    var err = span / n / step;
    if (err >= 7.5) step *= 10; else if (err >= 3.5) step *= 5; else if (err >= 1.5) step *= 2;
    var t = [], v = Math.ceil(min / step) * step;
    for (; v <= max + step * 1e-6; v += step) t.push(Number(v.toFixed(10)));
    return t;
  }
  /* opts: {xMin,xMax,yMin,yMax,xLabel,yLabel,series:[{name,color,pts,dash,width}],
            dots:[{x,y,color,label}], vlines:[{x,label,color}], hlines:[{y,label,color}], area:{pts,color}} */
  function lineChart(opts) {
    var Wd = 360, Ht = 230, L = 44, Rm = 12, T = 12, B = 40;
    var svg = s("svg", { viewBox: "0 0 " + Wd + " " + Ht, class: "chart", role: "img" });
    var x0 = opts.xMin, x1 = opts.xMax, y0 = opts.yMin, y1 = opts.yMax;
    if (y0 === undefined || y1 === undefined) {
      var ys = [];
      opts.series.forEach(function (se) { se.pts.forEach(function (p) { if (isFinite(p[1])) ys.push(p[1]); }); });
      (opts.dots || []).forEach(function (d) { ys.push(d.y); });
      y0 = y0 !== undefined ? y0 : Math.min.apply(null, ys);
      y1 = y1 !== undefined ? y1 : Math.max.apply(null, ys);
      var pad = (y1 - y0) * 0.08 || 1; if (opts.yMin === undefined) y0 -= pad; if (opts.yMax === undefined) y1 += pad;
    }
    function X(x) { return L + (x - x0) / (x1 - x0) * (Wd - L - Rm); }
    function Y(y) { return T + (1 - (y - y0) / (y1 - y0)) * (Ht - T - B); }
    var g = s("g", {});
    niceTicks(y0, y1, 5).forEach(function (t) {
      g.appendChild(s("line", { x1: L, x2: Wd - Rm, y1: Y(t), y2: Y(t), class: "grid" }));
      g.appendChild(s("text", { x: L - 5, y: Y(t) + 3, class: "tick", "text-anchor": "end" }, fmt(t, 2)));
    });
    niceTicks(x0, x1, 6).forEach(function (t) {
      g.appendChild(s("line", { x1: X(t), x2: X(t), y1: T, y2: Ht - B, class: "grid" }));
      g.appendChild(s("text", { x: X(t), y: Ht - B + 13, class: "tick", "text-anchor": "middle" }, fmt(t, 2)));
    });
    g.appendChild(s("line", { x1: L, x2: Wd - Rm, y1: Ht - B, y2: Ht - B, class: "axis" }));
    g.appendChild(s("line", { x1: L, x2: L, y1: T, y2: Ht - B, class: "axis" }));
    if (opts.xLabel) g.appendChild(s("text", { x: (L + Wd - Rm) / 2, y: Ht - 6, class: "alabel", "text-anchor": "middle" }, opts.xLabel));
    if (opts.yLabel) g.appendChild(s("text", { x: 11, y: (T + Ht - B) / 2, class: "alabel", "text-anchor": "middle", transform: "rotate(-90 11 " + ((T + Ht - B) / 2) + ")" }, opts.yLabel));
    svg.appendChild(g);
    var clipId = "c" + Math.random().toString(36).slice(2);
    var defs = s("defs", {}); var cp = s("clipPath", { id: clipId });
    cp.appendChild(s("rect", { x: L, y: T, width: Wd - L - Rm, height: Ht - T - B })); defs.appendChild(cp); svg.appendChild(defs);
    var plot = s("g", { "clip-path": "url(#" + clipId + ")" });
    if (opts.area) {
      var d = opts.area.pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); }).join("");
      d += "L" + X(opts.area.pts[opts.area.pts.length - 1][0]) + "," + Y(y0) + "L" + X(opts.area.pts[0][0]) + "," + Y(y0) + "Z";
      plot.appendChild(s("path", { d: d, fill: opts.area.color, opacity: 0.15 }));
    }
    (opts.vlines || []).forEach(function (v) {
      plot.appendChild(s("line", { x1: X(v.x), x2: X(v.x), y1: T, y2: Ht - B, stroke: v.color || "var(--muted)", "stroke-dasharray": "4 3", "stroke-width": 1.5 }));
    });
    (opts.hlines || []).forEach(function (v) {
      plot.appendChild(s("line", { x1: L, x2: Wd - Rm, y1: Y(v.y), y2: Y(v.y), stroke: v.color || "var(--muted)", "stroke-dasharray": "4 3", "stroke-width": 1.5 }));
    });
    opts.series.forEach(function (se, i) {
      var d = "", pen = false;
      se.pts.forEach(function (p) {
        if (!isFinite(p[1])) { pen = false; return; }
        d += (pen ? "L" : "M") + X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1); pen = true;
      });
      plot.appendChild(s("path", { d: d, fill: "none", stroke: se.color || PAL[i], "stroke-width": se.width || 2.5, "stroke-dasharray": se.dash || "", "stroke-linejoin": "round" }));
    });
    (opts.dots || []).forEach(function (dt) {
      plot.appendChild(s("circle", { cx: X(dt.x), cy: Y(dt.y), r: 5, fill: dt.color || "var(--accent)", stroke: "var(--card)", "stroke-width": 2 }));
    });
    svg.appendChild(plot);
    (opts.vlines || []).forEach(function (v) { if (v.label) svg.appendChild(s("text", { x: X(v.x) + 4, y: T + 11, class: "vlabel" }, v.label)); });
    (opts.dots || []).forEach(function (dt) { if (dt.label) svg.appendChild(s("text", { x: X(dt.x) + 8, y: Y(dt.y) - 7, class: "vlabel" }, dt.label)); });
    var wrap = h("div", { class: "chartwrap" });
    wrap.appendChild(svg);
    var named = opts.series.filter(function (se) { return se.name; });
    if (named.length) {
      var lg = h("div", { class: "legend" });
      named.forEach(function (se) {
        var i = opts.series.indexOf(se);
        lg.appendChild(h("span", null, '<i style="background:' + (se.color || PAL[i]) + '"></i>' + se.name));
      });
      wrap.appendChild(lg);
    }
    return wrap;
  }

  // ---------- bar chart ----------
  /* opts: {cats:[], series:[{name,color,values}], yLabel, yMax, horizontal, fmt} */
  function barChart(opts) {
    var n = opts.cats.length, m = opts.series.length;
    var Wd = 360, Ht = opts.height || 230, L = 44, Rm = 10, T = 14, B = 46;
    var svg = s("svg", { viewBox: "0 0 " + Wd + " " + Ht, class: "chart" });
    var all = []; opts.series.forEach(function (se) { all = all.concat(se.values); });
    var y0 = Math.min(0, Math.min.apply(null, all)), y1 = opts.yMax || Math.max.apply(null, all) * 1.12 || 1;
    function Y(y) { return T + (1 - (y - y0) / (y1 - y0)) * (Ht - T - B); }
    niceTicks(y0, y1, 5).forEach(function (t) {
      svg.appendChild(s("line", { x1: L, x2: Wd - Rm, y1: Y(t), y2: Y(t), class: "grid" }));
      svg.appendChild(s("text", { x: L - 5, y: Y(t) + 3, class: "tick", "text-anchor": "end" }, fmt(t, 2)));
    });
    svg.appendChild(s("line", { x1: L, x2: Wd - Rm, y1: Y(0), y2: Y(0), class: "axis" }));
    var gw = (Wd - L - Rm) / n, bw = Math.min(34, gw * 0.8 / m);
    opts.cats.forEach(function (c, i) {
      var gx = L + gw * i + (gw - bw * m) / 2;
      opts.series.forEach(function (se, j) {
        var v = se.values[i], yy = Y(Math.max(v, 0)), hh = Math.abs(Y(v) - Y(0));
        svg.appendChild(s("rect", { x: gx + j * bw, y: yy, width: bw - 2, height: Math.max(hh, 0.5), rx: 3, fill: se.color || PAL[j] }));
        if (opts.labels !== false) svg.appendChild(s("text", { x: gx + j * bw + (bw - 2) / 2, y: (v >= 0 ? yy - 3 : yy + hh + 10), class: "blabel", "text-anchor": "middle" }, opts.fmt ? opts.fmt(v) : fmt(v, 1)));
      });
      var lines = String(c).split("\n");
      lines.forEach(function (ln, k) {
        svg.appendChild(s("text", { x: L + gw * i + gw / 2, y: Ht - B + 14 + k * 12, class: "tick", "text-anchor": "middle" }, ln));
      });
    });
    if (opts.yLabel) svg.appendChild(s("text", { x: 11, y: (T + Ht - B) / 2, class: "alabel", "text-anchor": "middle", transform: "rotate(-90 11 " + ((T + Ht - B) / 2) + ")" }, opts.yLabel));
    var wrap = h("div", { class: "chartwrap" });
    wrap.appendChild(svg);
    if (m > 1 || opts.legend) {
      var lg = h("div", { class: "legend" });
      opts.series.forEach(function (se, j) { lg.appendChild(h("span", null, '<i style="background:' + (se.color || PAL[j]) + '"></i>' + se.name)); });
      wrap.appendChild(lg);
    }
    return wrap;
  }

  // ---------- 2×2 game analysis ----------
  function analyze(A, Bm) {
    var brR = [[false, false], [false, false]], brC = [[false, false], [false, false]];
    for (var j = 0; j < 2; j++) {
      var mx = Math.max(A[0][j], A[1][j]);
      for (var i = 0; i < 2; i++) brR[i][j] = A[i][j] === mx;
    }
    for (i = 0; i < 2; i++) {
      var mc = Math.max(Bm[i][0], Bm[i][1]);
      for (j = 0; j < 2; j++) brC[i][j] = Bm[i][j] === mc;
    }
    var ne = [];
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) if (brR[i][j] && brC[i][j]) ne.push([i, j]);
    var mixed = null;
    var dq = A[0][0] - A[0][1] - A[1][0] + A[1][1], dp = Bm[0][0] - Bm[1][0] - Bm[0][1] + Bm[1][1];
    if (dq !== 0 && dp !== 0) {
      var q = (A[1][1] - A[0][1]) / dq, p = (Bm[1][1] - Bm[1][0]) / dp;
      if (q > 1e-9 && q < 1 - 1e-9 && p > 1e-9 && p < 1 - 1e-9) {
        var eu1 = q * A[0][0] + (1 - q) * A[0][1];
        var eu2 = p * Bm[0][0] + (1 - p) * Bm[1][0];
        mixed = { p: p, q: q, u1: eu1, u2: eu2 };
      }
    }
    var dom = [];
    if (A[0][0] > A[1][0] && A[0][1] > A[1][1]) dom.push("row 1 strictly dominates for the row player");
    if (A[1][0] > A[0][0] && A[1][1] > A[0][1]) dom.push("row 2 strictly dominates for the row player");
    if (Bm[0][0] > Bm[0][1] && Bm[1][0] > Bm[1][1]) dom.push("column 1 strictly dominates for the column player");
    if (Bm[0][1] > Bm[0][0] && Bm[1][1] > Bm[1][0]) dom.push("column 2 strictly dominates for the column player");
    return { brR: brR, brC: brC, ne: ne, mixed: mixed, dom: dom };
  }

  var PRESETS = {
    price: { name: "Pricing game", r: ["₱120", "₱150"], c: ["₱120", "₱150"], A: [[6, 9], [3, 8]], B: [[6, 3], [9, 8]] },
    pd: { name: "Prisoner's Dilemma", r: ["Silent", "Confess"], c: ["Silent", "Confess"], A: [[-1, -3], [0, -2]], B: [[-1, 0], [-3, -2]] },
    stag: { name: "Stag Hunt", r: ["Stag", "Hare"], c: ["Stag", "Hare"], A: [[4, 0], [3, 3]], B: [[4, 3], [0, 3]] },
    chicken: { name: "Chicken", r: ["Swerve", "Straight"], c: ["Swerve", "Straight"], A: [[0, -1], [1, -10]], B: [[0, 1], [-1, -10]] },
    bos: { name: "Battle of the Sexes", r: ["Opera", "Football"], c: ["Opera", "Football"], A: [[2, 0], [0, 1]], B: [[1, 0], [0, 2]] },
    pennies: { name: "Matching Pennies", r: ["Heads", "Tails"], c: ["Heads", "Tails"], A: [[1, -1], [-1, 1]], B: [[-1, 1], [1, -1]] },
    penalty: { name: "Penalty kick (goal probability)", r: ["Kick L", "Kick R"], c: ["Dive L", "Dive R"], A: [[0.6, 0.95], [0.9, 0.7]], B: [[0.4, 0.05], [0.1, 0.3]] },
    harmony: { name: "Harmony", r: ["Cooperate", "Defect"], c: ["Cooperate", "Defect"], A: [[4, 3], [2, 1]], B: [[4, 2], [3, 1]] }
  };
  function clonePreset(k) { return JSON.parse(JSON.stringify(PRESETS[k])); }

  // ---------- widget: payoff matrix explorer ----------
  function matrix(el, o) {
    var g = clonePreset(o.preset || "pd");
    var sel = h("select", { class: "sel" });
    Object.keys(PRESETS).forEach(function (k) {
      if (k === "penalty") return;
      var op = h("option", { value: k }, PRESETS[k].name); if (k === (o.preset || "pd")) op.selected = true; sel.appendChild(op);
    });
    sel.addEventListener("change", function () { g = clonePreset(sel.value); build(); });
    var box = h("div"), info = h("div", { class: "winfo" });
    el.appendChild(h("div", { class: "wrow" }, "<span>Preset:</span>")).appendChild(sel);
    var scrollBox = h("div", { class: "scroll" }); scrollBox.appendChild(box);
    el.appendChild(scrollBox); el.appendChild(info);
    function build() {
      box.innerHTML = "";
      var t = h("table", { class: "mx" });
      var tr = h("tr"); tr.appendChild(h("th", null, "")); g.c.forEach(function (c) { tr.appendChild(h("th", null, c)); }); t.appendChild(tr);
      for (var i = 0; i < 2; i++) {
        tr = h("tr"); tr.appendChild(h("th", null, g.r[i]));
        for (var j = 0; j < 2; j++) {
          var td = h("td"); td.dataset.i = i; td.dataset.j = j;
          (function (i, j) {
            var a = numInput(g.A[i][j], function (v) { g.A[i][j] = v; mark(); });
            var b = numInput(g.B[i][j], function (v) { g.B[i][j] = v; mark(); });
            a.className += " pa"; b.className += " pb";
            td.appendChild(a); td.appendChild(h("span", { class: "comma" }, ",")); td.appendChild(b);
            td.appendChild(h("span", { class: "star" }, "★"));
          })(i, j);
          tr.appendChild(td);
        }
        t.appendChild(tr);
      }
      box.appendChild(t);
      mark();
    }
    function mark() {
      var r = analyze(g.A, g.B);
      box.querySelectorAll("td").forEach(function (td) {
        var i = +td.dataset.i, j = +td.dataset.j;
        td.querySelector(".pa").classList.toggle("br", r.brR[i][j]);
        td.querySelector(".pb").classList.toggle("br", r.brC[i][j]);
        td.classList.toggle("ne", r.brR[i][j] && r.brC[i][j]);
      });
      var lines = [];
      lines.push("<b>Pure Nash equilibria:</b> " + (r.ne.length ? r.ne.map(function (c) { return "(" + g.r[c[0]] + ", " + g.c[c[1]] + ")"; }).join(", ") : "none"));
      if (r.mixed) lines.push("<b>Mixed equilibrium:</b> row plays " + g.r[0] + " with p = " + frac(r.mixed.p) + ", column plays " + g.c[0] + " with q = " + frac(r.mixed.q) + " (expected payoffs " + fmt(r.mixed.u1) + ", " + fmt(r.mixed.u2) + ")");
      if (r.dom.length) lines.push("<b>Dominance:</b> " + r.dom.join("; "));
      lines.push('<span class="muted">Coloured numbers are best responses; ★ marks a cell where both are best responses (a Nash equilibrium). Tap a number to edit.</span>');
      info.innerHTML = lines.join("<br>");
    }
    build();
  }

  // ---------- widget: mixed strategy graph ----------
  function mixed(el, o) {
    var g = clonePreset(o.preset || "bos"), q = 0.5;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sq = slider("Column player's probability of " + g.c[0] + " (q)", 0, 1, 0.01, q, function (v) { q = v; draw(); });
    el.appendChild(h("div", { class: "wtitle" }, g.name));
    el.appendChild(chartBox); el.appendChild(sq); el.appendChild(info);
    function draw() {
      var r = analyze(g.A, g.B);
      var pts1 = [], pts2 = [];
      for (var k = 0; k <= 50; k++) { var x = k / 50; pts1.push([x, x * g.A[0][0] + (1 - x) * g.A[0][1]]); pts2.push([x, x * g.A[1][0] + (1 - x) * g.A[1][1]]); }
      var v1 = q * g.A[0][0] + (1 - q) * g.A[0][1], v2 = q * g.A[1][0] + (1 - q) * g.A[1][1];
      var vl = r.mixed ? [{ x: r.mixed.q, label: "q* = " + frac(r.mixed.q) }] : [];
      chartBox.innerHTML = "";
      chartBox.appendChild(lineChart({ xMin: 0, xMax: 1, xLabel: "q = Pr(column plays " + g.c[0] + ")", yLabel: "Row's expected payoff",
        series: [{ name: "Row plays " + g.r[0], pts: pts1, color: "var(--c1)" }, { name: "Row plays " + g.r[1], pts: pts2, color: "var(--c2)" }],
        vlines: vl, dots: [{ x: q, y: v1, color: "var(--c1)" }, { x: q, y: v2, color: "var(--c2)" }] }));
      var best = Math.abs(v1 - v2) < 1e-9 ? "indifferent (any mix is a best response)" : (v1 > v2 ? g.r[0] : g.r[1]);
      var txt = "At q = " + fmt(q) + ": " + g.r[0] + " gives " + fmt(v1, 3) + ", " + g.r[1] + " gives " + fmt(v2, 3) + " → best response: <b>" + best + "</b>.";
      if (r.mixed) txt += "<br><b>Mixed equilibrium:</b> p* = " + frac(r.mixed.p) + " (row plays " + g.r[0] + "), q* = " + frac(r.mixed.q) + " (column plays " + g.c[0] + "). Row's expected payoff " + fmt(r.mixed.u1, 3) + ".";
      info.innerHTML = txt;
    }
    draw();
  }

  // ---------- widget: 2×2 zero-sum solver ----------
  function zerosum(el) {
    var a = 3, b = -1, c = -2, d = 1;
    var grid = h("table", { class: "mx" });
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    function cell(get, set) { var td = h("td"); td.appendChild(numInput(get(), function (v) { set(v); draw(); })); return td; }
    var tr0 = h("tr"); tr0.appendChild(h("th")); tr0.appendChild(h("th", null, "C1")); tr0.appendChild(h("th", null, "C2")); grid.appendChild(tr0);
    var tr1 = h("tr"); tr1.appendChild(h("th", null, "R1"));
    tr1.appendChild(cell(function () { return a; }, function (v) { a = v; })); tr1.appendChild(cell(function () { return b; }, function (v) { b = v; })); grid.appendChild(tr1);
    var tr2 = h("tr"); tr2.appendChild(h("th", null, "R2"));
    tr2.appendChild(cell(function () { return c; }, function (v) { c = v; })); tr2.appendChild(cell(function () { return d; }, function (v) { d = v; })); grid.appendChild(tr2);
    el.appendChild(h("div", { class: "wtitle" }, "Row player's payoffs (column player pays them)"));
    el.appendChild(grid); el.appendChild(chartBox); el.appendChild(info);
    function draw() {
      var maximin = Math.max(Math.min(a, b), Math.min(c, d)), minimax = Math.min(Math.max(a, c), Math.max(b, d));
      var p1 = [], p2 = [], env = [];
      for (var k = 0; k <= 60; k++) { var p = k / 60, y1 = p * a + (1 - p) * c, y2 = p * b + (1 - p) * d; p1.push([p, y1]); p2.push([p, y2]); env.push([p, Math.min(y1, y2)]); }
      var txt, dots = [], vl = [];
      if (maximin === minimax) {
        txt = "<b>Saddle point!</b> maximin = minimax = " + fmt(maximin) + ". Pure strategies are optimal; value v = " + fmt(maximin) + ".";
      } else {
        var den = a - b - c + d, ps = (d - c) / den, qs = (d - b) / den, v = (a * d - b * c) / den;
        txt = "No saddle point (maximin " + fmt(maximin) + " &lt; minimax " + fmt(minimax) + ").<br><b>p* = " + frac(ps) + "</b> (row plays R1), <b>q* = " + frac(qs) + "</b> (column plays C1), <b>value v = " + frac(v) + "</b>.";
        dots.push({ x: ps, y: v, label: "v = " + frac(v) }); vl.push({ x: ps });
      }
      chartBox.innerHTML = "";
      chartBox.appendChild(lineChart({ xMin: 0, xMax: 1, xLabel: "p = Pr(row plays R1)", yLabel: "Row's payoff",
        series: [{ name: "vs C1", pts: p1 }, { name: "vs C2", pts: p2 }, { name: "guaranteed (lower envelope)", pts: env, color: "var(--c3)", width: 4, dash: "6 4" }],
        dots: dots, vlines: vl }));
      info.innerHTML = txt;
    }
    draw();
  }

  // ---------- widget: entry game tree with backward induction ----------
  function tree(el, o) {
    var P = { out: [0, 4], acc: [2, 2], fight: [-1, 1] }, step = 0;
    var svgBox = h("div"), info = h("div", { class: "winfo" }), edit = h("div", { class: "treeedit" });
    var btns = h("div", { class: "wrow" });
    var bNext = h("button", { class: "btn small" }, "Next step ▶"), bReset = h("button", { class: "btn small ghost" }, "Reset");
    bNext.onclick = function () { if (step < 2) step++; draw(); };
    bReset.onclick = function () { step = 0; draw(); };
    btns.appendChild(bNext); btns.appendChild(bReset);
    el.appendChild(svgBox); el.appendChild(btns); el.appendChild(info); el.appendChild(edit);
    [["out", "Out"], ["acc", "In → Accommodate"], ["fight", "In → Fight"]].forEach(function (k) {
      var row = h("div", { class: "wrow" }, "<span class='lbl'>" + k[1] + ":</span>");
      row.appendChild(numInput(P[k[0]][0], function (v) { P[k[0]][0] = v; step = 0; draw(); }));
      row.appendChild(numInput(P[k[0]][1], function (v) { P[k[0]][1] = v; step = 0; draw(); }));
      edit.appendChild(row);
    });
    edit.insertBefore(h("div", { class: "muted" }, "Edit payoffs (Entrant, Incumbent):"), edit.firstChild);
    function draw() {
      var incChoice = P.acc[1] >= P.fight[1] ? "acc" : "fight";
      var inVal = P[incChoice][0], entChoice = inVal >= P.out[0] ? "in" : "out";
      var svg = s("svg", { viewBox: "0 0 360 220", class: "chart" });
      function line(x1, y1, x2, y2, on) { svg.appendChild(s("line", { x1: x1, y1: y1, x2: x2, y2: y2, class: on ? "edge on" : "edge" })); }
      function node(x, y, lab) { svg.appendChild(s("circle", { cx: x, cy: y, r: 9, class: "node" })); svg.appendChild(s("text", { x: x, y: y - 14, class: "nlabel", "text-anchor": "middle" }, lab)); }
      function leaf(x, y, p, on) { svg.appendChild(s("text", { x: x, y: y, class: on ? "leaf on" : "leaf", "text-anchor": "middle" }, "(" + p[0] + ", " + p[1] + ")")); }
      function elab(x, y, t) { svg.appendChild(s("text", { x: x, y: y, class: "elabel", "text-anchor": "middle" }, t)); }
      var s1 = step >= 1, s2 = step >= 2;
      line(80, 40, 40, 150, s2 && entChoice === "out"); elab(45, 95, "Out");
      line(80, 40, 210, 100, s2 && entChoice === "in"); elab(155, 62, "In");
      line(210, 100, 150, 180, s1 && incChoice === "acc"); elab(162, 140, "Accommodate");
      line(210, 100, 290, 180, s1 && incChoice === "fight"); elab(275, 135, "Fight");
      node(80, 40, "Entrant"); node(210, 100, "Incumbent");
      leaf(40, 170, P.out, s2 && entChoice === "out");
      leaf(150, 200, P.acc, s2 && entChoice === "in" && incChoice === "acc");
      leaf(290, 200, P.fight, s2 && entChoice === "in" && incChoice === "fight");
      svgBox.innerHTML = ""; svgBox.appendChild(svg);
      var names = { acc: "Accommodate", fight: "Fight", in: "In", out: "Out" };
      if (step === 0) info.innerHTML = "Press <b>Next step</b> to start backward induction at the last decision (the Incumbent's).";
      else if (step === 1) info.innerHTML = "Step 1: after entry, the Incumbent compares Accommodate (" + P.acc[1] + ") and Fight (" + P.fight[1] + ") → chooses <b>" + names[incChoice] + "</b>.";
      else info.innerHTML = "Step 2: the Entrant compares In (" + inVal + ", anticipating " + names[incChoice] + ") with Out (" + P.out[0] + ") → chooses <b>" + names[entChoice] + "</b>.<br><b>Subgame perfect equilibrium:</b> (" + names[entChoice] + ", " + names[incChoice] + ").";
      bNext.disabled = step >= 2;
    }
    draw();
  }

  // ---------- widget: Cournot / Stackelberg / Monopoly / Bertrand ----------
  function cournot(el, o) {
    var a = 100, c = 10;
    var top = h("div"), info = h("div", { class: "winfo" });
    var sa = slider("Demand intercept a", 40, 200, 1, a, function (v) { a = v; if (c > a - 10) { c = a - 10; sc.set(c); } draw(); });
    var sc = slider("Unit cost c", 0, 100, 1, c, function (v) { c = Math.min(v, a - 10); draw(); });
    el.appendChild(top); el.appendChild(sa); el.appendChild(sc); el.appendChild(info);
    function draw() {
      var m = a - c, qc = m / 3, piC = m * m / 9;
      var rows = [
        ["Monopoly", m / 2, a - m / 2, m * m / 4, "—"],
        ["Cournot (each)", qc, a - 2 * qc, piC, "2 × " + fmt(piC, 1)],
        ["Stackelberg leader", m / 2, a - 3 * m / 4, m * m / 8, ""],
        ["Stackelberg follower", m / 4, a - 3 * m / 4, m * m / 16, ""],
        ["Bertrand (each)", m / 2, c, 0, "0"]
      ];
      top.innerHTML = "";
      if (o.view === "br") {
        var br1 = [], br2 = [];
        for (var k = 0; k <= 40; k++) { var x = m * k / 40; br1.push([(m - x) / 2, x]); br2.push([x, (m - x) / 2]); }
        br1.sort(function (p, q) { return p[0] - q[0]; });
        top.appendChild(lineChart({ xMin: 0, xMax: m, yMin: 0, yMax: m, xLabel: "q₁ (firm 1 output)", yLabel: "q₂ (firm 2 output)",
          series: [{ name: "Firm 1 reaction q₁ = (a−c−q₂)/2", pts: br1 }, { name: "Firm 2 reaction q₂ = (a−c−q₁)/2", pts: br2 }],
          dots: [{ x: qc, y: qc, label: "NE (" + fmt(qc, 1) + ", " + fmt(qc, 1) + ")" }] }));
      } else {
        top.appendChild(barChart({ cats: ["Monopoly", "Cournot", "Stackelberg", "Bertrand"],
          series: [
            { name: "Total output", values: [m / 2, 2 * qc, 3 * m / 4, m] },
            { name: "Price", values: [a - m / 2, a - 2 * qc, a - 3 * m / 4, c] },
            { name: "Total profit ÷ 10", values: [m * m / 40, 2 * piC / 10, (m * m / 8 + m * m / 16) / 10, 0] }
          ] }));
      }
      var t = "<table class='tbl small'><tr><th>Market</th><th>Quantity</th><th>Price</th><th>Profit</th></tr>";
      rows.forEach(function (r) { t += "<tr><td>" + r[0] + "</td><td>" + fmt(r[1], 1) + "</td><td>" + fmt(r[2], 1) + "</td><td>" + fmt(r[3], 1) + "</td></tr>"; });
      info.innerHTML = t + "</table>";
    }
    draw();
  }

  // ---------- widget: grim trigger condition ----------
  function grim(el) {
    var T = 5, Rr = 3, P = 1, d = 0.6;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sT = slider("Temptation T", 1, 15, 0.5, T, function (v) { T = v; draw(); });
    var sR = slider("Reward R", 0.5, 10, 0.5, Rr, function (v) { Rr = v; draw(); });
    var sP = slider("Punishment P", 0, 8, 0.5, P, function (v) { P = v; draw(); });
    var sd = slider("Discount factor δ", 0, 0.95, 0.01, d, function (v) { d = v; draw(); });
    el.appendChild(chartBox); el.appendChild(sT); el.appendChild(sR); el.appendChild(sP); el.appendChild(sd); el.appendChild(info);
    function draw() {
      if (!(T > Rr && Rr > P)) { chartBox.innerHTML = ""; info.innerHTML = "⚠️ Set T &gt; R &gt; P for a Prisoner's Dilemma."; return; }
      var c1 = [], c2 = [];
      for (var k = 0; k <= 95; k++) { var x = k / 100; c1.push([x, Rr / (1 - x)]); c2.push([x, T + x * P / (1 - x)]); }
      var th = (T - Rr) / (T - P);
      chartBox.innerHTML = "";
      chartBox.appendChild(lineChart({ xMin: 0, xMax: 0.95, yMin: 0, xLabel: "δ (weight on the future)", yLabel: "Present value",
        series: [{ name: "Cooperate forever R/(1−δ)", pts: c1 }, { name: "Deviate once T + δP/(1−δ)", pts: c2 }],
        vlines: [{ x: th, label: "δ* = " + fmt(th, 3) }, { x: d, color: "var(--accent)" }] }));
      var ok = d >= th;
      info.innerHTML = "Threshold δ* = (T−R)/(T−P) = " + fmt(th, 3) + ". At δ = " + fmt(d) + ": cooperate " + fmt(Rr / (1 - d), 2) + " vs deviate " + fmt(T + d * P / (1 - d), 2) + " → " + (ok ? "<b class='good'>cooperation is sustainable</b>" : "<b class='bad'>players will defect</b>") + ".";
    }
    draw();
  }

  // ---------- widget: repeated PD tournament ----------
  var STRATS = {
    "Always C": function () { return "C"; },
    "Always D": function () { return "D"; },
    "Tit-for-Tat": function (me, op) { return op.length ? op[op.length - 1] : "C"; },
    "Grim": function (me, op) { return op.indexOf("D") >= 0 ? "D" : "C"; },
    "Pavlov": function (me, op) {
      if (!me.length) return "C";
      var m = me[me.length - 1], o = op[op.length - 1];
      return m === o ? "C" : "D";
    },
    "Tit-for-2-Tats": function (me, op) { var n = op.length; return n >= 2 && op[n - 1] === "D" && op[n - 2] === "D" ? "D" : "C"; },
    "Random": function () { return Math.random() < 0.5 ? "C" : "D"; }
  };
  function tournament(el) {
    var rounds = 50, noise = 0;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sr = slider("Rounds per match", 10, 200, 10, rounds, function (v) { rounds = v; run(); });
    var sn = slider("Noise (chance a move is flipped)", 0, 0.1, 0.01, noise, function (v) { noise = v; run(); });
    var b = h("button", { class: "btn small" }, "Run again"); b.onclick = run;
    el.appendChild(h("div", { class: "wtitle" }, "Payoffs: T = 5, R = 3, P = 1, S = 0. Everyone plays everyone (including a copy of itself)."));
    el.appendChild(chartBox); el.appendChild(sr); el.appendChild(sn); el.appendChild(b); el.appendChild(info);
    function pay(x, y) { return x === "C" ? (y === "C" ? 3 : 0) : (y === "C" ? 5 : 1); }
    function run() {
      var names = Object.keys(STRATS), tot = {}, games = {};
      names.forEach(function (n) { tot[n] = 0; games[n] = 0; });
      for (var i = 0; i < names.length; i++) for (var j = i; j < names.length; j++) {
        var h1 = [], h2 = [], s1 = 0, s2 = 0;
        for (var r = 0; r < rounds; r++) {
          var m1 = STRATS[names[i]](h1, h2), m2 = STRATS[names[j]](h2, h1);
          if (Math.random() < noise) m1 = m1 === "C" ? "D" : "C";
          if (Math.random() < noise) m2 = m2 === "C" ? "D" : "C";
          h1.push(m1); h2.push(m2); s1 += pay(m1, m2); s2 += pay(m2, m1);
        }
        tot[names[i]] += s1 / rounds; games[names[i]]++;
        if (i !== j) { tot[names[j]] += s2 / rounds; games[names[j]]++; }
      }
      var avg = names.map(function (n) { return tot[n] / games[n]; });
      var order = names.map(function (n, k) { return [n, avg[k]]; }).sort(function (p, q) { return q[1] - p[1]; });
      chartBox.innerHTML = "";
      chartBox.appendChild(barChart({ cats: order.map(function (o) { return o[0].replace("Tit-for-2-Tats", "TF2T").replace("Tit-for-Tat", "TFT").replace(" ", "\n"); }),
        series: [{ name: "Average points per round", values: order.map(function (o) { return o[1]; }), color: "var(--c1)" }], yMax: 5, fmt: function (v) { return fmt(v, 2); } }));
      info.innerHTML = "🏆 Winner: <b>" + order[0][0] + "</b> (" + fmt(order[0][1], 2) + " points per round). Mutual cooperation earns 3; mutual defection earns 1.";
    }
    run();
  }

  // ---------- widget: Hawk–Dove replicator dynamics ----------
  function replicator(el) {
    var V = 4, C = 10;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sv = slider("Value of resource V", 1, 20, 0.5, V, function (v) { V = v; draw(); });
    var sc = slider("Cost of fight C", 1, 20, 0.5, C, function (v) { C = v; draw(); });
    el.appendChild(chartBox); el.appendChild(sv); el.appendChild(sc); el.appendChild(info);
    function draw() {
      var starts = [0.05, 0.3, 0.7, 0.95], series = [];
      starts.forEach(function (x0, i) {
        var x = x0, pts = [[0, x]], dt = 0.02, Tm = 30;
        for (var t = dt; t <= Tm + 1e-9; t += dt) {
          var fH = x * (V - C) / 2 + (1 - x) * V, fD = (1 - x) * V / 2;
          x += dt * x * (1 - x) * (fH - fD) / Math.max(V, C) * 2;
          x = Math.min(1, Math.max(0, x));
          if (Math.round(t / dt) % 10 === 0) pts.push([t, x]);
        }
        series.push({ name: i === 0 ? "Hawk share (4 starting points)" : "", pts: pts, color: PAL[i] });
      });
      var ess = C > V ? V / C : 1;
      chartBox.innerHTML = "";
      chartBox.appendChild(lineChart({ xMin: 0, xMax: 30, yMin: 0, yMax: 1, xLabel: "Time", yLabel: "Share of Hawks", series: series,
        hlines: [{ y: ess, color: "var(--accent)" }] }));
      info.innerHTML = C > V ? "Stable Hawk share x* = V/C = <b>" + fmt(ess, 3) + "</b> (dashed line). Every start converges there." : "C ≤ V: fighting is cheap, so <b>Hawks take over</b> (x* = 1).";
    }
    draw();
  }

  // ---------- widget: Bayesian entry ----------
  function bayes(el) {
    var mu = 0.5, vs = -1, vw = 2;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sm = slider("Belief that incumbent is Strong (μ)", 0, 1, 0.01, mu, function (v) { mu = v; draw(); });
    var ss = slider("Entrant's payoff vs Strong", -5, 0, 0.5, vs, function (v) { vs = v; draw(); });
    var sw = slider("Entrant's payoff vs Weak", 0, 5, 0.5, vw, function (v) { vw = v; draw(); });
    el.appendChild(chartBox); el.appendChild(sm); el.appendChild(ss); el.appendChild(sw); el.appendChild(info);
    function draw() {
      var pts = [[0, vw], [1, vs]], th = vw / (vw - vs), e = mu * vs + (1 - mu) * vw;
      chartBox.innerHTML = "";
      chartBox.appendChild(lineChart({ xMin: 0, xMax: 1, xLabel: "μ = Pr(Strong)", yLabel: "Expected payoff",
        series: [{ name: "Enter", pts: pts }, { name: "Stay out", pts: [[0, 0], [1, 0]] }],
        vlines: [{ x: th, label: "μ* = " + fmt(th, 3) }], dots: [{ x: mu, y: e }] }));
      info.innerHTML = "E[Enter] = μ(" + vs + ") + (1−μ)(" + vw + ") = <b>" + fmt(e, 3) + "</b> → " + (e >= 0 ? "<b class='good'>Enter</b>" : "<b class='bad'>Stay out</b>") + ". Entry pays while μ ≤ " + fmt(th, 3) + ".";
    }
    draw();
  }

  // ---------- widget: Spence signalling ----------
  function signal(el) {
    var gap = 10, cL = 2, cH = 1, e = 6;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sg = slider("Wage gap w_H − w_L", 1, 30, 1, gap, function (v) { gap = v; draw(); });
    var sl = slider("Cost per unit, Low type (c_L)", 0.5, 6, 0.5, cL, function (v) { cL = v; draw(); });
    var shh = slider("Cost per unit, High type (c_H)", 0.5, 6, 0.5, cH, function (v) { cH = v; draw(); });
    var se = slider("Education standard e*", 0, 30, 0.5, e, function (v) { e = v; draw(); });
    el.appendChild(chartBox); el.appendChild(sg); el.appendChild(sl); el.appendChild(shh); el.appendChild(se); el.appendChild(info);
    function draw() {
      chartBox.innerHTML = "";
      if (cL <= cH) { info.innerHTML = "⚠️ Signalling needs c_L &gt; c_H: education must be harder for the Low type."; return; }
      var lo = gap / cL, hi = gap / cH, xmax = Math.max(30, hi * 1.1);
      chartBox.appendChild(lineChart({ xMin: 0, xMax: xmax, xLabel: "Education level e", yLabel: "Net gain from signalling",
        series: [{ name: "High type: gap − c_H·e", pts: [[0, gap], [xmax, gap - cH * xmax]] }, { name: "Low type: gap − c_L·e", pts: [[0, gap], [xmax, gap - cL * xmax]] }, { pts: [[0, 0], [xmax, 0]], color: "var(--muted)", width: 1 }],
        vlines: [{ x: lo, label: "min " + fmt(lo, 1) }, { x: hi, label: "max " + fmt(hi, 1) }, { x: e, color: "var(--accent)" }] }));
      var lowImitates = gap - cL * e > 0, highSignals = gap - cH * e >= 0;
      var sep = !lowImitates && highSignals;
      info.innerHTML = "Separating range: <b>" + fmt(lo, 2) + " ≤ e* ≤ " + fmt(hi, 2) + "</b>.<br>At e* = " + fmt(e, 1) + ": High type's net gain " + fmt(gap - cH * e, 2) + ", Low type's " + fmt(gap - cL * e, 2) + " → " +
        (sep ? "<b class='good'>separating equilibrium</b>: only High types get educated." : (lowImitates ? "<b class='bad'>Low types would imitate</b>: the standard is too low." : "<b class='bad'>Too costly even for High types</b>: no one signals."));
    }
    draw();
  }

  // ---------- widget: Shapley value & core (3 players) ----------
  function shapley(el) {
    var v = { "1": 0, "2": 0, "3": 0, "12": 60, "13": 50, "23": 40, "123": 90 };
    var form = h("div", { class: "vgrid" }), chartBox = h("div"), info = h("div", { class: "winfo" });
    el.appendChild(h("div", { class: "wtitle" }, "Coalition values v(S)"));
    el.appendChild(form); el.appendChild(chartBox); el.appendChild(info);
    Object.keys(v).forEach(function (k) {
      var cell = h("label", { class: "vcell" }, "<span>v({" + k.split("").join(",") + "})</span>");
      cell.appendChild(numInput(v[k], function (x) { v[k] = x; draw(); }));
      form.appendChild(cell);
    });
    function val(set) { var k = set.slice().sort().join(""); return k ? v[k] : 0; }
    function draw() {
      var orders = [["1", "2", "3"], ["1", "3", "2"], ["2", "1", "3"], ["2", "3", "1"], ["3", "1", "2"], ["3", "2", "1"]];
      var phi = { "1": 0, "2": 0, "3": 0 };
      var t = "<table class='tbl small'><tr><th>Order</th><th>MC₁</th><th>MC₂</th><th>MC₃</th></tr>";
      orders.forEach(function (o) {
        var cur = [], mc = {};
        o.forEach(function (p) { var before = val(cur); cur.push(p); mc[p] = val(cur) - before; phi[p] += mc[p] / 6; });
        t += "<tr><td>" + o.join("→") + "</td><td>" + fmt(mc["1"], 1) + "</td><td>" + fmt(mc["2"], 1) + "</td><td>" + fmt(mc["3"], 1) + "</td></tr>";
      });
      t += "<tr><th>Shapley φ</th><th>" + fmt(phi["1"], 2) + "</th><th>" + fmt(phi["2"], 2) + "</th><th>" + fmt(phi["3"], 2) + "</th></tr></table>";
      var x = phi, fails = [];
      [["1"], ["2"], ["3"], ["1", "2"], ["1", "3"], ["2", "3"]].forEach(function (S) {
        var sum = S.reduce(function (acc, p) { return acc + x[p]; }, 0);
        if (sum < val(S) - 1e-9) fails.push("{" + S.join(",") + "} gets " + fmt(sum, 2) + " &lt; " + val(S));
      });
      chartBox.innerHTML = "";
      chartBox.appendChild(barChart({ cats: ["Player 1", "Player 2", "Player 3"], series: [{ name: "Shapley value", values: [phi["1"], phi["2"], phi["3"]], color: "var(--c3)" }], height: 190 }));
      info.innerHTML = t + (fails.length ? "<b class='bad'>Not in the core:</b> " + fails.join("; ") : "<b class='good'>In the core</b>: no coalition can do better by leaving.");
    }
    draw();
  }

  // ---------- widget: Nash bargaining ----------
  function bargain(el) {
    var P = 100, d1 = 20, d2 = 0, beta = 0.5;
    var chartBox = h("div"), info = h("div", { class: "winfo" });
    var sp = slider("Pie size P", 20, 200, 5, P, function (v) { P = v; draw(); });
    var s1 = slider("Player 1 outside option d₁", 0, 100, 1, d1, function (v) { d1 = v; draw(); });
    var s2 = slider("Player 2 outside option d₂", 0, 100, 1, d2, function (v) { d2 = v; draw(); });
    var sb = slider("Player 1 bargaining power β", 0, 1, 0.05, beta, function (v) { beta = v; draw(); });
    el.appendChild(chartBox); el.appendChild(sp); el.appendChild(s1); el.appendChild(s2); el.appendChild(sb); el.appendChild(info);
    function draw() {
      chartBox.innerHTML = "";
      if (d1 + d2 > P) { info.innerHTML = "⚠️ Outside options exceed the pie: no agreement is possible (d₁ + d₂ &gt; P)."; return; }
      var u1 = d1 + beta * (P - d1 - d2), u2 = P - u1;
      chartBox.appendChild(lineChart({ xMin: 0, xMax: P, yMin: 0, yMax: P, xLabel: "u₁ (player 1)", yLabel: "u₂ (player 2)",
        series: [{ name: "Agreements u₁ + u₂ = P", pts: [[0, P], [P, 0]] }, { name: "Gains over d", pts: [[d1, d2], [u1, u2]], color: "var(--c3)", dash: "5 4" }],
        dots: [{ x: d1, y: d2, color: "var(--muted)", label: "d" }, { x: u1, y: u2, label: "Nash (" + fmt(u1, 1) + ", " + fmt(u2, 1) + ")" }] }));
      info.innerHTML = "Solution: u₁* = d₁ + β(P − d₁ − d₂) = <b>" + fmt(u1, 2) + "</b>, u₂* = <b>" + fmt(u2, 2) + "</b>. Net surplus shared: " + fmt(P - d1 - d2, 2) + ".";
    }
    draw();
  }

  // ---------- widget: auction simulation ----------
  function auction(el) {
    var n = 3;
    var top = h("div"), bottom = h("div"), info = h("div", { class: "winfo" });
    var sn = slider("Number of bidders n", 2, 10, 1, n, function (v) { n = v; run(); });
    var b = h("button", { class: "btn small" }, "Simulate again"); b.onclick = run;
    el.appendChild(top); el.appendChild(sn); el.appendChild(b); el.appendChild(bottom); el.appendChild(info);
    function run() {
      var N = 4000, fp = 0, sp = 0;
      for (var k = 0; k < N; k++) {
        var vals = []; for (var i = 0; i < n; i++) vals.push(Math.random());
        vals.sort(function (x, y) { return y - x; });
        fp += vals[0] * (n - 1) / n; sp += vals[1];
      }
      var th = (n - 1) / (n + 1);
      top.innerHTML = "";
      top.appendChild(barChart({ cats: ["Theory", "First-price\n(simulated)", "Second-price\n(simulated)"], series: [{ name: "Expected revenue", values: [th, fp / N, sp / N], color: "var(--c4)" }], yMax: 1, height: 200, fmt: function (v) { return fmt(v, 3); } }));
      var curve = []; for (var m = 2; m <= 10; m++) curve.push([m, (m - 1) / (m + 1)]);
      bottom.innerHTML = "";
      bottom.appendChild(lineChart({ xMin: 2, xMax: 10, yMin: 0, yMax: 1, xLabel: "Number of bidders", yLabel: "Revenue", series: [{ name: "(n−1)/(n+1)", pts: curve }], dots: [{ x: n, y: th }] }));
      info.innerHTML = "With n = " + n + ", each bidder shades to <b>" + frac((n - 1) / n) + "</b> of their value in a first-price auction. Both formats earn about " + fmt(th, 3) + " (simulated over " + N + " auctions).";
    }
    run();
  }

  // ---------- widget: tourism coopetition ----------
  function coop(el) {
    var B = 10, gg = 8, k = 2, st = 3;
    var box = h("div"), info = h("div", { class: "winfo" });
    var sg = slider("Joint campaign gain g", 0, 20, 0.5, gg, function (v) { gg = v; draw(); });
    var sk = slider("Contribution cost k", 0, 10, 0.5, k, function (v) { k = v; draw(); });
    var ss = slider("Business stealing s", 0, 10, 0.5, st, function (v) { st = v; draw(); });
    el.appendChild(box); el.appendChild(sg); el.appendChild(sk); el.appendChild(ss); el.appendChild(info);
    function draw() {
      var Rr = B + gg - k, S = B + gg / 2 - k - st, T = B + gg / 2 + st, P = B;
      var A = [[Rr, S], [T, P]], Bm = [[Rr, T], [S, P]];
      var r = analyze(A, Bm), names = ["Cooperate", "Compete"];
      var t = "<table class='mx static'><tr><th></th><th>Cooperate</th><th>Compete</th></tr>";
      for (var i = 0; i < 2; i++) {
        t += "<tr><th>" + names[i] + "</th>";
        for (var j = 0; j < 2; j++) {
          var ne = r.brR[i][j] && r.brC[i][j];
          t += "<td class='" + (ne ? "ne" : "") + "'><span class='" + (r.brR[i][j] ? "br" : "") + "'>" + fmt(A[i][j], 1) + "</span>, <span class='" + (r.brC[i][j] ? "br" : "") + "'>" + fmt(Bm[i][j], 1) + "</span>" + (ne ? " ★" : "") + "</td>";
        }
        t += "</tr>";
      }
      box.innerHTML = t + "</table>";
      var ccBR = Rr >= T, ddBR = P >= S, type, advice;
      if (ccBR && !ddBR) { type = "Harmony"; advice = "Cooperation is the dominant choice: joint marketing happens naturally."; }
      else if (ccBR && ddBR) { type = "Stag Hunt (coordination)"; advice = "Both (Cooperate, Cooperate) and (Compete, Compete) are equilibria. Trust and a regional body or MOU help destinations coordinate on cooperation."; }
      else if (!ccBR && ddBR) {
        type = Rr > P ? "Prisoner's Dilemma" : "Deadlock";
        advice = Rr > P ? "Competing dominates, though both would gain from cooperating. Repeated play sustains cooperation if δ ≥ (T−R)/(T−P) = " + fmt((T - Rr) / (T - P), 3) + "; contracts or shared funding also help." : "Mutual competition is better for both here: cooperation is not worthwhile.";
      } else { type = "Chicken (anti-coordination)"; advice = "Each prefers to do the opposite of the other: one cooperates while the other free-rides."; }
      info.innerHTML = "R = " + fmt(Rr, 1) + ", S = " + fmt(S, 1) + ", T = " + fmt(T, 1) + ", P = " + fmt(P, 1) + " (base B = 10).<br><b>Game type: " + type + ".</b> " + advice + "<br>Self-enforcing test g/2 ≥ k + s: " + fmt(gg / 2, 1) + " vs " + fmt(k + st, 1) + " → " + (gg / 2 >= k + st ? "<b class='good'>passes</b>" : "<b class='bad'>fails</b>") + ".";
    }
    draw();
  }

  var REG = { matrix: matrix, mixed: mixed, zerosum: zerosum, tree: tree, cournot: cournot, grim: grim, tournament: tournament,
    replicator: replicator, bayes: bayes, signal: signal, shapley: shapley, bargain: bargain, auction: auction, coop: coop };

  return {
    mount: function (name, el, opts) {
      if (!REG[name]) return;
      try { REG[name](el, opts || {}); } catch (e) { el.innerHTML = "<p class='bad'>This interactive part could not load: " + e.message + "</p>"; }
    },
    lineChart: lineChart, barChart: barChart, h: h, fmt: fmt
  };
})();
