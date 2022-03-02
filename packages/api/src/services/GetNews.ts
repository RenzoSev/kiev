import GetNewsModel from '../model/GetNews';

export default class GetNewsService {
  async handle() {
    const getNewsModel = new GetNewsModel();
    const news = await getNewsModel.handle();

    return news;
  }
}
