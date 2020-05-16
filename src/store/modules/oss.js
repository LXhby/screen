// import store from '@/store'
const state = {
  AccessKeyId: null,
  AccessKeySecret: null,
  SecurityToken: null,
  Expiration: null,
  upPic: null
}
const mutations = {
  setAccessKeyId(state, info) {
    state.AccessKeyId = info
  },
  setAccessKeySecret(state, info) {
    state.AccessKeySecret = info
  },
  setSecurityToken(state, info) {
    state.SecurityToken = info
  },
  setExpiration(state, info) {
    console.log('存', info)
    state.Expiration = info
  },
  setupPic(state, info) {
    console.log('存', info)
    state.upPic = info
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
