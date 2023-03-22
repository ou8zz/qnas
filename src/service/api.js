import { request } from 'umi';

export const getItemList = ({ path }) => {
  return request('/api/list', {
    params: { path: path },
    timeout: 2000,
    // skipErrorHandler: true,
    errorConfig: {
      errorHandler: (e) => {
        console.log("errorHandler:", e);
      },
      errorThrower: (e) => {
        console.log("errorThrower:", e);
      }
    },
    getResponse: true,
    // 请求拦截器
    requestInterceptors: [],
    // 响应拦截器
    responseInterceptors: [],
  });
};

