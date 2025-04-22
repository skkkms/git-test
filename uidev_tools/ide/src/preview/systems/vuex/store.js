import Vue from 'vue'
import Vuex from 'vuex'

import VueCookies from 'vue-cookies'
import menu from './modules/menu'

Vue.use(Vuex)
Vue.use(VueCookies)

export default new Vuex.Store({
    getters: {
        isLoggedIn: state => true,
        authStatus: state => 'success',
    },
    modules: {
        menu: menu
    }
})
