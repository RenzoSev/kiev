import express from 'express';
import NewsController from '../controllers/News';

const router = express.Router();

const newsController = new NewsController();

router.get('/', newsController.handle);

export default router;
