<template>
    <GridLayout columns="*"
                rows="auto,auto,auto"
                class="page">
        <TimePicker :time="time"
                    row="0"
                    col="0"
                    @timeChange="onTimeChange">
        </TimePicker>
        <Button text="Select Time"
                row="1"
                col="0"
                class="btn btn-primary"
                :isEnabled="btnActive"
                @tap="onSelect">
        </Button>
        <Button text="Cancel"
                row="2"
                col="0"
                class="btn btn-secondary"
                @tap="$modal.close(null)">
        </Button>
    </GridLayout>
</template>

<script>
const moment = require('moment');

export default {
    data() {
        return {
            selectedTime: moment().toDate(),
            time: new Date()
        };
    },
    methods: {
        onTimeChange(args) {
            let m = moment(args.value);
            m.seconds(0);
            this.selectedTime = m.toDate();
        },
        onSelect() {
            this.$modal.close(this.selectedTime);
        }
    }
};
</script>
