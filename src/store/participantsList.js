export const participantsList = {
    state: {
        listGiver: [],
        listReceiver: []
    },
    getters: {
        getListGiver: state => state.listGiver,
        getListReceiver: state => state.listReceiver,
    },
    actions: {
        addParticipant({ commit }, data) {
            commit('ADD_PARTICIPANT', data)
        },
        removeParticipant({ commit }, data) {
            commit('REMOVE_PARTICIPANT', data)
        },
        generateSantaSecretList({ commit }) {
            commit('GENERATE_RECEIVER_LIST')
        },
        clearLists({ commit }) {
            commit('CLEAR_LISTS')
        },
    },
    mutations: {
        ADD_PARTICIPANT(state, data) {
            state.listReceiver.splice(0)
            state.listGiver.push(data)
        },
        REMOVE_PARTICIPANT(state, data) {
            state.listReceiver.splice(0)
            let index = state.listGiver.indexOf(data)
            state.listGiver.splice(index, 1)
        },
        GENERATE_RECEIVER_LIST(state) {

            //Clear the final list
            state.listReceiver.splice(0)

            //Generating random list
            state.listReceiver = state.listGiver
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value)

            //List validation: avoid a participant gives a gift for himself
            var listOk = false
            while (!listOk) {
                var error = false
                for (let index = 0; index < state.listGiver.length; index++) {
                    if (state.listGiver[index].email == state.listReceiver[index].email) {
                        error = true
                        state.listReceiver.splice(0)
                        state.listReceiver = state.listGiver
                            .map((a) => ({ sort: Math.random(), value: a }))
                            .sort((a, b) => a.sort - b.sort)
                            .map((a) => a.value)
                        break
                    }
                }
                if (!error)
                    listOk = true
            }
        },
        CLEAR_LISTS(state) {
            state.listGiver.splice(0)
            state.listReceiver.splice(0)
        },
    }
};
