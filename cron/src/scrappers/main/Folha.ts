import Scrapper from '../Scrapper';
import { New } from '../../types/New';

export default class Folha extends Scrapper {
  constructor() {
    const url = 'https://search.folha.uol.com.br/?q=Ucrania&site=todos';
    const scrapper = 'FOLHA';

    super(url, scrapper);
  }

  async run() {
    try {
      console.log('Starting FOLHA Scrapper');

      const selectorElement = '.c-headline.c-headline--newslist';
      const pageData = await this.getPageData(selectorElement);
      await this.sendPageDataToDB(pageData);

      console.log('Finished FOLHA Scrapper');
    } catch (e) {
      console.error(e);
    }
  }

  parseElements(elements: Element[]): New[] {
    const pageData = [] as New[];

    for (const element of elements) {
      const title = element
        .querySelector('.c-headline__title')
        ?.textContent?.trim();
      const srcImage = element
        .querySelector('.c-headline__image')
        ?.getAttribute('src');
      const date = element
        .querySelector('.c-headline__dateline')
        ?.textContent?.trim();

      if (!title || !srcImage || !date) {
        console.error(
          `There is an parser error with TITLE: ${title}, SRC: ${srcImage}, DATE: ${date}`
        );
        continue;
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
