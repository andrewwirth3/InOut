const state = {
    userId: 0,
    user: {},
    squads: [],
    events: [],
    responses: []
};

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.userId = user.id;
    },
    setSquads(state, squads) {
        state.squads = squads;
    },
    setEvents(state, events) {
        state.events = events;
    },
    setEvent(state, event) {
        for (let index = 0; index < state.events.length; index++) {
            const element = state.events[index];
            if (element.id == event.id) {
                state.events[index] = event;
            }
        }
    },
    setResponses(state, responses) {
        state.responses = responses;
    }
};

export default {
    state,
    mutations
};
