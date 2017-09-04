import { ValueNamePair } from './../models/custom-types';

const SchoolYears: Array<ValueNamePair> = [
    {value: 0, name: 'VII'},
    {value: 1, name: 'IX'},
    {value: 2, name: 'X'},
    {value: 3, name: 'XI'},
    {value: 4, name: 'XII'}
];

const GetSchoolYear = ( value ) => {
    return SchoolYears[ SchoolYears.findIndex( (el) => el.value === value ) ].name;
};

export { SchoolYears, GetSchoolYear };
