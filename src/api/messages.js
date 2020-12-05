import request from '@/utils/request'

export function phoneInfoList(params) {
  return request({
    url: '/chat/phoneInfo/list',
    method: 'GET',
    params
  })
}

export function updatePhoneInfo(params, type) {
  return request({
    url: `/chat/phoneInfo/${type}`,
    contentType: 'application/json',
    method: 'POST',
    params
  })
}
// 手机号
export function readFile(data) {
  return request({
    url: '/chat/phoneInfo/readFile',
    method: 'POST',
    data
  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/phoneInfo/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 导出
export function exportXls(params) {
  return request({
    url: '/chat/phoneInfo/exportXls',
    method: 'GET',
    contentType: 'application/json',
    params,
    responseType: 'arraybuffer'
  })
}
// 导入
export function importExcel(params) {
  return request({
    url: '/chat/phoneInfo/importExcel',
    method: 'POST',
    contentType: 'application/json',
    params
  })
}
