import axios from 'axios';
import { load } from 'cheerio';

const FLARESOLVERR_URL = 'https://flaresolverrtc.onrender.com'; // <-- metti il tuo
const MATCH_URL = 'https://www.totalcorner.com/odds/Rakhine-United-vs-Ayeyawady-Utd/176540767';

async function scrapeNextGoal() {
  try {
    const response = await axios.post(`${FLARESOLVERR_URL}/v1`, {
      cmd: 'request.get',
      url: MATCH_URL,
      maxTimeout: 20000
    });

    const html = response.data.solution.response;
    const $ = load(html);

    const nextGoalTable = $('table:contains("Next Goal")');

    if (nextGoalTable.length === 0) {
      console.log('❌ Tabella "Next Goal" non trovata.');
      return;
    }

    console.log('✅ Tabella trovata!\n');

    nextGoalTable.find('tr').each((_, row) => {
      const cells = $(row).find('td');
      const rowText = cells.map((_, el) => $(el).text().trim()).get().join(' | ');
      if (rowText) console.log(rowText);
    });

  } catch (err) {
    console.error('Errore durante scraping:', err.message);
  }
}

scrapeNextGoal();
