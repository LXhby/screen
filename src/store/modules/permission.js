import {
  asyncRoutes,
  constantRoutes
} from '@/router'

var arrs = []
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    var bool = roles.some(role => route.meta.roles.includes(role.code))
    if (bool) {
      roles.forEach(ele => {
        if (ele.code === route.meta.roles[0]) {
          route.meta.title = ele.name
          if (route.meta.icon) {
            route.meta.icon = ele.iconUrl
          }
          route.meta.sequence = ele.sequence
          if (ele.openType === 20) {
            arrs.push(route.path)
            console.log('arrs', arrs)
          }
        }
      })
    }
    return bool
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  link: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log('state.routes', state.routes)
  },
  SET_LINK: (state, arr) => {
    state.link = arr
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    var arr = []
    getrole(roles, arr)
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, arr)
      // accessedRoutes.sort((a, b) => {
      //   console.log('a', a)
      //   return a['meta']['sequence'] - b['meta']['sequence']
      // })
      checkChildren(accessedRoutes)
      commit('SET_LINK', arrs)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

function getrole(roles, arr) {
  roles.forEach(item => {
    var obj = {
      name: item.name,
      code: item.code,
      iconUrl: item.iconUrl,
      sequence: item.sequence,
      openType: item.openType
    }
    arr.push(obj)
    if (item.children) {
      getrole(item.children, arr)
    }
  })
}

function checkChildren(role) {
  role.forEach(ele => {
    if (ele.children) {
      checkChildren(ele.children)
    }
  })
  getsequencerole(role)
}

function getsequencerole(roles) {
  roles.sort((a, b) => {
    return a['meta']['sequence'] - b['meta']['sequence']
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
