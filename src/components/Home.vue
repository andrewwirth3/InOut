<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <my-events :events="events"></my-events>
  </Page>
</template>

<script>
import { staticData } from '../data/static-data.js';
import MyEvents from './MyEvents.vue';

export default {
    components: {
        MyEvents
    },
    data() {
        return {
            events: []
        };
    },
    created() {
        const userId = 1;
        let user = null;
        for (const person of staticData.persons) {
            if (person.id == userId) {
                user = person;
                break;
            }
        }
        if (user) {
            let [squadMembers, squads, events, responses] = [[], [], [], []];
            for (const member of staticData.squadMembers) {
                if (member.personId == userId) {
                    squadMembers.push(member);
                }
            }

            for (const squad of staticData.squads) {
                squad.members = [];
                for (const member of squadMembers) {
                    if (member.squadId == squad.id) {
                        squads.push(squad);
                    }
                }
            }

            for (const res of staticData.responses) {
                if (res.personId === userId) {
                    for (const evt of staticData.events) {
                        if (evt.id === res.eventId) {
                            evt.response = res.status;
                            events.push(evt);
                            break;
                        }
                    }
                    responses.push(res);
                }
            }

            this.events = events;
            // this.user = Object.assign([], user);
            // this.squads = Object.assign([], squads);
            // this.events = Object.assign([], events);
            // this.responses = Object.assign([], responses);
            this.$store.commit('setUser', user);
            this.$store.commit('setSquads', squads);
            this.$store.commit('setEvents', events);
            this.$store.commit('setResponses', responses);
        }
    }
};
</script>

<style lang="scss">
</style>