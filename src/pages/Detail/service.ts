import request from '@/utils/request'

export async function getArticleDetail(params: object) {
  return request('/getArticleDetail', {
    method: 'GET',
    params,
  });
}
