// ── Dati centralizzati dei corsi ────────────────────
// Usati da /corsi, dalle pagine di dettaglio, dalla sitemap e dalla homepage.

export type Materia = {
  nome: "Matematica" | "Fisica";
  programma: string[];
};

export type SottoCorso = {
  slug: string;
  titolo: string;
  titoloBreve: string;
  sottotitolo: string;
  prezzo: number;
  ore: number;
  lezioni: number;
  materie?: Materia[];
  contenuti?: string[];
  livello?: string;
  // Classe che lo studente inizia a settembre: preseleziona il campo nel form
  // di iscrizione (il percorso Piede Giusto la determina già).
  classeSettembre?: string;
};

export const GRUPPO_MIN = 4;
export const GRUPPO_MAX = 6;

// Piede Giusto è un corso estivo: si tiene prima dell'inizio della scuola.
// L'edizione è conclusa, quindi le pagine restano online (tornano utili
// l'estate prossima) ma sono mostrate "spente": card opache, badge di corso
// concluso e nessun form. Per riaprirle basta rimettere il flag a true.
export const PIEDE_GIUSTO_ISCRIZIONI_APERTE: boolean = false;

// Trattamento grafico dei corsi conclusi: card in sordina, così restano
// consultabili senza competere con i corsi attivi.
// La regola sta in globals.css: le utility opacity-* di Tailwind perderebbero
// contro .reveal.in, che sulle card rivelate impone opacity: 1.
export const CORSO_CONCLUSO_CLS = "corso-concluso";

export const PIEDE_GIUSTO_CHIUSURA = {
  badge: "Edizione conclusa",
  titolo: "Il Piede Giusto di quest'anno è concluso",
  testo:
    "L'edizione 2026 si è chiusa: il Piede Giusto si tiene nelle settimane prima dell'inizio della scuola. Le pagine restano online per consultare i programmi; riapriamo le iscrizioni a giugno 2027.",
  alternativa:
    "Adesso che la scuola è iniziata il corso attivo è Sempre Dritto: due ore di matematica a settimana, da ottobre a maggio, sugli stessi argomenti.",
  riapertura: "giugno 2027",
};

export const MATERIALE_PIEDE_GIUSTO = [
  "Riassunti schematizzati degli argomenti trattati",
  "Esercizi con soluzioni per allenarti anche a casa",
];

// ── Piede Giusto ────────────────────────────────────
export const PIEDE_GIUSTO: SottoCorso[] = [
  {
    slug: "dalle-medie-alla-prima-superiore",
    titolo: "Piede Giusto: dalle Medie alla Prima Superiore",
    titoloBreve: "Dalle Medie alla Prima Superiore",
    sottotitolo:
      "Il ponte tra le medie e le superiori: arriva al primo giorno con le basi di matematica e fisica già pronte.",
    prezzo: 150,
    ore: 10,
    lezioni: 5,
    classeSettembre: "Prima superiore",
    materie: [
      {
        nome: "Matematica",
        programma: [
          "Monomi e polinomi",
          "Prodotti notevoli",
          "Scomposizioni",
          "Frazioni algebriche",
          "Equazioni e disequazioni",
        ],
      },
      {
        nome: "Fisica",
        programma: [
          "Grandezze fisiche e conversioni",
          "Notazione scientifica",
          "Vettori",
          "Equilibrio delle forze",
        ],
      },
    ],
  },
  {
    slug: "dalla-prima-alla-seconda-superiore",
    titolo: "Piede Giusto: dalla Prima alla Seconda Superiore",
    titoloBreve: "Dalla Prima alla Seconda Superiore",
    sottotitolo:
      "Consolida il primo anno e anticipa gli argomenti chiave della seconda, senza trascinarti lacune.",
    prezzo: 150,
    ore: 10,
    lezioni: 5,
    classeSettembre: "Seconda superiore",
    materie: [
      {
        nome: "Matematica",
        programma: [
          "Ripasso sulle scomposizioni",
          "Equazioni fratte",
          "Sistemi di equazioni",
          "Radicali",
          "Equazioni di secondo grado",
          "Disequazioni di secondo grado",
          "Equazione della retta",
        ],
      },
      {
        nome: "Fisica",
        programma: [
          "Dinamica",
          "Moti rettilinei, circolari e parabolici",
          "Fluidostatica",
        ],
      },
    ],
  },
  {
    slug: "dalla-seconda-alla-terza-superiore",
    titolo: "Piede Giusto: dalla Seconda alla Terza Superiore",
    titoloBreve: "Dalla Seconda alla Terza Superiore",
    sottotitolo:
      "Il triennio cambia passo: preparati ad affrontare geometria analitica e la fisica del triennio con sicurezza.",
    prezzo: 180,
    ore: 12,
    lezioni: 6,
    classeSettembre: "Terza superiore",
    materie: [
      {
        nome: "Matematica",
        programma: [
          "Equazioni e disequazioni di secondo grado e di grado superiore",
          "Equazioni e disequazioni irrazionali e con valore assoluto",
          "Geometria analitica completa: retta (ripresa), parabola, circonferenza, ellisse, iperbole",
          "Funzioni e loro proprietà",
        ],
      },
      {
        nome: "Fisica",
        programma: [
          "Ripasso breve su cinematica e dinamica",
          "Conservazione dell'energia",
          "Urti e quantità di moto",
          "Momento angolare",
          "Gravitazione universale",
        ],
      },
    ],
  },
  {
    slug: "dalla-terza-alla-quarta-superiore",
    titolo: "Piede Giusto: dalla Terza alla Quarta Superiore",
    titoloBreve: "Dalla Terza alla Quarta Superiore",
    sottotitolo:
      "Esponenziali, trigonometria ed elettrostatica: parti in vantaggio sugli argomenti più impegnativi della quarta.",
    prezzo: 180,
    ore: 12,
    lezioni: 6,
    classeSettembre: "Quarta superiore",
    materie: [
      {
        nome: "Matematica",
        programma: [
          "Funzioni esponenziali e logaritmiche, relative equazioni e disequazioni",
          "Goniometria e trigonometria",
          "Numeri complessi",
          "Calcolo combinatorio e probabilità",
        ],
      },
      {
        nome: "Fisica",
        programma: [
          "Onde meccaniche e suono",
          "Ottica fisica: interferenza e diffrazione",
          "Elettrostatica: carica elettrica, legge di Coulomb, campo elettrico, potenziale",
          "Circuiti in corrente continua",
        ],
      },
    ],
  },
  {
    slug: "dalla-quarta-alla-quinta-superiore",
    titolo: "Piede Giusto: dalla Quarta alla Quinta Superiore",
    titoloBreve: "Dalla Quarta alla Quinta Superiore",
    sottotitolo:
      "L'anno della maturità inizia qui: limiti, derivate ed elettromagnetismo affrontati prima di settembre.",
    prezzo: 180,
    ore: 12,
    lezioni: 6,
    classeSettembre: "Quinta superiore",
    materie: [
      {
        nome: "Matematica",
        programma: [
          "Limiti e forme di indeterminazione",
          "Derivate",
          "Studio di funzione",
          "Integrali",
        ],
      },
      {
        nome: "Fisica",
        programma: [
          "Ripasso di elettromagnetismo",
          "Campo magnetico e forza di Lorentz",
          "Induzione elettromagnetica e legge di Faraday-Neumann-Lenz",
          "Relatività ristretta",
          "Fisica quantistica",
        ],
      },
    ],
  },
];

// ── Sempre Dritto ───────────────────────────────────
// Il corso annuale di matematica: parte il 12 ottobre e arriva all'ultima
// settimana di maggio, 2 ore a settimana. Le settimane effettive sono circa 30
// (tolte le vacanze di Natale e di Pasqua): da lì escono ore totali e prezzo.
export const SEMPRE_DRITTO = {
  slug: "sempre-dritto",
  titolo: "Sempre Dritto",
  sottotitolo:
    "Il corso di matematica che ti accompagna per tutto l'anno: due ore a settimana in piccolo gruppo, da ottobre a maggio.",
  materia: "Matematica",
  inizio: "12 ottobre 2026",
  inizioISO: "2026-10-12",
  fine: "ultima settimana di maggio 2027",
  fineISO: "2027-05-28",
  oreSettimana: 2,
  settimane: 30,
  oreTotali: 60,
  // €13,50 l'ora invece dei €25 della lezione individuale delle superiori.
  prezzoOra: "13,50",
  prezzoOraIndividuale: 25,
  scontoPercentuale: 46,
  prezzoTotale: 810,
  rate: 4,
  importoRata: "202,50",
  gruppoMin: 3,
  gruppoMax: 6,
  materiale: [
    "Dispense di teoria schematizzate, argomento per argomento",
    "Eserciziari con soluzioni per allenarti tra una lezione e l'altra",
    "Simulazioni di verifica sul modello di quelle della tua classe",
  ],
  // I punti forti del corso, mostrati come riquadri (due per riga anche sul
  // telefono): titolo corto in evidenza e una riga di spiegazione.
  plus: [
    {
      titolo: "€13,50 l'ora",
      testo: "invece dei €25 della lezione individuale",
    },
    {
      titolo: "Un gruppo per classe",
      testo: "dalla prima alla quinta superiore",
    },
    {
      titolo: "Da 3 a 6 studenti",
      testo: "stesso indirizzo, quando i numeri lo permettono",
    },
    {
      titolo: "2 ore a settimana",
      testo: "sempre lo stesso giorno, da ottobre a maggio",
    },
  ],
};

// I cinque gruppi di Sempre Dritto: il programma annuale di ogni classe
// coincide con gli argomenti di matematica del corrispondente Piede Giusto.
export const SEMPRE_DRITTO_CLASSI = [
  {
    slug: "prima-superiore",
    classe: "Prima Superiore",
    annoScolastico: "Prima superiore",
    sottotitolo:
      "Il primo anno senza lacune: dai monomi alle disequazioni, con esercizi e simulazioni di verifica ogni settimana.",
    programma: PIEDE_GIUSTO[0].materie![0].programma,
  },
  {
    slug: "seconda-superiore",
    classe: "Seconda Superiore",
    annoScolastico: "Seconda superiore",
    sottotitolo:
      "Sistemi, radicali, equazioni di secondo grado e retta: un appuntamento fisso per non rincorrere mai il programma.",
    programma: PIEDE_GIUSTO[1].materie![0].programma,
  },
  {
    slug: "terza-superiore",
    classe: "Terza Superiore",
    annoScolastico: "Terza superiore",
    sottotitolo:
      "Il triennio cambia passo: geometria analitica completa e studio delle funzioni, allenati verifica dopo verifica.",
    programma: PIEDE_GIUSTO[2].materie![0].programma,
  },
  {
    slug: "quarta-superiore",
    classe: "Quarta Superiore",
    annoScolastico: "Quarta superiore",
    sottotitolo:
      "Esponenziali, logaritmi, trigonometria e probabilità: l'anno più denso, affrontato con costanza da ottobre.",
    programma: PIEDE_GIUSTO[3].materie![0].programma,
  },
  {
    slug: "quinta-superiore",
    classe: "Quinta Superiore",
    annoScolastico: "Quinta superiore",
    sottotitolo:
      "L'anno della maturità: limiti, derivate, studio di funzione e integrali, fino alla seconda prova.",
    programma: PIEDE_GIUSTO[4].materie![0].programma,
  },
] as const;

// A ogni percorso Piede Giusto corrisponde la classe di Sempre Dritto che
// tratta gli stessi argomenti durante l'anno: dalle pagine del corso estivo
// (concluso) indirizziamo lì.
export const SEMPRE_DRITTO_PER_PIEDE_GIUSTO: Record<string, string> = {
  "dalle-medie-alla-prima-superiore": "prima-superiore",
  "dalla-prima-alla-seconda-superiore": "seconda-superiore",
  "dalla-seconda-alla-terza-superiore": "terza-superiore",
  "dalla-terza-alla-quarta-superiore": "quarta-superiore",
  "dalla-quarta-alla-quinta-superiore": "quinta-superiore",
};

// ── Corsi in arrivo ─────────────────────────────────
// Segnaposto: i percorsi di preparazione ai test universitari sono in
// costruzione. Le card sono visibili ma non cliccabili — si raccoglie
// interesse via WhatsApp finché non c'è una pagina vera.
export type CorsoInArrivo = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  target: string;
  punti: string[];
};

export const CORSI_IN_ARRIVO: CorsoInArrivo[] = [
  {
    slug: "semestre-filtro-medicina",
    titolo: "Preparazione semestre filtro Medicina",
    sottotitolo:
      "Chimica, biologia e fisica del semestre aperto di Medicina, con esercitazioni sul formato degli esami nazionali.",
    target: "Diplomandi e matricole di Medicina e Odontoiatria",
    punti: [
      "Teoria dei tre esami del semestre filtro",
      "Batterie di quesiti ed esercitazioni a tempo",
      "Simulazioni con correzione ragionata",
    ],
  },
  {
    slug: "test-professioni-sanitarie",
    titolo: "Preparazione test Professioni Sanitarie",
    sottotitolo:
      "Il percorso completo per il test di Infermieristica, Fisioterapia e delle altre professioni sanitarie.",
    target: "Studenti di quinta e diplomati",
    punti: [
      "Biologia, chimica, fisica e matematica del test",
      "Logica e comprensione del testo",
      "Simulazioni cronometrate con graduatoria interna",
    ],
  },
  {
    slug: "tolc-economia",
    titolo: "Preparazione TOLC-E Economia",
    sottotitolo:
      "Matematica, logica e comprensione verbale per arrivare al TOLC-E con il punteggio che ti serve.",
    target: "Chi si iscrive a Economia, Statistica o Management",
    punti: [
      "Matematica del TOLC-E dalle basi",
      "Logica e comprensione verbale",
      "Prove complete sul simulatore CISIA",
    ],
  },
  {
    slug: "tolc-ingegneria",
    titolo: "Preparazione TOLC-I Ingegneria",
    sottotitolo:
      "Matematica, scienze e logica del TOLC-I, con il metodo per gestire il tempo sezione per sezione.",
    target: "Chi si iscrive a Ingegneria o a una facoltà scientifica",
    punti: [
      "Matematica e scienze del TOLC-I",
      "Logica e comprensione verbale",
      "Simulazioni complete e analisi degli errori",
    ],
  },
];

// Matematica e Fisica sono due corsi separati: lo studente sceglie quale
// seguire (o entrambi, pagando due iscrizioni distinte).
export const MATERIE_SINGOLE = ["Matematica", "Fisica"];
export const MATERIA_ENTRAMBE = "Entrambe le materie";
// Scegliendo "Entrambe" vengono registrate due iscrizioni separate, una per
// materia, così nel gestionale risultano come due righe distinte.
export const MATERIE_SCELTA = [...MATERIE_SINGOLE, MATERIA_ENTRAMBE];

// Classe che lo studente inizierà a settembre.
export const CLASSI_SETTEMBRE = [
  "Prima superiore",
  "Seconda superiore",
  "Terza superiore",
  "Quarta superiore",
  "Quinta superiore",
];

// Fascia oraria preferita per le lezioni del corso.
export const PREFERENZE_ORARIO = ["Mattina", "Pomeriggio", "Entrambi"];

// Giorni selezionabili nel form di Sempre Dritto: servono per incastrare i
// gruppi, quindi ne chiediamo almeno tre.
export const GIORNI_SETTIMANA = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
];
export const GIORNI_PREFERITI_MIN = 3;

// Opzioni comuni dei form di iscrizione
export const INDIRIZZI_SCOLASTICI = [
  "Scuola media",
  "Liceo scientifico",
  "Liceo classico",
  "Liceo linguistico",
  "Liceo delle scienze umane",
  "Liceo artistico",
  "Istituto tecnico",
  "Istituto professionale",
  "Altro",
];
