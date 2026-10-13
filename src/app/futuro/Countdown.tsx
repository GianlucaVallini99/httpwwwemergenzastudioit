"use client";

import { useSyncExternalStore } from "react";
import styles from "./futuro.module.css";

const TRE_ORE = 3 * 3600 * 1000;
const pad = (n: number) => String(n).padStart(2, "0");

// Orologio a scatti di un secondo. Sul server (e in hydration) vale null,
// così non c'è mismatch: il countdown mostra "--" finché non è montato.
function subscribe(tick: () => void) {
  const t = setInterval(tick, 1000);
  return () => clearInterval(t);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

export default function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const now = useSyncExternalStore<number | null>(subscribe, getNow, getServerNow);

  const diff = now === null ? null : Math.max(0, targetMs - now);
  const started = diff === 0;

  if (started) {
    const ended = now! > targetMs + TRE_ORE;
    return (
      <div className={styles.countdown}>
        <span className={`${styles.overline} ${styles.overlineMuted}`}>
          Scegliere il futuro
        </span>
        <div className={`${styles.serif} ${styles.done}`}>
          {ended
            ? "Grazie a chi c'era. Ci vediamo al prossimo incontro."
            : "Ci siamo: l'evento è iniziato."}
        </div>
      </div>
    );
  }

  const s = diff === null ? null : Math.floor(diff / 1000);
  const d = s === null ? null : Math.floor(s / 86400);
  const h = s === null ? null : Math.floor((s % 86400) / 3600);
  const m = s === null ? null : Math.floor((s % 3600) / 60);
  const sc = s === null ? null : s % 60;

  const units = [
    { value: d === null ? "--" : String(d), label: d === 1 ? "giorno" : "giorni" },
    { value: h === null ? "--" : pad(h), label: h === 1 ? "ora" : "ore" },
    { value: m === null ? "--" : pad(m), label: "minuti" },
    { value: sc === null ? "--" : pad(sc), label: "secondi" },
  ];

  return (
    <div className={styles.countdown}>
      <span className={`${styles.overline} ${styles.overlineMuted} ${styles.live}`}>
        <span aria-hidden className={styles.liveDot} />
        Mancano
      </span>
      <div className={styles.units} role="timer" aria-live="off">
        {units.map((u, i) => (
          <div key={i} className={styles.unit}>
            <span className={`${styles.serif} ${styles.unitValue}`}>
              {/* key sul valore: a ogni cambio la cifra rientra con l'animazione */}
              <span key={u.value} className={styles.tick}>
                {u.value}
              </span>
            </span>
            <span className={styles.unitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
