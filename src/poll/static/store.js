const ELEMENTS = {scissors: {name: 'scissors'}, paper: {name: 'paper'}, rock: {name: 'rock'}}

const store = new Vuex.Store({
  state: {
    userSelectedElement: null,
    serverSelectedElement: null,
    gameRun: false,
    notification_text: '',
    notification_display: false,
    notification_class: '',//[alert-success, alert-info, alert-warning, alert-danger]
    notification_timer: setTimeout(function(){},1),
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
    },
    setNotificationText(state, text){
      state.notification_text = text;
    },
    setNotificationClass(state, class_name){
      state.notification_class = class_name;
    },
    showNotificationDisplay(state){
      if (state.notification_text){
        state.notification_display = true;
        clearTimeout(state.notification_timer);
        state.notification_timer = setTimeout(function(){state.notification_display = false;}, 5000);
      }
    },
  },
  actions: {
    selectUserElement({commit, dispatch}, element){
      dispatch('startGame');
      commit('selectServerElement', null);
      commit('selectUserElement', element);
      setTimeout(()=>{dispatch('serverSelectElement');}, 1000);
    },
    serverSelectElement({dispatch, commit, getters, rootGetters}){
      axios.get('/try/')
        .then(res => {
            if (res.status == 200 && res.data.variant){
              let el = ELEMENTS[res.data.variant]
              commit('selectServerElement', el);
              dispatch('stopGame');
              dispatch('showNotification', getters.getWinner)
            }
        })
        .catch(err => {});


    },
    startGame({commit}){
      commit('changeGameState', true);
    },
    stopGame({commit}){
      commit('changeGameState', false);
    },
    showNotification({commit}, payload){
      if (payload != null){
        commit('setNotificationText', payload.text);
        commit('setNotificationClass', payload.class);
        commit('showNotificationDisplay');
      }
    },
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
    },
    getWinner(state){
      if (state.gameRun){
        return;
      }

      if (state.userSelectedElement == state.serverSelectedElement){
        return {'class': 'alert-info', 'text': "The game is drawn"};
      }
      else if ((state.userSelectedElement == ELEMENTS.scissors && state.serverSelectedElement == ELEMENTS.paper)
          || (state.userSelectedElement == ELEMENTS.paper && state.serverSelectedElement == ELEMENTS.rock)
          || (state.userSelectedElement == ELEMENTS.rock && state.serverSelectedElement == ELEMENTS.scissors))
      {
        return {'class': 'alert-success', 'text': "User win!"};
      }
      else {
        return {'class': 'alert-danger', 'text': "Server win!"};
      }
    },
    getNotificationText(state){
      return state.notification_text;
    },
    isDisplayNotification(state){
      return state.notification_display;
    },
    getNotificationClass(state){
      return state.notification_class;
    },
  }
});
