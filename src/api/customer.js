// 客服
import request from '@/utils/request'

// 客服列表
export function customerList(params) {
  return request({
    url: '/chat/system/user/customerList',
    method: 'GET',
    params
  })
}

