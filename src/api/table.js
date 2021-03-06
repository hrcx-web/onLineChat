import request from '@/utils/request'

// 礼物模块新增
export function giftAdd(params, type) {
  return request({
    url: `/chat/gift/${type}`,
    contentType: type === 'edit' ? 'application/json' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params

  })
}
// 礼物模块查询
export function getList(params) {
  return request({
    url: '/chat/gift/list',
    method: 'GET',
    params
  })
}
// 礼物模块批量删除
export function getDelete(params) {
  return request({
    url: '/chat/gift/deleteBatch',
    method: 'DELETE',
    params
  })
}

export function uploadGiftSource(data) {
  return request({
    url: '/chat/upload/uploadGiftSource',
    method: 'POST',
    data
  })
}
// export function getDelete(data) {
//   return request({
//     url: '/gift/delete',
//     method: 'POST',
//     data
//   })
// }

export function getS(data) {
  return request({
    url: '/gift/save',
    method: 'POST',
    data
  })
}
