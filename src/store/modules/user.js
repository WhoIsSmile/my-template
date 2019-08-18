import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router ,{ resetRouter ,constantRoutes} from '@/router'
import Layout from '@/layout'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  myRoutes: [],
  // 菜单功能 增删改查
  funcList:[]
}

const mutations = {
  SET_MYROUTES: (state, routes) => {
    state.myRoutes = constantRoutes.concat(routes)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 功能
  SET_FUNCLIST: (state, funcList) => {
    state.funcList = funcList
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        // console.log(data)
        commit('SET_TOKEN', response.body.userInfo.token)
        setToken(response.body.userInfo.token)
        commit('SET_NAME', response.body.userInfo.userName)
        commit('SET_AVATAR', response.body.userInfo.image)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { body } = response
        commit('SET_NAME', body.userInfo.userName)
        commit('SET_AVATAR', body.userInfo.image)
        commit('SET_FUNCLIST', body.func)
        const routes = body.routers
        const accessedRouters = filterAsyncRouter(routes)
        commit('SET_MYROUTES', accessedRouters)

        resolve(accessedRouters)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        // 清空 菜单
        commit('SET_FUNCLIST', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}


function filterAsyncRouter(routes) {
  
  const accessedRouters = routes.filter(route => {
    // console.log(route)
    if (route.component.length > 0) {

      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        let component = route.component
        route.component = async () => import(`@/views/${component}`)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

