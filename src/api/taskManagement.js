import request from '@/utils/request'

export function dayTaskList(params) {
  return request({
    url: '/chat/task/dayTask/list',
    method: 'GET',
    params
  })
}
// 新增编辑
export function updateDayTask(params, type) {
  return request({
    url: `/chat/task/dayTask/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    params
  })
}
export function deleteBatch(params) {
  return request({
    url: '/chat/task/rewardConfig/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 任务奖励配置
export function rewardConfigList(params) {
  return request({
    url: '/chat/task/rewardConfig/list',
    method: 'GET',
    params
  })
}

// 新增编辑
export function updateRewardConfig(params, type) {
  return request({
    url: `/chat/task/rewardConfig/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    params
  })
}
export function deleteBatchReward(params) {
  return request({
    url: '/chat/task/rewardConfig/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 获取所有任务签到
export function dayTaskToObtain(params) {
  return request({
    url: '/chat/task/dayTask/dayTaskList',
    method: 'POST',
    params
  })
}
// 给签到任务配置奖励
export function dayConfig(params) {
  return request({
    url: '/chat/task/rewardConfig/dayConfig',
    method: 'POST',
    params
  })
}

// 盲盒

export function giftBoxList(params) {
  return request({
    url: '/chat/gift/giftBox/list',
    method: 'GET',
    params
  })
}

export function updateGiftBox(params, type) {
  return request({
    url: `/chat/gift/giftBox/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    params
  })
}
export function deleteBatchLucky(params) {
  return request({
    url: '/chat/gift/giftBox/deleteBatch',
    method: 'DELETE',
    params
  })
}
// 获取所有盲盒
export function giftBox(params) {
  return request({
    url: '/chat/gift/giftBox/getAll',
    method: 'POST',
    params
  })
}

export function giftBoxSetIds(params) {
  return request({
    url: '/chat/gift/giftBox/setIds',
    method: 'POST',
    params
  })
}

// 守护

export function guardConfigList(params) {
  return request({
    url: '/chat/vip/guardConfig/list',
    method: 'GET',
    params
  })
}
export function updateGuardConfig(params, type) {
  return request({
    url: `/chat/vip/guardConfig/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    params
  })
}

export function deleteBatchGuardian(params) {
  return request({
    url: '/chat/vip/guardConfig/deleteBatch',
    method: 'DELETE',
    params
  })
}
