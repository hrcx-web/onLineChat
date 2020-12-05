import request from '@/utils/request'

// 点赞
export function likeList(params) {
  return request({
    url: '/chat/like/list',
    method: 'GET',
    params

  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/like/deleteBatch',
    method: 'DELETE',
    params
  })
}

export function updategivelike(params, type) {
  return request({
    url: `/chat/like/${type}`,
    contentType: type === 'edit' ? 'application/json' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params
  })
}
// id查询
export function queryById(params) {
  return request({
    url: '/chat/like/queryById',
    method: 'GET',
    params
  })
}
