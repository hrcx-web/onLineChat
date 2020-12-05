import request from '@/utils/request'

//  公钥的使用
export function PublicKey(data) {
  return request({
    url: '/chat/system/login/getPublicKey',
    method: 'post',
    data
  })
}

export function queryIndexInfo() {
  return request({
    url: '/chat/order/indexInfo',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/chat/system/login/userLogin',
    method: 'post',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 用户查询
export function query(params) {
  return request({
    url: '/chat/user/list',
    method: 'GET',
    params
  })
}

// 用户新增和编辑
export function updateUser(data, type) {
  return request({
    url: `/chat/user/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}
// 用户批量删除
export function userDelete(params) {
  return request({
    url: '/chat/user/deleteBatch',
    method: 'DELETE',
    params
  })
}
// // 获取验证码
// export function auth(data) {
//   return request({
//     url: '',
//     method: 'post',
//     data
//   })
// }
// 上传图片
export function uploadQNImg(data) {
  return request({
    url: '/chat/user/uploadQNImg',
    method: 'POST',
    data
  })
}

// 用户的上传头像
export function uploadSource(data) {
  return request({
    url: '/chat/upload/uploadSource',
    method: 'POST',
    data
  })
}

// web查询标签
export function queryLabelInUse(params) {
  return request({
    url: '/chat/label/queryLabelInUse',
    method: 'GET',
    params
  })
}

export function queryCollectionList(params) {
  return request({
    url: '/chat/payConfig/list',
    method: 'GET',
    params
  })
}

export function updateCollection(data, type) {
  return request({
    url: `/chat/payConfig/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: type === 'edit' ? 'PUT' : 'POST',
    data
  })
}

export function deleteCollection(params) {
  return request({
    url: `/chat/payConfig/deleteBatch`,
    method: 'DELETE',
    params
  })
}

export function getBalanceRank(params) {
  return request({
    url: '/chat/user/getBalanceRank',
    method: 'GET',
    params
  })
}

export function getDisRank(params) {
  return request({
    url: '/chat/user/getDisRank',
    method: 'GET',
    params
  })
}

export function getUserAuthInfo(params) {
  return request({
    url: '/chat/user/getUserAuthInfo',
    method: 'GET',
    params
  })
}
// 声优认证
export function authUserInfo(data) {
  return request({
    url: '/chat/user/authUserInfo',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

export function queryVifyList(params) {
  return request({
    url: '/chat/user/vifyList',
    method: 'GET',
    params
  })
}

// 机器人分配客服
export function bindCustomer(data) {
  return request({
    url: '/chat/user/bindCustomer',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}
// 获取客服不分页
export function usergetMap(data) {
  return request({
    url: '/chat/system/user/getMap',
    method: 'GET',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

// export function mutualEdit(data) {
//   return request({
//     url: '/chat/mutual/edit',
//     method: 'POST',
//     contentType: 'x-www-form-urlencoded',
//     data
//   })
// }

// 消息公共列表
export function queryMutual(params) {
  return request({
    url: '/chat/pushNotify/list',
    method: 'GET',
    params
  })
}

// web-删除通知公告或者系统消息
export function deleteMutual(params) {
  return request({
    url: '/chat/pushNotify/deleteBatch',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    params
  })
}
// 新增编辑
export function updatepushNotify(data, type) {
  return request({
    url: `/chat/pushNotify/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}
// 发布公告
export function pushData(params) {
  return request({
    url: '/chat/pushNotify/pushData',
    method: 'POST',
    contentType: 'application/json',
    params
  })
}
// 查看对方收费项配置
export function getById(data) {
  return request({
    url: '/chat/userCoinConfig/getById',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}
// 新增收费项配置
export function addOrEdit(data) {
  return request({
    url: `/chat/userCoinConfig/addOrEdit`,
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}

// 惩戒记录
export function warnLogList(params) {
  return request({
    url: '/chat/report/warnLog/list',
    method: 'GET',
    params
  })
}

export function warnLogAdd(data) {
  return request({
    url: '/chat/report/warnLog/add',
    method: 'POST',
    contentType: 'x-www-form-urlencoded',
    data
  })
}
export function warnLogDele(params) {
  return request({
    url: '/chat/report/warnLog/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 视频配置
export function userVideoList(params) {
  return request({
    url: '/chat/user/userVideo/list',
    method: 'GET',
    params
  })
}
export function updateUserVideo(data, type) {
  return request({
    url: `/chat/user/userVideo/${type}`,
    contentType: 'x-www-form-urlencoded',
    method: 'POST',
    data
  })
}

export function deleteBatchVideo(params) {
  return request({
    url: '/chat/user/userVideo/deleteBatch',
    method: 'DELETE',
    params
  })
}

// 编辑时候调用的查询接口

export function userQueryById(params) {
  return request({
    url: '/chat/user/queryById',
    method: 'GET',
    params
  })
}

// 设置主播抽成比例
export function editProfit(params) {
  return request({
    url: '/chat/user/editProfit',
    method: 'POST',
    params
  })
}

// 接单率
export function webUserRatio(params) {
  return request({
    url: '/chat/order.mgr/usersOrder/webUserRatio',
    method: 'GET',
    params
  })
}
