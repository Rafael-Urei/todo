import { format, startOfToday } from "date-fns";

export const formatStringToDate = () => {
    
};

export const formatDateToString = (date: Date | null) => {
    if (date) {
        return format(date, 'yyyy/MM/dd, cccc')
    }
    return format(new Date(startOfToday()), 'yyyy/MM/dd, cccc')
};