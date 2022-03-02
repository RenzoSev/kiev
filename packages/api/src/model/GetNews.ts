import { HierarchyNew } from '../../../kiev-utils/types/New';
import KievNew from '../../../kiev-utils/database/model/KievNew';
import CacheFile from '../cache/CacheFile';

export default class GetNewsModel {
  async handle() {
    const cacheFile = 'news.json';
    const cacheNews = await CacheFile.getCacheInFile(cacheFile);

    if (cacheNews) {
      return cacheNews as HierarchyNew[];
    }

    const news = await KievNew.find();

    CacheFile.setCacheInFile(cacheFile, news);

    return news as HierarchyNew[];
  }
}
