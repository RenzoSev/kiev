import Date from '../../../../kiev-utils/types/Date';
import Scrapper from '../Scrapper';
import { parseHours } from '../../utils/date';
import { New, NewData } from '../../../../kiev-utils/types/New';

export default class CNN extends Scrapper {
  constructor() {
    const url =
      'https://www.cnnbrasil.com.br/?s=ucrania&orderby=date&order=desc';
    const scrapper = 'CNN';

    super(url, scrapper);
  }

  async run(): Promise<void> {
    try {
      console.log(`Starting ${this.scrapper} Scrapper`);

      const selectorElement = '.home__new > .home__list__item';
      const pageData = await this.getPageData(selectorElement);
      await this.sendPageDataToDB(this.parsePageData(pageData));

      console.log(`Finishing ${this.scrapper} Scrapper`);
    } catch (e) {
      console.error(e);
    }
  }

  parseElements(elements: Element[]): NewData[] {
    const pageData = [] as NewData[];

    for (const element of elements) {
      const title = element.querySelector('h2')?.textContent?.trim();
      const srcImage = element.querySelector('img')?.getAttribute('src');
      const date = element
        .querySelector('.latest__news__infos > .home__title__date')
        ?.textContent?.trim();
      const href = element
        .querySelector('.home__list__tag')
        ?.getAttribute('href');

      console.log("HREF", href);

      if (!title || !srcImage || !href) {
        console.error(
          `There is an parser error with TITLE: ${title}, SRC: ${srcImage}, DATE: ${date}`
        );
        continue;
      }

      pageData.push({
        title,
        srcImage,
        date,
        href,
      });
    }

    return pageData;
  }

  parsePageData(pageData: NewData[]): New[] {
    return pageData.map((data) => {
      const baseData = {
        title: data.title,
        srcImage: data.srcImage,
        href: data.href,
      };

      if (!data.date) {
        return baseData;
      }

      return {
        ...baseData,
        date: this.parseDate(data.date),
      };
    });
  }

  parseDate(date: string): Date {
    // example: 01/03/2022 às 12:40
    const [fullDate, time] = date.split(' às ');
    const [hours, minutes] = time.split(':');

    return {
      date: fullDate,
      time: {
        hours: parseHours(Number(hours), Number(minutes)),
        minutes: Number(minutes),
      },
    };
  }
}
