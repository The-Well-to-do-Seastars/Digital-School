import {copyObject} from './../utils';
const defaultWeeklySchedule = () => {
    const weekDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const result = [];
    const cells = [];
    for (let i = 1; i < 8; i += 1) {
        cells.push({ title: '' + i, selected: null });
    }
    weekDays.forEach((day) => {
        result.push({ title: day, schedule: copyObject( cells, [] ) });
    });
    return result;
};
export class Schedule {
    options: Array<any>;
    columns: Array<any>;
    constructor(model?) {
        if (model) {
            this.options = model.courses;
            if (!model.schedule) {
                this.columns = defaultWeeklySchedule();
            } else {
                this.columns = model.schedule;
            }
        } else {
            this.options = [];
            this.columns = defaultWeeklySchedule();
        }
    }
}
