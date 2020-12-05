import request from '@/utils/request'

export function updateActivity(data, type) {
  return request({
    url: `/chat/activity/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

export function queryActivity(params) {
  return request({
    url: `/chat/activity/list`,
    method: 'GET',
    params
  })
}

export function deleteActivity(params) {
  return request({
    url: `/chat/activity/deleteBatch`,
    method: 'DELETE',
    params
  })
}

// 抽奖记录查询

export function DrawRecordlist(params) {
  return request({
    url: `/chat/lotteryDrawHistory/list`,
    method: 'GET',
    params
  })
}
export function deleteBatch(params) {
  return request({
    url: `/chat/lotteryDrawHistory/deleteBatch`,
    method: 'DELETE',
    params
  })
}
// 奖品
export function prizelist(params) {
  return request({
    url: `/chat/prize/list`,
    method: 'GET',
    params
  })
}
export function updatePrize(data, type) {
  return request({
    url: `/chat/prize/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}
export function deleteBatchs(params) {
  return request({
    url: `/chat/prize/deleteBatch`,
    method: 'DELETE',
    params
  })
}
// 查询礼物

export function findByAll(params) {
  return request({
    url: `/chat/gift/findByAll`,
    method: 'POST',
    params
  })
}

