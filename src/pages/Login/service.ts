import request from '@/utils/request'

export async function getLoginUser(params: object) {
  return request('/loginUser', {
    method: 'GET',
    params,
  });
}
