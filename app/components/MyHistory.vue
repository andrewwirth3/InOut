<template>
    <FlexboxLayout flexDirection="column" >
        <GridLayout rows="auto,auto"
                    columns="*,*,*"
                    width="100%"
                    class="p-y-15">
            <Label text="In"
                   row="0"
                   col="0"
                   class="footnote m-y-2"
                   textAlignment="center"
                   textDecoration="underline" />
            <Label text="Total"
                   row="0"
                   col="1"
                   class="footnote m-y-2"
                   textAlignment="center"
                   textDecoration="underline" />
            <Label text="Out"
                   row="0"
                   col="2"
                   class="footnote m-y-2"
                   textAlignment="center"
                   textDecoration="underline" />
            <Label :text="inCount"
                   row="1"
                   col="0"
                   textAlignment="center"
                   color="green" />
            <Label :text="totalCount"
                   row="1"
                   col="1"
                   textAlignment="center"
                   class="text-muted" />
            <Label :text="outCount"
                   row="1"
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
                            <Label :text="$formatters_date(event.date)"
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
    }
};
</script>

<style lang="scss">
</style>