import request from '@/utils/request'

// 查询系统管理员
export function userList(params) {
  return request({
    url: '/chat/system/user/list',
    method: 'GET',
    params
  })
}

export function userAdd(data) {
  return request({
    url: '/chat/system/user/add',
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

export function deleteBatch(params) {
  return request({
    url: '/chat/system/user/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 获取角色列表
export function roleList(params) {
  return request({
    url: '/chat/role/list',
    method: 'GET',
    params
  })
}
// 修改密码

export function updatePwd(params) {
  return request({
    url: '/chat/system/user/updatePwd',
    method: 'POST',
    params
  })
}
