<template>
    <FlexboxLayout flexDirection="column">
        <GridLayout rows="auto,auto,auto" 
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
                   row="1" 
                   col="1" 
                   class="footnote"
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
            <SegmentedBar selectedIndex="0" 
                          row="2" 
                          col="0"
                          colSpan="3">
                <SegmentedBarItem title="Events" />
                <SegmentedBarItem title="Members" />
            </SegmentedBar>
        </GridLayout>
        <ScrollView>
            
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
        }
    }
};
</script>

<style lang="scss">
</style>