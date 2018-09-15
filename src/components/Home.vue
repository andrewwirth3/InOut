<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <ScrollView>
        <ListView for="(event, index) in events" @itemTap="onItemTap">
            <v-template>
                <StackLayout class="container p-y-15 p-x-5" >
                    <GridLayout rows="auto,auto,auto,13,auto" columns="*, auto" class="p-x-5">
                        <Label :text="event.desc" row="0" col="0" rowSpan="3" color="white" class="h1" ></Label>
                        <Label :text="event.location" row="0" col="1" class="footnote pull-right"></Label>
                        <Label :text="getFormattedDate(event.date)" row="1" col="1" class="footnote pull-right"></Label>
                        <Label :text="getFormattedTime(event.date)" row="2" col="1" class="footnote pull-right"></Label>
                        <FlexboxLayout flexDirection="row" 
                                       width="100%" 
                                       justifyContent="stretch" 
                                       class="p-x-10 p-y-5" 
                                       row="3" 
                                       col="0" 
                                       colSpan="2">
                            <Label text="IN" textWrap="true" class="in" :width="getProgressValue(event, 'in')" />
                            <Label text=" " textWrap="true" class="none" flexGrow="2" />
                            <Label text="OUT" textWrap="true" class="out" :width="getProgressValue(event, 'out')" />
                        </FlexboxLayout>
                        <FlexboxLayout flexDirection="row" 
                                       width="90%" 
                                       class="" 
                                       row="4" 
                                       col="0" 
                                       colSpan="2" 
                                       justifyContent="space-between">
                            <FlexboxLayout flexDirection="row">
                                <Label :text="`${evenOutDigits(event, event.in)}/${event.min}`" class="footnote" />
                                <Label v-bind:class="['h3', {'fas': event.response == 1}, {'far': event.response != 1}]" 
                                   :color="event.response == 1 ? 'green' : 'white'" 
                                   :text="'fa-thumbs-up' | fonticon" 
                                   @tap="onInTap(event)" 
                                   class="m-l-5 pull-right" />
                            </FlexboxLayout>
                            <FlexboxLayout flexDirection="row">
                                <Label v-bind:class="['h3', {'fas': event.response == 0}, {'far': event.response != 0}]" 
                                   :color="event.response == 0 ? 'red' : 'white'" 
                                   :text="'fa-thumbs-down' | fonticon" 
                                   @tap="onOutTap(event)" 
                                   class="m-r-5 pull-right" />
                                <Label :text="`${evenOutDigits(event, event.out)}/${event.total}`" class="footnote" />
                            </FlexboxLayout>
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
            this.user = Object.assign([], user);
            this.squads = Object.assign([], squads);
            this.events = Object.assign([], events);
            this.responses = Object.assign([], responses);
            // this.$store.commit('setUser', Object.assign([], user));
            // this.$store.commit('setSquads', Object.assign([], squads));
            // this.$store.commit('setEvents', Object.assign([], events));
            // this.$store.commit('setResponses', Object.assign([], responses));
        }
    },
    methods: {
        evenOutDigits(evt, n) {
            return n <= 9 ? ` ${n}` : n;
        },
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
        getProgressValue(evt, type) {
            if (!evt || evt === {}) return 0;
            let value = 0;
            switch (type.toLowerCase()) {
            case 'in':
                value = evt.in;
                break;
            case 'out':
                value = evt.out;
                break;
            default:
                value = evt.total - (evt.in + evt.out);
                break;
            }
            value = Math.floor(value / evt.total * 100);
            return value == 0 ? value : `${value}%`;
        },
        updateEvent(evt, idx, response, inDelta, outDelta) {
            evt.response = response;
            if (inDelta != 0) {
                evt.in += inDelta;
            }
            if (outDelta != 0 && evt.out + outDelta >= 0) {
                evt.out += outDelta;
            }
            if (evt.in < 0) {
                evt.in = 0;
            }
            if (evt.out > evt.total) {
                evt.out = evt.total;
            }
            evt.none = evt.total - (evt.in + evt.out);
            this.$store.commit('setEvent', evt);
            // update server
            return evt;
        },
        onItemTap() {
            //(event) {
            // console.log(`index: ${JSON.stringify(event.index)}`);
            // console.log(`item: ${JSON.stringify(event.item)}`);
        },
        onInTap(evt) {
            for (let index = 0; index < this.events.length; index++) {
                const event = this.events[index];
                if (event.id == evt.id) {
                    this.updateEvent(
                        evt, //JSON.parse(JSON.stringify(evt)),
                        index,
                        evt.response === 1 ? null : 1,
                        evt.response === 1 ? -1 : 1,
                        evt.response === 0 ? -1 : 0
                    );
                    break;
                }
            }
        },
        onOutTap(evt) {
            for (let index = 0; index < this.events.length; index++) {
                const event = this.events[index];
                if (event.id == evt.id) {
                    this.updateEvent(
                        evt, //JSON.parse(JSON.stringify(evt)),
                        index,
                        evt.response === 0 ? null : 0,
                        evt.response === 1 ? -1 : 0,
                        evt.response === 0 ? -1 : 1
                    );
                    break;
                }
            }
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