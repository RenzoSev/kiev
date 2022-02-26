import express from 'express';
import { scrapRouter } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/scrap', scrapRouter);

app.listen(PORT, () => console.log('Server is running'));
