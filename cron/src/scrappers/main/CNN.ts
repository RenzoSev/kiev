// const elements = document.querySelectorAll(".bastian-page > ._evg > ._evt")

import Scrapper from '../Scrapper';
import { New, NewData } from '../../types/New';
import { Date, getFullDate, getFullTime } from '../../utils/date';

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

      const selectorElement = '.bastian-page > ._evg > ._evt';
      const pageData = await this.getPageData(selectorElement);
      await this.sendPageDataToDB(this.parsePageData(pageData));

      console.log(`Finished ${this.scrapper} Scrapper`);
    } catch (e) {
      console.error(e);
    }
  }

  parseElements(elements: Element[]): NewData[] {
    const pageData = [] as NewData[];

    for (const element of elements) {
      const title = element.querySelector('a')?.textContent?.trim();
      const srcImage = element
        .querySelector('.bstn-fd-picture-image')
        ?.getAttribute('src');
      const date = element
        .querySelector('.feed-post-datetime')
        ?.textContent?.trim();

      if (!title || !srcImage) {
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

  parsePageData(pageData: NewData[]): New[] {
    return pageData.map((data) => {
      const baseData = {
        title: data.title,
        srcImage: data.srcImage,
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
    // TODO: It is possible to a bug happens here with the default full time +
    // corrected time. Date also needs to be corrected.

    const fullDate = getFullDate();

    const isHoursBased = /hora/i.test(date);
    if (isHoursBased) return { date: fullDate, time: this.parseByHours(date) };

    return { date: fullDate, time: this.parseByMinutes(date) };
  }

  parseByMinutes(date: string): Date['time'] {
    const minutes = Number(date.split(' ')[1]);
    return getFullTime({ m: minutes });
  }

  parseByHours(date: string): Date['time'] {
    const hours = Number(date.split(' ')[0]);
    return getFullTime({ h: hours });
  }
}