import connection from '../../kiev-utils/database/connection';
import MainScrapers from './scrappers/main';

(async () => {
  await connection();

  for (const MainScraper of MainScrapers) {
    const mainScrapper = new MainScraper();
    await mainScrapper.run();
  }
})();
