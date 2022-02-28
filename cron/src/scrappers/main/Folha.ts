import { New } from '../../types/New';
import Scrapper from '../Scrapper';

export default class Folha extends Scrapper {
  constructor() {
    super('https://search.folha.uol.com.br/?q=Ucrania&site=todos');
  }

  async run() {
    try {
      console.log('Starting FOLHA Scrapper');
      const pageData = await this.getPageData();
      await this.sendPageDataToDB(pageData);
      console.log('Finished FOLHA Scrapper');
    } catch (e) {
      console.error(e);
    }
  }

  parseFolhaData(): New[] {
    console.log('AAAAAAAAAAAAAA');

    const containers = document.querySelectorAll(
      '.c-headline.c-headline--newslist'
    );

    console.log('CONTAINERS', containers);

    const pageData = [] as New[];

    for (const container of containers) {
      const title = container.querySelector('.c-headline__title')?.textContent;
      const srcImage =
        container.querySelector('.c-headline__image')?.textContent;
      const date = container.querySelector(
        '.c-headline__dateline'
      )?.textContent;

      if (!title || !srcImage || !date) {
        throw 'ERROR TRYING TO PARSE FOLHA DATA';
      }

      pageData.push({
        title,
        srcImage,
        date,
      });
    }

    return pageData;
  }
}
