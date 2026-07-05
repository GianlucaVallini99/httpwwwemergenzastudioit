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
};

export const GRUPPO_MIN = 4;
export const GRUPPO_MAX = 6;

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

// ── English Speaking Club ───────────────────────────
export const ENGLISH_PREZZO = 300;
export const ENGLISH_ORE = 20;
export const ENGLISH_LEZIONI = 10;

export const ENGLISH_CLUB: SottoCorso[] = [
  {
    slug: "english-restart",
    titolo: "English Restart – Riparti dalle basi",
    titoloBreve: "English Restart",
    livello: "Principiante",
    sottotitolo:
      "Per chi parte da zero o quasi: la grammatica essenziale e le prime conversazioni, senza ansia e senza fretta.",
    prezzo: ENGLISH_PREZZO,
    ore: ENGLISH_ORE,
    lezioni: ENGLISH_LEZIONI,
    contenuti: [
      "Grammatica di base spiegata in modo semplice",
      "Conversazione di base sulle situazioni di tutti i giorni",
      "Dispense riassuntive ed esercizi per lo studio individuale e di gruppo",
    ],
  },
  {
    slug: "english-progress",
    titolo: "English Progress – Consolida e conversa",
    titoloBreve: "English Progress",
    livello: "Intermedio",
    sottotitolo:
      "Per chi ha già le basi e vuole fare il salto: più grammatica, più conversazione e orecchio allenato.",
    prezzo: ENGLISH_PREZZO,
    ore: ENGLISH_ORE,
    lezioni: ENGLISH_LEZIONI,
    contenuti: [
      "Grammatica più avanzata",
      "Conversazione e modi di dire",
      "Potenziamento del listening",
      "Dispense riassuntive ed esercizi per lo studio individuale e di gruppo",
    ],
  },
  {
    slug: "english-fluency",
    titolo: "English Fluency – Parla con sicurezza",
    titoloBreve: "English Fluency",
    livello: "Avanzato",
    sottotitolo:
      "Per chi vuole scioltezza vera: conversazioni su temi di attualità, pronuncia curata e listening intensivo.",
    prezzo: ENGLISH_PREZZO,
    ore: ENGLISH_ORE,
    lezioni: ENGLISH_LEZIONI,
    contenuti: [
      "Ripasso breve di grammatica",
      "Conversazioni su argomenti di attualità",
      "Focus sulla pronuncia",
      "Potenziamento del listening",
      "Dispense riassuntive ed esercizi per lo studio individuale e di gruppo",
    ],
  },
];

// ── Potenziamento Scolastico ────────────────────────
export const POTENZIAMENTO = {
  slug: "potenziamento-scolastico",
  titolo: "Corso di Potenziamento Scolastico",
  sottotitolo:
    "Il corso annuale di matematica e fisica per vivere la scuola senza la paura delle verifiche.",
  prezzoOra: 15,
  prezzoTotale: 960,
  rate: 4,
  importoRata: 240,
  settimane: 32,
  oreSettimana: 2,
  oreTotali: 64,
  materie: ["Matematica", "Fisica"],
  materiale: [
    "Schemi, riassunti e consigli per lo svolgimento degli esercizi",
    "Esercizi e simulazioni di verifica",
  ],
};

// Le 5 classi del Potenziamento Scolastico: il programma annuale di ogni
// classe coincide con gli argomenti del corrispondente percorso Piede Giusto.
export const POTENZIAMENTO_CLASSI = [
  {
    slug: "prima-superiore",
    classe: "Prima Superiore",
    sottotitolo:
      "Il primo anno delle superiori senza lacune: dalle basi dell'algebra alle prime grandezze fisiche, con esercizi e simulazioni di verifica ogni settimana.",
    materie: PIEDE_GIUSTO[0].materie!,
  },
  {
    slug: "seconda-superiore",
    classe: "Seconda Superiore",
    sottotitolo:
      "Dalle equazioni di secondo grado alla retta, dalla dinamica alla fluidostatica: un appuntamento fisso per non rincorrere mai il programma.",
    materie: PIEDE_GIUSTO[1].materie!,
  },
  {
    slug: "terza-superiore",
    classe: "Terza Superiore",
    sottotitolo:
      "Il triennio cambia passo: geometria analitica completa e la fisica di energia, urti e gravitazione, allenate verifica dopo verifica.",
    materie: PIEDE_GIUSTO[2].materie!,
  },
  {
    slug: "quarta-superiore",
    classe: "Quarta Superiore",
    sottotitolo:
      "Esponenziali, trigonometria e probabilità in matematica; onde, ottica ed elettrostatica in fisica: l'anno più denso, affrontato con costanza.",
    materie: PIEDE_GIUSTO[3].materie!,
  },
  {
    slug: "quinta-superiore",
    classe: "Quinta Superiore",
    sottotitolo:
      "L'anno della maturità: limiti, derivate e integrali in matematica, elettromagnetismo e fisica moderna in fisica, fino alla prova d'esame.",
    materie: PIEDE_GIUSTO[4].materie!,
  },
] as const;

// Matematica e Fisica sono due corsi separati: lo studente sceglie quale
// seguire (o entrambi, pagando due iscrizioni distinte).
export const MATERIE_SCELTA = ["Matematica", "Fisica", "Entrambe le materie"];

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
