// Blog article data (placeholder content)
export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  excerpt: string;
  content: string; // simplified markdown-like content
}

export const articles: BlogArticle[] = [
  {
    slug: "come-organizzare-studio-maturita-2026",
    title: "Come organizzare lo studio per la maturità 2026: guida mese per mese",
    seoTitle: "Come Organizzare lo Studio per la Maturità 2026",
    description: "Guida pratica per organizzare lo studio della maturità 2026 mese per mese. Consigli su pianificazione, ripasso e gestione dell'ansia da esame.",
    date: "2026-03-15",
    excerpt: "La maturità si avvicina e la domanda è sempre la stessa: come organizzare lo studio per arrivare preparati senza impazzire? In questa guida ti proponiamo un piano mese per mese.",
    content: "La maturità si avvicina e la domanda è sempre la stessa: come organizzare lo studio per arrivare preparati senza impazzire? In questa guida ti proponiamo un piano mese per mese per affrontare l'esame con sicurezza.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
  {
    slug: "metodo-pomodoro-studio",
    title: "Metodo Pomodoro: cos'è e come usarlo per studiare meglio",
    seoTitle: "Metodo Pomodoro: Come Usarlo per Studiare Meglio",
    description: "Scopri il Metodo Pomodoro per lo studio: cos'è, come funziona e come applicarlo per migliorare concentrazione e produttività.",
    date: "2026-03-10",
    excerpt: "Il Metodo Pomodoro è una delle tecniche di studio più efficaci per migliorare la concentrazione. Scopri cos'è e come applicarlo concretamente.",
    content: "Il Metodo Pomodoro è una delle tecniche di studio più efficaci per migliorare la concentrazione. In questo articolo scoprirai cos'è e come applicarlo concretamente ai tuoi pomeriggi di studio.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
  {
    slug: "errori-equazioni-secondo-grado",
    title: "5 errori comuni nelle equazioni di secondo grado (e come evitarli)",
    seoTitle: "5 Errori Comuni nelle Equazioni di Secondo Grado",
    description: "I 5 errori più comuni nelle equazioni di secondo grado e come evitarli. Guida pratica con esempi per studenti delle superiori.",
    date: "2026-03-05",
    excerpt: "Le equazioni di secondo grado sono uno degli argomenti dove gli studenti commettono più errori. Ecco i 5 più comuni e come correggerli.",
    content: "Le equazioni di secondo grado sono uno degli argomenti dove gli studenti commettono più errori. In questo articolo analizziamo i 5 errori più frequenti e ti mostriamo come evitarli.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
  {
    slug: "tolc-2026-guida-preparazione",
    title: "TOLC 2026: cos'è, come funziona e come prepararsi",
    seoTitle: "TOLC 2026: Guida Completa alla Preparazione",
    description: "Guida completa ai TOLC 2026: cos'è, tipologie (TOLC-I, TOLC-E, TOLC-MED), struttura dell'esame e consigli per prepararsi al meglio.",
    date: "2026-02-28",
    excerpt: "Il TOLC è il test d'ingresso più diffuso nelle università italiane. In questa guida ti spieghiamo tutto: cos'è, le tipologie, e come prepararti.",
    content: "Il TOLC è il test d'ingresso più diffuso nelle università italiane. In questa guida completa ti spieghiamo tutto: cos'è, le diverse tipologie, la struttura dell'esame e come prepararti efficacemente.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
  {
    slug: "ripetizioni-individuali-o-gruppo",
    title: "Ripetizioni: meglio individuali o di gruppo?",
    seoTitle: "Ripetizioni Individuali o di Gruppo? Pro e Contro",
    description: "Ripetizioni individuali o di gruppo: quale scegliere? Confronto completo con pro e contro per aiutarti a decidere la modalità migliore.",
    date: "2026-02-20",
    excerpt: "Ripetizioni individuali o di gruppo? È una domanda che ci fanno spesso. La risposta dipende dalle esigenze dello studente.",
    content: "Ripetizioni individuali o di gruppo? È una domanda che ci fanno spesso. La risposta dipende dalle esigenze specifiche dello studente. In questo articolo analizziamo pro e contro di entrambe le modalità.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
  {
    slug: "debito-formativo-come-recuperare",
    title: "Debito formativo: cos'è e come recuperarlo durante l'estate",
    seoTitle: "Debito Formativo: Come Recuperare Durante l'Estate",
    description: "Cos'è il debito formativo, come funziona l'esame di recupero e strategie pratiche per studiare efficacemente durante l'estate.",
    date: "2026-02-15",
    excerpt: "Il debito formativo non è la fine del mondo. Con un piano di studio strutturato e il supporto giusto, si può recuperare efficacemente durante l'estate.",
    content: "Il debito formativo non è la fine del mondo. Con un piano di studio strutturato e il supporto giusto, si può recuperare efficacemente durante l'estate. Ecco come organizzarsi.\n\nArticolo completo in arrivo. Torna a trovarci presto!",
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
