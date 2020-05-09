import request from '@/utils/request'

export async function publishEditor(data: object) {
  return request('/publishEditor', {
    method: 'POST',
    data,
  });
}

export async function getDraftArticle(params: object) {
  return request('/getDraftArticle', {
    method: 'GET',
    params,
  });
}
