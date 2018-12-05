const ELEMENTS = {scissors: {name: 'scissors'}, paper: {name: 'paper'}, rock: {name: 'rock'}}

const store = new Vuex.Store({
  state: {
    userSelectedElement: null,
    serverSelectedElement: null,
    gameRun: false
  },
  mutations: {
    selectUserElement(state, element){
      state.userSelectedElement = element;
    },
    selectServerElement(state, element){
      state.serverSelectedElement = element;
    },
    changeGameState(state, gameState){
      state.gameRun = gameState
    }
  },
  actions: {
    selectUserElement({commit, dispatch}, element){
      dispatch('startGame');
      commit('selectUserElement', element);
      setTimeout(()=>{dispatch('serverSelectElement');}, 2000);
    },
    serverSelectElement({commit, dispatch}){
      axios.get('/try/')
        .then(res => {
            console.log(res);
            if (res.status == 200 && res.data.variant){
              let el = ELEMENTS[res.data.variant]
              commit('selectServerElement', el);
            }
        })
        .catch(err => {console.log(err);})
      dispatch('stopGame');
    },
    startGame({commit}){
      commit('changeGameState', true);
    },
    stopGame({commit}){
      commit('changeGameState', false);
    }
  },
  getters: {
    userSelectedElement(state){
      return state.userSelectedElement;
    },
    serverSelectedElement(state){
      return state.serverSelectedElement;
    },
    isGameRun(state){
      return state.gameRun;
    }
  }
});
