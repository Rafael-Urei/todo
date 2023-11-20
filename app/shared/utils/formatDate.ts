import { format, formatISO, startOfToday } from "date-fns";

export const formatStringToDate = () => {
    
};

export const formatDateToString = (date: Date | null) => {
    if (date) {
        return formatISO(date);
    }
    return formatISO(startOfToday())
};