import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 添加这一行
});

export default api;