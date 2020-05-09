import request from '@/utils/request'

export async function getUserReport() {
  return request('/getUserReport', {
    method: 'GET',
  });
}

