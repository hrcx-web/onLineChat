import request from '@/utils/request'
// 消费排行
export function orderByList(params) {
  return request({
    url: '/chat/order.mgr/usersOrder/orderByList',
    method: 'GET',
    params
  })
}
// 充值提现
export function orderByCash(params) {
  return request({
    url: `/chat/order/orderByCash`,
    method: 'GET',
    params
  })
}

// 奖励配置
export function rankRewardConfigList(params) {
  return request({
    url: '/chat/rank/rankRewardConfig/list',
    method: 'GET',
    params
  })
}

export function updateRankReward(params, type) {
  return request({
    url: `/chat/rank/rankRewardConfig/${type}`,
    contentType: 'application/json',
    method: 'POST',
    params

  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/rank/rankRewardConfig/deleteBatch',
    method: 'DELETE',
    params
  })
}
