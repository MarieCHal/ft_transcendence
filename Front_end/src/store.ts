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
    isStatusCode: false,
    isBool: false,
    isTrigger: false,

    isAvatar: "",
    isNickname: "",
    isNewChanel: "",
    isUserAvatar: "",
    isGoPlay: "",
    isRoom: "",
    isInvitePlay: "",
    
    isId: 0,
    isPlayer: 0,
    isUserId: 0,
    isresultSocketOn: 0,
    isBallX: 0,
    isBallY: 0,
    isScoreUser1: 0,
    isScoreUser2: 0,
    isUser1: 0,
    isUser2: 0,
    isInterval: 0,

    isUsers: [],
    isItIsMe: [],
    isChans: [],
    isChanContext: [],
    isUserContext: [],
    isUserProfile: [],
    isChanelUser: [],
    isChatHistory: [],

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
    setBool(state, isBool) {state.isBool = isBool;},
    setChatHistory(state, isChatHistory) {state.isChatHistory = isChatHistory;},
    setresultSocketOn(state, isresultSocketOn) {state.isresultSocketOn = isresultSocketOn;},
    setGoPlay(state, isGoPlay) {state.isGoPlay = isGoPlay;},
    setBallX(state, isBallX) {state.isBallX = isBallX;},
    setBallY(state, isBallY) {state.isBallY = isBallY;},
    setPlayer(state, isPlayer) {state.isPlayer = isPlayer;},
    setScoreUser1(state, isScoreUser1) {state.isScoreUser1 = isScoreUser1;},
    setScoreUser2(state, isScoreUser2) {state.isScoreUser2 = isScoreUser2;},
    setUser1(state, isUser1) {state.isUser1 = isUser1;},
    setUser2(state, isUser2) {state.isUser2 = isUser2;},
    setRoom(state, isRoom) {state.isRoom = isRoom;},
    setTrigger(state, isTrigger) {state.isTrigger = isTrigger;},
    setInterval(state, isInterval) {state.isInterval = isInterval;},
    setInvitePlay(state, isInvitePlay) {state.isInvitePlay = isInvitePlay;},

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
    getBool: state => state.isBool,
    getChatHistory: state => state.isChatHistory,
    getresultSocketOn: state => state.isresultSocketOn,
    getGoPlay: state => state.isGoPlay,
    getBallX: state => state.isBallX,
    getBallY: state => state.isBallY,
    getPlayer: state => state.isPlayer,
    getScoreUser1: state => state.isScoreUser1,
    getScoreUser2: state => state.isScoreUser2,
    getUser1: state => state.isUser1,
    getUser2: state => state.isUser2,
    getRoom: state => state.isRoom,
    getTrigger: state => state.isTrigger,    
    getInterval: state => state.isInterval,
    getInvitePlay: state => state.isInvitePlay,
    

  },
  actions: {
    initWebSocket({ commit }) {
      const myId = store.getters.getId;
      const webSocket = io('ws://c1r2s3:3000/', {
        auth: {
          token: Cookies.get("auth_token")
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