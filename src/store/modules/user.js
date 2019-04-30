import Cookies from 'js-cookie'
import { removeLocalStorage } from '@/utils/authService'

const user = {
  state: {
    token: Cookies.get('X-Ivanka-Token'),
    userid: null,
    realname: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      Cookies.set('X-Ivanka-Token', token)
    },
    SET_USERID: (state, id) => {
      state.userid = id
      sessionStorage.setItem('userid', id)
    },
    SET_REALNAME: (state, realname) => {
      state.realname = realname
    }
  },

  actions: {
    // 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeLocalStorage('userinfo')
        removeLocalStorage('menuList')
        removeLocalStorage('actionList')
        resolve()
      })
    }
  }
}

export default user
