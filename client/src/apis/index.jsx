import axios from 'axios';

export const OMDB = axios.create({
  baseURL: process.env.REACT_APP_OMDB_API || '',
  timeout: 60000,
})