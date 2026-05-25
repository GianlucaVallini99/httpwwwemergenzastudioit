"use client";

import { useEffect, useRef, useState } from "react";
import {
  drawPlayer,
  drawGrassTile,
  drawTallGrassTile,
  drawTreeTile,
  drawWaterTile,
  drawPathTile,
  drawSandTile,
  drawBuildingTile,
  drawRoofTile,
  drawDoorTile,
  drawFlowerTile,
  drawSignTile,
  drawFenceTile,
  drawCreature,
  drawPokeball,
  drawText,
  measureText,
} from "./sprites";
import {
  TILE,
  MAP_W,
  MAP_H,
  getTile,
  isBlocked,
  isTallGrass,
  isInteractive,
  SPAWN,
} from "./map";
import {
  MOVES,
  SPECIES,
  TYPE_COLORS,
  TALL_GRASS_ENCOUNTERS,
  pickEncounter,
  createWildPokemon,
  maxHp,
  statsOf,
  xpForLevel,
  effectiveness,
  type PokemonInstance,
  type Move,
} from "./data";

/* ───── Constants ───── */
const TILE_SIZE = 16;
const VIEW_W = 240; // GBA-style logical width
const VIEW_H = 160;
const VIEW_TILES_X = VIEW_W / TILE_SIZE; // 15
const VIEW_TILES_Y = VIEW_H / TILE_SIZE; // 10
const SCALE = 3; // CSS scaling factor
const MOVE_FRAMES = 16; // frames to slide one tile
const ENCOUNTER_CHANCE = 0.12;

type Direction = "up" | "down" | "left" | "right";

interface OverworldState {
  scene: "OVERWORLD";
  playerX: number;
  playerY: number;
  facing: Direction;
  moving: { dx: number; dy: number; frame: number } | null;
  stepCount: number;
}

type BattlePhase =
  | { kind: "INTRO" }
  | { kind: "MENU" }
  | { kind: "FIGHT" }
  | { kind: "BAG" }
  | { kind: "PARTY" }
  | { kind: "PLAYER_ATTACK"; move: Move; frame: number }
  | { kind: "ENEMY_ATTACK"; move: Move; frame: number }
  | { kind: "DAMAGE"; target: "player" | "enemy"; frame: number; amount: number; effectiveness: number }
  | { kind: "MISS"; target: "player" | "enemy"; frame: number }
  | { kind: "FAINT"; target: "player" | "enemy"; frame: number }
  | { kind: "XP_GAIN"; gained: number; frame: number }
  | { kind: "LEVEL_UP"; oldLevel: number; newLevel: number; frame: number }
  | { kind: "MOVE_LEARN"; move: string; frame: number }
  | { kind: "VICTORY" }
  | { kind: "DEFEAT" }
  | { kind: "RUN_FAIL"; frame: number }
  | { kind: "RUN_SUCCESS" }
  | { kind: "THROW_BALL"; frame: number }
  | { kind: "BALL_SHAKE"; frame: number; shakes: number; willCatch: boolean }
  | { kind: "CAUGHT"; frame: number }
  | { kind: "BROKE_FREE"; frame: number }
  | { kind: "SWITCH_OUT"; frame: number }
  | { kind: "SWITCH_IN"; frame: number };

interface BattleState {
  scene: "BATTLE";
  player: PokemonInstance;
  enemy: PokemonInstance;
  playerActive: number; // index in party
  phase: BattlePhase;
  menuIndex: number;
  moveIndex: number;
  bagIndex: number;
  partyIndex: number;
  dialogue: string;
  dialogueQueue: string[];
  battleType: "WILD";
  fleeAttempts: number;
  // null = no second move queued (used potion/threw ball/etc.)
  // "enemy" = enemy still needs to attack this round
  // "player" = player still needs to attack (queued because enemy was faster)
  secondActor: "player" | "enemy" | null;
  pendingPlayerMove?: Move;
  pendingEnemyMove?: Move;
}

interface DialogueState {
  scene: "DIALOGUE";
  text: string;
  queue: string[];
  charsShown: number;
  prev: OverworldState | BattleState | StartMenuState;
}

interface StartMenuState {
  scene: "START_MENU";
  index: number;
  prev: OverworldState | BattleState;
}

interface PartyMenuState {
  scene: "PARTY_MENU";
  index: number;
  prev: OverworldState | BattleState;
  context: "VIEW" | "BATTLE_SWITCH";
}

interface BagMenuState {
  scene: "BAG_MENU";
  index: number;
  prev: OverworldState | BattleState;
  context: "VIEW" | "BATTLE_USE";
}

interface TitleState {
  scene: "TITLE";
  index: number; // 0=NEW GAME, 1=CONTINUE
  blinkFrame: number;
  menuOpen: boolean;
}

interface StarterPickState {
  scene: "STARTER_PICK";
  index: number;
}

type Scene =
  | TitleState
  | StarterPickState
  | OverworldState
  | BattleState
  | DialogueState
  | StartMenuState
  | PartyMenuState
  | BagMenuState;

interface SaveData {
  party: PokemonInstance[];
  bag: { pokeballs: number; potions: number };
  playerX: number;
  playerY: number;
  facing: Direction;
}

const SAVE_KEY = "pokemon-smeraldo-save-v1";

/* ───── Damage calc (simplified Gen III formula) ───── */
function calcDamage(
  attacker: PokemonInstance,
  defender: PokemonInstance,
  move: Move
): { damage: number; effectiveness: number; crit: boolean } {
  if (move.power === 0) return { damage: 0, effectiveness: 1, crit: false };
  const aStats = statsOf(attacker);
  const dStats = statsOf(defender);
  const A = move.category === "PHYSICAL" ? aStats.atk : aStats.spa;
  const D = move.category === "PHYSICAL" ? dStats.def : dStats.spd;
  const level = attacker.level;
  const base = Math.floor(
    Math.floor(((2 * level) / 5 + 2) * move.power * (A / Math.max(1, D))) / 50
  ) + 2;
  const sp = SPECIES[attacker.species];
  const stab = sp.types.includes(move.type) ? 1.5 : 1;
  const eff = effectiveness(move.type, SPECIES[defender.species].types);
  const crit = Math.random() < 1 / 16 ? 2 : 1;
  const rand = (85 + Math.floor(Math.random() * 16)) / 100;
  const dmg = Math.max(eff === 0 ? 0 : 1, Math.floor(base * stab * eff * crit * rand));
  return { damage: dmg, effectiveness: eff, crit: crit > 1 };
}

function expGain(defeated: PokemonInstance): number {
  const sp = SPECIES[defeated.species];
  return Math.floor((sp.xpYield * defeated.level) / 7);
}

function shouldLevelUp(p: PokemonInstance): boolean {
  const sp = SPECIES[p.species];
  return p.xp >= xpForLevel(p.level + 1, sp.growthRate);
}

function newMovesAtLevel(p: PokemonInstance, level: number): string[] {
  const sp = SPECIES[p.species];
  return sp.learnset.filter((l) => l.level === level).map((l) => l.move);
}

function attemptCatch(enemy: PokemonInstance, ballBonus = 1): { caught: boolean; shakes: number } {
  const sp = SPECIES[enemy.species];
  const maxHpVal = maxHp(enemy);
  const statusBonus = enemy.status ? 1.5 : 1;
  const a =
    ((3 * maxHpVal - 2 * enemy.hp) * sp.catchRate * ballBonus) /
    (3 * maxHpVal) *
    statusBonus;
  const aClamped = Math.min(255, Math.max(1, a));
  if (aClamped >= 255) return { caught: true, shakes: 3 };
  const b = Math.floor(65535 / Math.sqrt(Math.sqrt(255 / aClamped)));
  let shakes = 0;
  for (let i = 0; i < 4; i++) {
    if (Math.random() * 65535 < b) shakes++;
    else break;
  }
  return { caught: shakes === 4, shakes };
}

/* ───── Save/Load ───── */
function saveGame(data: SaveData) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}
function loadGame(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveData;
  } catch { return null; }
}
function hasSave(): boolean {
  try { return !!localStorage.getItem(SAVE_KEY); } catch { return false; }
}

/* ───── HP bar ───── */
function drawHpBar(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  current: number, max: number
) {
  ctx.fillStyle = "#000000"; ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  ctx.fillStyle = "#202020"; ctx.fillRect(x, y, w, h);
  const ratio = Math.max(0, current / max);
  const fillW = Math.max(0, Math.floor(w * ratio));
  let color = "#48d048";
  if (ratio < 0.5) color = "#f8c830";
  if (ratio < 0.2) color = "#e84040";
  ctx.fillStyle = color; ctx.fillRect(x, y, fillW, h);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillRect(x, y, fillW, 1);
}

/* ───── Render helpers ───── */
function drawDialogBox(ctx: CanvasRenderingContext2D, text: string, charsShown: number) {
  const x = 4, y = VIEW_H - 44, w = VIEW_W - 8, h = 40;
  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(x + 2, y + 2, w, h);
  // box
  ctx.fillStyle = "#f8f8f8"; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#3050a8"; ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);
  ctx.fillStyle = "#80a0d8"; ctx.fillRect(x + 2, y + 2, 1, 1); ctx.fillRect(x + w - 3, y + 2, 1, 1);
  ctx.fillRect(x + 2, y + h - 3, 1, 1); ctx.fillRect(x + w - 3, y + h - 3, 1, 1);

  // word-wrap
  const maxCharsPerLine = 32;
  const lines: string[] = [];
  let cursor = 0;
  const shown = text.slice(0, charsShown);
  while (cursor < shown.length) {
    let end = Math.min(shown.length, cursor + maxCharsPerLine);
    if (end < shown.length) {
      const lastSpace = shown.lastIndexOf(" ", end);
      if (lastSpace > cursor) end = lastSpace;
    }
    lines.push(shown.slice(cursor, end));
    cursor = end + 1;
    if (lines.length >= 3) break;
  }
  for (let i = 0; i < lines.length; i++) {
    drawText(ctx, lines[i], x + 6, y + 6 + i * 10, "#202020", 1);
  }
}

function drawMenuBox(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number
) {
  ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(x + 2, y + 2, w, h);
  ctx.fillStyle = "#f8f8f8"; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "#3050a8";
  ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
  ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#202020";
  ctx.fillRect(x, y, 1, 5);
  ctx.fillRect(x + 1, y + 1, 1, 3);
  ctx.fillRect(x + 2, y + 2, 1, 1);
}

/* ─────────────────── Main component ─────────────────── */
export default function PokemonGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene>({ scene: "TITLE", index: 0, blinkFrame: 0, menuOpen: false });
  const partyRef = useRef<PokemonInstance[]>([]);
  const bagRef = useRef({ pokeballs: 5, potions: 3 });
  const keysRef = useRef<Set<string>>(new Set());
  const justPressedRef = useRef<Set<string>>(new Set());
  const frameRef = useRef(0);
  const [, setTick] = useState(0); // forces re-render on scene change

  // Re-render React tree when scene "kind" changes (used for accessibility text mostly)
  const sceneKindRef = useRef("TITLE");

  /* ───── Helpers tied to refs ───── */
  const setScene = (s: Scene) => {
    sceneRef.current = s;
    if (sceneKindRef.current !== s.scene) {
      sceneKindRef.current = s.scene;
      setTick((t) => t + 1);
    }
  };

  const goToDialogue = (
    queue: string[],
    after: OverworldState | BattleState | StartMenuState
  ) => {
    if (queue.length === 0) {
      setScene(after);
      return;
    }
    const [first, ...rest] = queue;
    setScene({
      scene: "DIALOGUE",
      text: first,
      queue: [...rest, "__END__"],
      charsShown: 0,
      prev: after,
    });
  };

  const startBattle = (wild: PokemonInstance) => {
    const party = partyRef.current;
    const active = party.findIndex((p) => p.hp > 0 && !p.fainted);
    if (active < 0) {
      // whiteout
      goToDialogue(
        ["Non hai Pokémon in grado di combattere..."],
        { scene: "OVERWORLD", playerX: SPAWN.x, playerY: SPAWN.y, facing: "down", moving: null, stepCount: 0 }
      );
      return;
    }
    const playerMon = party[active];
    const enemyName = SPECIES[wild.species].name;
    setScene({
      scene: "BATTLE",
      player: playerMon,
      enemy: wild,
      playerActive: active,
      phase: { kind: "INTRO" },
      menuIndex: 0,
      moveIndex: 0,
      bagIndex: 0,
      partyIndex: 0,
      dialogue: `Un ${enemyName} selvatico\nappare!`,
      dialogueQueue: [`Vai! ${SPECIES[playerMon.species].name}!`],
      battleType: "WILD",
      fleeAttempts: 0,
      secondActor: null,
    });
  };

  const saveCurrent = () => {
    const cur = sceneRef.current;
    if (cur.scene === "OVERWORLD") {
      saveGame({
        party: partyRef.current,
        bag: bagRef.current,
        playerX: cur.playerX,
        playerY: cur.playerY,
        facing: cur.facing,
      });
    }
  };

  /* ───── Input handling ───── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "INPUT") return;
      // prevent scroll
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) {
        e.preventDefault();
      }
      if (!keysRef.current.has(k)) justPressedRef.current.add(k);
      keysRef.current.add(k);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  /* ───── Game loop ───── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    const loop = () => {
      frameRef.current++;
      update();
      render(ctx);
      justPressedRef.current.clear();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ────────── UPDATE ────────── */
  function update() {
    const s = sceneRef.current;
    const pressed = justPressedRef.current;
    const down = keysRef.current;
    const isPressed = (...keys: string[]) => keys.some((k) => pressed.has(k));
    const isDown = (...keys: string[]) => keys.some((k) => down.has(k));

    switch (s.scene) {
      case "TITLE": {
        s.blinkFrame++;
        if (!s.menuOpen) {
          if (isPressed("z", "enter", " ")) {
            if (hasSave()) {
              s.menuOpen = true;
              s.index = 0;
            } else {
              setScene({ scene: "STARTER_PICK", index: 0 });
              return;
            }
          }
        } else {
          if (isPressed("arrowup", "arrowleft")) s.index = (s.index + 1) % 2;
          if (isPressed("arrowdown", "arrowright")) s.index = (s.index + 1) % 2;
          if (isPressed("x", "escape")) {
            s.menuOpen = false;
            return;
          }
          if (isPressed("z", "enter")) {
            if (s.index === 0) {
              try { localStorage.removeItem(SAVE_KEY); } catch { /* */ }
              partyRef.current = [];
              bagRef.current = { pokeballs: 5, potions: 3 };
              setScene({ scene: "STARTER_PICK", index: 0 });
            } else {
              const sv = loadGame();
              if (sv) {
                partyRef.current = sv.party;
                bagRef.current = sv.bag;
                setScene({
                  scene: "OVERWORLD",
                  playerX: sv.playerX,
                  playerY: sv.playerY,
                  facing: sv.facing,
                  moving: null,
                  stepCount: 0,
                });
              }
            }
          }
        }
        break;
      }

      case "STARTER_PICK": {
        const starters = ["FOGLIORA", "FIAMMINO", "ACQUAGUSCIO"];
        if (isPressed("arrowleft")) s.index = (s.index + 2) % 3;
        if (isPressed("arrowright")) s.index = (s.index + 1) % 3;
        if (isPressed("z", "enter")) {
          const chosen = createWildPokemon(starters[s.index], 5);
          partyRef.current = [chosen];
          bagRef.current = { pokeballs: 5, potions: 3 };
          const ow: OverworldState = {
            scene: "OVERWORLD",
            playerX: SPAWN.x,
            playerY: SPAWN.y,
            facing: "down",
            moving: null,
            stepCount: 0,
          };
          goToDialogue(
            [
              `Hai scelto ${SPECIES[chosen.species].name}!`,
              "Esplora l'erba alta per trovare\nPokémon selvatici. Buona fortuna!",
            ],
            ow
          );
        }
        break;
      }

      case "OVERWORLD": {
        updateOverworld(s, isPressed, isDown);
        break;
      }

      case "BATTLE": {
        updateBattle(s, isPressed);
        break;
      }

      case "DIALOGUE": {
        if (s.charsShown < s.text.length) {
          // advance text 1 char per 2 frames; instant on press
          if (isPressed("z", "enter", " ")) {
            s.charsShown = s.text.length;
          } else if (frameRef.current % 2 === 0) {
            s.charsShown++;
          }
        } else {
          if (isPressed("z", "enter", " ", "x")) {
            const next = s.queue[0];
            if (next === "__END__" || next === undefined) {
              setScene(s.prev);
            } else {
              setScene({
                scene: "DIALOGUE",
                text: next,
                queue: s.queue.slice(1),
                charsShown: 0,
                prev: s.prev,
              });
            }
          }
        }
        break;
      }

      case "START_MENU": {
        const items = ["POKéMON", "BORSA", "SALVA", "ESCI"];
        if (isPressed("arrowup")) s.index = (s.index + items.length - 1) % items.length;
        if (isPressed("arrowdown")) s.index = (s.index + 1) % items.length;
        if (isPressed("x", "escape", "enter")) setScene(s.prev);
        if (isPressed("z")) {
          if (s.index === 0) {
            setScene({ scene: "PARTY_MENU", index: 0, prev: s.prev, context: "VIEW" });
          } else if (s.index === 1) {
            setScene({ scene: "BAG_MENU", index: 0, prev: s.prev, context: "VIEW" });
          } else if (s.index === 2) {
            saveCurrent();
            goToDialogue(["Partita salvata!"], s.prev as OverworldState);
          } else if (s.index === 3) {
            setScene(s.prev);
          }
        }
        break;
      }

      case "PARTY_MENU": {
        const party = partyRef.current;
        if (party.length === 0) { setScene(s.prev); return; }
        if (isPressed("arrowup")) s.index = (s.index + party.length - 1) % party.length;
        if (isPressed("arrowdown")) s.index = (s.index + 1) % party.length;
        if (isPressed("x", "escape")) setScene(s.prev);
        if (isPressed("z", "enter")) {
          if (s.context === "BATTLE_SWITCH") {
            const target = party[s.index];
            const battle = s.prev as BattleState;
            if (target.fainted || target.hp <= 0) {
              // can't switch to fainted
              return;
            }
            if (s.index === battle.playerActive) {
              setScene(s.prev);
              return;
            }
            battle.playerActive = s.index;
            battle.player = target;
            battle.phase = { kind: "SWITCH_IN", frame: 0 };
            battle.dialogue = `Vai! ${SPECIES[target.species].name}!`;
            setScene(s.prev);
          } else {
            // just close
            setScene(s.prev);
          }
        }
        break;
      }

      case "BAG_MENU": {
        if (isPressed("x", "escape")) setScene(s.prev);
        const opts: { name: string; count: number; id: string }[] = [
          { name: "Poké Ball", count: bagRef.current.pokeballs, id: "POKEBALL" },
          { name: "Pozione", count: bagRef.current.potions, id: "POTION" },
        ];
        if (isPressed("arrowup")) s.index = (s.index + opts.length - 1) % opts.length;
        if (isPressed("arrowdown")) s.index = (s.index + 1) % opts.length;
        if (isPressed("z", "enter")) {
          if (s.context === "BATTLE_USE") {
            const battle = s.prev as BattleState;
            const choice = opts[s.index];
            if (choice.id === "POKEBALL" && bagRef.current.pokeballs > 0) {
              bagRef.current.pokeballs--;
              battle.dialogue = "Lanciamo una Poké Ball!";
              battle.phase = { kind: "THROW_BALL", frame: 0 };
              setScene(s.prev);
            } else if (choice.id === "POTION" && bagRef.current.potions > 0) {
              if (battle.player.hp >= maxHp(battle.player)) {
                battle.dialogue = `${SPECIES[battle.player.species].name} ha già\ni PS al massimo.`;
                battle.phase = { kind: "MENU" };
                setScene(s.prev);
              } else {
                bagRef.current.potions--;
                const before = battle.player.hp;
                battle.player.hp = Math.min(maxHp(battle.player), battle.player.hp + 20);
                battle.dialogue = `Hai usato una Pozione!\n${SPECIES[battle.player.species].name} recupera ${battle.player.hp - before} PS.`;
                // enemy still gets to attack
                const enemyMove = pickEnemyMove(battle.enemy);
                battle.phase = { kind: "ENEMY_ATTACK", move: enemyMove, frame: 0 };
                setScene(s.prev);
              }
            }
          } else {
            // Standalone use: potion on first party member
            const choice = opts[s.index];
            if (choice.id === "POTION" && bagRef.current.potions > 0) {
              const target = partyRef.current[0];
              if (target.hp < maxHp(target)) {
                bagRef.current.potions--;
                target.hp = Math.min(maxHp(target), target.hp + 20);
              }
            }
          }
        }
        break;
      }
    }
  }

  /* ───── Overworld update ───── */
  function updateOverworld(
    s: OverworldState,
    isPressed: (...keys: string[]) => boolean,
    isDown: (...keys: string[]) => boolean
  ) {
    // Open menu
    if (isPressed("enter", "escape")) {
      setScene({ scene: "START_MENU", index: 0, prev: s });
      return;
    }

    // Interact
    if (isPressed("z")) {
      const dx = s.facing === "left" ? -1 : s.facing === "right" ? 1 : 0;
      const dy = s.facing === "up" ? -1 : s.facing === "down" ? 1 : 0;
      const tx = s.playerX + dx, ty = s.playerY + dy;
      const inter = isInteractive(tx, ty);
      if (inter === "sign") {
        goToDialogue(
          [
            "CARTELLO:\n«Sentiero per la Foresta».",
            "Attento! Nell'erba alta vivono\nPokémon selvatici.",
          ],
          s
        );
        return;
      }
      if (inter === "door") {
        goToDialogue(["La porta è chiusa a chiave..."], s);
        return;
      }
    }

    // Movement
    if (s.moving) {
      s.moving.frame++;
      if (s.moving.frame >= MOVE_FRAMES) {
        s.playerX += s.moving.dx;
        s.playerY += s.moving.dy;
        s.moving = null;
        s.stepCount++;
        // Encounter check
        if (isTallGrass(s.playerX, s.playerY)) {
          if (Math.random() < ENCOUNTER_CHANCE) {
            const enc = pickEncounter(TALL_GRASS_ENCOUNTERS);
            const wild = createWildPokemon(enc.species, enc.level);
            startBattle(wild);
            return;
          }
        }
      }
    } else {
      let dx = 0, dy = 0;
      let dir: Direction | null = null;
      if (isDown("arrowup", "w")) { dy = -1; dir = "up"; }
      else if (isDown("arrowdown", "s")) { dy = 1; dir = "down"; }
      else if (isDown("arrowleft", "a")) { dx = -1; dir = "left"; }
      else if (isDown("arrowright", "d")) { dx = 1; dir = "right"; }

      if (dir) {
        s.facing = dir;
        const nx = s.playerX + dx, ny = s.playerY + dy;
        if (!isBlocked(nx, ny)) {
          s.moving = { dx, dy, frame: 0 };
        }
      }
    }
  }

  /* ───── Battle update ───── */
  function updateBattle(s: BattleState, isPressed: (...keys: string[]) => boolean) {
    const phase = s.phase;
    switch (phase.kind) {
      case "INTRO": {
        // wait then go to player menu after dialogue advance
        if (isPressed("z", "enter", "x", " ")) {
          if (s.dialogueQueue.length > 0) {
            s.dialogue = s.dialogueQueue[0];
            s.dialogueQueue = s.dialogueQueue.slice(1);
          } else {
            s.phase = { kind: "MENU" };
            s.dialogue = `Cosa deve fare\n${SPECIES[s.player.species].name}?`;
          }
        }
        break;
      }
      case "MENU": {
        const cols = 2;
        if (isPressed("arrowright")) s.menuIndex = (s.menuIndex + 1) % 4;
        if (isPressed("arrowleft")) s.menuIndex = (s.menuIndex + 3) % 4;
        if (isPressed("arrowdown")) s.menuIndex = (s.menuIndex + cols) % 4;
        if (isPressed("arrowup")) s.menuIndex = (s.menuIndex + 4 - cols) % 4;
        if (isPressed("z", "enter")) {
          if (s.menuIndex === 0) { s.phase = { kind: "FIGHT" }; s.moveIndex = 0; }
          else if (s.menuIndex === 1) {
            setScene({ scene: "BAG_MENU", index: 0, prev: s, context: "BATTLE_USE" });
          }
          else if (s.menuIndex === 2) {
            setScene({ scene: "PARTY_MENU", index: 0, prev: s, context: "BATTLE_SWITCH" });
          }
          else if (s.menuIndex === 3) {
            // RUN
            tryRun(s);
          }
        }
        break;
      }
      case "FIGHT": {
        const moves = s.player.moves;
        if (isPressed("arrowright")) s.moveIndex = Math.min(moves.length - 1, s.moveIndex + 1);
        if (isPressed("arrowleft")) s.moveIndex = Math.max(0, s.moveIndex - 1);
        if (isPressed("arrowdown")) s.moveIndex = Math.min(moves.length - 1, s.moveIndex + 2);
        if (isPressed("arrowup")) s.moveIndex = Math.max(0, s.moveIndex - 2);
        if (isPressed("x", "escape")) { s.phase = { kind: "MENU" }; return; }
        if (isPressed("z", "enter")) {
          const moveSlot = moves[s.moveIndex];
          if (moveSlot.pp <= 0) {
            s.dialogue = "Niente più PP per questa mossa!";
            return;
          }
          executeTurn(s, moveSlot);
        }
        break;
      }
      case "PLAYER_ATTACK": {
        phase.frame++;
        if (phase.frame === 1) {
          const moveDef = phase.move;
          s.dialogue = `${SPECIES[s.player.species].name} usa\n${moveDef.name}!`;
        }
        if (phase.frame >= 40) {
          // resolve hit
          const moveDef = phase.move;
          // accuracy
          if (Math.random() * 100 > moveDef.accuracy) {
            s.phase = { kind: "MISS", target: "enemy", frame: 0 };
            return;
          }
          const dmg = calcDamage(s.player, s.enemy, moveDef);
          s.enemy.hp = Math.max(0, s.enemy.hp - dmg.damage);
          s.phase = { kind: "DAMAGE", target: "enemy", frame: 0, amount: dmg.damage, effectiveness: dmg.effectiveness };
        }
        break;
      }
      case "ENEMY_ATTACK": {
        phase.frame++;
        if (phase.frame === 1) {
          s.dialogue = `${SPECIES[s.enemy.species].name} usa\n${phase.move.name}!`;
        }
        if (phase.frame >= 40) {
          const moveDef = phase.move;
          if (Math.random() * 100 > moveDef.accuracy) {
            s.phase = { kind: "MISS", target: "player", frame: 0 };
            return;
          }
          const dmg = calcDamage(s.enemy, s.player, moveDef);
          s.player.hp = Math.max(0, s.player.hp - dmg.damage);
          s.phase = { kind: "DAMAGE", target: "player", frame: 0, amount: dmg.damage, effectiveness: dmg.effectiveness };
        }
        break;
      }
      case "DAMAGE": {
        phase.frame++;
        if (phase.frame === 1) {
          if (phase.effectiveness === 0) {
            s.dialogue = "Non ha alcun effetto...";
          } else if (phase.effectiveness > 1) {
            s.dialogue = "È superefficace!";
          } else if (phase.effectiveness < 1) {
            s.dialogue = "Non è molto efficace...";
          } else {
            s.dialogue = " ";
          }
        }
        if (phase.frame >= 50) {
          // check faint
          if (phase.target === "enemy" && s.enemy.hp <= 0) {
            s.phase = { kind: "FAINT", target: "enemy", frame: 0 };
            s.enemy.fainted = true;
          } else if (phase.target === "player" && s.player.hp <= 0) {
            s.phase = { kind: "FAINT", target: "player", frame: 0 };
            s.player.fainted = true;
          } else {
            advanceAfterAction(s);
          }
        }
        break;
      }
      case "MISS": {
        phase.frame++;
        if (phase.frame === 1) {
          s.dialogue = "Ha mancato!";
        }
        if (phase.frame >= 40) {
          advanceAfterAction(s);
        }
        break;
      }
      case "FAINT": {
        phase.frame++;
        if (phase.frame === 1) {
          const target = phase.target === "enemy" ? s.enemy : s.player;
          s.dialogue = `${SPECIES[target.species].name}\nè esausto!`;
        }
        if (phase.frame >= 50) {
          if (phase.target === "enemy") {
            // xp gain
            const xp = expGain(s.enemy);
            s.player.xp += xp;
            s.phase = { kind: "XP_GAIN", gained: xp, frame: 0 };
          } else {
            // check if any other party member alive
            const next = partyRef.current.find(
              (p, i) => i !== s.playerActive && p.hp > 0 && !p.fainted
            );
            if (next) {
              setScene({ scene: "PARTY_MENU", index: 0, prev: s, context: "BATTLE_SWITCH" });
              return;
            }
            s.phase = { kind: "DEFEAT" };
            s.dialogue = "Tutti i tuoi Pokémon sono esausti!\nFuggi precipitosamente al rifugio...";
          }
        }
        break;
      }
      case "XP_GAIN": {
        phase.frame++;
        if (phase.frame === 1) {
          s.dialogue = `${SPECIES[s.player.species].name} guadagna\n${phase.gained} Punti Esp.!`;
        }
        if (phase.frame >= 60) {
          if (shouldLevelUp(s.player)) {
            const oldLevel = s.player.level;
            s.player.level++;
            // restore HP slightly
            const newMax = maxHp(s.player);
            s.player.hp = Math.min(newMax, s.player.hp + (newMax - maxHp({ ...s.player, level: oldLevel })));
            s.phase = { kind: "LEVEL_UP", oldLevel, newLevel: s.player.level, frame: 0 };
          } else {
            s.phase = { kind: "VICTORY" };
          }
        }
        break;
      }
      case "LEVEL_UP": {
        phase.frame++;
        if (phase.frame === 1) {
          s.dialogue = `${SPECIES[s.player.species].name} sale\nal livello ${phase.newLevel}!`;
        }
        if (phase.frame >= 60) {
          // learn new moves
          const newMoves = newMovesAtLevel(s.player, phase.newLevel);
          if (newMoves.length > 0) {
            const moveId = newMoves[0];
            if (s.player.moves.find((m) => m.id === moveId)) {
              s.phase = { kind: "VICTORY" };
              return;
            }
            if (s.player.moves.length < 4) {
              s.player.moves.push({ id: moveId, pp: MOVES[moveId].pp });
              s.phase = { kind: "MOVE_LEARN", move: moveId, frame: 0 };
            } else {
              // replace last
              s.player.moves[3] = { id: moveId, pp: MOVES[moveId].pp };
              s.phase = { kind: "MOVE_LEARN", move: moveId, frame: 0 };
            }
          } else {
            // check more level ups
            if (shouldLevelUp(s.player)) {
              const oldLevel = s.player.level;
              s.player.level++;
              s.phase = { kind: "LEVEL_UP", oldLevel, newLevel: s.player.level, frame: 0 };
            } else {
              s.phase = { kind: "VICTORY" };
            }
          }
        }
        break;
      }
      case "MOVE_LEARN": {
        phase.frame++;
        if (phase.frame === 1) {
          s.dialogue = `${SPECIES[s.player.species].name} impara\n${MOVES[phase.move].name}!`;
        }
        if (phase.frame >= 50) {
          if (shouldLevelUp(s.player)) {
            const oldLevel = s.player.level;
            s.player.level++;
            s.phase = { kind: "LEVEL_UP", oldLevel, newLevel: s.player.level, frame: 0 };
          } else {
            s.phase = { kind: "VICTORY" };
          }
        }
        break;
      }
      case "VICTORY": {
        if (isPressed("z", "enter", " ", "x")) endBattle(s, true);
        break;
      }
      case "DEFEAT": {
        if (isPressed("z", "enter", " ", "x")) {
          // heal party fully and return to spawn
          for (const p of partyRef.current) {
            p.hp = maxHp(p);
            p.fainted = false;
            p.status = undefined;
            for (const m of p.moves) m.pp = MOVES[m.id].pp;
          }
          setScene({
            scene: "OVERWORLD",
            playerX: SPAWN.x,
            playerY: SPAWN.y,
            facing: "down",
            moving: null,
            stepCount: 0,
          });
        }
        break;
      }
      case "RUN_FAIL": {
        phase.frame++;
        if (phase.frame === 1) s.dialogue = "Non puoi scappare!";
        if (phase.frame >= 40) {
          const m = pickEnemyMove(s.enemy);
          s.phase = { kind: "ENEMY_ATTACK", move: m, frame: 0 };
        }
        break;
      }
      case "RUN_SUCCESS": {
        if (isPressed("z", "enter", " ", "x")) endBattle(s, false);
        break;
      }
      case "THROW_BALL": {
        phase.frame++;
        if (phase.frame >= 50) {
          const result = attemptCatch(s.enemy);
          s.phase = { kind: "BALL_SHAKE", frame: 0, shakes: 0, willCatch: result.caught };
          (s.phase as { totalShakes: number } & typeof s.phase).totalShakes = result.shakes;
        }
        break;
      }
      case "BALL_SHAKE": {
        phase.frame++;
        const ph = phase as typeof phase & { totalShakes: number };
        if (phase.frame === 30 || phase.frame === 60 || phase.frame === 90) {
          phase.shakes++;
        }
        if (phase.shakes > ph.totalShakes && !phase.willCatch) {
          s.dialogue = `Oh no! ${SPECIES[s.enemy.species].name}\nè scappato!`;
          s.phase = { kind: "BROKE_FREE", frame: 0 };
          return;
        }
        if (phase.frame >= 120 && phase.willCatch) {
          s.phase = { kind: "CAUGHT", frame: 0 };
          s.dialogue = `Hai catturato\n${SPECIES[s.enemy.species].name}!`;
          if (partyRef.current.length < 6) partyRef.current.push(s.enemy);
        }
        break;
      }
      case "CAUGHT": {
        if (isPressed("z", "enter", " ", "x")) endBattle(s, true);
        break;
      }
      case "BROKE_FREE": {
        phase.frame++;
        if (phase.frame >= 40) {
          const m = pickEnemyMove(s.enemy);
          s.phase = { kind: "ENEMY_ATTACK", move: m, frame: 0 };
        }
        break;
      }
      case "SWITCH_IN": {
        phase.frame++;
        if (phase.frame >= 40) {
          s.phase = { kind: "MENU" };
          s.dialogue = `Cosa deve fare\n${SPECIES[s.player.species].name}?`;
        }
        break;
      }
      case "SWITCH_OUT": {
        phase.frame++;
        if (phase.frame >= 20) {
          s.phase = { kind: "SWITCH_IN", frame: 0 };
        }
        break;
      }
    }
  }

  function pickEnemyMove(enemy: PokemonInstance): Move {
    const available = enemy.moves.filter((m) => m.pp > 0);
    const pool = available.length > 0 ? available : enemy.moves;
    const sel = pool[Math.floor(Math.random() * pool.length)];
    sel.pp = Math.max(0, sel.pp - 1);
    return MOVES[sel.id];
  }

  function executeTurn(s: BattleState, playerMoveSlot: { id: string; pp: number }) {
    playerMoveSlot.pp = Math.max(0, playerMoveSlot.pp - 1);
    const move = MOVES[playerMoveSlot.id];
    const playerSpeed = statsOf(s.player).spe;
    const enemySpeed = statsOf(s.enemy).spe;
    const enemyMove = pickEnemyMove(s.enemy);
    if (playerSpeed >= enemySpeed) {
      // player goes first; enemy is queued as the second actor.
      s.pendingEnemyMove = enemyMove;
      s.secondActor = "enemy";
      s.phase = { kind: "PLAYER_ATTACK", move, frame: 0 };
    } else {
      // enemy goes first; player's move is queued as the second actor.
      s.pendingPlayerMove = move;
      s.secondActor = "player";
      s.phase = { kind: "ENEMY_ATTACK", move: enemyMove, frame: 0 };
    }
  }

  function advanceAfterAction(s: BattleState) {
    // Called when a PLAYER_ATTACK or ENEMY_ATTACK has resolved (DAMAGE or MISS).
    if (s.secondActor === "enemy" && s.pendingEnemyMove) {
      const m = s.pendingEnemyMove;
      s.pendingEnemyMove = undefined;
      s.secondActor = null;
      s.phase = { kind: "ENEMY_ATTACK", move: m, frame: 0 };
      return;
    }
    if (s.secondActor === "player" && s.pendingPlayerMove) {
      const m = s.pendingPlayerMove;
      s.pendingPlayerMove = undefined;
      s.secondActor = null;
      s.phase = { kind: "PLAYER_ATTACK", move: m, frame: 0 };
      return;
    }
    // Round over — back to menu.
    s.secondActor = null;
    s.phase = { kind: "MENU" };
    s.dialogue = `Cosa deve fare\n${SPECIES[s.player.species].name}?`;
  }

  function tryRun(s: BattleState) {
    s.fleeAttempts++;
    const playerSpeed = statsOf(s.player).spe;
    const enemySpeed = statsOf(s.enemy).spe;
    const odds = ((playerSpeed * 32) / Math.max(1, Math.floor(enemySpeed / 4)) + 30 * s.fleeAttempts);
    if (odds >= 256 || Math.random() * 256 < odds) {
      s.phase = { kind: "RUN_SUCCESS" };
      s.dialogue = "Sei fuggito!";
    } else {
      s.phase = { kind: "RUN_FAIL", frame: 0 };
    }
  }

  function endBattle(s: BattleState, _victory: boolean) {
    void _victory;
    setScene({
      scene: "OVERWORLD",
      playerX: SPAWN.x, // placeholder — we need previous; let's read from save attempt
      playerY: SPAWN.y,
      facing: "down",
      moving: null,
      stepCount: 0,
    });
    // try to recover position from a fresh autosave if any
    const sv = loadGame();
    if (sv) {
      setScene({
        scene: "OVERWORLD",
        playerX: sv.playerX,
        playerY: sv.playerY,
        facing: sv.facing,
        moving: null,
        stepCount: 0,
      });
    }
  }

  /* ────────── RENDER ────────── */
  function render(ctx: CanvasRenderingContext2D) {
    const s = sceneRef.current;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);

    switch (s.scene) {
      case "TITLE":            renderTitle(ctx, s); break;
      case "STARTER_PICK":     renderStarterPick(ctx, s); break;
      case "OVERWORLD":        renderOverworld(ctx, s); break;
      case "BATTLE":           renderBattle(ctx, s); break;
      case "DIALOGUE":
        // render previous scene's static snapshot under dialogue
        renderUnderlayForDialogue(ctx, s);
        drawDialogBox(ctx, s.text, s.charsShown);
        break;
      case "START_MENU":
        renderUnderlayForOverlay(ctx, s.prev);
        renderStartMenu(ctx, s);
        break;
      case "PARTY_MENU":
        renderUnderlayForOverlay(ctx, s.prev);
        renderPartyMenu(ctx, s);
        break;
      case "BAG_MENU":
        renderUnderlayForOverlay(ctx, s.prev);
        renderBagMenu(ctx, s);
        break;
    }
  }

  function renderUnderlayForDialogue(ctx: CanvasRenderingContext2D, s: DialogueState) {
    const prev = s.prev;
    if (prev.scene === "OVERWORLD") renderOverworld(ctx, prev);
    else if (prev.scene === "BATTLE") renderBattle(ctx, prev);
    else if (prev.scene === "START_MENU") {
      renderUnderlayForOverlay(ctx, prev.prev);
      renderStartMenu(ctx, prev);
    }
  }

  function renderUnderlayForOverlay(ctx: CanvasRenderingContext2D, prev: OverworldState | BattleState) {
    if (prev.scene === "OVERWORLD") renderOverworld(ctx, prev);
    else renderBattle(ctx, prev);
  }

  /* ── Title ── */
  function renderTitle(ctx: CanvasRenderingContext2D, s: TitleState) {
    // gradient sky
    for (let i = 0; i < VIEW_H; i++) {
      const t = i / VIEW_H;
      const r = Math.floor(8 + 40 * t);
      const g = Math.floor(40 + 120 * t);
      const b = Math.floor(80 + 90 * (1 - t));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, i, VIEW_W, 1);
    }
    // big pokeball
    drawPokeball(ctx, VIEW_W / 2, 60, 26);

    // Title text
    const title = "POKEMON SMERALDO";
    const tw = measureText(title, 2);
    drawText(ctx, title, (VIEW_W - tw) / 2, 100, "#ffffff", 2, "#3050a8");

    if (s.menuOpen) {
      const opts = ["NUOVA PARTITA", "CONTINUA"];
      const bw = 120, bh = 36, bx = (VIEW_W - bw) / 2, by = 118;
      drawMenuBox(ctx, bx, by, bw, bh);
      for (let i = 0; i < opts.length; i++) {
        drawText(ctx, opts[i], bx + 14, by + 6 + i * 12, "#202020");
        if (s.index === i) drawArrow(ctx, bx + 5, by + 7 + i * 12);
      }
    } else {
      // press start
      if (Math.floor(s.blinkFrame / 30) % 2 === 0) {
        const t = "PREMI  Z";
        const tw2 = measureText(t);
        drawText(ctx, t, (VIEW_W - tw2) / 2, 134, "#ffffff", 1, "#000000");
      }
    }
    const credit = "FAN GAME  -  STILE SMERALDO";
    drawText(ctx, credit, (VIEW_W - measureText(credit)) / 2, 152, "#ffffffcc");
  }

  /* ── Starter pick ── */
  function renderStarterPick(ctx: CanvasRenderingContext2D, s: StarterPickState) {
    // beige bg
    ctx.fillStyle = "#f0e8c8"; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = "#3050a8"; ctx.fillRect(0, 0, VIEW_W, 14);
    drawText(ctx, "SCEGLI IL TUO POKEMON", 8, 4, "#ffffff");
    const starters = ["FOGLIORA", "FIAMMINO", "ACQUAGUSCIO"];
    for (let i = 0; i < 3; i++) {
      const x = 16 + i * 76, y = 30;
      const selected = i === s.index;
      // pedestal
      ctx.fillStyle = selected ? "#e8d030" : "#a89060";
      ctx.fillRect(x - 4, y + 56, 72, 6);
      ctx.fillStyle = "#684020";
      ctx.fillRect(x - 4, y + 62, 72, 3);

      drawCreature(ctx, starters[i], x, y - 8, 64);

      const sp = SPECIES[starters[i]];
      drawText(ctx, sp.name, x + 32 - measureText(sp.name) / 2, y + 70, "#202020");
      const type = sp.types[0];
      const tw = measureText(type);
      ctx.fillStyle = TYPE_COLORS[type];
      ctx.fillRect(x + 32 - tw / 2 - 3, y + 80, tw + 6, 10);
      drawText(ctx, type, x + 32 - tw / 2, y + 82, "#ffffff");
    }
    // dialog
    const text = `Allenatore! Scegli il tuo primo Pokemon!`;
    drawDialogBox(ctx, text, text.length);
    // cursor
    const cx = 16 + s.index * 76 + 32;
    const yWave = Math.sin(frameRef.current / 8) * 2;
    ctx.fillStyle = "#3050a8";
    ctx.beginPath();
    ctx.moveTo(cx, 18 + yWave);
    ctx.lineTo(cx - 6, 10 + yWave);
    ctx.lineTo(cx + 6, 10 + yWave);
    ctx.closePath(); ctx.fill();
  }

  /* ── Overworld ── */
  function renderOverworld(ctx: CanvasRenderingContext2D, s: OverworldState) {
    const moving = s.moving;
    const pxFrac = moving ? (moving.frame / MOVE_FRAMES) * moving.dx : 0;
    const pyFrac = moving ? (moving.frame / MOVE_FRAMES) * moving.dy : 0;
    const camX = (s.playerX + pxFrac) * TILE_SIZE - VIEW_W / 2 + TILE_SIZE / 2;
    const camY = (s.playerY + pyFrac) * TILE_SIZE - VIEW_H / 2 + TILE_SIZE / 2;
    const startTX = Math.floor(camX / TILE_SIZE);
    const startTY = Math.floor(camY / TILE_SIZE);
    const offX = -(camX - startTX * TILE_SIZE);
    const offY = -(camY - startTY * TILE_SIZE);

    for (let ty = 0; ty <= VIEW_TILES_Y + 1; ty++) {
      for (let tx = 0; tx <= VIEW_TILES_X + 1; tx++) {
        const mx = startTX + tx, my = startTY + ty;
        const px = offX + tx * TILE_SIZE;
        const py = offY + ty * TILE_SIZE;
        if (mx < 0 || my < 0 || mx >= MAP_W || my >= MAP_H) {
          drawTreeTile(ctx, px, py);
          continue;
        }
        drawTile(ctx, getTile(mx, my), px, py);
      }
    }

    // Player at center
    const px = Math.floor(VIEW_W / 2 - 8);
    const py = Math.floor(VIEW_H / 2 - 12);
    const step = moving ? Math.floor((moving.frame / MOVE_FRAMES) * 2) + 1 : 0;
    drawPlayer(ctx, px, py, s.facing, step);

    // location banner (subtle)
    if (s.stepCount < 4 && frameRef.current < 240) {
      const t = "ROUTE 1";
      const tw = measureText(t);
      ctx.fillStyle = "#202020"; ctx.fillRect(VIEW_W - tw - 16, 4, tw + 12, 14);
      ctx.fillStyle = "#3050a8"; ctx.fillRect(VIEW_W - tw - 16, 4, 2, 14);
      drawText(ctx, t, VIEW_W - tw - 10, 8, "#ffffff");
    }
  }

  function drawTile(ctx: CanvasRenderingContext2D, t: number, x: number, y: number) {
    switch (t) {
      case TILE.GRASS:         drawGrassTile(ctx, x, y); break;
      case TILE.TALL_GRASS:    drawTallGrassTile(ctx, x, y); break;
      case TILE.PATH:          drawPathTile(ctx, x, y); break;
      case TILE.TREE:          drawTreeTile(ctx, x, y); break;
      case TILE.WATER:         drawWaterTile(ctx, x, y, frameRef.current); break;
      case TILE.SAND:          drawSandTile(ctx, x, y); break;
      case TILE.ROOF:          drawRoofTile(ctx, x, y); break;
      case TILE.WALL:          drawBuildingTile(ctx, x, y); break;
      case TILE.DOOR:          drawDoorTile(ctx, x, y); break;
      case TILE.FLOWER_RED:    drawFlowerTile(ctx, x, y, "#e84040"); break;
      case TILE.FLOWER_YELLOW: drawFlowerTile(ctx, x, y, "#f8d030"); break;
      case TILE.SIGN:          drawSignTile(ctx, x, y); break;
      case TILE.FENCE:         drawFenceTile(ctx, x, y); break;
      default:                 drawGrassTile(ctx, x, y);
    }
  }

  /* ── Battle ── */
  function renderBattle(ctx: CanvasRenderingContext2D, s: BattleState) {
    // sky / arena bg
    for (let i = 0; i < VIEW_H - 44; i++) {
      const t = i / (VIEW_H - 44);
      const r = Math.floor(140 - 40 * t);
      const g = Math.floor(200 - 40 * t);
      const b = Math.floor(240 - 100 * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, i, VIEW_W, 1);
    }
    // ground platforms (ovals)
    const phase = s.phase;
    // enemy platform
    ctx.fillStyle = "#3a8048";
    drawEllipseFilled(ctx, 180, 70, 36, 8);
    ctx.fillStyle = "#58a058";
    drawEllipseFilled(ctx, 180, 68, 32, 6);
    // player platform
    ctx.fillStyle = "#3a8048";
    drawEllipseFilled(ctx, 60, 100, 44, 10);
    ctx.fillStyle = "#58a058";
    drawEllipseFilled(ctx, 60, 98, 38, 8);

    // throw ball animation hides enemy
    let drawEnemy = true;
    if (phase.kind === "THROW_BALL") {
      drawEnemy = phase.frame < 25;
      // animate ball arc
      const t = Math.min(1, phase.frame / 25);
      const bx = 60 + (180 - 60) * t;
      const by = 90 - 30 * Math.sin(t * Math.PI);
      drawPokeball(ctx, Math.floor(bx), Math.floor(by), 4);
    }
    if (phase.kind === "BALL_SHAKE") {
      drawEnemy = false;
      const wobble = phase.frame % 30 < 5 ? Math.sin(phase.frame) * 2 : 0;
      drawPokeball(ctx, 180 + wobble, 70, 5);
    }
    if (phase.kind === "CAUGHT") {
      drawEnemy = false;
      // shrinking ball
      drawPokeball(ctx, 180, 70, 5);
    }
    if (phase.kind === "BROKE_FREE" && phase.frame < 15) {
      drawEnemy = false;
    }

    if (drawEnemy && !s.enemy.fainted) {
      const flash = phase.kind === "DAMAGE" && phase.target === "enemy" && phase.frame % 6 < 3;
      if (!flash) drawCreature(ctx, s.enemy.species, 152, 36, 56, "front");
    }
    // player back sprite
    let drawPlayerMon = true;
    if (phase.kind === "FAINT" && phase.target === "player") drawPlayerMon = phase.frame < 30;
    if (drawPlayerMon && !s.player.fainted) {
      const flash = phase.kind === "DAMAGE" && phase.target === "player" && phase.frame % 6 < 3;
      const yOff = phase.kind === "FAINT" && phase.target === "player" ? Math.min(20, phase.frame) : 0;
      if (!flash) drawCreature(ctx, s.player.species, 32, 60 + yOff, 56, "back");
    }
    if (phase.kind === "FAINT" && phase.target === "enemy") {
      // enemy falls
      const yOff = Math.min(30, phase.frame);
      drawCreature(ctx, s.enemy.species, 152, 36 + yOff, 56, "front");
    }

    // HP boxes
    renderHpBox(ctx, s.enemy, 4, 12, false);
    renderHpBox(ctx, s.player, VIEW_W - 100, 64, true);

    // bottom UI
    if (phase.kind === "MENU") {
      // split: dialogue box on left, menu on right
      const x = 4, y = VIEW_H - 44, w = VIEW_W - 8, h = 40;
      ctx.fillStyle = "#f8f8f8"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#3050a8";
      ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
      ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);

      // text on left
      drawText(ctx, `Cosa deve fare`, x + 8, y + 8, "#202020");
      drawText(ctx, `${SPECIES[s.player.species].name}?`, x + 8, y + 20, "#202020");

      // menu on right
      const mx = x + w - 88, my = y;
      ctx.fillStyle = "#ffffff"; ctx.fillRect(mx, my, 88, h);
      ctx.fillStyle = "#3050a8";
      ctx.fillRect(mx, my, 88, 2); ctx.fillRect(mx, my + h - 2, 88, 2);
      ctx.fillRect(mx, my, 2, h); ctx.fillRect(mx + 86, my, 2, h);
      const options = ["LOTTA", "BORSA", "POKE", "FUGGI"];
      for (let i = 0; i < 4; i++) {
        const ox = mx + 10 + (i % 2) * 40, oy = my + 8 + Math.floor(i / 2) * 16;
        drawText(ctx, options[i], ox, oy, "#202020");
        if (s.menuIndex === i) drawArrow(ctx, ox - 7, oy + 1);
      }
      return;
    }

    if (phase.kind === "FIGHT") {
      // moves box
      const x = 4, y = VIEW_H - 44, w = VIEW_W - 8, h = 40;
      ctx.fillStyle = "#f8f8f8"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "#3050a8";
      ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
      ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);
      const moves = s.player.moves;
      for (let i = 0; i < 4; i++) {
        const ox = x + 12 + (i % 2) * 80;
        const oy = y + 6 + Math.floor(i / 2) * 14;
        if (i < moves.length) {
          const slot = moves[i];
          const m = MOVES[slot.id];
          drawText(ctx, m.name, ox, oy, "#202020");
          if (s.moveIndex === i) drawArrow(ctx, ox - 8, oy + 1);
        } else {
          drawText(ctx, "-", ox, oy, "#888888");
        }
      }
      // PP / type panel right
      const sel = moves[s.moveIndex];
      if (sel) {
        const m = MOVES[sel.id];
        const pX = x + w - 70, pY = y + 4;
        ctx.fillStyle = "#ffffff"; ctx.fillRect(pX, pY, 66, h - 8);
        ctx.fillStyle = "#3050a8";
        ctx.fillRect(pX, pY, 66, 2); ctx.fillRect(pX, pY + h - 10, 66, 2);
        ctx.fillRect(pX, pY, 2, h - 8); ctx.fillRect(pX + 64, pY, 2, h - 8);
        drawText(ctx, `PP ${sel.pp}/${m.pp}`, pX + 6, pY + 4, "#202020");
        const tw = measureText(m.type);
        ctx.fillStyle = TYPE_COLORS[m.type];
        ctx.fillRect(pX + 6, pY + 16, tw + 4, 10);
        drawText(ctx, m.type, pX + 8, pY + 18, "#ffffff");
      }
      return;
    }

    // Otherwise: dialog
    drawDialogBox(ctx, s.dialogue, s.dialogue.length);
  }

  function renderHpBox(ctx: CanvasRenderingContext2D, p: PokemonInstance, x: number, y: number, showHpText: boolean) {
    const w = 96, h = showHpText ? 36 : 28;
    ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(x + 2, y + 2, w, h);
    ctx.fillStyle = "#f8f8f8"; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#3050a8";
    ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
    ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);
    const name = SPECIES[p.species].name;
    drawText(ctx, name, x + 6, y + 4, "#202020");
    drawText(ctx, `L${p.level}`, x + w - 22, y + 4, "#202020");
    // hp bar
    drawText(ctx, "PS", x + 6, y + 16, "#a85020");
    drawHpBar(ctx, x + 18, y + 17, w - 24, 4, p.hp, maxHp(p));
    if (showHpText) {
      drawText(ctx, `${p.hp}/${maxHp(p)}`, x + w - 50, y + 24, "#202020");
    }
  }

  /* ── Start menu (in overworld) ── */
  function renderStartMenu(ctx: CanvasRenderingContext2D, s: StartMenuState) {
    const items = ["POKéMON", "BORSA", "SALVA", "ESCI"];
    const w = 78, h = items.length * 14 + 8;
    const x = VIEW_W - w - 6, y = 6;
    drawMenuBox(ctx, x, y, w, h);
    for (let i = 0; i < items.length; i++) {
      drawText(ctx, items[i], x + 10, y + 6 + i * 14, "#202020");
      if (s.index === i) drawArrow(ctx, x + 4, y + 7 + i * 14);
    }
  }

  /* ── Party menu ── */
  function renderPartyMenu(ctx: CanvasRenderingContext2D, s: PartyMenuState) {
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = "#3050a8"; ctx.fillRect(0, 0, VIEW_W, 14);
    drawText(ctx, "SQUADRA POKEMON", 6, 4, "#ffffff");
    const party = partyRef.current;
    for (let i = 0; i < 6; i++) {
      const slot = i < party.length ? party[i] : null;
      const col = i % 2, row = Math.floor(i / 2);
      const x = 6 + col * 116, y = 18 + row * 46, w = 112, h = 42;
      ctx.fillStyle = slot ? "#f8f8f8" : "#404060"; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = s.index === i && slot ? "#f8d030" : "#3050a8";
      ctx.fillRect(x, y, w, 2); ctx.fillRect(x, y + h - 2, w, 2);
      ctx.fillRect(x, y, 2, h); ctx.fillRect(x + w - 2, y, 2, h);
      if (!slot) continue;
      drawCreature(ctx, slot.species, x + 2, y + 4, 32);
      const sp = SPECIES[slot.species];
      drawText(ctx, sp.name, x + 38, y + 4, "#202020");
      drawText(ctx, `L${slot.level}`, x + 38, y + 14, "#202020");
      drawText(ctx, "PS", x + 38, y + 24, "#a85020");
      drawHpBar(ctx, x + 50, y + 25, 50, 4, slot.hp, maxHp(slot));
      drawText(ctx, `${slot.hp}/${maxHp(slot)}`, x + 38, y + 32, "#202020");
      if (slot.fainted || slot.hp <= 0) {
        drawText(ctx, "KO", x + w - 18, y + 4, "#e84040");
      }
    }
    const hint = s.context === "BATTLE_SWITCH" ? "Z = SCEGLI   X = INDIETRO" : "X = CHIUDI";
    drawText(ctx, hint, 6, VIEW_H - 10, "#ffffff");
  }

  /* ── Bag menu ── */
  function renderBagMenu(ctx: CanvasRenderingContext2D, s: BagMenuState) {
    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = "#3050a8"; ctx.fillRect(0, 0, VIEW_W, 14);
    drawText(ctx, "BORSA", 6, 4, "#ffffff");
    const items = [
      { name: "Poke Ball", count: bagRef.current.pokeballs, drawIcon: (x: number, y: number) => drawPokeball(ctx, x + 4, y + 4, 4) },
      { name: "Pozione",   count: bagRef.current.potions,   drawIcon: (x: number, y: number) => {
        ctx.fillStyle = "#e84040"; ctx.fillRect(x + 2, y + 2, 5, 7);
        ctx.fillStyle = "#a82020"; ctx.fillRect(x + 2, y + 8, 5, 1);
        ctx.fillStyle = "#888888"; ctx.fillRect(x + 3, y, 3, 2);
      } },
    ];
    const bx = 30, by = 30, bw = 180, bh = 100;
    drawMenuBox(ctx, bx, by, bw, bh);
    for (let i = 0; i < items.length; i++) {
      const y = by + 10 + i * 20;
      items[i].drawIcon(bx + 8, y);
      drawText(ctx, items[i].name, bx + 22, y + 2, "#202020");
      drawText(ctx, `x${items[i].count}`, bx + bw - 30, y + 2, "#202020");
      if (s.index === i) drawArrow(ctx, bx + 2, y + 3);
    }
    const hint = s.context === "BATTLE_USE" ? "Z = USA   X = INDIETRO" : "X = CHIUDI";
    drawText(ctx, hint, 6, VIEW_H - 10, "#ffffff");
  }

  /* ───── Touch / pointer support ───── */
  const holdKey = (key: string) => {
    const k = key.toLowerCase();
    if (!keysRef.current.has(k)) justPressedRef.current.add(k);
    keysRef.current.add(k);
  };
  const releaseKey = (key: string) => {
    keysRef.current.delete(key.toLowerCase());
  };
  const tapKey = (key: string) => {
    holdKey(key);
    // Release on next frame so update() sees the "just pressed" but not as "held"
    setTimeout(() => releaseKey(key), 80);
  };

  return (
    <div
      tabIndex={0}
      onFocus={() => {}}
      style={{ outline: "none", width: "100%", maxWidth: VIEW_W * SCALE }}
      className="select-none mx-auto"
    >
      <canvas
        ref={canvasRef}
        width={VIEW_W}
        height={VIEW_H}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: `${VIEW_W} / ${VIEW_H}`,
          imageRendering: "pixelated",
          background: "#000",
          border: "4px solid #15324f",
          borderRadius: 8,
          boxShadow:
            "0 0 0 2px #1d6b6b, 0 16px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)",
          touchAction: "none",
        }}
      />

      <TouchControls hold={holdKey} release={releaseKey} tap={tapKey} />

      <div className="hidden sm:grid text-white/70 text-xs mt-3 grid-cols-4 gap-2 text-center">
        <span>↑ ↓ ← → muovi</span>
        <span>Z conferma (A)</span>
        <span>X annulla (B)</span>
        <span>Invio menu</span>
      </div>
    </div>
  );
}

/* ───── On-screen gamepad ───── */
const BTN_BASE =
  "select-none active:scale-95 transition-transform flex items-center justify-center font-black text-white shadow-[0_4px_0_rgba(0,0,0,0.35)]";

function HoldButton(props: {
  k: string;
  label: React.ReactNode;
  className?: string;
  ariaLabel: string;
  hold: (k: string) => void;
  release: (k: string) => void;
}) {
  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* */ }
    props.hold(props.k);
  };
  const onUp = (e: React.PointerEvent) => {
    e.preventDefault();
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* */ }
    props.release(props.k);
  };
  return (
    <button
      type="button"
      aria-label={props.ariaLabel}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
      onContextMenu={(e) => e.preventDefault()}
      className={BTN_BASE + " " + (props.className ?? "")}
      style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
    >
      {props.label}
    </button>
  );
}

function TapButton(props: {
  k: string;
  label: React.ReactNode;
  className?: string;
  ariaLabel: string;
  tap: (k: string) => void;
}) {
  const onDown = (e: React.PointerEvent) => {
    e.preventDefault();
    props.tap(props.k);
  };
  return (
    <button
      type="button"
      aria-label={props.ariaLabel}
      onPointerDown={onDown}
      onContextMenu={(e) => e.preventDefault()}
      className={BTN_BASE + " " + (props.className ?? "")}
      style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
    >
      {props.label}
    </button>
  );
}

function TouchControls(props: {
  hold: (key: string) => void;
  release: (key: string) => void;
  tap: (key: string) => void;
}) {
  const { hold, release, tap } = props;
  const dpadBtn =
    "w-11 h-11 sm:w-14 sm:h-14 bg-[#15324f] active:bg-[#1d6b6b] rounded-lg text-xl sm:text-2xl border-2 border-[#0e2640]";
  const actionBtn =
    "w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 text-lg sm:text-xl tracking-widest";

  return (
    <div
      className="mt-3 sm:mt-4 w-full flex flex-row items-center justify-between gap-2 px-0"
      style={{ touchAction: "none" }}
    >
      <div className="grid grid-cols-3 grid-rows-3 gap-1" style={{ touchAction: "none" }}>
        <span />
        <HoldButton k="arrowup" label="▲" className={dpadBtn} ariaLabel="Su" hold={hold} release={release} />
        <span />
        <HoldButton k="arrowleft" label="◀" className={dpadBtn} ariaLabel="Sinistra" hold={hold} release={release} />
        <span className="w-11 h-11 sm:w-14 sm:h-14 bg-[#0e2640] rounded-lg border-2 border-[#0e2640]" />
        <HoldButton k="arrowright" label="▶" className={dpadBtn} ariaLabel="Destra" hold={hold} release={release} />
        <span />
        <HoldButton k="arrowdown" label="▼" className={dpadBtn} ariaLabel="Giù" hold={hold} release={release} />
        <span />
      </div>

      <div className="flex flex-col items-center gap-1 self-center">
        <TapButton
          k="enter"
          label="MENU"
          className="px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs bg-[#15324f] active:bg-[#1d6b6b] rounded-full border-2 border-[#0e2640]"
          ariaLabel="Menu"
          tap={tap}
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <TapButton
          k="x"
          label="B"
          className={actionBtn + " bg-[#1d6b6b] active:bg-[#2d8a8a] border-[#0d4a52]"}
          ariaLabel="B (annulla)"
          tap={tap}
        />
        <TapButton
          k="z"
          label="A"
          className={actionBtn + " bg-[#c84848] active:bg-[#e84a4a] border-[#682020]"}
          ariaLabel="A (conferma)"
          tap={tap}
        />
      </div>
    </div>
  );
}

/* ───── small util ───── */
function drawEllipseFilled(ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number) {
  for (let y = -ry; y <= ry; y++) {
    const w = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))));
    ctx.fillRect(Math.floor(cx - w), Math.floor(cy + y), w * 2 + 1, 1);
  }
}

