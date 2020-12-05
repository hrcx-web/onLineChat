import request from '@/utils/request'
// 反馈查询
export function questionList(params) {
  return request({
    url: '/chat/question/list',
    method: 'GET',
    params
  })
}

// 反馈批量删除
export function deleteBatch(params) {
  return request({
    url: '/chat/question/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 反馈编辑
export function questionEdit(params) {
  return request({
    url: '/chat/question/edit',
    method: 'POST',
    params
  })
}

// 举报查询
export function reportList(params) {
  return request({
    url: '/chat/report/list',
    method: 'GET',
    params
  })
}
// 举报批量删除
export function reportDelete(params) {
  return request({
    url: '/chat/report/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 举报编辑
export function reportEdit(params, type) {
  return request({
    url: `/chat/report/${type}`,
    contentType: 'application/json',
    method: 'POST',
    params
  })
}

