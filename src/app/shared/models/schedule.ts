import { generateClassNames } from './class';
import { copyObject } from './../utils';
import { possibleClasses } from '../enums/index';
import { SchoolYears } from './../enums';
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
        result.push({ title: day, schedule: copyObject(cells, []) });
    });
    return result;
};
export class Schedule {
    options: Array<any>;
    columns: Array<any>;
    disabled: boolean;
    constructor(model?, disabled?, teacher?) {
        if (model) {
            if (!teacher) {
                this.options = model.courses;
            } else {
                this.options = generateClassNames(
                    SchoolYears.slice().map((year) => year.value),
                    possibleClasses());
            }
            if (!model.schedule) {
                this.columns = defaultWeeklySchedule();
            } else {
                this.columns = model.schedule.columns || model.schedule;
            }
        } else {
            this.options = [];
            this.columns = defaultWeeklySchedule();
        }
        this.disabled = disabled || !model;
    }
}
