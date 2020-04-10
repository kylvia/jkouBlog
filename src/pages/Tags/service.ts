import request from '@/utils/request';

export function getTags(params: object) {
  return request('/tag/getTags', {
    method: 'GET',
    params,
  });
}

export function getTagsDetail(params: object) {
  return request('/getTagsDetail', {
    method: 'GET',
    params,
  });
}
