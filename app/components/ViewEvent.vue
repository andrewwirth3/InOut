<template>

    <Page class="page"
          @swipe="onSwipe">
        <ActionBar class="action-bar"
                   title="Event"
                   backgroundColor="#191919"
                   color="#777777">
            <NavigationButton text="Go back"
                              android.systemIcon="ic_menu_back"
                              @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="form p-20">
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {};
    },
    prop: {
        event: Object
    },
    computed: {
        isOwner() {
            return this.event.owner == this.user;
        },
        ...mapState({
            user: state => state.main.user
        })
    },
    created() {
        console.log(JSON.stringify(this.event));
    }
};
</script>
