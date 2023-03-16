import { createStore } from 'vuex'
import { io } from 'socket.io-client';
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie';
const persistedState = createPersistedState({
  paths: ['isAuthenticated', 'isDoubleAuth', 'isId', 'isAvatar', 'isNickname', 'isStatusCode', 'isUsers', 'isItIsMe']
});

const store = createStore({
  plugins: [persistedState],
  state: {
    isAuthenticated: false,
    isDoubleAuth: false,
    isShowUsers: false,
    isId: 0,
    isAvatar: "",
    isNickname: "",
    isNewChanel: "",
    isStatusCode: false,
    isUsers: [],
    isUserId: 0,
    isItIsMe: [],
    isChans: [],
    isChanContext: [],
    isUserContext: [],
    isUserProfile: [],
    isChanelUser: [],
    isUserAvatar: '',
    isWebSocket: null
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {state.isAuthenticated = isAuthenticated},
    setDoubleAuth(state, isDoubleAuth) {state.isDoubleAuth = isDoubleAuth},
    setId(state, isId) {state.isId = isId},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setStatusCode(state,  isStatusCode) {state.isStatusCode =  isStatusCode},
    setUsers(state,  isUsers) {state.isUsers =  isUsers},
    setItIsMe(state,  isItIsMe) {state.isItIsMe =  isItIsMe},
    setChans(state,  isChans) {state.isChans =  isChans},
    setChanContext(state,  isChanContext) {state.isChanContext =  isChanContext},
    setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket;},
    setNewChanel(state, isNewChanel) {state.isNewChanel = isNewChanel;},
    setShowUsers(state, isShowUsers) {state.isShowUsers = isShowUsers;},
    setUserContext(state, isUserContext) {state.isUserContext = isUserContext;},
    setUserId(state, isUserId) {state.isUserId = isUserId;},
    setUserProfile(state, isUserProfile) {state.isUserProfile = isUserProfile;},
    setUserAvatar(state, isUserAvatar) {state.isUserAvatar = isUserAvatar;},
    setChanelUser(state, isChanelUser) {state.isChanelUser = isChanelUser;},
  },
  getters: {
    getAuthenticated: state => state.isAuthenticated,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getNickname: state => state.isNickname,
    getStatusCode: state => state.isStatusCode,
    getUsers: state => state.isUsers,
    getItIsMe: state => state.isItIsMe,
    getChans: state => state.isChans,
    getChanContext: state => state.isChanContext,
    getWebSocket: state => state.isWebSocket,
    getNewChanel: state => state.isNewChanel,
    getShowUsers: state => state.isShowUsers,
    getUserContext: state => state.isUserContext,
    getUserId: state => state.isUserId,
    getUserProfile: state => state.isUserProfile,
    getUserAvatar: state => state.isUserAvatar,
    getChanelUser: state => state.isChanelUser,
  },
  actions: {
    initWebSocket({ commit }) {
      const myId = store.getters.getId;
      const webSocket = io('http://c1r2s3:3000/', {
        auth: {
          myId: myId
        }
      });

      webSocket.on('connect', () => {
        console.log('Socket connected');
        commit('setWebSocket', webSocket);
      });

      webSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        commit('setWebSocket', null);
      });
    },
  }
})

export default store;