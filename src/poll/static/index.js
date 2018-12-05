
var userSelect = Vue.component('user_select', {
  template: '<section class="actions-field  user-input">' +
              '<h1>User</h1>'+
              '<div class="action scissors" @click="selectElement(\'scissors\')"></div>'+
              '<div class="action rock" @click="selectElement(\'rock\')"></div>'+
              '<div class="action paper" @click="selectElement(\'paper\')"></div>'+
            '</section>',
  methods: {
    selectElement(item) {
      if (store.getters.isGameRun){
        return;
      }
      store.dispatch('selectUserElement', ELEMENTS[item]);
    }
  }
  });


var serverSelect = Vue.component('server_select', {
  template: '<section class="actions-field server-input">' +
              '<h1>Server</h1>'+
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
                '<div class="round-action" :class="serverActionClass"></div>'+
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
      let selectedEl = store.getters.serverSelectedElement;
      if (selectedEl){
        return selectedEl.name;
      }
    }
  }

});


var notification_box = Vue.component('notification_box', {
  template: '<div>' +
              '<transition name="notification">' +
              '<div id="notification-box" ' +
                    'v-show="isVisible" ' +
                    'class="alert" ' +
                    'v-bind:class="notificationClass">{{notificationText}}' +
              '</div>' +
            '</transition></div>',
  computed: {
    notificationText(){
      return store.getters.getNotificationText;
    },
    notificationClass(){
      return store.getters.getNotificationClass;
    },
    isVisible(){
      return store.getters.isDisplayNotification;
    }
  }
});


new Vue({
  el: '#body_wrapper',
  template: '<section class="field">' +
              '<notification_box></notification_box>'+
              '<div class="input-field">' +
                '<userSelect></userSelect>'+
                '<serverSelect></serverSelect>'+
              '</div>'+
              '<div class="round-field">'+
                '<round></round>'+
              '</div>'+
            '</section class="">',

  components: {
    'notification_box': notification_box,
    'serverSelect': serverSelect,
    'userSelect': userSelect,
    'round': round
  }
});

