var userSelect = Vue.component('user_select', {
  template: '<section class="actions-field  user-input">' +
              '<div class="action scissors" @click="selectElement(\'scissors\')"></div>'+
              '<div class="action rock" @click="selectElement(\'rock\')"></div>'+
              '<div class="action paper" @click="selectElement(\'paper\')"></div>'+
            '</section>',
  methods: {
    selectElement(item) {
      // console.log();
      if (store.getters.isGameRun){
        return;
      }

      store.dispatch('selectUserElement', ELEMENTS[item]);
    }
  }
  });

var serverSelect = Vue.component('server_select', {
  template: '<section class="actions-field server-input">' +
              '<div class="action scissors"></div>'+
              '<div class="action rock"></div>'+
              '<div class="action paper"></div>'+
            '</section>'
  });


var round = Vue.component('round', {
  template: '<section class="round">' +
              '<div class="user-round">' +
                '<div class="round-action" :class="userActionClass"></div>'+
              '</div>'+
              '<div class="server-round">'+
                '<div class="" :class="serverActionClass"></div>'+
              '</div>'+
            '</section>',
  computed: {
    userActionClass(){
      let selectedEl = store.getters.userSelectedElement;
      if (selectedEl){
        return selectedEl.name;
      }

    },
    serverActionClass(){

    }
  }

});


new Vue({
  el: '#body_wrapper',
  template: '<section class="field">' +
              '<div class="input-field">' +
                '<userSelect></userSelect>'+
                '<serverSelect></serverSelect>'+
              '</div>'+
              '<div class="round-field">'+
                '<round></round>'+
              '</div>'+
            '</section class="">',

  components: {
    'serverSelect': serverSelect,
    'userSelect': userSelect,
    'round': round
  },
  data: function (){
    return {

    }
  },
  methods: {
    select_view(view){
      // store.dispatch('setView', {'view': view})
    },
    isSelected(view){
      // return store.getters.getCurrentView == view;
    }
  },
  computed: {
  },
  created: function () {

  }
});

axios.defaults.baseURL = 'http://127.0.0.1:8000/';