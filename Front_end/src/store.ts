import { createStore } from 'vuex'

const store = createStore({
    state: {
        isAuthenticated: false,
        isDoubleAuth: false,
        isId: 0,
        isAvatar: "",
        isNickname: "",
        isToken : "",
        isStatusCode: false,
        isUsers: [],
        isWebSocket: null
      },
      mutations: {
        setAuthenticated(state, isAuthenticated) {state.isAuthenticated = isAuthenticated},
        setDoubleAuth(state, isDoubleAuth) {state.isDoubleAuth = isDoubleAuth},
        setId(state, isId) {state.isId = isId},
        setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
        setNickname(state, isNickname) {state.isNickname = isNickname},
        setToken(state, isToken) {state.isToken = isToken},
        setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
        setUsers(state,  isUsers) {state.isUsers =  isUsers},
        setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket}
      },
      getters: {
        getAuthenticated: state => state.isAuthenticated,
        getDoubleAuth: state => state.isDoubleAuth,
        getId: state => state.isId,
        getAvatar: state => state.isAvatar,
        getNickname: state => state.isNickname,
        getToken: state => state.isToken,
        getStatusCode: state => state.isStatusCode,
        getUsers: state => state.isUsers,
        getWebSocket: state => state.isWebSocket
      },
      actions: {
        initWebSocket({ commit }) {
          const webSocket = new WebSocket('ws://localhost:5173')
          commit('setWebSocket', webSocket)
        }
      }   
});

export default store;