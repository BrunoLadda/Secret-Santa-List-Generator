import Vue from 'vue';
import Vuex from 'vuex';

import { participantsList } from './participantsList';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        participantsList
    }
});
