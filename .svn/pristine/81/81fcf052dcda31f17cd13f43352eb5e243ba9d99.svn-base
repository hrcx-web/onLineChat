import request from '@/utils/request'
// 标签
export function labelList(params) {
  return request({
    url: '/chat/label/list',
    method: 'GET',
    params
  })
}

export function updatelable(params, type) {
  return request({
    url: `/chat/label/${type}`,
    contentType: type === 'edit' ? 'x-www-form-urlencoded' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params
  })
}
export function deleteBatch(params) {
  return request({
    url: '/chat/label/deleteBatch',
    method: 'DELETE',
    params
  })
}
