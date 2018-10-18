<template>
    <StackLayout height="80%">
        <StackLayout>
            <RadCalendar :viewMode="viewMode"
                         :selectionMode="selectionMode"
                         :monthViewStyle="style">
            </RadCalendar>
        </StackLayout>
        <StackLayout>
            <Button label="Select"></Button>
        </StackLayout>
    </StackLayout>
</template>

<script>
import {
    CalendarViewMode,
    CalendarSelectionMode,
    CalendarMonthViewStyle
} from 'nativescript-ui-calendar';

export default {
    props: {
        selection: {
            type: String,
            default: 'single'
        }
    },
    data() {
        return {
            viewMode: CalendarViewMode.Month
        };
    },
    computed: {
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
    }
};
</script>
