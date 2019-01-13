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
    updateEvent(state, payload) {
        for (let index = 0; index < state.events.length; index++) {
            let evt = state.events[index];
            if (evt.id == payload.event.id) {
                evt.response = payload.response;
                if (payload.delta) {
                    if (payload.delta.in != 0) {
                        evt.in += payload.delta.in;
                    }
                    if (payload.delta.out != 0) {
                        evt.out += payload.delta.out;
                    }
                    if (evt.in < 0) {
                        evt.in = 0;
                    }
                    if (evt.out > evt.total) {
                        evt.out = evt.total;
                    }
                    evt.none = evt.total - (evt.in + evt.out);
                }
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
