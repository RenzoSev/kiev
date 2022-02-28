import puppeteer from 'puppeteer';
import { New } from '../types/New';

export default abstract class Scrapper {
  url: string;
  abstract run(): void;
  abstract parseFolhaData(): New[];

  constructor(url: string) {
    this.url = url;
  }

  public async getPageData() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });
    await page.goto(this.url);
    await page.screenshot({ path: 'page-image-full.png', fullPage: true });

    const pageInformation = await page.evaluate(() => {
      const containers = document.querySelector(
        '.c-headline.c-headline--newslist'
      );

      console.log('CONTAINERS', containers);

      const pageData = [] as New[];

      // for (const container of containers) {
      //   const title =
      //     container.querySelector('.c-headline__title')?.textContent;
      //   const srcImage =
      //     container.querySelector('.c-headline__image')?.textContent;
      //   const date = container.querySelector(
      //     '.c-headline__dateline'
      //   )?.textContent;

      //   if (!title || !srcImage || !date) {
      //     throw 'ERROR TRYING TO PARSE FOLHA DATA';
      //   }

      //   pageData.push({
      //     title,
      //     srcImage,
      //     date,
      //   });
      // }

      return pageData;
    });

    // await page.close();
    // await browser.close();

    return pageInformation;
  }

  public async sendPageDataToDB(pageData: New[]) {
    console.log(pageData);
    return;
  }
}
