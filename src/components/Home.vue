<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <ScrollView>
        <ListView for="(event, index) in events">
            <v-template>
                <StackLayout class="container p-y-10 p-x-5" >
                    <GridLayout rows="auto,auto,auto,15,auto" columns="*, auto" class="p-x-5">
                        <Label :text="event.desc" row="0" col="0" rowSpan="3" color="white" class="h1" ></Label>
                        <Label text="Event Location" row="0" col="1" class="footnote"></Label>
                        <Label :text="getFormattedDate(event.date)" row="1" col="1" class="footnote"></Label>
                        <Label :text="getFormattedTime(event.date)" row="2" col="1" class="footnote"></Label>
                        <FlexboxLayout flexDirection="row" 
                                       width="100%" 
                                       justifyContent="stretch" 
                                       class="p-x-10 p-y-5" 
                                       row="3" 
                                       col="0" 
                                       colSpan="2">
                            <Label text="IN" textWrap="true" class="in" :width="getProgressValue(event, 'in')" />
                            <Label text=" " textWrap="true" class="none" :width="getProgressValue(event, 'none')" />
                            <Label text="OUT" textWrap="true" class="out" :width="getProgressValue(event, 'out')" />
                        </FlexboxLayout>
                        <FlexboxLayout flexDirection="row" 
                                       width="75%" 
                                       class="p-x-25" 
                                       row="4" 
                                       col="0" 
                                       colSpan="2" 
                                       justifyContent="space-between">
                            <Label class="fa h2" color="white" :text="'fa-thumbs-up' | fonticon" @tap="onInTap(event)" ></Label> 
                            <Label :text="event.min" color="white"></Label>
                            <Label class="fa h2" color="white" :text="'fa-thumbs-down' | fonticon" @tap="onOutTap(event)" ></Label>
                        </FlexboxLayout>
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
            let m = moment(d);
            if (m.isValid()) {
                return m.format('ddd, MMM DD');
            }
            return d.toLocaleString('en-US');
        },
        getFormattedTime(d) {
            let m = moment(d);
            if (m.isValid()) {
                return m.format('hh:mm a');
            }
            return '';
        },
        getProgressValue(e, type) {
            if (!e || e === {}) return 0;
            type = type.toLowerCase();
            let value = e.total - (e.in + e.out);
            switch (type) {
            case 'in':
                value = e.in;
                break;
            case 'out':
                value = e.out;
                break;
            }
            value = Math.floor(value / e.total * 100);
            return value == 0 ? value : `${value}%`;
        }
    }
};
</script>

<style lang="scss">
.in {
	color: green;
	background: green;
}
.out {
	color: red;
	background-color: red;
}
.none {
	color: lightgrey;
	background-color: lightgrey;
}
</style>