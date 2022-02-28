import puppeteer from 'puppeteer';
import { URLS } from '../types/URLS';

export default class Scrapper {
  mainURLS: string[];

  constructor(urls: URLS) {
    this.mainURLS = urls.mainURLS;
  }

  public async getMainNewsPage() {
    const browser = await puppeteer.launch();

    for (const index in this.mainURLS) {
      const url = this.mainURLS[index];
      const page = await browser.newPage();
      await page.goto(url);
      await page.close();
    }

    await browser.close();
  }
}
