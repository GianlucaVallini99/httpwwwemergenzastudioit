/* Overworld map definition. 30x20 tiles, 16px each. */

export const TILE = {
  GRASS: 0,
  TALL_GRASS: 1,
  PATH: 2,
  TREE: 3,
  WATER: 4,
  SAND: 5,
  ROOF: 6,
  WALL: 7,
  DOOR: 8,
  FLOWER_RED: 9,
  FLOWER_YELLOW: 10,
  SIGN: 11,
  FENCE: 12,
} as const;

export type TileId = number;

const X = TILE;

/*
   30 wide × 20 tall.
   Layout: trees border, path running N-S through center,
   tall-grass patches around, a small "village" building on left,
   water lake to the right, signs near entrance.
*/
// prettier-ignore
const RAW_MAP: number[][] = [
  /* y=0  */ [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  /* y=1  */ [3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  /* y=2  */ [3,0,1,1,1,1,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,4,4,4,4,4,0,0,0,3],
  /* y=3  */ [3,0,1,1,1,1,0,0,0,0,0,0,0,0,2,2,0,0,0,0,4,4,4,4,4,4,4,0,0,3],
  /* y=4  */ [3,0,1,1,1,1,0,0,9,10,0,0,0,0,2,2,0,0,0,4,4,4,4,4,4,4,4,4,0,3],
  /* y=5  */ [3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,4,4,4,4,4,4,4,4,4,0,3],
  /* y=6  */ [3,0,0,6,6,6,6,0,0,0,0,0,0,0,2,2,0,0,0,4,4,4,4,4,4,4,4,4,0,3],
  /* y=7  */ [3,0,0,7,7,7,7,0,0,0,0,0,0,0,2,2,0,0,0,0,4,4,4,4,4,4,4,0,0,3],
  /* y=8  */ [3,0,0,7,8,7,7,0,0,0,9,0,0,0,2,2,0,0,0,0,0,4,4,4,4,4,0,0,0,3],
  /* y=9  */ [3,0,0,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  /* y=10 */ [3,0,0,0,2,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,1,1,1,1,1,0,0,3],
  /* y=11 */ [3,12,12,12,2,12,12,12,12,12,12,12,12,2,2,2,2,2,12,12,12,1,1,1,1,1,1,12,12,3],
  /* y=12 */ [3,0,0,0,2,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,1,1,1,1,1,1,0,0,3],
  /* y=13 */ [3,0,0,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,1,1,1,1,1,0,0,0,3],
  /* y=14 */ [3,0,0,11,2,0,0,1,1,1,1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  /* y=15 */ [3,0,0,0,2,0,0,1,1,1,1,0,0,0,2,2,0,0,0,0,9,10,0,0,0,0,0,0,0,3],
  /* y=16 */ [3,0,0,0,2,0,0,1,1,1,1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,5,5,5,0,3],
  /* y=17 */ [3,0,0,0,2,0,0,1,1,1,1,0,0,0,2,2,0,0,0,0,0,0,0,0,0,5,5,5,0,3],
  /* y=18 */ [3,0,0,0,2,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
  /* y=19 */ [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
];
void X;

export const MAP_W = RAW_MAP[0].length;
export const MAP_H = RAW_MAP.length;

export function getTile(x: number, y: number): number {
  if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return TILE.TREE;
  return RAW_MAP[y][x];
}

export function isBlocked(x: number, y: number): boolean {
  const t = getTile(x, y);
  return (
    t === TILE.TREE ||
    t === TILE.WATER ||
    t === TILE.ROOF ||
    t === TILE.WALL ||
    t === TILE.SIGN ||
    t === TILE.FENCE
  );
}

export function isTallGrass(x: number, y: number): boolean {
  return getTile(x, y) === TILE.TALL_GRASS;
}

export function isInteractive(x: number, y: number): "sign" | "door" | null {
  const t = getTile(x, y);
  if (t === TILE.SIGN) return "sign";
  if (t === TILE.DOOR) return "door";
  return null;
}

export interface SpawnPoint { x: number; y: number; }
export const SPAWN: SpawnPoint = { x: 14, y: 12 };
