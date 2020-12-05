import request from '@/utils/request'

export function updateBanner(data, type) {
  return request({
    url: `/chat/banner/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

export function queryBanner(params) {
  return request({
    url: `/chat/banner/list`,
    method: 'GET',
    params
  })
}

export function deleteBanner(params) {
  return request({
    url: `/chat/banner/deleteBatch`,
    method: 'DELETE',
    params
  })
}
