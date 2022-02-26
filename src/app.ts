import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  return response.send('Is working');
});

app.listen(PORT, () => console.log('Server is running'));
