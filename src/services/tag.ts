import request from '@/utils/request';

export function getTag(params: object) {
  return request('/tag/getTags', {
    method: 'GET',
    params,
  });
}
