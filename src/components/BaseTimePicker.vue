<template>
    <GridLayout columns="*"
                rows="auto,auto">
        <TimePicker :time="time"
                    row="0"
                    col="0"
                    @timeChange="onTimeChange">
        </TimePicker>
        <Button text="Select Time"
                row="1"
                col="0"
                class="m-y-5 btn btn-primary"
                :isEnabled="btnActive"
                @tap="onSelect">
        </Button>
    </GridLayout>
</template>

<script>
const moment = require('moment');

export default {
    data() {
        return {
            selectedTime: null,
            time: new Date()
        };
    },
    methods: {
        onTimeChange(args) {
            let m = moment(args.value);
            m.seconds(0);
            this.selectedTime = m;
        },
        onSelect() {
            this.$modal.close(this.selectedTime);
        }
    }
};
</script>
