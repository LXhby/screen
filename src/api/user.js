import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/info',
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function accountadd(data) {
  return request({
    url: '/account/add',
    method: 'post',
    data: data
  })
}
// 获取用户原密码
export function checkPwd(pwd) {
  return request({
    url: '/account/checkPassword',
    method: 'post',
    data: {
      password: pwd
    }
  })
}

// 修改用户密码
export function updatePassword(data) {
  return request({
    url: '/account/updatePassword',
    method: 'post',
    data: data
  })
}

// 新增用户
export function add(data) {
  return request({
    url: '/account/add',
    method: 'post',
    data: data
  })
}
// 分页获取用户信息
export function queryPage(data) {
  return request({
    url: '/account/queryPage',
    method: 'post',
    data: data
  })
}
// 分页获取用户信息
export function accountQueryPage(data) {
  return request({
    url: '/account/queryPage',
    method: 'post',
    data: data
  })
}

// 修改用户
export function update(userInfo) {
  return request({
    url: '/account/update',
    method: 'post',
    data: userInfo
  })
}

// 查询其他用户的信息
export function getInfoById(id) {
  return request({
    url: '/account/infoById',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 校验账号是否存在
export function checkUserName(info) {
  return request({
    url: '/account/checkUserName',
    method: 'post',
    data: {
      username: info.username,
      isAdd: info.isAdd,
      id: info.id
    }
  })
}
// 重置密码
export function resetPassword(id) {
  return request({
    url: '/account/resetPassword',
    method: 'post',
    data: {
      id: id
    }
  })
}
