import { FilterType } from "../types/FilterType";

export function formatType(value: number) {
    switch (value) {
        case FilterType.STUDY:
            return 'Study'
        case FilterType.TRIP:
            return 'Trip'
        case FilterType.WORK:
            return 'Work'
        case FilterType.PERSONAL:
            return 'Personal'
        default:
            return value
    }
}