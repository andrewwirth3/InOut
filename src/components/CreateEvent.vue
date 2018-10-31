<template>
    <Page class="page"
          @swipe="onSwipe">
        <ActionBar class="action-bar"
                   :title="title"
                   backgroundColor="#191919"
                   color="#777777">
            <NavigationButton text="Go back"
                              android.systemIcon="ic_menu_back"
                              @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="form p-20">
                <StackLayout class="input-field">
                    <Label text="Description"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :value="event.desc"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Location"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="event.loc"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Date"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="event.date"
                               editable="false"
                               @tap="pickDate"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Time"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="event.time"
                               editable="false"
                               @tap="pickTime"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Squad"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="event.squadName"
                               editable="false"
                               @tap="pickSquad"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Minimum"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="event.min"
                               keyboardType="number"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <Button text="Create"
                        class="btn btn-primary"
                        @tap="onCreate" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import BaseDatePicker from './BaseDatePicker.vue';
import BaseTimePicker from './BaseTimePicker.vue';
import BaseListPicker from './BaseListPicker.vue';

const moment = require('moment');

export default {
    data() {
        return {
            event: {
                desc: '',
                loc: '',
                date: '',
                time: '',
                min: '',
                squad: null,
                squadName: ''
            },
            title: 'New Event',
            today: moment()
                .add(-1, 'days')
                .toDate()
        };
    },
    computed: {
        squadNames: function() {
            return [''].concat(this.squads.map(s => `${s.id}: ${s.name}`));
        },
        ...mapState({
            squads: state => state.main.squads
        })
    },
    methods: {
        pickDate() {
            this.$showModal(BaseDatePicker).then(dates => {
                this.$set(this.event, 'date', dates.join(', '));
            });
        },
        pickTime() {
            this.$showModal(BaseTimePicker).then(time => {
                let m = moment(time);
                let newTime = '';
                if (m.isValid()) {
                    newTime = m.format('LT');
                }
                this.$set(this.event, 'time', newTime);
            });
        },
        pickSquad() {
            this.$showModal(BaseListPicker, {
                context: {
                    propsData: {
                        items: this.squads,
                        keyValue: 'id',
                        textValue: 'name'
                    }
                }
            }).then(squad => {
                this.$set(this.event, 'squad', squad);
                this.$set(this.event, 'squadName', squad.name);
            });
        },
        onCreate() {
            // console.log(JSON.stringify(this.event));
        },
        onSwipe() {
            // console.log(JSON.stringify(args));
        },
        squadChange() {
            // console.log(JSON.stringify(args.object));
        }
    }
};
</script>

<style lang="scss">
</style>
