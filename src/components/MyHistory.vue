<template>
    <FlexboxLayout flexDirection="column" >
        <GridLayout rows="auto,auto,auto" 
                    columns="*,*,*"  
                    width="100%"
                    borderBottomWidth="1"
                    borderBottomColor="black"
                    class="p-b-15">
            <Label :text="user.name" 
                   row="0" 
                   col="0" 
                   colSpan="3" 
                   class="h2 p-y-10 p-l-10" />
            <Label text="In" 
                   row="1" 
                   col="0" 
                   class="footnote m-y-2" 
                   textAlignment="center"
                   textDecoration="underline" />
            <Label text="Total" 
                   row="1" 
                   col="1" 
                   class="footnote m-y-2" 
                   textAlignment="center"
                   textDecoration="underline" />
            <Label text="Out" 
                   row="1" 
                   col="2" 
                   class="footnote m-y-2" 
                   textAlignment="center"
                   textDecoration="underline" />
            <Label :text="inCount" 
                   row="2" 
                   col="0" 
                   textAlignment="center"
                   color="green" />
            <Label :text="totalCount" 
                   row="2" 
                   col="1" 
                   textAlignment="center" />
            <Label :text="outCount" 
                   row="2" 
                   col="2" 
                   textAlignment="center"
                   color="red" />
        </GridLayout>
        <ScrollView flexGrow="2" 
                    width="100%">
            <ListView for="(event, index) in events">
                <v-template>
                    <StackLayout>
                        <GridLayout rows="auto,auto" 
                                    columns="*,auto" 
                                    class="p-10">
                            <Label :text="event.desc" 
                                   row="0" 
                                   col="0" 
                                   color="white" 
                                   class="h2" ></Label>
                            <Label v-if="event.response !== null"
                                   row="0"
                                   col="1"
                                   class="h2 fas m-5" 
                                   :color="event.response == 1 ? 'green' : 'red'" 
                                   :text="`fa-${event.response == 1 ? 'thumbs-up' : 'thumbs-down'}` | fonticon" 
                                   @tap="onInTap(event)" />
                            <Label :text="getFormattedDate(event.date)" 
                                   row="1"
                                   col="0"
                                   class="footnote m-b-10"/>
                            <Label :text="`${event.in}/${event.min}`" 
                                   row="1"
                                   col="1"
                                   class="footnote m-b-10" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
        </ScrollView>
    </FlexboxLayout> 
</template>

<script>
import { mapState } from 'vuex';
const moment = require('moment');

export default {
    data() {
        return {};
    },
    computed: {
        inCount() {
            if (this.responses && this.responses.length) {
                const ins = this.responses.filter(x => x.status == 1);
                return ins.length;
            }
            return '--';
        },
        totalCount() {
            if (this.responses && this.responses.length) {
                return this.responses.length;
            }
            return '--';
        },
        outCount() {
            if (this.responses && this.responses.length) {
                const outs = this.responses.filter(x => x.status == 0);
                return outs.length;
            }
            return '--';
        },
        ...mapState({
            user: state => state.main.user,
            responses: state => state.main.responses,
            events: state => state.main.events
        })
    },
    methods: {
        getFormattedDate(d) {
            let m = moment(d);
            if (m.isValid()) {
                return m.format('ddd, MMM DD');
            }
            return '';
        }
    }
};
</script>

<style lang="scss">
</style>