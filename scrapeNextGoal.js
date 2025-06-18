import { chromium } from 'playwright';

const url = 'https://www.totalcorner.com/odds/Sweden-Women-U19-vs-Italy-Women-U19/176399807';

async function scrapeNextGoal(link) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(link, { waitUntil: 'networkidle' });

  await page.waitForSelector('#next_goal_table', { timeout: 10000 });

  const rows = await page.$$eval('#next_goal_table tbody tr', trs =>
    trs.map(tr => {
      const cells = Array.from(tr.querySelectorAll('td'));
      return cells.map(td => td.innerText.trim());
    })
  );

  console.table(rows);
  await browser.close();
}

scrapeNextGoal(url).catch(console.error);
