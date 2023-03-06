import { createStore } from 'vuex'

const store = createStore({
    state: {
        isAuthenticated: false,
        isDoubleAuth: false,
        isAvatar: "",
        isNickname: "",
        isToken : "",
        isStatusCode: false,
        isUsers: []
      },
      mutations: {
        setAuthenticated(state, isAuthenticated) {state.isAuthenticated = isAuthenticated},
        setDoubleAuth(state, isDoubleAuth) {state.isDoubleAuth = isDoubleAuth},
        setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
        setNickname(state, isNickname) {state.isNickname = isNickname},
        setToken(state, isToken) {state.isToken = isToken},
        setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
        setUsers(state,  isUsers) {state.isUsers =  isUsers}
      },
      getters: {
        getAuthenticated: state => state.isAuthenticated,
        getDoubleAuth: state => state.isDoubleAuth,
        getAvatar: state => state.isAvatar,
        getNickname: state => state.isNickname,
        getToken: state => state.isToken,
        getStatusCode: state => state.isStatusCode,
        getUsers: state => state.isUsers
      }    
});

export default store;