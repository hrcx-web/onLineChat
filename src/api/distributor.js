import request from '@/utils/request'

export function updateDistributorAdmin(data, type) {
  return request({
    url: `/chat/distributorAdmin/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}

export function queryDistributorAdmin(params) {
  return request({
    url: `/chat/distributorAdmin/list`,
    method: 'GET',
    params
  })
}

export function deleteDistributorAdmin(params) {
  return request({
    url: `/chat/distributorAdmin/deleteBatch`,
    method: 'DELETE',
    params
  })
}

export function updateDistributorInfo(data, type) {
  return request({
    url: `/chat/distributorInfo/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}

export function queryDistributorInfo(params) {
  return request({
    url: `/chat/distributorInfo/list`,
    method: 'GET',
    params
  })
}

export function getDisAdminMapping() {
  return request({
    url: `/chat/distributorAdmin/getDisAdminMapping`,
    method: 'GET'
  })
}

export function deleteDistributorInfo(params) {
  return request({
    url: `/chat/distributorInfo/deleteBatch`,
    method: 'DELETE',
    params
  })
}

export function queryDistributorTransformInfo(params) {
  return request({
    url: `/chat/distributorInfo/queryDistributeTrans`,
    method: 'GET',
    params
  })
}
