import KievNew from '../../../kiev-utils/database/model/KievNew';

export default class GetNewsModel {
  async handle() {
    const news = await KievNew.find();
    return news;
  }
}
