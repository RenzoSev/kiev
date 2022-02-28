import { mainNews } from '../helpers/pathes';
import NewsModel from '../model/News';

export default class NewsService {
  async handle() {
    const newsModel = new NewsModel();
    const URLS = this.getParsedURLS();
    await newsModel.handle(URLS);
  }

  getParsedURLS() {
    return {
      mainURLS: Object.values(mainNews),
    };
  }
}
