import { Request, Response } from 'express';
import GetNewsService from '../services/GetNews';

export default class GetNewsController {
  async handle(_request: Request, response: Response) {
    try {
      response.header('Access-Control-Allow-Origin', '*');
      const getNewsService = new GetNewsService();
      const news = await getNewsService.handle();
      return response.json(news).status(200);
    } catch (e) {
      console.error(e);
      return response.status(500);
    }
  }
}
