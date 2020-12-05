import request from '@/utils/request'
// 公告配置添加和编辑
export function afficheAdd(params, type) {
  return request({
    url: `/chat/notice/${type}`,
    contentType: type === 'edit' ? 'application/json' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params

  })
}
// 查询
export function noticeList(params) {
  return request({
    url: '/chat/notice/list',
    method: 'GET',
    params

  })
}

// 批量删除
export function deleteBatch(params) {
  return request({
    url: '/chat/notice/deleteBatch',
    method: 'DELETE',
    params
  })
}

