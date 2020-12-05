import request from '@/utils/request'

export function updateCMeal(data, type) {
  return request({
    url: `/chat/cMeal/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data

  })
}
export function queryCMeal(params) {
  return request({
    url: '/chat/cMeal/webList',
    method: 'GET',
    params
  })
}

export function queryCMealMap() {
  return request({
    url: '/chat/cMeal/listMap',
    method: 'GET'

  })
}

export function deleteCMeal(params) {
  return request({
    url: '/chat/cMeal/deleteBatch',
    method: 'DELETE',
    params
  })
}

