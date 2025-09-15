import {DateTime} from 'luxon';

export type MyCalendarT = {
    year: number;
    month: number;
    day: number[];
    startWeekOfFirstDay: number;
    startWeekOfEndDay: number;
}

class MyCalendar {

    private static setFirstDayOfMonth(target: DateTime) {
        return target.set({day: 1});
    }

    static getCalendar(target: DateTime, startDay: ('sunday' | 'monday') = 'sunday'): MyCalendarT {
        return {
            year: target.year,
            month: target.month,
            day: Array.from({length: target.daysInMonth ?? 0}, (_, i) => i + 1),
            startWeekOfFirstDay: startDay.toLowerCase() === 'sunday' ? target.startOf('month').weekday % 7 : target.startOf('month').weekday,
            startWeekOfEndDay: startDay.toLowerCase() === 'sunday' ? target.endOf('month').weekday % 7 : target.endOf('month').weekday,
        }
    }

    static minusOneMonthCalendar(target: DateTime, startDay: ('sunday' | 'monday') = 'sunday'): MyCalendarT {
        const oneMonthBefore = this.minusMonth(target, 1);
        return this.getCalendar(oneMonthBefore, startDay);
    }

    static plusOneMonthCalendar(target: DateTime, startDay: ('sunday' | 'monday') = 'sunday'): MyCalendarT {
        const oneMonthAfter = this.plusMonth(target, 1);
        return this.getCalendar(oneMonthAfter, startDay);
    }

    static minusMonth(target: DateTime, amount: number) {
        return this.setFirstDayOfMonth(target).minus({month: amount});
    }

    static plusMonth(target: DateTime, amount: number) {
        return this.setFirstDayOfMonth(target).plus({month: amount});
    }
}

export default MyCalendar;