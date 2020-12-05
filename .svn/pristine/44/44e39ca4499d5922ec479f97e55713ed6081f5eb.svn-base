import request from '@/utils/request'
// 查询用户间订单
export function usersOrderList(params) {
  return request({
    url: '/chat/order.mgr/usersOrder/webList',
    method: 'GET',
    params
  })
}

// 新增编辑视频或者语音
export function updateUsersOrder(params, type) {
  return request({
    url: `/chat/order.mgr/usersOrder/${type}`,
    contentType: type === 'videoOrder' ? 'application/json' : undefined,
    method: type === 'edit' ? 'POST' : 'POST',
    params
  })
}
// 批量删除

export function deleteBatch(params) {
  return request({
    url: '/chat/order.mgr/usersOrder/deleteBatch',
    method: 'DELETE',
    params
  })
}
