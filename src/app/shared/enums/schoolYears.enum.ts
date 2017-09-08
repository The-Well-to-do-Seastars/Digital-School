import { ValueNamePair } from './../models/custom-types';

const SchoolYears: Array<ValueNamePair> = [
    {value: 0, name: 'VII'},
    {value: 1, name: 'VIII'},
    {value: 2, name: 'IX'},
    {value: 3, name: 'X'},
    {value: 4, name: 'XI'},
    {value: 5, name: 'XII'}
];

const GetSchoolYear = ( value ) => {
    return SchoolYears[ SchoolYears.findIndex( (el) => el.value === value ) ].name;
};

export { SchoolYears, GetSchoolYear };
