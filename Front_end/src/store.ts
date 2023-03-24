import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { io } from 'socket.io-client';
import { ref } from 'vue';

const persistedState = createPersistedState({
  paths: [
  'isToken',
  'isDoubleAuth', 
  'isId',
  'isNickname',
  'isAvatar',
  ]});

const store = createStore({
  plugins: [persistedState],

  state: {

      isChatMessages: ref<string[]>([]),
      isNewMessage: ref(''),

      isToken: "", 
      isDoubleAuth: false,
      isId: 0,
      isNickname: "",
      isAvatar: "",

      isBool: false,
      isCode: false,
      isWhat: "",
      
      isUserId: 0,
      isAllUsers: [],
      isUsers: [],
      isOneUser: [],
      isUserContext: [],
      isUserAvatar: '',
      isArrayAvatar: <any>[],
      
      isChanId: 0,
      isChans: [],
      isChanContext: [],
      isChatHistory: [],
      //isUsersInChan: [],

      isWebSocket: null
  },

  mutations: {
    setChatMessages(state, isChatMessages){state.isChatMessages = isChatMessages},
    setNewMessage(state, isNewMessage){state.isNewMessage = isNewMessage},
    setToken(state, isToken){state.isToken = isToken},
    setDoubleAuth(state, isDoubleAuth){state.isDoubleAuth = isDoubleAuth},
    setId(state, isId){state.isId = isId},
    setNickname(state, isNickname) {state.isNickname = isNickname},
    setAvatar(state, isAvatar) {state.isAvatar = isAvatar},
    setUserAvatar(state, isUserAvatar) {state.isUserAvatar = isUserAvatar},
    setCode(state, isCode) {state.isCode = isCode},
    setAllUsers(state, isAllUsers) {state.isAllUsers = isAllUsers},
    setUsers(state, isUsers) {state.isUsers = isUsers},
    setOneUser(state, isOneUser) {state.isOneUser = isOneUser},
    setUserContext(state, isUserContext) {state.isUserContext = isUserContext},
    setChanContext(state, isChanContext) {state.isChanContext = isChanContext},
    setWhat(state, isWhat) {state.isWhat = isWhat},
    setChanId(state, isChanId) {state.isChanId = isChanId},
    setUserId(state, isUserId) {state.isUserId = isUserId},
    setBool(state, isBool) {state.isBool = isBool},
    setChatHistory(state, isChatHistory) {state.isChatHistory = isChatHistory},
    //setUsersInChan(state, isUsersInChan) {state.isUsersInChan = isUsersInChan},
    setChans(state,  isChans) {state.isChans =  isChans},
    setWebSocket(state, isWebSocket) {state.isWebSocket = isWebSocket;},
    setArrayAvatar(state, payload){
      const {item, index} = payload;
      state.isArrayAvatar[index] = item;
    },
    clearArray(state) {
      state.isArrayAvatar = [];
      //state.isOneUser= [];
    },
  },

  getters: {
    getChatMessages: state => state.isChatMessages,
    getNewMessage: state => state.isNewMessage,
    getToken: state => state.isToken,
    getDoubleAuth: state => state.isDoubleAuth,
    getId: state => state.isId,
    getAvatar: state => state.isAvatar,
    getUserAvatar: state => state.isUserAvatar,
    getCode: state => state.isCode,
    getNickname: state => state.isNickname,
    getAllUsers: state => state.isAllUsers,
    getUsers: state => state.isUsers,
    getOneUser: state => state.isOneUser,
    getUserContext: state => state.isUserContext,
    getChanContext: state => state.isChanContext,
    getWhat: state => state.isWhat,
    getChanId: state => state.isChanId,
    getUserId: state => state.isUserId,
    getBool: state => state.isBool,
    getChatHistory: state => state.isChatHistory,
    //getUsersInChan: state => state.isUsersInChan,
    getWebSocket: state => state.isWebSocket,
    getArrayAvatar: (state) => (index: any) => {
      return state.isArrayAvatar[index]
    },
    getChans: state => state.isChans,
  },
  actions: {
    initWebSocket({ commit }) {
      const webSocket = io('http://c1r2s3:4000/', {
        auth: {
          token: store.getters.getToken,
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