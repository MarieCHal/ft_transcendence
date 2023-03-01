import { createStore } from 'vuex'

const store = createStore({
    state: {
        isAuthenticated: false,
        isAvatar: "",
        isLogin: "",
        isToken : ""
      },
      mutations: {
        setAuthenticated(state, isAuthenticated) {state.isAuthenticated = isAuthenticated},
        setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
        setLogin(state, isLogin) {state.isLogin = isLogin},
        setToken(state, isToken) {state.isToken = isToken}
      },
      getters: {
        getAuthenticated: state => state.isAuthenticated,
        getAvatar: state => state.isAvatar,
        getLogin: state => state.isLogin,
        getToken: state => state.isToken
      }    
});

export default store;