import { Request, Response } from 'express';
import NewsService from '../services/News';

export default class NewsController {
  async handle(_request: Request, response: Response) {
    try {
      const newsService = new NewsService();
      await newsService.handle();
      response.send('Done').status(200);
    } catch (e) {
      console.error(e);
      response.send('Something went wrong =(').status(500);
    }
  }
}
