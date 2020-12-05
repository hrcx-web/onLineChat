// 评论
import request from '@/utils/request'

// 查询分页
export function commentList(params) {
  return request({
    url: '/chat/comment/list',
    method: 'GET',
    params
  })
}
// 新增
export function updateComment(data, type) {
  return request({
    url: `/chat/comment/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}

// 批量删除

export function deleteBatch(params) {
  return request({
    url: `/chat/comment/deleteBatch`,
    method: 'DELETE',
    params
  })
}

// 系统配置评论语查询
export function systemCommentList(params) {
  return request({
    url: '/chat/order/systemComment/list',
    method: 'GET',
    params
  })
}

export function systemCommentAdd(data) {
  return request({
    url: `/chat/order/systemComment/add`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

export function systemCommentDel(params) {
  return request({
    url: `/chat/order/systemComment/deleteBatch`,
    method: 'DELETE',
    params
  })
}
