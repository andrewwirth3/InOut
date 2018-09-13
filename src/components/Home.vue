<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <ScrollView>
        <ListView for="(evt, index) in events">
            <v-template>
                <StackLayout class="container p-y-10 p-x-5" >
                    <GridLayout rows="50, auto, auto" 
                                columns="*, auto" 
                                v-bind:class="['container-item', 'p-x-5', {'accept': evt.response === 1}, {'reject': evt.response === 0 }]">
                        <Label class="h2" :text="evt.desc" row="0" col="0" rowSpan="2" background="red" color="white" alignSelf="center"></Label>
                        <Label :text="getFormattedDate(evt.date)" row="0" col="1" background="greed" color="white"></Label>
                        <Label text="Event Location" row="1" col="1" background="blue" color="white"></Label>
                        <Progress class="progress m-5" :value="getProgressValue(evt)" row="2" col="0" colSpan="2" />
                        
                    </GridLayout>
                </StackLayout>
            </v-template>
        </ListView>
    </ScrollView>
  </Page>
</template>

<script>
import { staticData } from '../data/static-data.js';
const moment = require('moment');

export default {
    data() {
        return {
            user: {},
            squads: [],
            events: [],
            responses: []
        };
    },
    mounted() {
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
            this.$store.commit('setUser', user);
            this.$store.commit('setSquads', squads);
            this.$store.commit('setEvents', events);
            this.$store.commit('setResponses', responses);
        }
    },
    methods: {
        getFormattedDate(d) {
            if (d instanceof Date) {
                let m = moment(d);
                if (m.isValid()) {
                    return m.format('ddd, MMM DD [at] hh:mm a');
                }
                return d.toLocaleString('en-US');
            } else if (typeof d == 'string') {
                return d;
            } else if (d) {
                return d.toString();
            }
            return '';
        },
        getProgressValue(e) {
            if (!e) return 0;

            let val = e.count / e.min * 100;
            if (val >= 100) return 100;
            return Math.floor(val);
        }
    }
};
</script>

<style lang="scss">
.container {
	> .container-item {
		border-left-color: white;
		border-left-width: 10;
		border-right-color: white;
		border-right-width: 10;

		&.accept {
			border-left-color: green;
			border-right-color: green;
		}

		&.reject {
			border-left-color: red;
			border-right-color: red;
		}
	}
}
</style>