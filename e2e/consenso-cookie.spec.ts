import { expect, test, type Page, type Request } from "@playwright/test";

/**
 * Banner dei cookie e GA4 (Consent Mode v2, modo base):
 * - prima della scelta nessuna richiesta a Google Analytics / Tag Manager e nessun cookie _ga;
 * - X e Rifiuta = nessun tracciamento, scelta ricordata;
 * - Accetta = gtag carica e invia (le richieste di raccolta sono intercettate: non arrivano a Google);
 * - UTM dei QR conservati anche se si accetta dopo aver cambiato pagina;
 * - eventi whatsapp_click senza query string; revoca dal piede = cookie _ga cancellati.
 */

const GOOGLE = /google-analytics\.com|googletagmanager\.com|analytics\.google\.com/;
const RACCOLTA = /\/g\/collect/;
const UTM = "utm_source=volantino&utm_medium=qr&utm_campaign=2026-10-prova&utm_content=biblioteca";

async function registra(page: Page): Promise<Request[]> {
  const richieste: Request[] = [];
  page.on("request", (r) => {
    if (GOOGLE.test(r.url())) richieste.push(r);
  });
  // Le richieste di raccolta non partono davvero: rispondiamo noi con 204.
  await page.route(/google-analytics\.com|analytics\.google\.com/, (route) => route.fulfill({ status: 204, body: "" }));
  // WhatsApp non serve aprirlo davvero.
  await page.context().route(/wa\.me|whatsapp\.com/, (route) => route.fulfill({ status: 200, body: "ok" }));
  return richieste;
}

const decodifica = (x: string) => {
  try {
    return decodeURIComponent(x);
  } catch {
    return x;
  }
};
// GA4 manda gli eventi nell'URL o, a lotti, nel corpo della richiesta.
const testoRichiesta = (r: Request) => `${decodifica(r.url())}\n${decodifica(r.postData() ?? "")}`;
const cookieGa = async (page: Page) => (await page.context().cookies()).filter((c) => c.name === "_ga" || c.name.startsWith("_ga_"));
const banner = (page: Page) => page.getByTestId("banner-cookie");

test("prima del consenso nessuna richiesta a Google Analytics né cookie _ga", async ({ page }) => {
  const richieste = await registra(page);
  await page.goto(`/?${UTM}`);
  await expect(banner(page)).toBeVisible();
  await page.mouse.wheel(0, 1500); // lo scroll non è consenso
  await page.waitForTimeout(2500);
  expect(richieste.map((r) => r.url())).toEqual([]);
  expect(await cookieGa(page)).toEqual([]);
  expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
  // Accetta e Rifiuta con la stessa evidenza, X con nome accessibile, link alla cookie policy.
  const rifiuta = banner(page).getByRole("button", { name: "Rifiuta", exact: true });
  const accetta = banner(page).getByRole("button", { name: "Accetta", exact: true });
  const stile = (el: HTMLElement) => {
    const s = getComputedStyle(el);
    return [s.backgroundColor, s.color, s.fontSize, s.fontWeight, Math.round(el.getBoundingClientRect().height)].join("|");
  };
  expect(await rifiuta.evaluate(stile)).toBe(await accetta.evaluate(stile));
  await expect(banner(page).getByRole("button", { name: /Chiudi e continua senza cookie statistici/ })).toBeVisible();
  await expect(banner(page).getByRole("link", { name: "Cookie policy" })).toHaveAttribute("href", "/cookie-policy");
});

test("la X equivale a rifiutare e la scelta resta ricordata", async ({ page }) => {
  const richieste = await registra(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: /Chiudi e continua/ }).click();
  await expect(banner(page)).toBeHidden();
  await page.reload();
  await page.waitForTimeout(1500);
  await expect(banner(page)).toBeHidden();
  const consenso = (await page.context().cookies()).find((c) => c.name === "es_consenso");
  expect(decodeURIComponent(consenso?.value ?? "")).toContain('"statistiche":false');
  await page.getByRole("link", { name: "Contattaci su WhatsApp" }).click();
  await page.waitForTimeout(1000);
  expect(richieste).toEqual([]);
  expect(await cookieGa(page)).toEqual([]);
});

test("dopo Accetta GA4 parte, con gli UTM del QR anche dopo un cambio di pagina, ed eventi puliti", async ({ page }) => {
  const richieste = await registra(page);
  await page.goto(`/?${UTM}`);
  await expect(banner(page)).toBeVisible();
  // Cambio di pagina lato client prima di scegliere: gli UTM spariscono dall'indirizzo.
  await page.locator('a[href="/contatti"]').first().evaluate((a: HTMLAnchorElement) => a.click());
  await page.waitForURL(/\/contatti\/?$/);
  expect(richieste).toEqual([]);

  const primaRaccolta = page.waitForRequest((r) => RACCOLTA.test(r.url()), { timeout: 20_000 });
  await banner(page).getByRole("button", { name: "Accetta", exact: true }).click();
  await expect(banner(page)).toBeHidden();
  const r1 = await primaRaccolta;
  expect(richieste.some((r) => /googletagmanager\.com\/gtag\/js\?id=G-FK7LJF7LXH/.test(r.url()))).toBe(true);
  const q1 = new URL(r1.url()).searchParams;
  expect(q1.get("tid")).toBe("G-FK7LJF7LXH");
  expect(q1.get("gcs")).toBe("G101"); // statistiche sì, pubblicità no
  const dl = new URL(q1.get("dl") ?? "");
  expect(dl.pathname).toMatch(/^\/contatti\/?$/);
  expect(dl.searchParams.get("utm_medium")).toBe("qr");
  expect(dl.searchParams.get("utm_content")).toBe("biblioteca");
  await expect.poll(async () => (await cookieGa(page)).length, { timeout: 10_000 }).toBeGreaterThan(0);

  // Clic su WhatsApp: evento whatsapp_click, senza il testo del messaggio.
  const evento = page.waitForRequest((r) => RACCOLTA.test(r.url()) && testoRichiesta(r).includes("en=whatsapp_click"), { timeout: 20_000 });
  await page.getByRole("link", { name: "Contattaci su WhatsApp" }).click();
  // GA4 accoda gli eventi: chiudere la scheda li fa partire subito.
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
  const r2 = await evento;
  const t2 = testoRichiesta(r2);
  expect(t2).toContain("ep.link_url=https://wa.me/393534017905");
  expect(t2).toContain("ep.posizione=pulsante-fisso");
  expect(t2).not.toContain("?text=");
});

test("dal piede si revoca il consenso: cookie _ga cancellati", async ({ page }) => {
  await registra(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Accetta", exact: true }).click();
  await expect.poll(async () => (await cookieGa(page)).length, { timeout: 15_000 }).toBeGreaterThan(0);
  await page.getByRole("contentinfo").getByRole("button", { name: "Preferenze cookie" }).click();
  const dialogo = page.getByRole("dialog", { name: "Preferenze cookie" });
  await expect(dialogo).toBeVisible();
  await expect(dialogo.getByRole("switch", { name: /statistici/ })).toHaveAttribute("aria-checked", "true");
  await dialogo.getByRole("button", { name: "Rifiuta tutti" }).click();
  await expect(dialogo).toBeHidden();
  await expect.poll(async () => (await cookieGa(page)).length).toBe(0);
  const consenso = (await page.context().cookies()).find((c) => c.name === "es_consenso");
  expect(decodeURIComponent(consenso?.value ?? "")).toContain('"statistiche":false');
});

test("Personalizza: categorie preimpostate sul no, Esc chiude senza scegliere", async ({ page }) => {
  const richieste = await registra(page);
  await page.goto("/");
  await banner(page).getByRole("button", { name: "Personalizza" }).click();
  const dialogo = page.getByRole("dialog", { name: "Preferenze cookie" });
  await expect(dialogo.getByRole("switch", { name: /statistici/ })).toHaveAttribute("aria-checked", "false");
  await expect(dialogo.getByRole("switch", { name: /tecnici/ })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(dialogo).toBeHidden();
  await expect(banner(page)).toBeVisible();
  await banner(page).getByRole("button", { name: "Personalizza" }).click();
  await dialogo.getByRole("switch", { name: /statistici/ }).click();
  await dialogo.getByRole("button", { name: "Salva le scelte" }).click();
  await expect.poll(() => richieste.length, { timeout: 15_000 }).toBeGreaterThan(0);
});

test("sul telefono il banner non copre i contenuti: in fondo alla pagina resta tutto leggibile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo telefono");
  await registra(page);
  await page.goto("/cookie-policy");
  const b = banner(page);
  await expect(b).toBeVisible();
  const vh = page.viewportSize()!.height;
  const box = (await b.boundingBox())!;
  expect(box.height).toBeLessThan(vh * 0.36);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  const piede = page.getByRole("contentinfo").getByRole("button", { name: "Preferenze cookie" });
  const p = (await piede.boundingBox())!;
  const b2 = (await b.boundingBox())!;
  expect(p.y + p.height).toBeLessThanOrEqual(b2.y);
  // Nessuno scorrimento orizzontale e lo scorrimento verticale funziona.
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth && window.scrollY > 0)).toBe(true);
  // Il pulsante WhatsApp sale sopra il banner.
  const wa = (await page.getByRole("link", { name: "Contattaci su WhatsApp" }).boundingBox())!;
  expect(wa.y + wa.height).toBeLessThanOrEqual(b2.y + 1);
});

test("la mappa di Google si carica solo su richiesta", async ({ page }) => {
  const maps: string[] = [];
  page.on("request", (r) => {
    if (/google\.com\/maps/.test(r.url())) maps.push(r.url());
  });
  await page.route(/google\.com\/maps/, (route) => route.fulfill({ status: 200, body: "<html></html>", contentType: "text/html" }));
  await page.goto("/contatti");
  await page.waitForTimeout(1500);
  expect(maps).toEqual([]);
  await page.getByRole("button", { name: "Mostra la mappa" }).click();
  await expect(page.locator('iframe[title^="Mappa"]')).toBeVisible();
  expect(maps.length).toBeGreaterThan(0);
});
