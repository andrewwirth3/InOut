<template>
    <Page class="page">
        <ActionBar class="action-bar"
                   :title="title"
                   backgroundColor="#191919"
                   color="#777777">
            <ActionItem @tap="onAddTap"
                        ios.systemIcon="4"
                        ios.position="right"
                        android.systemIcon="ic_menu_add"
                        android.position="actionBar" />
        </ActionBar>
        <DockLayout stretchLastChild="true">
            <FlexboxLayout flexDirection="row"
                           dock="bottom"
                           justifyContent="space-around"
                           alignItems="stretch"
                           backgroundColor="#191919"
                           color="#777777">
                <Label v-for="(item, index) in titles"
                       :key="index"
                       :text="`fa-${item.icon}` | fonticon"
                       v-bind:class="['fas',
                                      'h3',
                                      'p-x-20',
                                      'p-y-15',
                                      {'main-tab-active': currentIndex == index}]"
                       verticalAlignment="center"
                       horizontalAlignment="center"
                       @tap="changeIndex(index)" />
            </FlexboxLayout>
            <Pager ref="pager"
                   :selectedIndex="currentIndex"
                   @selectedIndexChange="changeIndex"
                   :items="titles">
                <v-template if="item.title == 'History'">
                    <my-history />
                </v-template>
                <v-template if="item.title == 'Events'">
                    <my-events />
                </v-template>
                <v-template if="item.title == 'Squads'">
                    <my-squads />
                </v-template>
                <v-template if="item.title == 'Settings'">
                    <my-settings />
                </v-template>
                <v-template>
                    <Label text="Not Implemented"/>
                </v-template>
            </Pager>
        </DockLayout>
    </Page>
</template>

<script>
import { staticData } from '../data/static-data.js';
import MyEvents from './MyEvents.vue';
import MyHistory from './MyHistory.vue';
import MySettings from './MySettings.vue';
import MySquads from './MySquads.vue';
import CreateEvent from './CreateEvent.vue';
import CreateSeries from './CreateSeries.vue';
import CreateSquad from './CreateSquad.vue';
import BaseDatePicker from './BaseDatePicker.vue';

export default {
    components: {
        MyEvents,
        MyHistory,
        MySettings,
        MySquads,
        // CreateEvent,
        // CreateSeries,
        // CreateSquad
        BaseDatePicker
    },
    data() {
        return {
            titles: [
                {
                    title: 'History',
                    icon: 'history'
                },
                {
                    title: 'Events',
                    icon: 'tasks'
                },
                {
                    title: 'Squads',
                    icon: 'users'
                },
                {
                    title: 'Settings',
                    icon: 'wrench'
                }
            ],
            currentIndex: 1
        };
    },
    computed: {
        title: function() {
            return this.titles.length > this.currentIndex
                ? this.titles[this.currentIndex].title
                : 'Unknown';
        }
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

            for (let squad of staticData.squads) {
                squad.members = [];
                for (let member of staticData.squadMembers) {
                    for (const person of staticData.persons) {
                        if (member.personId == person.id) {
                            member.name = person.name;
                            member.phone = person.phone;
                        }
                    }
                    if (member.squadId == squad.id) {
                        squad.members.push(member);
                    }
                }
                squads.push(squad);
            }

            for (let squad of squads) {
                for (const member of squadMembers) {
                    if (member.squadId == squad.id) {
                        for (const person of staticData.persons) {
                            if (person.id == squad.owner) {
                                squad.ownerName = person.name;
                            }
                        }
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

            this.$store.commit('setUser', user);
            this.$store.commit('setSquads', squads);
            this.$store.commit('setEvents', events);
            this.$store.commit('setResponses', responses);
        }
    },
    methods: {
        onAddTap() {
            /*global action*/
            action('Create ...', 'Cancel', ['Event', 'Series', 'Squad']).then(
                result => {
                    if (result == 'Event') {
                        this.$navigateTo(CreateEvent);
                    } else if (result == 'Series') {
                        this.$navigateTo(CreateSeries);
                    } else if (result == 'Squad') {
                        this.$navigateTo(CreateSquad);
                    }
                }
            );
        },
        changeIndex(idx) {
            this.currentIndex = parseInt(idx);
        }
    }
};
</script>

<style lang="scss">
.main-tab-active {
	color: green;
}
</style>
