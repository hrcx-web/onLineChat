import request from '@/utils/request'
// 查询访客
export function accessList(params) {
  return request({
    url: '/chat/access/list',
    method: 'GET',
    params
  })
}

// 新增编辑

export function updateAccess(data, type) {
  return request({
    url: `/chat/access/${type}`,
    contentType: type === 'edit' ? 'application/json' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/access/deleteBatch',
    method: 'DELETE',
    params
  })
}