import express from 'express';
import { news } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/news', news);

app.listen(PORT, () => console.log('Server is running'));
