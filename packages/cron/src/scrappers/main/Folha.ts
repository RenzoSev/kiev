import Date from '../../../../kiev-utils/types/Date';
import Scrapper from '../Scrapper';
import { New, NewData } from '../../../../kiev-utils/types/New';
import { months, parseHours, parseMonth } from '../../utils/date';

export default class Folha extends Scrapper {
  constructor() {
    const url = 'https://search.folha.uol.com.br/?q=Ucrania&site=todos';
    const scrapper = 'FOLHA';

    super(url, scrapper);
  }

  async run(): Promise<void> {
    try {
      console.log(`Starting ${this.scrapper} Scrapper`);

      const selectorElement = '.c-headline.c-headline--newslist';
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
      const title = element
        .querySelector('.c-headline__title')
        ?.textContent?.trim();
      const srcImage = element
        .querySelector('.c-headline__image')
        ?.getAttribute('src');
      const date = element
        .querySelector('.c-headline__dateline')
        ?.textContent?.trim();
      const href = element.querySelector('a')?.getAttribute('href');

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
    // example: 28.fev.2022 às 11h48
    const [fullDate, _, time] = date.split(' ');

    const [day, month, year] = fullDate.split('.');
    const [hours, minutes] = time.split('h');

    return {
      date: `${parseMonth(month as keyof typeof months)}/${day}/${year}`,
      time: {
        hours: parseHours(Number(hours), Number(minutes)),
        minutes: Number(minutes),
      },
    };
  }
}
