import request from '@/utils/request'

export async function getUserMess(params: object) {
  return request('/getUserMess', {
    method: 'GET',
    params,
  });
}

export async function insUserMess(data: object) {
  return request('/insUserMess', {
    method: 'POST',
    data,
  });
}
