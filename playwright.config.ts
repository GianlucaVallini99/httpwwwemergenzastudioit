import { defineConfig, devices } from "@playwright/test";

// Test del banner dei cookie e di GA4. Prima: `npm run build`. Le richieste a Google Analytics
// vengono intercettate e non partono davvero (nessun dato di prova nella proprietà GA4).
const PORTA = Number(process.env.PORTA_E2E || 3311);

export default defineConfig({
  testDir: "e2e",
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: `http://127.0.0.1:${PORTA}`, locale: "it-IT", trace: "retain-on-failure" },
  projects: [
    { name: "telefono", use: { ...devices["Pixel 7"] } },
    { name: "computer", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npx next start -H 127.0.0.1 -p ${PORTA}`,
    url: `http://127.0.0.1:${PORTA}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
