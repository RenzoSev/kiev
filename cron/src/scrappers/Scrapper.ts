import puppeteer from 'puppeteer';
import { New, NewData } from '../types/New';

export default abstract class Scrapper {
  scrapper: string;
  url: string;
  abstract run(): void;
  abstract parseElements(elements: Element[]): NewData[];

  constructor(url: string, scrapper: string) {
    this.url = url;
    this.scrapper = scrapper;
  }

  public async getPageData(selectorElement: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(this.url);
    await page.screenshot({ fullPage: true, path: 'page-image-full.png' });
    const data = await page.$$eval(selectorElement, this.parseElements);

    if (!data) throw `ERROR: error trying parse ${this.scrapper} DATA`;

    await page.close();
    await browser.close();

    return data;
  }

  public async sendPageDataToDB(pageData: New[]) {
    console.log(pageData);
    // WORKING IN PROGRESS
    return;
  }
}
