import request from '@/utils/request'
// 工会查询
export function tradeList(params) {
  return request({
    url: '/chat/trade/list',
    method: 'GET',
    params
  })
}

export function updateTrade(params, type) {
  return request({
    url: `/chat/trade/${type}`,
    contentType: 'application/json',
    method: 'POST',
    params
  })
}
export function deleteBatch(params) {
  return request({
    url: '/chat/trade/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 工会申请记录查询
export function userTradeList(params) {
  return request({
    url: '/chat/trade/userTrade/list',
    method: 'GET',
    params
  })
}

export function userTrade(data) {
  return request({
    url: '/chat/trade/userTrade/edit',
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

// 工会成员
export function userList(params) {
  return request({
    url: '/chat/trade/userTrade/userList',
    method: 'GET',
    params
  })
}

// 工会管理员查询
export function adminList(params) {
  return request({
    url: '/chat/trade/admin/list',
    method: 'GET',
    params
  })
}

export function updateAdmin(params) {
  return request({
    url: `/chat/trade/admin/add`,
    // contentType: 'application/json',
    method: 'POST',
    params
  })
}

export function deleteBatchs(params) {
  return request({
    url: '/chat/trade/admin/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 获取所有工会
export function tradeGetAll(params) {
  return request({
    url: '/chat/trade/getAll',
    method: 'GET',
    params
  })
}
// 工会订单
export function skillOrder(params) {
  return request({
    url: '/chat/order.mgr/usersOrder/skillOrder',
    method: 'GET',
    params
  })
}

// 发起提现

export function tradeCash(params) {
  return request({
    url: '/chat/order/tradeCash',
    method: 'POST',
    params
  })
}
// 查看公会日报月报
export function tradeLog(params) {
  return request({
    url: '/chat/trade/tradeLog',
    method: 'GET',
    params
  })
}

export function tradeLogDetail(params) {
  return request({
    url: '/chat/trade/tradeLogDetail',
    method: 'GET',
    params
  })
}

// 修改密码

export function editPwd(params) {
  return request({
    url: '/chat/trade/admin/editPwd',
    method: 'POST',
    params
  })
}

export function hotRatio(params) {
  return request({
    url: '/chat/trade/editRatio',
    method: 'POST',
    params
  })
}
