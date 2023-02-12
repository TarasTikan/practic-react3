import axios from 'axios';
const API_KEY = '9f3449ca8495a13b6d35e887839f0061';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
export function fetchMuvies(page) {
  return axios('trending/movie/day', { params: { api_key: API_KEY, page } });
}
