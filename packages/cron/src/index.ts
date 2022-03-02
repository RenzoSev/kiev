import connection from '../../kiev-utils/database/connection';
import MainScrapers from './scrappers/main';
import Temporary from './utils/Temporary';
import KievNew, {
  KievNewDocument,
} from '../../kiev-utils/database/model/KievNew';

(async () => {
  console.log('Starting Scrappers');

  await connection();

  await Temporary.addsTemporaryInDocuments<KievNewDocument>(KievNew);

  for (const MainScraper of MainScrapers) {
    const mainScrapper = new MainScraper();
    await mainScrapper.run();
  }

  await Temporary.removeTemporaryDocuments<KievNewDocument>(KievNew);

  console.log('Finishing Scrappers');
})();
