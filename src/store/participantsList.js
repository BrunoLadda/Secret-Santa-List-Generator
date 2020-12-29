export const participantsList = {
    state: {
        //The lists bellow will contain the participants (people who will give gifts) and another list with the same participants (people who will receive gifts).
        //These lists will be related by index, that is the index 0 on listGiver will present the index 0 on listReceiver.
        listGiver: [], //List of Participants
        listReceiver: [] //List of Receivers
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
            //Every time a partipant is added, we clear the receiver list
            state.listReceiver.splice(0)
            state.listGiver.push(data)
        },
        REMOVE_PARTICIPANT(state, data) {
            //Every time a partipant is removed, we clear the receiver list
            state.listReceiver.splice(0)
            let index = state.listGiver.indexOf(data)
            state.listGiver.splice(index, 1)
        },
        GENERATE_RECEIVER_LIST(state) {

            //Clear the receiver list to generate another. If the list is empty, nothing is done here.
            state.listReceiver.splice(0)

            //Generating a new list randomly from the list of participants. This way, we guarantee that each participant will receive and give only one gift
            state.listReceiver = state.listGiver
                .map((a) => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value)

            //List validation: avoid a participant gives a gift for himself
            var listOk = false
            while (!listOk) {
                //This loop will not end until we have a list that attend the rules
                var error = false
                for (let index = 0; index < state.listGiver.length; index++) {
                    //We use the e-mail to identify the participant, as we could have some homonyms in the list 
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
