import request from '@/utils/request'

export async function getBlogUserReport() {
  return request('/getBlogUserReport', {
    method: 'GET',
  });
}
export async function clearOneBlogNotComm(params: object) {
  return request('/clearOneBlogNotComm', {
    method: 'GET',
    params
  });
}

