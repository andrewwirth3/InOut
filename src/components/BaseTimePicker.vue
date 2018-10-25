<template>
    <GridLayout columns="*"
                rows="auto,auto">
        <TimePicker :time="time"
                    :hour="hour"
                    :minute="minute"
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
            time: moment(),
            hour: 0,
            minute: 0
        };
    },
    created() {
        let h = moment();
        h.hour(h.hour() + 1);
        h.minute(0);
        console.log(h.format('LT'));
        this.$set(this, 'time', h.toDate());
        this.$set(this, 'hour', h.hour());
        this.$set(this, 'minute', h.minute());
    },
    methods: {
        onTimeChange(args) {
            this.selectedTime = args.value;
        },
        onSelect() {
            this.$modal.close(this.selectedTime);
        }
    }
};
</script>
