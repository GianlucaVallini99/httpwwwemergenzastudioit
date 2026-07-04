import { NextResponse } from "next/server";

// Salva le iscrizioni ai corsi nella tabella iscrizioni_corsi del gestionale
// (Supabase). Le credenziali restano solo lato server: il browser non le vede.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

type Payload = {
  corso?: string;
  corsoSlug?: string;
  nome?: string;
  cognome?: string;
  indirizzoResidenza?: string;
  codiceFiscale?: string;
  telefono?: string;
  indirizzoScolastico?: string;
  scuola?: string;
};

const CF_REGEX = /^[A-Z0-9]{16}$/i;

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
  const indirizzoResidenza = clean(body.indirizzoResidenza, 300);
  const codiceFiscale = clean(body.codiceFiscale, 16).toUpperCase();
  const telefono = clean(body.telefono, 30);

  if (!corso || !nome || !cognome || !indirizzoResidenza || !codiceFiscale || !telefono) {
    return NextResponse.json({ error: "Compila tutti i campi obbligatori" }, { status: 400 });
  }
  if (!CF_REGEX.test(codiceFiscale)) {
    return NextResponse.json({ error: "Codice fiscale non valido: deve avere 16 caratteri" }, { status: 400 });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Iscrizioni: SUPABASE_URL / SUPABASE_ANON_KEY non configurate");
    return NextResponse.json({ error: "Servizio momentaneamente non disponibile" }, { status: 503 });
  }

  const row = {
    corso,
    corso_slug: clean(body.corsoSlug, 100) || null,
    nome,
    cognome,
    indirizzo_residenza: indirizzoResidenza,
    codice_fiscale: codiceFiscale,
    telefono,
    indirizzo_scolastico: clean(body.indirizzoScolastico, 150) || null,
    scuola: clean(body.scuola, 200) || null,
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
