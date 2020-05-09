import request from '@/utils/request'

export async function getArticleDetail(params: object) {
  return request('/getArticleDetail', {
    method: 'GET',
    params,
  });
}

export async function getComment(params: object) {
  return request('/getComment', {
    method: 'GET',
    params,
  });
}

export async function insComment(data: object) {
  return request('/insComment', {
    method: 'POST',
    data,
  });
}

export async function insRepComment(data: object) {
  return request('/insRepComment', {
    method: 'POST',
    data,
  });
}

export async function updLikes(data: object) {
  return request('/updLikes', {
    method: 'POST',
    data,
  });
}
