import { createStore } from 'vuex'
import { io } from 'socket.io-client';

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
    isItIsMe: [],
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
    setItIsMe(state,  isItIsMe) {state.isItIsMe =  isItIsMe},
    setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket},
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
    getItIsMe: state => state.isItIsMe,
    getWebSocket: state => state.isWebSocket
  },
  actions: {
    initWebSocket({ commit }) {
      const myId = store.getters.getId;
      console.log(myId);
      const webSocket = io('http://c1r2s3:3000/', {
        auth: {
          myId: myId
        }
      });
      console.log(webSocket);
      commit('setWebSocket', webSocket);
      webSocket.on('chat', () => {
        console.log('Socket connected');
      });
    }
  }   
});

export default store;