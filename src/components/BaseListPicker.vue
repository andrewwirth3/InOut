<template>
    <GridLayout height="85%"
                rows="*"
                columns="*">
        <ListView for="item in items"
                  @itemTap="onItemTap"
                  col="0"
                  row="0"
                  class="list-group">
            <v-template>
                <Label :text="item[textValue]"
                       class="list-group-item" />
            </v-template>
        </ListView>
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
