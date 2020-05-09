import request from '@/utils/request';

export function isLogin(params: object) {
  return request('/isLogin', {
    method: 'GET',
    params,
  });
}
