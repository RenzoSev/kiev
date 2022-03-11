import axios from 'axios';
import { NewsByHierarchy } from '../../kiev-utils/types/New';

const API_KIEV_LOCAL = 'http://localhost:4000/news';

export async function newsAPI() {
  const response = await axios.get<NewsByHierarchy>(API_KIEV_LOCAL);
  return response;
}
