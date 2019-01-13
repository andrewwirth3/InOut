<template>
    <GridLayout height="85%"
                rows="*,auto"
                columns="*"
                class="page">
        <ScrollView col="0"
                    row="0">
            <ListView for="item in items"
                      @itemTap="onItemTap"
                      class="list-group">
                <v-template>
                    <Label :text="item[textValue]"
                           class="list-group-item" />
                </v-template>
            </ListView>
        </ScrollView>
        <Button text="Cancel"
                row="2"
                col="0"
                class="btn btn-secondary"
                @tap="$modal.close(null)">
        </Button>
    </GridLayout>
</template>


<script>
export default {
    props: {
        items: {
            type: Array
        },
        keyValue: {
            type: String,
            default: 'id'
        },
        textValue: {
            type: String,
            default: 'text'
        }
    },
    methods: {
        onItemTap(event) {
            this.$modal.close(event.item);
        }
    }
};
</script>
