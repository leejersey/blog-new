import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/admin/',
  timeout: 10000,
  withCredentials: true
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.data === '没有登录') {
      localStorage.removeItem('openId');
      // 如果不在登录页，提示登录失效并重定向
      if (!window.location.pathname.includes('/login')) {
        message.error('登录状态已失效，请重新登录');
        window.location.href = '/login';
      }
      return Promise.reject(new Error('没有登录'));
    }
    return res;
  },
  error => {
    message.error('请求网络错误，请稍后重试');
    return Promise.reject(error);
  }
);

export default service;
