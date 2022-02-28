import MainScrapers from './scrappers/main';

(async () => {
  for (const MainScraper of MainScrapers) {
    const mainScrapper = new MainScraper();
    await mainScrapper.run();
  }
})();
