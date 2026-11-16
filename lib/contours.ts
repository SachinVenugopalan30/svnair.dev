// Contour maps for the hero: a stylised height field per famous mountain,
// traced into lines with marching squares. Client-safe, no DOM.

type Kind = "g" | "cone" | "pyr" | "mesa";
// x, y: position as a share of the map; a: relative height (negative digs a
// crater); s: footprint radius; r: rotation; e: stretch across the long axis.
type Peak = { x: number; y: number; a: number; s: number; k: Kind; r?: number; e?: number };
export type Mountain = { name: string; place: string; top: number; base: number; peaks: Peak[] };

// g = rounded summit, cone = straight flanks, pyr = four faces, mesa = flat top
export const MOUNTAINS: Mountain[] = [
  { name: "Matterhorn", place: "Pennine Alps, Switzerland and Italy", top: 4478, base: 2300, peaks: [{ x: 0.64, y: 0.44, a: 1, s: 0.5, k: "pyr", r: 0.5, e: 1.15 }, { x: 0.4, y: 0.78, a: 0.25, s: 0.45, k: "g", e: 2 }] },
  { name: "Mount Fuji", place: "Honshu, Japan", top: 3776, base: 600, peaks: [{ x: 0.6, y: 0.48, a: 1, s: 0.62, k: "cone", e: 1.05 }, { x: 0.6, y: 0.48, a: -0.07, s: 0.045, k: "g" }] },
  { name: "Denali", place: "Alaska Range, United States", top: 6190, base: 2000, peaks: [{ x: 0.62, y: 0.5, a: 1, s: 0.3, k: "g", r: -0.4, e: 1.6 }, { x: 0.76, y: 0.28, a: 0.9, s: 0.22, k: "g" }, { x: 0.3, y: 0.74, a: 0.45, s: 0.35, k: "g", r: 0.6, e: 2.4 }] },
  { name: "K2", place: "Karakoram, Pakistan and China", top: 8611, base: 4500, peaks: [{ x: 0.66, y: 0.42, a: 1, s: 0.42, k: "pyr", r: 0.2 }, { x: 0.36, y: 0.7, a: 0.5, s: 0.3, k: "g", r: 1, e: 3 }] },
  { name: "Kilimanjaro", place: "Kilimanjaro Region, Tanzania", top: 5895, base: 1200, peaks: [{ x: 0.56, y: 0.5, a: 1, s: 0.75, k: "cone", e: 1.3 }, { x: 0.56, y: 0.5, a: -0.06, s: 0.07, k: "g" }, { x: 0.85, y: 0.62, a: 0.5, s: 0.22, k: "g" }] },
  { name: "Mount Everest", place: "Mahalangur Himal, Nepal and China", top: 8849, base: 5000, peaks: [{ x: 0.62, y: 0.4, a: 1, s: 0.3, k: "pyr", r: 0.3 }, { x: 0.7, y: 0.62, a: 0.93, s: 0.24, k: "g" }, { x: 0.44, y: 0.6, a: 0.7, s: 0.28, k: "g", r: -0.3, e: 2.5 }] },
  { name: "Mont Blanc", place: "Graian Alps, France and Italy", top: 4806, base: 1900, peaks: [{ x: 0.6, y: 0.48, a: 1, s: 0.28, k: "g", r: -0.55, e: 2.6 }, { x: 0.82, y: 0.3, a: 0.8, s: 0.18, k: "g" }] },
  { name: "Table Mountain", place: "Cape Town, South Africa", top: 1085, base: 0, peaks: [{ x: 0.62, y: 0.46, a: 1, s: 0.36, k: "mesa", r: 0.15, e: 2.4 }, { x: 0.2, y: 0.7, a: 0.55, s: 0.22, k: "cone" }] },
  { name: "Mount Rainier", place: "Cascade Range, United States", top: 4392, base: 1400, peaks: [{ x: 0.6, y: 0.48, a: 1, s: 0.5, k: "g", e: 1.1 }, { x: 0.58, y: 0.46, a: -0.05, s: 0.05, k: "g" }] },
  { name: "Aconcagua", place: "Andes, Argentina", top: 6961, base: 3200, peaks: [{ x: 0.6, y: 0.44, a: 1, s: 0.3, k: "g", r: 0.9, e: 2.8 }, { x: 0.4, y: 0.66, a: 0.7, s: 0.25, k: "g", r: 0.9, e: 2 }] },
];

function field(m: Mountain, phase: number[], W: number, H: number) {
  const S = Math.max(W, H);
  return (x: number, y: number) => {
    let h = 0;
    for (const p of m.peaks) {
      let dx = (x - p.x * W) / S;
      let dy = (y - p.y * H) / S;
      const r = p.r ?? 0;
      const e = p.e ?? 1;
      [dx, dy] = [dx * Math.cos(r) + dy * Math.sin(r), (-dx * Math.sin(r) + dy * Math.cos(r)) * e];
      const d = Math.hypot(dx, dy) / p.s;
      let v: number;
      if (p.k === "cone") v = Math.max(0, 1 - d) ** 1.15;
      else if (p.k === "pyr") v = Math.max(0, 1 - (Math.abs(dx) + Math.abs(dy)) / p.s) ** 1.3;
      else if (p.k === "mesa") v = 1 / (1 + Math.exp((d - 0.55) * 14));
      else v = Math.exp(-d * d * 2.2);
      h += p.a * v;
    }
    // Slow terrain wobble so every corner of the map has ground to draw.
    const u = x / S;
    const w = y / S;
    h +=
      0.07 * Math.sin(u * 7 + phase[0]) * Math.cos(w * 6 + phase[1]) +
      0.05 * Math.sin((u + w) * 11 + phase[2]) +
      0.025 * Math.sin(u * 23 + phase[3]) * Math.sin(w * 19 + phase[4]) +
      0.06 * (1 - w);
    return h;
  };
}

type Pt = [number, number];
type End = [string, number, number]; // shared-edge id, x, y
type Seg = [End, End];

// Marching squares for one level. Segments meet on shared cell edges, which
// lets them chain into whole polylines (one path each, so dashes animate cleanly).
function trace(grid: Float32Array, nx: number, ny: number, g: number, L: number): Pt[][] {
  const segs: Seg[] = [];
  const at = new Map<string, Seg[]>();
  const lerp = (a: number, b: number) => (L - a) / (b - a);
  const T: Record<number, [string, string]> = { 1: ["l", "t"], 2: ["t", "r"], 3: ["l", "r"], 4: ["r", "b"], 6: ["t", "b"], 7: ["l", "b"], 8: ["b", "l"], 9: ["b", "t"], 11: ["b", "r"], 12: ["r", "l"], 13: ["r", "t"], 14: ["t", "l"] };
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const a = grid[j * nx + i], b = grid[j * nx + i + 1], c = grid[(j + 1) * nx + i + 1], d = grid[(j + 1) * nx + i];
      const cs = (+(a > L)) | (+(b > L) << 1) | (+(c > L) << 2) | (+(d > L) << 3);
      if (cs === 0 || cs === 15) continue;
      const E: Record<string, End> = {
        t: [`h${i},${j}`, (i + lerp(a, b)) * g, j * g],
        r: [`v${i + 1},${j}`, (i + 1) * g, (j + lerp(b, c)) * g],
        b: [`h${i},${j + 1}`, (i + lerp(d, c)) * g, (j + 1) * g],
        l: [`v${i},${j}`, i * g, (j + lerp(a, d)) * g],
      };
      const add = (p: string, q: string) => {
        const s: Seg = [E[p], E[q]];
        segs.push(s);
        for (const e of s) {
          const list = at.get(e[0]);
          if (list) list.push(s);
          else at.set(e[0], [s]);
        }
      };
      if (cs === 5) { add("l", "t"); add("r", "b"); }
      else if (cs === 10) { add("t", "r"); add("b", "l"); }
      else add(...T[cs]);
    }
  }
  const used = new Set<Seg>();
  const walk = (start: Seg | undefined, from: End) => {
    const pts: End[] = [];
    let cur = start;
    let end = from;
    while (cur && !used.has(cur)) {
      used.add(cur);
      const nxt = cur[0][0] === end[0] ? cur[1] : cur[0];
      pts.push(nxt);
      const here: Seg = cur;
      cur = at.get(nxt[0])!.find((t) => t !== here && !used.has(t));
      end = nxt;
    }
    return pts;
  };
  const lines: Pt[][] = [];
  for (const s of segs) {
    if (used.has(s)) continue;
    used.add(s);
    const fwd = walk(at.get(s[1][0])!.find((t) => t !== s), s[1]);
    const back = walk(at.get(s[0][0])!.find((t) => t !== s), s[0]);
    lines.push([...back.reverse(), s[0], s[1], ...fwd].map((e) => [e[1], e[2]]));
  }
  return lines;
}

const f1 = (n: number) => n.toFixed(1);

// Quadratic curves through midpoints soften the grid's corners.
function smooth(p: Pt[]): string {
  if (p.length < 3) return "M" + p.map((q) => q.map(f1).join(",")).join("L");
  let d = `M${f1(p[0][0])},${f1(p[0][1])}`;
  for (let k = 1; k < p.length - 1; k++) {
    d += `Q${f1(p[k][0])},${f1(p[k][1])} ${f1((p[k][0] + p[k + 1][0]) / 2)},${f1((p[k][1] + p[k + 1][1]) / 2)}`;
  }
  const z = p[p.length - 1];
  return d + `L${f1(z[0])},${f1(z[1])}`;
}

export type ContourLine = { d: string; index: boolean };
export type ContourLabel = { x: number; y: number; text: string };

// W, H in CSS px. `keepClear` is a box (the name) labels must stay out of.
export function drawContours(
  m: Mountain,
  phase: number[],
  W: number,
  H: number,
  keepClear: { left: number; right: number; top: number; bottom: number },
): { lines: ContourLine[]; labels: ContourLabel[] } {
  const g = Math.max(5, W / 220);
  const f = field(m, phase, W, H);
  const nx = Math.ceil(W / g) + 1;
  const ny = Math.ceil(H / g) + 1;
  const grid = new Float32Array(nx * ny);
  let lo = Infinity;
  let hi = -Infinity;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const v = f(i * g, j * g);
      grid[j * nx + i] = v;
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
  }
  // A round contour interval giving ~30 lines between the lowest and highest ground.
  const span = m.top - m.base;
  const raw = span / 30;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= raw)!;
  const toH = (elev: number) => lo + ((elev - m.base) / span) * (hi - lo);
  const fs = 12.5;
  const clear = (x: number, y: number) =>
    x < keepClear.left - 90 || x > keepClear.right + 90 || y < keepClear.top - 80 || y > keepClear.bottom + 80;

  const lines: ContourLine[] = [];
  const labels: ContourLabel[] = [];
  for (let elev = Math.ceil(m.base / step) * step + step; elev < m.top; elev += step) {
    const index = Math.round(elev / step) % 5 === 0;
    for (const line of trace(grid, nx, ny, g, toH(elev))) {
      if (line.length < 4) continue;
      lines.push({ d: smooth(line), index });
      if (!index || line.length <= 15) continue;
      const spot = line.find(
        ([x, y]) =>
          x > W * 0.06 && x < W - fs * 6 && y > H * 0.16 && y < H * 0.86 && clear(x, y) &&
          labels.every((l) => Math.hypot(l.x - x, l.y - y) > fs * 9),
      );
      if (spot) labels.push({ x: spot[0], y: spot[1], text: `${elev.toLocaleString("en-US")} m` });
    }
  }
  return { lines, labels };
}
