import { NextResponse } from "next/server";

// Salva le iscrizioni ai corsi nella tabella iscrizioni_corsi del gestionale
// (Supabase). Le credenziali restano solo lato server: il browser non le vede.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

type Payload = {
  corso?: string;
  corsoSlug?: string;
  materia?: string;
  nome?: string;
  cognome?: string;
  indirizzoResidenza?: string;
  codiceFiscale?: string;
  telefono?: string;
  nomeGenitore?: string;
  cognomeGenitore?: string;
  telefonoGenitore?: string;
  indirizzoScolastico?: string;
  scuola?: string;
  classeSettembre?: string;
  preferenzaOrario?: string;
  email?: string;
  giorniPreferiti?: string[] | string;
};

const CF_REGEX = /^[A-Z0-9]{16}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const corso = clean(body.corso, 200);
  const nome = clean(body.nome, 100);
  const cognome = clean(body.cognome, 100);
  const telefono = clean(body.telefono, 30);

  if (!corso || !nome || !cognome || !telefono) {
    return NextResponse.json({ error: "Compila tutti i campi obbligatori" }, { status: 400 });
  }

  // Residenza e codice fiscale li chiede solo il form completo (Piede Giusto):
  // Sempre Dritto raccoglie i dati minimi e il resto si prende al telefono.
  const indirizzoResidenza = clean(body.indirizzoResidenza, 300);
  const codiceFiscale = clean(body.codiceFiscale, 16).toUpperCase();
  if (codiceFiscale && !CF_REGEX.test(codiceFiscale)) {
    return NextResponse.json({ error: "Codice fiscale non valido: deve avere 16 caratteri" }, { status: 400 });
  }

  const email = clean(body.email, 150);
  if (email && !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Indirizzo email non valido" }, { status: 400 });
  }

  // I giorni disponibili arrivano come elenco: li salviamo come testo unico.
  const giorniPreferiti = (Array.isArray(body.giorniPreferiti) ? body.giorniPreferiti : [body.giorniPreferiti])
    .map((g) => clean(g, 20))
    .filter(Boolean)
    .join(", ")
    .slice(0, 100);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Iscrizioni: SUPABASE_URL / SUPABASE_ANON_KEY non configurate");
    return NextResponse.json({ error: "Servizio momentaneamente non disponibile" }, { status: 503 });
  }

  const row = {
    corso,
    corso_slug: clean(body.corsoSlug, 100) || null,
    // Materia in colonna propria (oltre che nel nome del corso): serve al
    // filtro per materia della pagina "Iscrizioni Corsi" del gestionale.
    materia: clean(body.materia, 30) || null,
    nome,
    cognome,
    indirizzo_residenza: indirizzoResidenza || null,
    codice_fiscale: codiceFiscale || null,
    telefono,
    email: email || null,
    giorni_preferiti: giorniPreferiti || null,
    nome_genitore: clean(body.nomeGenitore, 100) || null,
    cognome_genitore: clean(body.cognomeGenitore, 100) || null,
    telefono_genitore: clean(body.telefonoGenitore, 30) || null,
    indirizzo_scolastico: clean(body.indirizzoScolastico, 150) || null,
    scuola: clean(body.scuola, 200) || null,
    classe_settembre: clean(body.classeSettembre, 50) || null,
    preferenza_orario: clean(body.preferenzaOrario, 30) || null,
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/iscrizioni_corsi`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    console.error("Iscrizioni: insert fallito", res.status, await res.text());
    return NextResponse.json({ error: "Salvataggio non riuscito" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
