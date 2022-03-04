import axios from 'axios';
import { HierarchyNew } from '../../kiev-utils/types/New';

const API_KIEV_LOCAL = 'http://localhost:4000/news';

export async function newsAPI() {
  const response = await axios.get<HierarchyNew[]>(API_KIEV_LOCAL);
  return response;
}
