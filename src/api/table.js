import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/gift/findByAll',
    method: 'POST',
    data
  })
}
