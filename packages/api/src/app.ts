import express from 'express';
import connection from '../../kiev-utils/database/connection';
import { news } from './routes';

const app = express();
const PORT = process.env.PORT || 4000;

(async () => {
  await connection();

  app.use(express.json());

  app.use('/news', news);

  app.listen(PORT, () => console.log('Server is running'));
})();
