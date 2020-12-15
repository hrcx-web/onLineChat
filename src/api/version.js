import request from '@/utils/request'

// 查询软件下载
export function douyinAppList(params) {
  return request({
    url: '/chat/app/system/douyinApp/list',
    method: 'GET',
    params
  })
}
// 版本管理添加编辑
export function versionAdd(data, type) {
  return request({
    url: `/chat/app/system/douyinApp/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}
// apk上传
export function uploadSource(data) {
  return request({
    url: '/chat/upload/uploadApk',
    method: 'POST',
    data
  })
}

export function deleteBatch(data) {
  return request({
    url: '/chat/app/system/douyinApp/delete',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

// 获取七牛云token
export function getToken(params) {
  return request({
    url: '/chat/upload/getToken',
    method: 'GET',
    params
  })
}
