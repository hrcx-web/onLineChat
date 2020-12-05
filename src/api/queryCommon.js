import request from '@/utils/request'
// 后台配置
export function queryCommon(params) {
  return request({
    url: '/chat/system/config/queryCommon',
    method: 'POST',
    params
  })
}
// 添加编辑
export function updateSystem(params, type) {
  return request({
    url: `/chat/system/config/${type}`,
    contenType: type === 'addCommon' ? 'application/json' : undefined,
    method: type === 'updCommon' ? 'POST' : 'POST',
    params
  })
}

// 删除
export function deleteBatch(params) {
  return request({
    url: `/chat/system/config/delete`,
    method: 'POST',
    params
  })
}
// 刷新缓存

export function updCacheToComm(params) {
  return request({
    url: `/chat/system/config/updCacheToComm`,
    method: 'get',
    params
  })
}
