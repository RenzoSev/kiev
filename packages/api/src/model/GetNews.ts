import { HierarchyNew, NewsByHierarchy } from '../../../kiev-utils/types/New';
import KievNew from '../../../kiev-utils/database/model/KievNew';
import CacheFile from '../cache/CacheFile';

export default class GetNewsModel {
  async handle(): Promise<NewsByHierarchy> {
    const cacheFile = 'news.json';
    const cacheNews = await CacheFile.getCacheInFile(cacheFile);

    if (cacheNews) {
      CacheFile.setCacheInFile(cacheFile, cacheNews);
      return this.getNewsByHierarchy(cacheNews as HierarchyNew[]);
    }

    const news = await KievNew.find();
    CacheFile.setCacheInFile(cacheFile, news);

    return this.getNewsByHierarchy(news as HierarchyNew[]);
  }

  getNewsByHierarchy(news: HierarchyNew[]): NewsByHierarchy {
    const mainNews = [] as HierarchyNew[];
    const normalNews = [] as HierarchyNew[];

    for (const n of news) {
      if (n.hierarchy === 'main') {
        mainNews.push(n);
      }

      normalNews.push(n);
    }

    return { normal: normalNews, main: mainNews };
  }
}
