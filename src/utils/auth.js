import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserName = 'Admin-User'
const Remember = 'user-rember'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getUser() {
  return Cookies.get(UserName)
}

export function setUser(info) {
  return Cookies.set(UserName, info)
}

export function removeUser() {
  return Cookies.remove(UserName)
}
export function getRemember() {
  return Cookies.get(Remember)
}

export function setRemember(info) {
  return Cookies.set(Remember, info)
}

export function removeRemember() {
  return Cookies.remove(Remember)
}
