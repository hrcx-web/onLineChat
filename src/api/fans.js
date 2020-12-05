import request from '@/utils/request'

export function fansList(params) {
  return request({
    url: '/chat/fans/list',
    method: 'GET',
    params
  })
}
