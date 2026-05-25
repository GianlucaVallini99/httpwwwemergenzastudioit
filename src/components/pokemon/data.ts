/* Pokémon game data — types, moves, species, encounter tables.
   Procedurally-rendered sprites; no copyrighted assets. */

export type PType =
  | "NORMAL"
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "FLYING"
  | "BUG"
  | "POISON";

export const TYPE_COLORS: Record<PType, string> = {
  NORMAL: "#a8a878",
  FIRE: "#f08030",
  WATER: "#6890f0",
  GRASS: "#78c850",
  ELECTRIC: "#f8d030",
  FLYING: "#a890f0",
  BUG: "#a8b820",
  POISON: "#a040a0",
};

// Effectiveness multiplier of attacker type vs defender type.
// 0 = no effect, 0.5 = not very, 1 = neutral, 2 = super effective.
const TC: Partial<Record<PType, Partial<Record<PType, number>>>> = {
  FIRE:     { GRASS: 2, WATER: 0.5, FIRE: 0.5, BUG: 2 },
  WATER:    { FIRE: 2, WATER: 0.5, GRASS: 0.5, ELECTRIC: 1 },
  GRASS:    { WATER: 2, FIRE: 0.5, GRASS: 0.5, FLYING: 0.5, BUG: 0.5, POISON: 0.5 },
  ELECTRIC: { WATER: 2, FLYING: 2, ELECTRIC: 0.5, GRASS: 0.5 },
  FLYING:   { GRASS: 2, BUG: 2, ELECTRIC: 0.5 },
  BUG:      { GRASS: 2, FIRE: 0.5, FLYING: 0.5, POISON: 0.5 },
  NORMAL:   {},
  POISON:   { GRASS: 2, POISON: 0.5 },
};

export function effectiveness(attack: PType, defender: PType[]): number {
  let mult = 1;
  for (const d of defender) {
    const v = TC[attack]?.[d];
    if (v !== undefined) mult *= v;
  }
  return mult;
}

export interface Move {
  id: string;
  name: string;
  type: PType;
  power: number;       // 0 = status only
  accuracy: number;    // 0-100
  pp: number;
  category: "PHYSICAL" | "SPECIAL" | "STATUS";
  description?: string;
}

export const MOVES: Record<string, Move> = {
  TACKLE:      { id: "TACKLE", name: "Azione",    type: "NORMAL",   power: 40, accuracy: 100, pp: 35, category: "PHYSICAL" },
  SCRATCH:     { id: "SCRATCH", name: "Graffio",  type: "NORMAL",   power: 40, accuracy: 100, pp: 35, category: "PHYSICAL" },
  GROWL:       { id: "GROWL", name: "Ruggito",    type: "NORMAL",   power: 0,  accuracy: 100, pp: 40, category: "STATUS" },
  EMBER:       { id: "EMBER", name: "Braciere",   type: "FIRE",     power: 40, accuracy: 100, pp: 25, category: "SPECIAL" },
  FLAME_WHEEL: { id: "FLAME_WHEEL", name: "Ruotafuoco", type: "FIRE", power: 60, accuracy: 100, pp: 25, category: "PHYSICAL" },
  WATER_GUN:   { id: "WATER_GUN", name: "Pistolacqua", type: "WATER", power: 40, accuracy: 100, pp: 25, category: "SPECIAL" },
  BUBBLE:      { id: "BUBBLE", name: "Bolla",     type: "WATER",    power: 40, accuracy: 100, pp: 30, category: "SPECIAL" },
  VINE_WHIP:   { id: "VINE_WHIP", name: "Frustata",type: "GRASS",   power: 45, accuracy: 100, pp: 25, category: "PHYSICAL" },
  LEAF:        { id: "LEAF", name: "Foglielama",  type: "GRASS",    power: 55, accuracy: 95,  pp: 25, category: "PHYSICAL" },
  THUNDERSHOCK:{ id: "THUNDERSHOCK", name: "Tuonoshock", type: "ELECTRIC", power: 40, accuracy: 100, pp: 30, category: "SPECIAL" },
  QUICK_ATTACK:{ id: "QUICK_ATTACK", name: "Attacco Rapido", type: "NORMAL", power: 40, accuracy: 100, pp: 30, category: "PHYSICAL" },
  GUST:        { id: "GUST", name: "Raffica",     type: "FLYING",   power: 40, accuracy: 100, pp: 35, category: "SPECIAL" },
  PECK:        { id: "PECK", name: "Beccata",     type: "FLYING",   power: 35, accuracy: 100, pp: 35, category: "PHYSICAL" },
  POISON_STING:{ id: "POISON_STING", name: "Velenospina", type: "POISON", power: 15, accuracy: 100, pp: 35, category: "PHYSICAL" },
  BUG_BITE:    { id: "BUG_BITE", name: "Morsoinsetto", type: "BUG", power: 60, accuracy: 100, pp: 20, category: "PHYSICAL" },
};

export interface SpeciesBase {
  id: string;
  dex: number;
  name: string;
  types: PType[];
  baseStats: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  catchRate: number;     // 0-255 (higher = easier)
  xpYield: number;       // base xp on defeat
  growthRate: "FAST" | "MEDIUM" | "SLOW";
  learnset: { level: number; move: string }[];
}

export const SPECIES: Record<string, SpeciesBase> = {
  FOGLIORA: {
    id: "FOGLIORA", dex: 1, name: "Fogliora",
    types: ["GRASS", "POISON"],
    baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 },
    catchRate: 45, xpYield: 64, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "TACKLE" },
      { level: 1, move: "GROWL" },
      { level: 4, move: "VINE_WHIP" },
      { level: 8, move: "LEAF" },
    ],
  },
  FIAMMINO: {
    id: "FIAMMINO", dex: 4, name: "Fiammino",
    types: ["FIRE"],
    baseStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 },
    catchRate: 45, xpYield: 65, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "SCRATCH" },
      { level: 1, move: "GROWL" },
      { level: 4, move: "EMBER" },
      { level: 9, move: "FLAME_WHEEL" },
    ],
  },
  ACQUAGUSCIO: {
    id: "ACQUAGUSCIO", dex: 7, name: "Acquaguscio",
    types: ["WATER"],
    baseStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 },
    catchRate: 45, xpYield: 66, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "TACKLE" },
      { level: 4, move: "BUBBLE" },
      { level: 7, move: "WATER_GUN" },
    ],
  },
  TOPOLAMPO: {
    id: "TOPOLAMPO", dex: 25, name: "Topolampo",
    types: ["ELECTRIC"],
    baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 },
    catchRate: 190, xpYield: 112, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "QUICK_ATTACK" },
      { level: 1, move: "GROWL" },
      { level: 5, move: "THUNDERSHOCK" },
    ],
  },
  RATTOLO: {
    id: "RATTOLO", dex: 19, name: "Rattolo",
    types: ["NORMAL"],
    baseStats: { hp: 30, atk: 56, def: 35, spa: 25, spd: 35, spe: 72 },
    catchRate: 255, xpYield: 51, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "TACKLE" },
      { level: 4, move: "QUICK_ATTACK" },
    ],
  },
  PICCIONE: {
    id: "PICCIONE", dex: 16, name: "Piccione",
    types: ["NORMAL", "FLYING"],
    baseStats: { hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56 },
    catchRate: 255, xpYield: 55, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "TACKLE" },
      { level: 5, move: "GUST" },
      { level: 9, move: "PECK" },
    ],
  },
  BRUCAFOGLIA: {
    id: "BRUCAFOGLIA", dex: 10, name: "Brucafoglia",
    types: ["BUG"],
    baseStats: { hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45 },
    catchRate: 255, xpYield: 39, growthRate: "MEDIUM",
    learnset: [
      { level: 1, move: "TACKLE" },
      { level: 6, move: "BUG_BITE" },
    ],
  },
};

export interface EncounterEntry {
  species: string;
  minLevel: number;
  maxLevel: number;
  weight: number;
}

export const TALL_GRASS_ENCOUNTERS: EncounterEntry[] = [
  { species: "RATTOLO",    minLevel: 2, maxLevel: 5, weight: 35 },
  { species: "PICCIONE",   minLevel: 2, maxLevel: 5, weight: 30 },
  { species: "BRUCAFOGLIA",minLevel: 2, maxLevel: 4, weight: 20 },
  { species: "TOPOLAMPO",  minLevel: 3, maxLevel: 6, weight:  8 },
  { species: "FOGLIORA",   minLevel: 4, maxLevel: 6, weight:  3 },
  { species: "FIAMMINO",   minLevel: 4, maxLevel: 6, weight:  2 },
  { species: "ACQUAGUSCIO",minLevel: 4, maxLevel: 6, weight:  2 },
];

export function pickEncounter(table: EncounterEntry[]): { species: string; level: number } {
  const total = table.reduce((s, e) => s + e.weight, 0);
  let r = Math.random() * total;
  for (const e of table) {
    r -= e.weight;
    if (r <= 0) {
      const level =
        e.minLevel + Math.floor(Math.random() * (e.maxLevel - e.minLevel + 1));
      return { species: e.species, level };
    }
  }
  const e = table[0];
  return { species: e.species, level: e.minLevel };
}

/* ---------- Pokémon instance + stat math ---------- */

export interface PokemonInstance {
  uid: number;
  species: string;
  nickname?: string;
  level: number;
  xp: number;
  ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  moves: { id: string; pp: number }[];
  hp: number;     // current HP
  status?: "PSN" | "BRN" | "PRZ" | "SLP" | "FRZ";
  fainted?: boolean;
}

let uidCounter = 1;
export function nextUid() { return uidCounter++; }

export function xpForLevel(level: number, rate: SpeciesBase["growthRate"]): number {
  if (rate === "FAST") return Math.floor(0.8 * level ** 3);
  if (rate === "SLOW") return Math.floor(1.25 * level ** 3);
  return level ** 3; // MEDIUM
}

export function calcStat(
  base: number,
  iv: number,
  level: number,
  isHp = false
): number {
  if (isHp) return Math.floor(((2 * base + iv) * level) / 100) + level + 10;
  return Math.floor(((2 * base + iv) * level) / 100) + 5;
}

export function maxHp(p: PokemonInstance): number {
  const sp = SPECIES[p.species];
  return calcStat(sp.baseStats.hp, p.ivs.hp, p.level, true);
}

export function statsOf(p: PokemonInstance) {
  const sp = SPECIES[p.species];
  const b = sp.baseStats;
  return {
    hp: calcStat(b.hp, p.ivs.hp, p.level, true),
    atk: calcStat(b.atk, p.ivs.atk, p.level),
    def: calcStat(b.def, p.ivs.def, p.level),
    spa: calcStat(b.spa, p.ivs.spa, p.level),
    spd: calcStat(b.spd, p.ivs.spd, p.level),
    spe: calcStat(b.spe, p.ivs.spe, p.level),
  };
}

export function randomIvs() {
  const r = () => Math.floor(Math.random() * 32);
  return { hp: r(), atk: r(), def: r(), spa: r(), spd: r(), spe: r() };
}

export function createWildPokemon(speciesId: string, level: number): PokemonInstance {
  const sp = SPECIES[speciesId];
  const moves: { id: string; pp: number }[] = [];
  for (const l of sp.learnset) {
    if (l.level <= level) {
      moves.push({ id: l.move, pp: MOVES[l.move].pp });
      if (moves.length >= 4) moves.shift();
    }
  }
  if (moves.length === 0) moves.push({ id: "TACKLE", pp: MOVES.TACKLE.pp });
  const ivs = randomIvs();
  const pkmn: PokemonInstance = {
    uid: nextUid(),
    species: speciesId,
    level,
    xp: xpForLevel(level, sp.growthRate),
    ivs,
    moves,
    hp: 0,
  };
  pkmn.hp = maxHp(pkmn);
  return pkmn;
}
