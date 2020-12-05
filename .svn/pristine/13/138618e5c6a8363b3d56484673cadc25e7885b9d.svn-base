import request from '@/utils/request'

export function roomList(params) {
  return request({
    url: '/chat/room/list',
    method: 'GET',
    params
  })
}
export function updateRoom(data, type) {
  return request({
    url: `/chat/room/${type}`,
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}
// 房间批量删除
export function deleteBatch(params) {
  return request({
    url: '/chat/room/deleteBatch',
    method: 'DELETE',
    params
  })
}
