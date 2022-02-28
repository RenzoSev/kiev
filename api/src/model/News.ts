import Scrapper from '../data/Scrapper';
import { URLS } from '../types/URLS';

export default class NewsModel {
  async handle(URLS: URLS) {
    const scrapper = new Scrapper(URLS);
    await scrapper.getMainNewsPage();
  }
}
