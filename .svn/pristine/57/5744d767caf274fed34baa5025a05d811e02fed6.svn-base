import request from '@/utils/request'

export function updateCommunity(params, type) {
  return request({
    url: `/chat/community/${type}`,
    contentType: type === 'add' ? 'x-www-form-urlencoded' : undefined,
    method: type === 'edit' ? 'PUT' : 'POST',
    params
  })
}

export function queryCommunity(params) {
  return request({
    url: `/chat/community/list`,
    method: 'GET',
    params
  })
}

export function queryCommunityById(params) {
  return request({
    url: `/chat/community/queryByUserId`,
    method: 'GET',
    params
  })
}

export function deleteCommunity(params) {
  return request({
    url: `/chat/community/deleteBatch`,
    method: 'DELETE',
    params
  })
}
