<template>
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
                                <Label v-bind:class="['h3', {'fas': event.response == 1}, {'far': event.response != 1}]" 
                                   :color="event.response == 1 ? 'green' : 'white'" 
                                   :text="'fa-thumbs-up' | fonticon" 
                                   @tap="onInTap(event)" 
                                   class="m-r-5 m-l-20" />
                                <Label :text="`${event.in}/${event.min}`" class="footnote" />
                            </FlexboxLayout>
                            <FlexboxLayout flexDirection="row">
                                <Label :text="`${event.out}/${event.total}`" class="footnote"/>
                                <Label v-bind:class="['h3', {'fas': event.response == 0}, {'far': event.response != 0}]" 
                                   :color="event.response == 0 ? 'red' : 'white'" 
                                   :text="'fa-thumbs-down' | fonticon" 
                                   @tap="onOutTap(event)" 
                                   class="m-l-5 m-r-20" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </GridLayout>
                </StackLayout>
            </v-template>
        </ListView>
    </ScrollView>
</template>

<script>
import { mapState } from 'vuex';
const moment = require('moment');

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            user: state => state.main.user,
            events: state => state.main.events,
            responses: state => state.main.responses
        })
    },
    // mounted() {
    // },
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
            const payload = {
                event: evt,
                response: response,
                delta: {
                    in: inDelta,
                    out: outDelta
                }
            };
            this.$store.commit('updateEvent', payload);
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