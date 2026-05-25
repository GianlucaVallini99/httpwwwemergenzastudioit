/* Procedural pixel-art sprite rendering — original art inspired by GBA era. */

export type Painter = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => void;

/* ───── Helpers ───── */
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawPixels(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  rows: string[],
  palette: Record<string, string>
) {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const k = row[c];
      const color = palette[k];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
    }
  }
}

/* ───── Player sprite (16×16, 4 directions) ─────
   Palette: . transparent  K outline  S skin  H hair  R red  B blue  Y yellow  W white  D dark  G gray
*/
const PLAYER_DOWN = [
  "................",
  "....KKKKKK......",
  "...KHHHHHHK.....",
  "..KHHRRHHRHK....",
  "..KHRRRHRRRK....",
  "..KSSKSSKSSK....",
  "..KSWWWWWWSK....",
  "...KWWRRWWK.....",
  "...KRWWWWRK.....",
  "...KRWWWWRK.....",
  "...KBBBBBBK.....",
  "...KBSSSSBK.....",
  "...KBSWWSBK.....",
  "...KKBBBBKK.....",
  "....DD..DD......",
  "...KKK..KKK.....",
];

const PLAYER_UP = [
  "................",
  "....KKKKKK......",
  "...KHHHHHHK.....",
  "..KHHHHHHHHK....",
  "..KHHHHHHHHK....",
  "..KHKHHHHHHK....",
  "..KSWWWWWWSK....",
  "...KWWWWWWK.....",
  "...KRWWWWRK.....",
  "...KRWWWWRK.....",
  "...KBBBBBBK.....",
  "...KBBBBBBK.....",
  "...KBSWWSBK.....",
  "...KKBBBBKK.....",
  "....DD..DD......",
  "...KKK..KKK.....",
];

const PLAYER_LEFT = [
  "................",
  "....KKKKKK......",
  "...KHHHHHHK.....",
  "..KHHRRRHHK.....",
  "..KHHRHHHHK.....",
  "..KSSKSSHHK.....",
  "..KSWWWWWSK.....",
  "...KWWRRWK......",
  "...KRWWWRK......",
  "...KRWWWWK......",
  "...KBBBBBK......",
  "...KBSSSBK......",
  "...KBSWWBK......",
  "....KBBBBK......",
  "....DD..DD......",
  "...KKK..KKK.....",
];

const PLAYER_RIGHT = [
  "................",
  "....KKKKKK......",
  "...KHHHHHHK.....",
  "..KHHRRRHHK.....",
  "..KHHHHRHHK.....",
  "..KHSSKSSKK.....",
  "..KSWWWWWSK.....",
  "....KWRRWWK.....",
  "....KRWWWRK.....",
  "....KWWWWRK.....",
  "....KBBBBBK.....",
  "....KBSSSBK.....",
  "....KBWWSBK.....",
  "....KBBBBK......",
  "....DD..DD......",
  "...KKK..KKK.....",
];

const PLAYER_PALETTE: Record<string, string> = {
  ".": "",
  K: "#1a1a2e",
  H: "#c83232",
  R: "#e84a4a",
  S: "#f6c8a0",
  W: "#ffffff",
  B: "#2864c8",
  D: "#000000",
  Y: "#f8d030",
  G: "#888888",
};

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dir: "up" | "down" | "left" | "right",
  step: number = 0
) {
  const rowsMap = {
    up: PLAYER_UP,
    down: PLAYER_DOWN,
    left: PLAYER_LEFT,
    right: PLAYER_RIGHT,
  };
  drawPixels(ctx, x, y, 1, rowsMap[dir], PLAYER_PALETTE);
  // step bob — feet alternate by hiding one shoe pixel
  if (step === 1) {
    px(ctx, x + 3, y + 15, 3, 1, "#1a1a2e");
    px(ctx, x + 8, y + 14, 3, 2, "#1a1a2e");
  } else if (step === 2) {
    px(ctx, x + 3, y + 14, 3, 2, "#1a1a2e");
    px(ctx, x + 8, y + 15, 3, 1, "#1a1a2e");
  }
}

/* ───── Tile rendering (16×16) ───── */

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s * 16807 + 1) % 2147483647;
    return (s & 0xffff) / 0xffff;
  };
}

export function drawGrassTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, x, y, 16, 16, "#58a058");
  // checker dither
  for (let j = 0; j < 16; j += 2) for (let i = 0; i < 16; i += 2)
    px(ctx, x + i, y + j, 1, 1, "#68b068");
  // tiny tufts
  const r = rng(x * 73 + y * 131);
  for (let k = 0; k < 3; k++) {
    const ix = Math.floor(r() * 14);
    const iy = Math.floor(r() * 14);
    px(ctx, x + ix, y + iy, 2, 1, "#3a8048");
  }
}

export function drawTallGrassTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawGrassTile(ctx, x, y);
  // grass blades
  const blades = [
    [2, 12], [5, 11], [8, 12], [11, 11], [13, 13],
    [3, 7], [7, 6], [10, 7], [13, 6],
  ];
  for (const [bx, by] of blades) {
    px(ctx, x + bx, y + by, 1, 3, "#2e6838");
    px(ctx, x + bx + 1, y + by + 1, 1, 2, "#4a8848");
  }
}

export function drawTreeTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawGrassTile(ctx, x, y);
  // canopy
  ctx.fillStyle = "#1a5028";
  ctx.fillRect(x + 1, y + 1, 14, 12);
  ctx.fillStyle = "#286038";
  ctx.fillRect(x + 2, y + 1, 12, 10);
  ctx.fillStyle = "#3a8048";
  ctx.fillRect(x + 3, y + 2, 4, 3);
  ctx.fillRect(x + 9, y + 4, 4, 3);
  ctx.fillRect(x + 5, y + 7, 3, 2);
  // trunk
  ctx.fillStyle = "#5a3820";
  ctx.fillRect(x + 6, y + 12, 4, 4);
  ctx.fillStyle = "#3a2010";
  ctx.fillRect(x + 6, y + 12, 1, 4);
}

export function drawWaterTile(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  px(ctx, x, y, 16, 16, "#3068d8");
  for (let j = 0; j < 16; j += 2) for (let i = 0; i < 16; i += 2)
    px(ctx, x + i, y + j, 1, 1, "#4080e8");
  // moving wave
  const off = Math.floor(t / 30) % 8;
  ctx.fillStyle = "#80b8f8";
  ctx.fillRect(x + off, y + 4, 4, 1);
  ctx.fillRect(x + ((off + 6) % 12), y + 11, 4, 1);
}

export function drawPathTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, x, y, 16, 16, "#d8b878");
  for (let j = 0; j < 16; j += 4) for (let i = 0; i < 16; i += 4)
    px(ctx, x + i, y + j, 1, 1, "#a88858");
  px(ctx, x + 6, y + 9, 2, 1, "#a88858");
  px(ctx, x + 11, y + 3, 1, 2, "#a88858");
}

export function drawSandTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, x, y, 16, 16, "#e8d098");
  for (let j = 0; j < 16; j += 2) for (let i = 0; i < 16; i += 2)
    px(ctx, x + i, y + j, 1, 1, "#d8b878");
}

export function drawBuildingTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, x, y, 16, 16, "#c84848");
  ctx.fillStyle = "#883030";
  ctx.fillRect(x, y, 16, 2);
  ctx.fillRect(x, y + 14, 16, 2);
  ctx.fillStyle = "#682020";
  for (let i = 0; i < 16; i += 4) ctx.fillRect(x + i, y, 1, 16);
  // brick texture
  ctx.fillStyle = "#a83838";
  for (let j = 2; j < 14; j += 4) for (let i = 0; i < 16; i += 8)
    ctx.fillRect(x + i, y + j, 7, 3);
}

export function drawRoofTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  px(ctx, x, y, 16, 16, "#5070b8");
  ctx.fillStyle = "#304080";
  for (let j = 0; j < 16; j += 4) ctx.fillRect(x, y + j, 16, 1);
  for (let i = 0; i < 16; i += 4) ctx.fillRect(x + i, y, 1, 16);
}

export function drawDoorTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawBuildingTile(ctx, x, y);
  ctx.fillStyle = "#3a2010";
  ctx.fillRect(x + 3, y + 2, 10, 14);
  ctx.fillStyle = "#5a3820";
  ctx.fillRect(x + 4, y + 3, 8, 12);
  ctx.fillStyle = "#f8d030";
  ctx.fillRect(x + 10, y + 9, 1, 1);
}

export function drawFlowerTile(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  drawGrassTile(ctx, x, y);
  ctx.fillStyle = color;
  ctx.fillRect(x + 6, y + 6, 3, 3);
  ctx.fillRect(x + 5, y + 7, 1, 1);
  ctx.fillRect(x + 9, y + 7, 1, 1);
  ctx.fillRect(x + 7, y + 5, 1, 1);
  ctx.fillRect(x + 7, y + 9, 1, 1);
  ctx.fillStyle = "#f8d030";
  ctx.fillRect(x + 7, y + 7, 1, 1);
}

export function drawSignTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawGrassTile(ctx, x, y);
  ctx.fillStyle = "#5a3820";
  ctx.fillRect(x + 7, y + 8, 2, 8);
  ctx.fillStyle = "#a87038";
  ctx.fillRect(x + 3, y + 2, 10, 7);
  ctx.fillStyle = "#5a3820";
  ctx.fillRect(x + 3, y + 2, 10, 1);
  ctx.fillRect(x + 3, y + 8, 10, 1);
  ctx.fillStyle = "#3a2010";
  ctx.fillRect(x + 5, y + 4, 6, 1);
  ctx.fillRect(x + 5, y + 6, 4, 1);
}

export function drawFenceTile(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawGrassTile(ctx, x, y);
  ctx.fillStyle = "#d8d8d8";
  ctx.fillRect(x, y + 7, 16, 2);
  ctx.fillRect(x + 2, y + 3, 2, 10);
  ctx.fillRect(x + 7, y + 3, 2, 10);
  ctx.fillRect(x + 12, y + 3, 2, 10);
  ctx.fillStyle = "#888888";
  ctx.fillRect(x, y + 9, 16, 1);
}

/* ───── Pokémon sprite rendering (procedural, ~56px) ───── */

interface CreaturePalette {
  body: string;
  bodyDark: string;
  bodyLight: string;
  belly: string;
  outline: string;
  accent: string;
  accent2: string;
  eye: string;
}

function ellipse(ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, color: string) {
  ctx.fillStyle = color;
  for (let y = -ry; y <= ry; y++) {
    const w = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))));
    ctx.fillRect(Math.floor(cx - w), Math.floor(cy + y), w * 2 + 1, 1);
  }
}

function ellipseOutline(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  rx: number, ry: number,
  fill: string, outline: string
) {
  ellipse(ctx, cx, cy, rx + 1, ry + 1, outline);
  ellipse(ctx, cx, cy, rx, ry, fill);
}

/* Direction: "front" or "back" */
function drawFogliora(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#78c850", bodyDark: "#508838", bodyLight: "#a8e070",
    belly: "#e0f0c0", outline: "#1a3010", accent: "#205028", accent2: "#a8e070", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // bulb on back
  ellipseOutline(ctx, cx - 12, cy - 14, 8, 8, p.accent2, p.outline);
  ellipseOutline(ctx, cx + 14, cy - 14, 6, 6, p.accent2, p.outline);
  // body
  ellipseOutline(ctx, cx, cy, 18, 14, p.body, p.outline);
  // shading
  ellipse(ctx, cx, cy + 4, 14, 6, p.bodyDark);
  ellipse(ctx, cx - 4, cy - 4, 8, 4, p.bodyLight);
  // spots
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 8, cy - 6, 4, 3);
  ctx.fillRect(cx + 4, cy - 4, 5, 3);
  if (dir === "front") {
    // eyes
    ctx.fillStyle = "#ffffff"; ctx.fillRect(cx - 9, cy - 2, 5, 4);
    ctx.fillRect(cx + 4, cy - 2, 5, 4);
    ctx.fillStyle = p.eye; ctx.fillRect(cx - 7, cy, 3, 2);
    ctx.fillRect(cx + 6, cy, 3, 2);
    // mouth
    ctx.fillStyle = p.outline; ctx.fillRect(cx - 3, cy + 6, 6, 1);
    ctx.fillRect(cx - 1, cy + 5, 2, 1);
  }
  // legs
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 14, cy + 12, 4, 4);
  ctx.fillRect(cx + 10, cy + 12, 4, 4);
}

function drawFiammino(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#f08030", bodyDark: "#a85020", bodyLight: "#f8b070",
    belly: "#fadfa0", outline: "#2a1408", accent: "#f8d030", accent2: "#e84a4a", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // tail with flame
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx + 14, cy + 4, 6, 3);
  ctx.fillRect(cx + 18, cy, 4, 6);
  // flame
  ellipse(ctx, cx + 22, cy - 6, 5, 7, p.accent);
  ellipse(ctx, cx + 22, cy - 4, 3, 4, p.accent2);
  ellipse(ctx, cx + 22, cy - 8, 1, 2, "#ffffff");
  // body
  ellipseOutline(ctx, cx, cy, 14, 12, p.body, p.outline);
  ellipse(ctx, cx, cy + 4, 11, 5, p.belly);
  ellipse(ctx, cx - 4, cy - 4, 6, 3, p.bodyLight);
  // head
  ellipseOutline(ctx, cx - 4, cy - 12, 9, 8, p.body, p.outline);
  ellipse(ctx, cx - 4, cy - 9, 6, 3, p.belly);
  if (dir === "front") {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(cx - 9, cy - 14, 3, 3); ctx.fillRect(cx - 2, cy - 14, 3, 3);
    ctx.fillStyle = p.eye; ctx.fillRect(cx - 8, cy - 13, 2, 2); ctx.fillRect(cx - 1, cy - 13, 2, 2);
    ctx.fillStyle = p.outline; ctx.fillRect(cx - 5, cy - 8, 3, 1);
  }
  // legs
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 10, cy + 9, 4, 4);
  ctx.fillRect(cx + 5, cy + 9, 4, 4);
}

function drawAcquaguscio(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#6890f0", bodyDark: "#3050a8", bodyLight: "#98b8f8",
    belly: "#e0e8f8", outline: "#101830", accent: "#a85020", accent2: "#683010", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // shell
  ellipseOutline(ctx, cx, cy + 2, 16, 12, p.accent, p.outline);
  ellipse(ctx, cx, cy + 6, 14, 6, p.accent2);
  ctx.fillStyle = p.accent2;
  ctx.fillRect(cx - 12, cy, 4, 1);
  ctx.fillRect(cx - 4, cy, 4, 1);
  ctx.fillRect(cx + 4, cy, 4, 1);
  // body underneath
  ellipseOutline(ctx, cx - 12, cy + 2, 5, 5, p.body, p.outline);
  ellipseOutline(ctx, cx + 12, cy + 2, 5, 5, p.body, p.outline);
  // head
  ellipseOutline(ctx, cx, cy - 12, 10, 8, p.body, p.outline);
  ellipse(ctx, cx, cy - 9, 7, 3, p.bodyLight);
  if (dir === "front") {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(cx - 5, cy - 14, 3, 3); ctx.fillRect(cx + 2, cy - 14, 3, 3);
    ctx.fillStyle = p.eye; ctx.fillRect(cx - 4, cy - 13, 2, 2); ctx.fillRect(cx + 3, cy - 13, 2, 2);
    ctx.fillStyle = p.outline; ctx.fillRect(cx - 2, cy - 8, 4, 1);
  }
  // legs
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 8, cy + 12, 4, 3);
  ctx.fillRect(cx + 4, cy + 12, 4, 3);
}

function drawTopolampo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#f8d030", bodyDark: "#a87020", bodyLight: "#fae878",
    belly: "#ffffff", outline: "#2a1408", accent: "#e84a4a", accent2: "#a83020", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // ears
  ctx.fillStyle = p.outline;
  ctx.beginPath(); ctx.moveTo(cx - 12, cy - 12); ctx.lineTo(cx - 16, cy - 22); ctx.lineTo(cx - 8, cy - 14); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + 12, cy - 12); ctx.lineTo(cx + 16, cy - 22); ctx.lineTo(cx + 8, cy - 14); ctx.fill();
  ctx.fillStyle = p.body;
  ctx.beginPath(); ctx.moveTo(cx - 12, cy - 13); ctx.lineTo(cx - 15, cy - 20); ctx.lineTo(cx - 9, cy - 14); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + 12, cy - 13); ctx.lineTo(cx + 15, cy - 20); ctx.lineTo(cx + 9, cy - 14); ctx.fill();
  ctx.fillStyle = p.outline;
  ctx.beginPath(); ctx.moveTo(cx - 14, cy - 18); ctx.lineTo(cx - 16, cy - 22); ctx.lineTo(cx - 12, cy - 19); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + 14, cy - 18); ctx.lineTo(cx + 16, cy - 22); ctx.lineTo(cx + 12, cy - 19); ctx.fill();
  // head
  ellipseOutline(ctx, cx, cy - 6, 12, 10, p.body, p.outline);
  ellipse(ctx, cx, cy - 4, 9, 4, p.bodyLight);
  // body
  ellipseOutline(ctx, cx, cy + 8, 10, 6, p.body, p.outline);
  // cheeks
  ctx.fillStyle = p.accent;
  ctx.fillRect(cx - 10, cy - 4, 3, 3); ctx.fillRect(cx + 7, cy - 4, 3, 3);
  if (dir === "front") {
    ctx.fillStyle = p.eye;
    ctx.fillRect(cx - 6, cy - 9, 3, 3); ctx.fillRect(cx + 3, cy - 9, 3, 3);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 5, cy - 9, 1, 1); ctx.fillRect(cx + 4, cy - 9, 1, 1);
    ctx.fillStyle = p.outline; ctx.fillRect(cx - 2, cy - 3, 4, 1); ctx.fillRect(cx - 1, cy - 2, 2, 1);
  }
  // tail (lightning)
  ctx.fillStyle = p.outline;
  ctx.beginPath();
  ctx.moveTo(cx + 9, cy + 6); ctx.lineTo(cx + 16, cy + 2);
  ctx.lineTo(cx + 12, cy + 4); ctx.lineTo(cx + 22, cy - 6);
  ctx.lineTo(cx + 18, cy - 4); ctx.lineTo(cx + 24, cy - 12);
  ctx.lineTo(cx + 14, cy - 2); ctx.lineTo(cx + 16, cy - 4);
  ctx.lineTo(cx + 8, cy); ctx.closePath(); ctx.fill();
  ctx.fillStyle = p.body;
  ctx.beginPath();
  ctx.moveTo(cx + 10, cy + 5); ctx.lineTo(cx + 14, cy + 3);
  ctx.lineTo(cx + 11, cy + 4); ctx.lineTo(cx + 20, cy - 6);
  ctx.lineTo(cx + 16, cy - 4); ctx.lineTo(cx + 22, cy - 11);
  ctx.lineTo(cx + 13, cy - 1); ctx.closePath(); ctx.fill();
  // legs
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 8, cy + 12, 3, 3); ctx.fillRect(cx + 5, cy + 12, 3, 3);
}

function drawRattolo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#b888a8", bodyDark: "#785870", bodyLight: "#d8b0c8",
    belly: "#f0e0c8", outline: "#2a1010", accent: "#ffffff", accent2: "#888888", eye: "#c83232",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // ears
  ctx.fillStyle = p.outline;
  ctx.beginPath(); ctx.moveTo(cx - 10, cy - 12); ctx.lineTo(cx - 13, cy - 20); ctx.lineTo(cx - 6, cy - 14); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + 10, cy - 12); ctx.lineTo(cx + 13, cy - 20); ctx.lineTo(cx + 6, cy - 14); ctx.fill();
  ctx.fillStyle = p.body;
  ctx.beginPath(); ctx.moveTo(cx - 10, cy - 13); ctx.lineTo(cx - 12, cy - 18); ctx.lineTo(cx - 7, cy - 14); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + 10, cy - 13); ctx.lineTo(cx + 12, cy - 18); ctx.lineTo(cx + 7, cy - 14); ctx.fill();
  // body
  ellipseOutline(ctx, cx, cy, 16, 11, p.body, p.outline);
  ellipse(ctx, cx, cy + 3, 13, 4, p.belly);
  ellipse(ctx, cx - 2, cy - 3, 9, 3, p.bodyLight);
  if (dir === "front") {
    ctx.fillStyle = p.eye;
    ctx.fillRect(cx - 7, cy - 4, 3, 3); ctx.fillRect(cx + 4, cy - 4, 3, 3);
    // teeth
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 2, cy + 4, 2, 3); ctx.fillRect(cx + 1, cy + 4, 2, 3);
    ctx.fillStyle = p.outline; ctx.fillRect(cx, cy + 4, 1, 3);
  }
  // tail
  ctx.fillStyle = p.outline;
  ctx.fillRect(cx + 14, cy - 3, 12, 2);
  ctx.fillRect(cx + 24, cy - 6, 2, 4);
  ctx.fillStyle = p.bodyLight;
  ctx.fillRect(cx + 15, cy - 2, 10, 1);
  // legs
  ctx.fillStyle = p.bodyDark;
  ctx.fillRect(cx - 12, cy + 9, 4, 3); ctx.fillRect(cx + 6, cy + 9, 4, 3);
}

function drawPiccione(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#b88858", bodyDark: "#785030", bodyLight: "#e0b888",
    belly: "#f8e8b8", outline: "#1a1008", accent: "#c83232", accent2: "#f8d030", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // body
  ellipseOutline(ctx, cx, cy, 14, 12, p.body, p.outline);
  ellipse(ctx, cx, cy + 3, 11, 6, p.belly);
  // head
  ellipseOutline(ctx, cx - 2, cy - 10, 9, 8, p.body, p.outline);
  ellipse(ctx, cx - 2, cy - 8, 6, 4, p.bodyLight);
  // crest
  ctx.fillStyle = p.accent;
  ctx.fillRect(cx - 8, cy - 18, 3, 5); ctx.fillRect(cx - 3, cy - 20, 3, 7);
  ctx.fillRect(cx + 2, cy - 18, 3, 5);
  ctx.fillStyle = p.outline;
  ctx.fillRect(cx - 8, cy - 18, 1, 5); ctx.fillRect(cx + 4, cy - 18, 1, 5);
  // beak
  if (dir === "front") {
    ctx.fillStyle = p.accent2;
    ctx.beginPath(); ctx.moveTo(cx - 9, cy - 8); ctx.lineTo(cx - 14, cy - 6); ctx.lineTo(cx - 9, cy - 5); ctx.fill();
    ctx.fillStyle = p.eye; ctx.fillRect(cx - 5, cy - 11, 2, 3);
  }
  // wing
  ctx.fillStyle = p.bodyDark;
  ellipse(ctx, cx + 6, cy - 1, 8, 6, p.bodyDark);
  ellipse(ctx, cx + 6, cy - 1, 6, 4, p.body);
  // legs
  ctx.fillStyle = p.accent2;
  ctx.fillRect(cx - 6, cy + 11, 2, 4); ctx.fillRect(cx + 4, cy + 11, 2, 4);
}

function drawBrucafoglia(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, dir: "front" | "back") {
  const p: CreaturePalette = {
    body: "#90b840", bodyDark: "#587820", bodyLight: "#c0d870",
    belly: "#f0f0a0", outline: "#102008", accent: "#f8d030", accent2: "#c83232", eye: "#000000",
  };
  const cx = x + size / 2, cy = y + size / 2 + 4;
  // body segments
  for (let i = 0; i < 3; i++) {
    const sx = cx + (i - 1) * 9;
    ellipseOutline(ctx, sx, cy + 2, 7, 7, p.body, p.outline);
    ellipse(ctx, sx - 1, cy, 4, 3, p.bodyLight);
  }
  // head
  ellipseOutline(ctx, cx - 14, cy, 8, 8, p.body, p.outline);
  ellipse(ctx, cx - 14, cy - 2, 5, 3, p.bodyLight);
  // horn (yellow)
  ctx.fillStyle = p.accent;
  ctx.fillRect(cx - 14, cy - 12, 2, 6);
  ctx.fillStyle = p.outline;
  ctx.fillRect(cx - 14, cy - 12, 1, 6);
  if (dir === "front") {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(cx - 17, cy - 1, 3, 3); ctx.fillRect(cx - 12, cy - 1, 3, 3);
    ctx.fillStyle = p.eye; ctx.fillRect(cx - 16, cy, 2, 2); ctx.fillRect(cx - 11, cy, 2, 2);
  }
  // feet
  ctx.fillStyle = p.bodyDark;
  for (let i = -1; i <= 1; i++) {
    ctx.fillRect(cx + i * 9 - 4, cy + 8, 3, 3);
    ctx.fillRect(cx + i * 9 + 1, cy + 8, 3, 3);
  }
}

export function drawCreature(
  ctx: CanvasRenderingContext2D,
  speciesId: string,
  x: number, y: number, size: number,
  dir: "front" | "back" = "front"
) {
  switch (speciesId) {
    case "FOGLIORA":    return drawFogliora(ctx, x, y, size, dir);
    case "FIAMMINO":    return drawFiammino(ctx, x, y, size, dir);
    case "ACQUAGUSCIO": return drawAcquaguscio(ctx, x, y, size, dir);
    case "TOPOLAMPO":   return drawTopolampo(ctx, x, y, size, dir);
    case "RATTOLO":     return drawRattolo(ctx, x, y, size, dir);
    case "PICCIONE":    return drawPiccione(ctx, x, y, size, dir);
    case "BRUCAFOGLIA": return drawBrucafoglia(ctx, x, y, size, dir);
    default:
      ellipseOutline(ctx, x + size/2, y + size/2, 16, 12, "#888888", "#000000");
  }
}

/* ───── Pokéball ───── */
export function drawPokeball(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.fillStyle = "#000000"; ellipse(ctx, cx, cy, r + 1, r + 1, "#000000");
  ctx.fillStyle = "#e84a4a"; ellipse(ctx, cx, cy, r, r, "#e84a4a");
  ctx.fillStyle = "#ffffff";
  for (let y = 0; y < r; y++) {
    const w = Math.floor(r * Math.sqrt(Math.max(0, 1 - (y * y) / (r * r))));
    ctx.fillRect(cx - w, cy + y, w * 2 + 1, 1);
  }
  ctx.fillStyle = "#000000";
  ctx.fillRect(cx - r, cy - 1, r * 2 + 1, 2);
  ctx.fillStyle = "#ffffff";
  ellipse(ctx, cx, cy, 2, 2, "#ffffff");
  ctx.fillStyle = "#000000";
  ellipse(ctx, cx, cy, 1, 1, "#000000");
}

/* ───── Pixel font (5×7) — A-Z, 0-9, basic punctuation ───── */
const FONT_DATA: Record<string, string[]> = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."],
  G: [".####", "#....", "#....", "#.###", "#...#", "#...#", ".###."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#.#.#", "#..##", "#...#", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"],
  Y: ["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
  "0": [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."],
  "1": ["..#..", ".##..", "..#..", "..#..", "..#..", "..#..", ".###."],
  "2": [".###.", "#...#", "....#", "...#.", "..#..", ".#...", "#####"],
  "3": [".###.", "#...#", "....#", "..##.", "....#", "#...#", ".###."],
  "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
  "5": ["#####", "#....", "####.", "....#", "....#", "#...#", ".###."],
  "6": [".###.", "#....", "#....", "####.", "#...#", "#...#", ".###."],
  "7": ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."],
  "8": [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
  "9": [".###.", "#...#", "#...#", ".####", "....#", "....#", ".###."],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
  ".": [".....", ".....", ".....", ".....", ".....", "..#..", "..#.."],
  ",": [".....", ".....", ".....", ".....", ".....", "..#..", ".#..."],
  "!": ["..#..", "..#..", "..#..", "..#..", "..#..", ".....", "..#.."],
  "?": [".###.", "#...#", "....#", "...#.", "..#..", ".....", "..#.."],
  "'": ["..#..", "..#..", ".....", ".....", ".....", ".....", "....."],
  ":": [".....", ".....", "..#..", ".....", "..#..", ".....", "....."],
  "-": [".....", ".....", ".....", "#####", ".....", ".....", "....."],
  "/": ["....#", "...#.", "...#.", "..#..", ".#...", ".#...", "#...."],
  "(": ["...#.", "..#..", ".#...", ".#...", ".#...", "..#..", "...#."],
  ")": [".#...", "..#..", "...#.", "...#.", "...#.", "..#..", ".#..."],
  "+": [".....", "..#..", "..#..", "#####", "..#..", "..#..", "....."],
  "%": ["##..#", "##.#.", "..#..", ".#.##", "#..##", ".....", "....."],
  "x": [".....", ".....", "#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
};

export function measureText(text: string, size = 1): number {
  return text.length * 6 * size;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number, y: number,
  color = "#202020",
  scale = 1,
  shadow?: string
) {
  const upper = text;
  let cx = x;
  for (const ch of upper) {
    const glyph = FONT_DATA[ch] || FONT_DATA[ch.toUpperCase()] || FONT_DATA[" "];
    if (shadow) {
      drawPixels(ctx, cx + scale, y + scale, scale, glyph, { "#": shadow, ".": "" });
    }
    drawPixels(ctx, cx, y, scale, glyph, { "#": color, ".": "" });
    cx += 6 * scale;
  }
}
