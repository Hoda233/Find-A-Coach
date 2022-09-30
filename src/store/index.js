import { createStore } from 'vuex';

import coachesModules from './modules/coaches.js'
import requestsModules from './modules/requests.js'
import authModules from './modules/auth.js'

const store=createStore({
    modules:{
        coaches:coachesModules,
        requests:requestsModules,
        auth:authModules,
    },

});

export default store;