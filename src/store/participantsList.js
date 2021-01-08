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


            //Review Comment: 
            //Other options were considered to generate a sorted list, but the way above (using map and sort) is a good option considering performance, and the application's rules (Each user must receive and give 1 gift).
            //For this reason, I chose to keep this way of generating the main list, changing only the validation process below.


            //Creating new array to handle the conflits. This array is a list indexes where we found same participant.
            var conflits = [];

            //Searching for conflits (participant giving a gift for himself)
            for (let index = 0; index < state.listGiver.length; index++) {
                //We use the e-mail to identify the participant, as we could have some homonyms in the list 
                if (state.listGiver[index].email == state.listReceiver[index].email) {
                    conflits.push(index);
                }
            }

            //If we dont have any conflict, we can keep the list as it is.
            if (conflits.length != 0) {

                //If we have conflits, we loop into conflits list to change it's index.
                conflits.forEach(old_index => {
                    var new_index = -1;

                    //As we are changin the Receiver list on "foreach" loop, we need to check if the conflit was already resolved. 
                    if (state.listGiver[old_index].email == state.listReceiver[old_index].email) {

                        while (new_index == -1) {

                            //Generating a random number between 0 and the lenght of participants list
                            new_index = Math.floor(Math.random() * (state.listGiver.length - 1) + 1) - 1;

                            //If the new random index is equal to old index, we generate another
                            if (old_index == new_index) {
                                new_index = -1;
                            }
                            else {
                                //If the index can be used, than we change the elements on ListReceiver.
                                var changed = state.listReceiver[old_index];
                                state.listReceiver[old_index] = state.listReceiver[new_index];
                                state.listReceiver[new_index] = changed;
                            }
                        }
                    }
                });
            }
        },
        CLEAR_LISTS(state) {
            state.listGiver.splice(0)
            state.listReceiver.splice(0)
        },
    }
};
