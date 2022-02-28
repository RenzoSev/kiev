import puppeteer from 'puppeteer';
import { New } from '../types/New';

export default abstract class Scrapper {
  scrapper: string;
  url: string;
  abstract run(): void;
  abstract parseElements(elements: Element[]): New[];

  constructor(url: string, scrapper: string) {
    this.url = url;
    this.scrapper = scrapper;
  }

  public async getPageData(selectorElement: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(this.url);
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
