import request from '@/utils/request';

export async function myArticles(params: object) {
  return request('/myArticles', {
    method: 'GET',
    params,
  });
}

export async function getUserMess(params: object) {
  return request('/getUserMess', {
    method: 'GET',
    params,
  });
}

