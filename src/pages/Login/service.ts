import request from '@/utils/request'

export async function getLoginUser(params: object) {
  return request('/getLoginUser', {
    method: 'GET',
    params,
  });
}
