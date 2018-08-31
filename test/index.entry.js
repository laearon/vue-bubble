import Vue from 'vue';
import App from './App';

import VueBubble from './plugins/vue-bubble';

Vue.use(VueBubble);

new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {},
    bubble: { ok: '' }
});
