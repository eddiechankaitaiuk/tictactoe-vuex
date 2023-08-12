import Vuex from 'vuex'
import Vue from 'vue'
import tictactoe from './modules/tictactoe'

//Load Vuex
//Vue.use(Vuex)

//Create a store
export default new Vuex.Store({
    modules:{
        tictactoe
    }
})