import { connect } from 'mongoose';

const LOCAL_KIEV_CONNECTION = 'mongodb://localhost:27017/kiev';
const URL_CONNECTION = process.env.DB_KIEV_PRODUCTION || LOCAL_KIEV_CONNECTION;

export default async function connection() {
  await connect(URL_CONNECTION);
}
