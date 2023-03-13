import { createStore } from 'vuex'
import { io } from 'socket.io-client';
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  //plugins: [createPersistedState()],
  state: {
    isAuthenticated: false,
    isDoubleAuth: false,
    isId: 0,
    isAvatar: "",
    isNickname: "",
    isStatusCode: false,
    isUsers: [],
    isMyFriends: [],
    isItIsMe: [],
    isWebSocket: null,

    isShowUsers: false,
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {state.isAuthenticated = isAuthenticated},
    setDoubleAuth(state, isDoubleAuth) {state.isDoubleAuth = isDoubleAuth},
    setId(state, isId) {state.isId = isId},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
    setUsers(state,  isUsers) {state.isUsers = isUsers},
    setMyFriends(state,  isMyFriends) {state.isMyFriends = isMyFriends},
    setItIsMe(state,  isItIsMe) {state.isItIsMe =  isItIsMe},
    setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket},

    setShowUsers(state, isShowUsers) {state.isShowUsers = isShowUsers},
  },
  getters: {
    getAuthenticated: state => state.isAuthenticated,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getNickname: state => state.isNickname,
    getStatusCode: state => state.isStatusCode,
    getUsers: state => state.isUsers,
    getMyFriends: state => state.isMyFriends,
    getItIsMe: state => state.isItIsMe,
    getWebSocket: state => state.isWebSocket,

    getShowUsers: state => state.isShowUsers,
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