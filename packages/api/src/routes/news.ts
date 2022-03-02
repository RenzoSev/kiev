import express from 'express';
import GetNewsController from '../controllers/GetNews';

const router = express.Router();

const getNewsController = new GetNewsController();

router.get('/', getNewsController.handle);

export default router;
