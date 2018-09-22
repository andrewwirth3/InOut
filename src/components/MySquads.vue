<template>
    <FlexboxLayout flexDirection="column">
        <GridLayout rows="auto,auto" 
                    columns="50,*,50"
                    class="p-y-10">
            <Label :text="'fa-caret-left' | fonticon" 
                   class="h1 fas" 
                   row="0" 
                   col="0" 
                   rowSpan="2" 
                   @tap="changeSquads(-1)"
                   verticalAlignment="center"
                   horizontalAlignment="center"
                   :color="current == 0 ? 'dimgray' : ''"/>
            <Label :text="squad ? squad.name : 'No Squads Available'" 
                   class= "h2" 
                   row="0" 
                   col="1" 
                   textAlignment="center" />
            <Label :text="squad ? squad.ownerName : ''" 
                   class= "footnote" 
                   row="1" 
                   col="1" 
                   textAlignment="center" />
            <Label :text="'fa-caret-right' | fonticon" 
                   class="h1 fas" 
                   row="0" 
                   col="2" 
                   rowSpan="2"
                   @tap="changeSquads(1)" 
                   verticalAlignment="center"
                   horizontalAlignment="center"
                   :color="(current + 1) >= squads.length ? 'dimgray' : ''"/>
        </GridLayout>
        <ScrollView flexGrow="2" >
            <ListView for="(member, index) in squad.members" 
                      @itemTap="onItemTap">
                <v-template>
                    <StackLayout>
                        <GridLayout rows="auto,auto"
                                    columns="50,*,45,45"
                                    class="m-10">
                            <Label v-if="member.src === undefined"
                                   :text="'fa-user-circle' | fonticon"
                                   class="fas h1"
                                   row="0" 
                                   col="0" 
                                   rowSpan="2"
                                   verticalAlignment="center"
                                   horizontalAlignment="center" />
                            <Image v-else
                                   :src="member.src" 
                                   class="thumb img-circle"
                                   row="0"
                                   col="0"
                                   rowSpan="2" />
                            
                            <Label :text="member.name" 
                                   class="h2 m-l-10 m-b-5" 
                                   row="0" 
                                   col="1" />
                            <Label :text="$formatters_phone(member.phone)" 
                                   class="footnote m-l-10" 
                                   row="1" 
                                   col="1" />
                            <Label :text="'fa-phone' | fonticon"
                                   row="0"
                                   col="2"
                                   rowSpan="2"
                                   class="btn-outline fas"
                                   verticalAlignment="center"
                                   horizontalAlignment="center"
                                   @tap="phoneTap(member.phone)" />
                            <Label :text="'fa-comment-alt' | fonticon" 
                                   row="0"
                                   col="3"
                                   rowSpan="2"
                                   class="btn-outline far"
                                   verticalAlignment="center"
                                   horizontalAlignment="center"
                                   @tap="messageTap(member.phone)" />
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
        return {
            current: 0
        };
    },
    computed: {
        squad() {
            if (this.current >= 0 && this.current < this.squads.length) {
                // eslint-disable-next-line no-console
                // console.log(JSON.stringify(this.squads[this.current]));
                return this.squads[this.current];
            }
            return null;
        },
        ...mapState({
            squads: state => state.main.squads
        })
    },
    methods: {
        changeSquads(dir) {
            let nextValue = this.current + dir;
            if (nextValue < 0) {
                nextValue = 0;
            } else if (nextValue >= this.squads.length) {
                nextValue = this.squads.length - 1;
            }
            this.current = nextValue;
        },
        onItemTap(event) {
            // eslint-disable-next-line no-console
            console.log(`item tapped. event: ${JSON.stringify(event.item)}`);
        },
        phoneTap(phone) {
            // eslint-disable-next-line no-console
            console.log(`phone tapped. event: ${phone}`);
        },
        messageTap(phone) {
            // eslint-disable-next-line no-console
            console.log(`message tapped. event: ${phone}`);
        }
    }
};
</script>

<style lang="scss">
</style>