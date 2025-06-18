const { chromium } = require('playwright');

async function scrapeNextGoal(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  // Aspetta che venga caricata la tabella Next Goal
  await page.waitForSelector('#next_goal_table', { timeout: 15000 });

  // Estrai i dati dalla tabella Next Goal
  const rows = await page.$$eval('#next_goal_table tbody tr', trs =>
    trs.map(tr => {
      const cells = Array.from(tr.querySelectorAll('td'));
      return cells.map(td => td.innerText.trim());
    })
  );

  await browser.close();
  return rows;
}

// ESEMPIO USO
(async () => {
  const url = 'https://www.totalcorner.com/odds/Sweden-Women-U19-vs-Italy-Women-U19/176399807';
  const result = await scrapeNextGoal(url);
  console.log('📊 Tabella Next Goal:');
  console.table(result);
})();