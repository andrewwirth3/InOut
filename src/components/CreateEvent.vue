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
                    <ListPicker :items="squadNames"
                                selectedIndex="0"
                                @selectedIndexChange="squadChange"></ListPicker>
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
const ModalPicker = require('nativescript-modal-datetimepicker')
    .ModalDatetimepicker;
const picker = new ModalPicker();
const moment = require('moment');

export default {
    // components: {
    //     BaseDatePicker
    // },
    data() {
        return {
            event: {
                desc: '',
                loc: '',
                date: '',
                time: '',
                min: ''
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
            // picker
            //     .pickDate({
            //         title: 'Pick Date for Event',
            //         theme: 'dark',
            //         minDate: this.today
            //     })
            //     .then(result => {
            //         let m = moment(
            //             `${result.year}-${result.month}-${result.day}`,
            //             moment.HTML5_FMT.DATE
            //         );
            //         if (m.isValid()) {
            //             this.$set(this.event, 'date', m.format('L'));
            //         }
            //     })
            //     .catch(error => {
            //         alert('pickDate Error: ' + error);
            //     });
        },
        pickTime() {
            picker
                .pickTime({
                    title: 'Pick Time for Event',
                    theme: 'dark',
                    minDate: this.today
                })
                .then(result => {
                    let m = moment(
                        `${result.hour}:${result.minute}`,
                        moment.HTML5_FMT.TIME
                    );
                    if (m.isValid()) {
                        this.$set(this.event, 'time', m.format('LT'));
                    }
                })
                .catch(error => {
                    alert('pickTime Error: ' + error);
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
