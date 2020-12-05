import request from '@/utils/request'
// 常见问题列表查询
export function helpList(params) {
  return request({
    url: '/chat/help/list',
    method: 'GET',
    params
  })
}
export function deleteBatch(params) {
  return request({
    url: '/chat/help/deleteBatch',
    method: 'DELETE',
    params
  })
}

export function updateHelp(data, type) {
  return request({
    url: `/chat/help/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

