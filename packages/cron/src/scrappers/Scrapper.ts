import puppeteer from 'puppeteer';
import KievNew from '../../../kiev-utils/database/model/KievNew';
import { HierarchyNew, New, NewData } from '../../../kiev-utils/types/New';
import Date from '../../../kiev-utils/types/Date';

export default abstract class Scrapper {
  scrapper: string;
  url: string;
  abstract run(): Promise<void>;
  abstract parseElements(elements: Element[]): NewData[];
  abstract parseDate(date: string): Date;

  constructor(url: string, scrapper: string) {
    this.url = url;
    this.scrapper = scrapper;
  }

  public async getPageData(selectorElement: string): Promise<NewData[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(this.url);
    const data = await page.$$eval(selectorElement, this.parseElements);

    if (!data) throw `ERROR: error trying parse ${this.scrapper} DATA`;

    await page.close();
    await browser.close();

    return data;
  }

  public async sendPageDataToDB(pageData: New[]): Promise<void> {
    try {
      const pageDataWithMainNew = this.getHierarchyNew(pageData);
      await KievNew.insertMany(pageDataWithMainNew);
    } catch (e) {
      console.error();
    }
  }

  private getHierarchyNew(pageData: New[]): HierarchyNew[] {
    return pageData.map((data, index) => {
      if (index === 0) {
        return {
          ...data,
          hierarchy: 'main',
        };
      }

      return {
        ...data,
        hierarchy: 'normal',
      };
    });
  }
}
