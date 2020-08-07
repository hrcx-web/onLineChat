import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/gift/findByAll',
    method: 'POST',
    data
  })
}
export function getDelete(data) {
  return request({
    url: '/gift/delete',
    method: 'POST',
    data
  })
}

export function getS(data) {
  return request({
    url: '/gift/save',
    method: 'POST',
    data
  })
}
