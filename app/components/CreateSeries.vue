<template>
    <Page class="page"
          @swipe="onSwipe">
        <ActionBar class="action-bar"
                   title="New Series"
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
                               :value="series.desc"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Location"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="series.defaultLoc"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Squad"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="series.squadName"
                               editable="false"
                               @tap="pickSquad"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <GridLayout rows="auto"
                            columns="*,*">
                    <StackLayout class="input-field"
                                 row="0"
                                 col="0">
                        <Label text="Recurring"
                               class="label font-weight-bold m-b-5" />
                        <Switch v-model="series.recurring"
                                class="pull-left"/>
                    </StackLayout>
                    <StackLayout class="input-field"
                                 v-if="series.recurring == true"
                                 row="0"
                                 col="1">
                        <Label text="Repeats"
                               class="label font-weight-bold m-b-5" />
                        <TextField class="input"
                                   :text="series.repeats"
                                   editable="false"
                                   @tap="pickRepeatValue"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
                </GridLayout>
                <!-- Recurring FALSE -->
                <StackLayout class="input-field"
                             v-if="series.recurring == false">
                    <Label text="Dates"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="series.dates"
                               editable="false"
                               @tap="pickDate('dates', true)"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <!-- END Recurring FALSE -->
                <!-- Recurring TRUE -->
                <StackLayout v-else>
                    <GridLayout rows="auto"
                                columns="*, *">
                        <StackLayout class="input-field"
                                     row="0"
                                     col="0">
                            <Label text="Start Date"
                                   class="label font-weight-bold m-b-5" />
                            <TextField class="input"
                                       :text="series.startDate"
                                       editable="false"
                                       @tap="pickDate('startDate')"></TextField>
                            <StackLayout class="hr-light"></StackLayout>
                        </StackLayout>
                        <StackLayout class="input-field"
                                     row="0"
                                     col="1">
                            <Label text="End Date"
                                   class="label font-weight-bold m-b-5" />
                            <TextField class="input"
                                       :text="series.endDate"
                                       editable="false"
                                       @tap="pickDate('endDate')"></TextField>
                            <StackLayout class="hr-light"></StackLayout>
                        </StackLayout>
                        
                    </GridLayout>
                </StackLayout>
                <!-- END Recurring TRUE -->
                <StackLayout class="input-field">
                    <Label text="Time"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="series.time"
                               editable="false"
                               @tap="pickTime"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout class="input-field">
                    <Label text="Minimum"
                           class="label font-weight-bold m-b-5" />
                    <TextField class="input"
                               :text="series.min"
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
            series: {
                desc: '',
                loc: '',
                recurring: false,
                dates: [],
                startDate: '',
                endDate: '',
                repeats: '',
                time: '',
                min: '',
                squad: null,
                squadName: ''
            },
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
        pickDate(prop, multiple) {
            this.$showModal(BaseDatePicker, {
                context: {
                    propsData: {
                        selection: multiple ? 'multiple' : 'single'
                    }
                }
            }).then(dates => {
                if (dates != null)
                    this.$set(this.series, prop, dates.join(', '));
            });
        },
        pickTime() {
            this.$showModal(BaseTimePicker).then(time => {
                if (time != null) {
                    let m = moment(time);
                    let newTime = '';
                    if (m.isValid()) {
                        newTime = m.format('LT');
                    }
                    this.$set(this.series, 'time', newTime);
                }
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
                if (squad != null) {
                    this.$set(this.series, 'squad', squad);
                    this.$set(this.series, 'squadName', squad.name);
                }
            });
        },
        pickRepeatValue() {
            // get value from store (aka Value from DB)
            const values = [
                {
                    value: 'd',
                    text: 'Day'
                },
                {
                    value: 'w',
                    text: 'Week'
                },
                {
                    value: 'm',
                    text: 'Month'
                },
                {
                    value: 'q',
                    text: 'Quarter'
                }
            ];
            this.$showModal(BaseListPicker, {
                context: {
                    propsData: {
                        items: values,
                        keyValue: 'value',
                        textValue: 'text'
                    }
                }
            }).then(val => {
                if (val != null) {
                    this.$set(this.series, 'repeats', val.text);
                }
            });
        },
        onCreate() {
            // console.log(JSON.stringify(this.series));
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
