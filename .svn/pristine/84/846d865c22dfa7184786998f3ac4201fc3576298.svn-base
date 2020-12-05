import request from '@/utils/request'

export function orderList(params) {
  return request({
    url: '/chat/order/list',
    method: 'GET',
    params
  })
}

export function editCoin(data) {
  return request({
    url: '/chat/order/editCoin',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

export function updateVip(data) {
  return request({
    url: '/chat/order/editVip',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

// 批量删除
export function deleteBatch(params) {
  return request({
    url: '/chat/order/deleteBatch',
    method: 'DELETE',
    params
  })
}

export function queryPaymentLog(params) {
  return request({
    url: '/chat/daylog/dayPaymentLog/list',
    method: 'GET',
    params
  })
}

// 订单审核
export function orderVerify(data) {
  return request({
    url: '/chat/order/verify',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}
// 查看分销
export function distributorLogList(params) {
  return request({
    url: `/chat/order/distributorLog/list`,
    method: 'GET',
    params
  })
}

export function deleteBatchs(params) {
  return request({
    url: `/chat/order/distributorLog/deleteBatch`,
    method: 'DELETE',
    params
  })
}

// 收款方式 查看体现信息
export function queryById(params) {
  return request({
    url: `/chat/payConfig/queryById`,
    method: 'GET',
    params
  })
}
