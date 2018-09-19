<template>
    <StackLayout 
        rowDirection="column" 
        width="100%">
        <GridLayout 
            rows="auto,auto,auto" 
            columns="*,*,*"  
            width="100%">
            <Label 
                :text="user.name" 
                row="0" 
                col="0" 
                colSpan="3" />
            <Label 
                text="In" 
                row="1" 
                col="0" 
                class="footnote" 
                textAlignment="center" />
            <Label 
                text="Total" 
                row="1" 
                col="1" 
                class="footnote" 
                textAlignment="center" />
            <Label 
                text="Out" 
                row="1" 
                col="2" 
                class="footnote" 
                textAlignment="center" />
            <Label 
                :text="inCount" 
                row="2" 
                col="0" 
                textAlignment="center"
                color="green" />
            <Label 
                :text="totalCount" 
                row="2" 
                col="1" 
                textAlignment="center" />
            <Label 
                :text="inCount" 
                row="2" 
                col="2" 
                textAlignment="center"
                color="red" />
        </GridLayout>
        <ScrollView 
            flexGrow="2" 
            width="100%">
            
        </ScrollView>
    </StackLayout> 
</template>

<script>
import { mapState } from 'vuex';
// const moment = require('moment');

export default {
    data() {
        return {};
    },
    computed: {
        inCount() {
            return 8;
        },
        totalCount() {
            return 12;
        },
        outCount() {
            return 2;
        },
        ...mapState({
            user: state => state.main.user
        })
    }
};
</script>

<style lang="scss">
</style>