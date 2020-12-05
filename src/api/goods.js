import request from '@/utils/request'

// 商品查询
export function goodsList(params) {
  return request({
    url: '/chat/goods/list',
    method: 'GET',
    params

  })
}

// 新增

export function updateGoods(params, type) {
  return request({
    url: `/chat/goods/${type}`,
    contentType: 'application/json',
    method: 'POST',
    params

  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/goods/deleteBatch',
    method: 'DELETE',
    params

  })
}

// 商品订单
export function goodsOrder(params) {
  return request({
    url: '/chat/order/goodsOrder/list',
    method: 'GET',
    params

  })
}

export function updateGoodsOrder(params) {
  return request({
    url: `/chat/order/goodsOrder/add`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    params

  })
}

export function deleteBatchs(params) {
  return request({
    url: '/chat/order/goodsOrder/deleteBatch',
    method: 'DELETE',
    params

  })
}

// 商品信息操作
export function goodsEdit(params) {
  return request({
    url: '/chat/goods/edit',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    params

  })
}

// 通过驳回操作接口
export function goodsOrderEdit(params) {
  return request({
    url: '/chat/order/goodsOrder/edit',
    method: 'POST',
    params

  })
}

// 店铺
export function userShoplist(params) {
  return request({
    url: '/chat/goods/userShop/list',
    method: 'GET',
    params

  })
}

export function carDeleteBatch(params) {
  return request({
    url: '/chat/goods/userShop/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 新增
export function updateUserShop(params) {
  return request({
    url: `/chat/goods/userShop/add`,
    contentType: 'application/json',
    method: 'POST',
    params

  })
}
// 编辑操作按钮
export function userShopEdit(params) {
  return request({
    url: `/chat/goods/userShop/edit`,
    contentType: 'application/json',
    method: 'POST',
    params

  })
}

// 一键操作
export function closeShop(params) {
  return request({
    url: '/chat/goods/userShop/closeShop',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    params
  })
}
