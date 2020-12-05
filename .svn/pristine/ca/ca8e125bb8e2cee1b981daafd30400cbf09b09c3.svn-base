import request from '@/utils/request'

// vip分页查询
export function vipQuery(params) {
  return request({
    url: '/chat/vip/query',
    method: 'GET',
    params
  })
}
// 批量删除
export function deleteBatch(params) {
  return request({
    url: '/chat/vip/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 添加
export function updateVip(params, type) {
  return request({
    url: `/chat/vip/${type}`,
    contentType: type === 'edit' ? 'application/json' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params
  })
}

