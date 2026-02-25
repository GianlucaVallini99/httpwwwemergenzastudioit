
# Emergenza Studio — Documentazione completa del sito

## 1. Identità del progetto

| Campo | Dettaglio |
|---|---|
| **Nome** | Emergenza Studio |
| **Tipo** | Centro studi e ripetizioni |
| **Sede** | Via Barbiero 84, Mogliano Veneto (TV) |
| **Target** | Studenti di tutte le età (elementari → università) e i loro genitori |
| **Telefono** | 340 510 6467 |
| **WhatsApp** | [wa.me/393405106467](https://wa.me/393405106467) |
| **Instagram** | [@emergenza_studio](https://www.instagram.com/emergenza_studio/) |
| **Orari** | Lun-Ven 9:00-12:00 / 14:00-19:00 · Sabato 9:00-13:00 |
| **URL pubblicato** | https://httpwwwemergenzastudioit.lovable.app |

---

## 2. Obiettivo del sito

Landing page **single-page** per:
1. Presentare i servizi del centro studi
2. Comunicare le tariffe in modo trasparente
3. Generare contatti via WhatsApp e telefono
4. Ispirare fiducia tramite social proof e testimonianze
5. Essere trovabile su Google (SEO locale)

---

## 3. Struttura delle sezioni (dall'alto al basso)

### 3.1 Header (sticky)
- Logo (file: `src/assets/logo.jpg`) + nome "Emergenza Studio"
- Navigazione: Home, Servizi, Le nostre tariffe, Chi siamo, Contatti
- CTA: "Prenota la tua Prima Lezione" → scroll a #contatti
- Menu hamburger su mobile (Sheet laterale)

### 3.2 Hero
- Badge: "Centro studi a Mogliano Veneto (TV)"
- Titolo: **"Studia con metodo, supera ogni esame"**
- Sottotitolo: ripetizioni per tutti i livelli + preparazione TOLC
- Due CTA: "Prenota la tua Prima Lezione" (primario) + "Scopri i nostri corsi" (outline → #servizi)
- Lato destro: illustrazione con icone educative flottanti + logo al centro

### 3.3 Social Proof Bar
- Striscia colorata (bg-primary) con 3 punti chiave:
  - Dalle elementari all'università
  - Tutor qualificati
  - Lezioni individuali e di gruppo

### 3.4 Servizi — "Come possiamo aiutarti"
- Griglia 3×2 (desktop) / 1 colonna (mobile)
- 6 card con icona, titolo e descrizione:
  1. **Elementari** — Aiuto compiti e supporto personalizzato
  2. **Medie** — Tutte le materie + preparazione esame terza media
  3. **Superiori** — Ripetizioni, recupero debiti, preparazione maturità
  4. **Preparazione TOLC** — TOLC-I, TOLC-E, TOLC-S e altri test di ammissione
  5. **Esami Universitari** — Ripetizioni e corsi di preparazione
  6. **Maturità e debiti** — Preparazione esame di stato

### 3.5 Perché studiare con noi
- 4 punti di forza (griglia 2×2):
  - Tutor qualificati e appassionati
  - Studenti di tutte le età
  - Lezioni individuali o piccoli gruppi (max 4 studenti)
  - Orari flessibili, anche nel weekend

### 3.6 Tariffe — "Le nostre tariffe"
- **Lezione individuale** (1 studente, 1 tutor):
  - Elementari: €16/h
  - Medie: €18/h
  - Superiori: €22/h
  - Università: €30/h
- **Lezione di gruppo** (studia con gli amici):
  - Elementari: €12/h cad.
  - Medie: €14/h cad.
  - Superiori: €18/h cad.
  - Università: €23/h cad.
- **Pacchetto 10 lezioni** — ne paghi solo 9 (sconto 10%)
- **Porta 2 amici** — ricevi 1 lezione gratis

### 3.7 Come funziona — "Iniziare è semplice"
- 3 step in orizzontale:
  1. Contattaci
  2. Raccontaci le difficoltà
  3. Inizia il percorso

### 3.8 Testimonianze — "Cosa dicono di noi"
- 3 card con 5 stelle, testo, nome e contesto:
  - Maria T. (mamma, 3ª media)
  - Marco P. (studente liceo scientifico)
  - Giulia R. (superato TOLC-I)
- **Nota**: sono testimonianze placeholder, da sostituire con quelle reali

### 3.9 Contatti — "Pronto a migliorare i tuoi voti?"
- Link WhatsApp grande (CTA principale)
- Link telefono
- Indirizzo: Via Barbiero 84, Mogliano Veneto (TV)
- Orari di apertura

### 3.10 Footer
- 4 colonne: Brand, Servizi, Contatti, Social (Instagram)
- Copyright © 2025 + Privacy Policy + P.IVA (da inserire)

---

## 4. Design System

### 4.1 Colori (HSL in CSS variables)
| Token | Valore | Uso |
|---|---|---|
| `--primary` | `213 52% 24%` | Blu scuro — header, testi principali, footer |
| `--secondary` | `204 38% 50%` | Azzurro — accenti secondari |
| `--accent` | `168 64% 52%` | Verde acqua/teal — icone, badge, stelle |
| `--background` | `0 0% 100%` | Bianco |
| `--muted` | `210 40% 98%` | Grigio chiarissimo — sezioni alternate |
| `--foreground` | `213 47% 24%` | Testo principale |
| `--muted-foreground` | `215 16% 47%` | Testo secondario |

### 4.2 Tipografia
- **Titoli (h1-h6)**: Poppins (600, 700, 800)
- **Testi**: Inter (400, 500, 600, 700)
- Caricati via Google Fonts

### 4.3 Stile visivo
- Bordi arrotondati: `rounded-2xl` (16px) per card, `rounded-full` per bottoni
- Ombre sottili sulle card, più marcate su hover
- Gradienti leggeri per sfondi sezione
- Animazioni fade-in-up allo scroll (hook `useScrollAnimation`)
- Icone: Lucide React
- Mobile-first, completamente responsive

---

## 5. Stack tecnologico

| Tecnologia | Uso |
|---|---|
| React 18 | Framework UI |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling utility-first |
| shadcn/ui | Componenti UI (Button, Card, Sheet, ecc.) |
| Lucide React | Icone |
| React Router DOM | Routing (single page, ma predisposto) |
| Framer Motion | (disponibile per animazioni future) |

---

## 6. Struttura file

```
src/
├── assets/
│   └── logo.jpg                  # Logo del centro studi
├── components/
│   ├── landing/
│   │   ├── Header.tsx            # Navbar sticky con menu mobile
│   │   ├── Hero.tsx              # Sezione hero con CTA
│   │   ├── SocialProof.tsx       # Barra social proof
│   │   ├── Services.tsx          # Griglia servizi
│   │   ├── WhyUs.tsx             # Punti di forza
│   │   ├── Pricing.tsx           # Tariffe e offerte
│   │   ├── HowItWorks.tsx        # 3 step "come funziona"
│   │   ├── Testimonials.tsx      # Testimonianze
│   │   ├── Contact.tsx           # Sezione contatti
│   │   └── Footer.tsx            # Footer
│   └── ui/                       # Componenti shadcn/ui
├── hooks/
│   └── useScrollAnimation.ts     # Hook per animazioni allo scroll
├── pages/
│   ├── Index.tsx                 # Pagina principale (assembla tutte le sezioni)
│   └── NotFound.tsx              # Pagina 404
├── index.css                     # Design tokens + font imports
└── main.tsx                      # Entry point
```

---

## 7. SEO

- `<title>`: definito in `index.html`
- Meta description presente
- Favicon: logo del centro (`public/favicon.png`)
- Struttura semantica: `<header>`, `<main>`, `<section>`, `<footer>`
- Un solo `<h1>` per pagina
- Alt text sulle immagini

---

## 8. Requisiti funzionali soddisfatti

- [x] Presentazione servizi per livello scolastico
- [x] Tariffe chiare e trasparenti
- [x] Contatto rapido via WhatsApp (link diretto)
- [x] Contatto telefonico diretto
- [x] Indirizzo completo: Via Barbiero 84, Mogliano Veneto (TV)
- [x] Orari di apertura visibili
- [x] Link Instagram funzionante
- [x] Design responsive (mobile, tablet, desktop)
- [x] Navigazione fluida con scroll smooth
- [x] Animazioni allo scroll
- [x] Logo personalizzato nel header, hero e footer
- [x] Favicon personalizzato

---

## 9. Elementi da completare / migliorare

- [ ] Inserire P.IVA reale nel footer
- [ ] Sostituire le testimonianze placeholder con quelle reali
- [ ] Aggiungere Privacy Policy e Cookie Policy (obbligatorie per legge)
- [ ] Valutare integrazione Google Maps per la sede
- [ ] Aggiungere meta tag Open Graph per condivisione social
- [ ] Valutare aggiunta di Google Analytics per monitoraggio traffico
- [ ] Valutare aggiunta di schema.org (JSON-LD) per SEO locale
- [ ] Collegare dominio personalizzato (es. www.emergenzastudio.it)
