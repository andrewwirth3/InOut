<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>
    <ScrollView>
        <ListView for="(evt, index) in events">
            <!-- <v-template v-bind:class="['container-item', {'accept': evt.response === 1}, {'reject': evt.response === 0 }, {'none': evt.response === null}]" > -->
            <v-template>
                <FlexboxLayout>
                    <Label :text="evt.date" alignSelf="center" height="70" color="white"/>
                </FlexboxLayout>
            </v-template>
        </ListView>
    </ScrollView>
  </Page>
</template>

<script>
// import { staticData } from '../data/static-data.js';
import { mapState } from 'vuex';

const persons = [
    {
        id: 1,
        name: 'Admin',
        phone: 3191112233,
        email: 'test@gmail.com',
        status: 'A'
    },
    {
        id: 2,
        name: 'Test',
        phone: 3191114444,
        email: 'test1@gmail.com',
        status: 'A'
    }
];

const squads = [
    {
        id: 1,
        name: 'Squad 1',
        status: 'A',
        Created: new Date(),
        Owner: 1
    }
];

const squadMembers = [
    {
        id: 1,
        squadId: 1,
        personId: 1,
        status: 'A',
        sequence: 1
    },
    {
        id: 2,
        squadId: 1,
        personId: 2,
        status: 'A',
        sequence: 1
    }
];

const series = [
    {
        id: 1,
        squadId: 1,
        start: new Date('2018-01-01'),
        end: new Date('2018-05-01'),
        status: 'A'
    }
];

const events = [
    {
        id: 1,
        seriesId: 1,
        date: new Date('2018-01-01'),
        min: 2,
        count: 0,
        total: 4
    },
    {
        id: 2,
        seriesId: 1,
        date: new Date('2018-02-01'),
        min: 2,
        count: 0,
        total: 4
    },
    {
        id: 3,
        seriesId: 1,
        date: new Date('2018-03-01'),
        min: 2,
        count: 0,
        total: 4
    },
    {
        id: 4,
        seriesId: 1,
        date: new Date('2018-04-01'),
        min: 2,
        count: 0,
        total: 4
    },
    {
        id: 5,
        seriesId: 1,
        date: new Date('2018-05-01'),
        min: 2,
        count: 0,
        total: 4
    }
];

const responses = [
    {
        id: 1,
        eventId: 1,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 1,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 2,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 2,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 3,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 3,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 4,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 4,
        personId: 2,
        status: null
    },
    {
        id: 1,
        eventId: 5,
        personId: 1,
        status: null
    },
    {
        id: 1,
        eventId: 5,
        personId: 2,
        status: null
    }
];

const staticData = {
    persons,
    squads,
    squadMembers,
    series,
    events,
    responses
};

export default {
    data() {
        return {
            user: {},
            squads: [],
            events: [],
            responses: []
        };
    },
    //computed: mapState(['user', 'squads', 'events', 'responses']),
    mounted() {
        
        const userId = 1;
        let user = null;
        console.log(`userid = ${userId}`);
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
            console.log(`events: ${JSON.stringify(this.events)}`);
            this.$store.commit('setUser', user);
            this.$store.commit('setSquads', squads);
            this.$store.commit('setEvents', events);
            this.$store.commit('setResponses', responses);
        }
    }
};
</script>

<style scoped lang="scss">
.container-item {
	padding: 10;

    >.none {
        border-left: 5 solid grey;
        border-right: 5 solid grey;
    }

    >.accept {
        border-left: 5 solid green;
        border-right: 5 solid green;
    }

    >.reject {
        border-left: 5 solid red;
        border-right: 5 solid red;
    }
}
</style>