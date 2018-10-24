<template>
    <GridLayout columns="*"
                rows="*,auto"
                height="85%">
        <RadCalendar :viewMode="viewMode"
                     :selectionMode="selectionMode"
                     :monthViewStyle="style"
                     row="0"
                     col="0"
                     @dateSelected="onDateSelected"
                     @dateDeselected="onDateDeselected">
        </RadCalendar>
        <Button :text="btnText"
                row="1"
                col="0"
                class="m-y-5 btn btn-primary"
                :isEnabled="btnActive"
                @tap="onSelect">
        </Button>
    </GridLayout>
</template>

<script>
import {
    CalendarViewMode,
    CalendarSelectionMode,
    CalendarMonthViewStyle
} from 'nativescript-ui-calendar';
const moment = require('moment');

export default {
    props: {
        selection: {
            type: String,
            default: 'single'
        }
    },
    data() {
        return {
            viewMode: CalendarViewMode.Month,
            selectedDates: []
        };
    },
    computed: {
        btnActive() {
            return this.selectedDates.length > 0;
        },
        btnText() {
            return `Select Date${this.selection == 'single' ? '' : 's'}`;
        },
        selectionMode() {
            if (this.selection == 'multiple') {
                return CalendarSelectionMode.Multiple;
            }
            return CalendarSelectionMode.Single;
        },
        style() {
            const style = new CalendarMonthViewStyle();
            // style.selectionShape = 'Round';
            return style;
        }
    },
    methods: {
        onDateSelected(args) {
            this.modifySelected(args.date, true);
        },
        onDateDeselected(args) {
            this.modifySelected(args.date, false);
        },
        modifySelected(date, add) {
            const m = moment(date);
            if (m.isValid()) {
                const dateString = m.format('L');
                const index = this.selectedDates.indexOf(dateString);
                if (index > -1 && !add) {
                    this.selectedDates.splice(index, 1);
                } else if (add) {
                    this.selectedDates.push(dateString);
                }
            }
        },
        onSelect() {
            this.$modal.close(this.selectedDates);
        }
    }
};
</script>
