import { eachDayOfInterval,format,parseISO } from 'date-fns';

import { MarkedDateProps, DateData } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';
import theme from '../../styles/theme';

export function generateInterval(start: DateData, end: DateData){
    let intervalo:MarkedDateProps = {}; 

    eachDayOfInterval({ start: parseISO(start.dateString), end: parseISO(end.dateString)})
    .forEach(( item ) => {
        const date = format(getPlatformDate(item),'yyy-MM-dd');
        intervalo = {
            ...intervalo,
            [date]: {
                color:start.dateString === date || end.dateString === date
                ? theme.colors.main : theme.colors.main_light,

                textColor:start.dateString === date || end.dateString === date
                ? theme.colors.main_light : theme.colors.main,
            }
        }
    })

    return intervalo;
}


