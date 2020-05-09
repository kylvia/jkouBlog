import request from '@/utils/request'

export async function getBlogs(params: object) {
  return request('/getBlogs', {
    method: 'GET',
    params,
  });
}

export async function delBlog(params: object) {
  return request('/delBlog', {
    method: 'GET',
    params,
  });
}
