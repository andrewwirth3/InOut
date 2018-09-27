<template>
    <Page class="page">
        <ActionBar class="action-bar" 
                   :title="title"
                   backgroundColor="#191919"
                   color="#777777">
            <NavigationButton text="Go back" 
                              android.systemIcon="ic_menu_back" 
                              @tap="$navigateBack" />
        </ActionBar>
        <StackLayout class="form">
            <TextField hint="Description" 
                       :text="desc" />
            
        </StackLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            title: 'New Event',
            desc: ''
        };
    }
};
</script>

<style lang="scss">
</style>