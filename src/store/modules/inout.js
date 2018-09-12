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
    setResponses(state, responses) {
        state.responses = responses;
    }
};

export default {
    state,
    mutations
};
