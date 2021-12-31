import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {
    Calendar as CustomCalendar,
    LocaleConfig
} from 'react-native-calendars';

import {generateInterval} from './generateInterval';

import { ptBR } from './locale.config';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps{
    [date:string]: {
        color:string;
        textColor:string;
        disabled?:boolean;
        disableTouchEvent?:boolean;
    }
}

interface DateData  {
    year: number;
    month: number;
    day: number;
    timestamp: number;
    dateString: string;
};

interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress:(data:DateData) => void;
}

function Calendar({markedDates, onDayPress} : CalendarProps){
  const theme = useTheme();
  return (
    <CustomCalendar 
        renderArrow={(direction) => 
            <Feather
                size={24}
                color={theme.colors.text}
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            />
        }

        headerStyle={{
            backgroundColor:theme.colors.background_secundary,
            borderBottomWidth:0.5,
            borderBottomColor:theme.colors.text_detail,
            paddingBottom:10,
            marginBottom:10
        }}

        theme={{
            textDayFontFamily:theme.fonts.primary_400,
            textDayHeaderFontFamily:theme.fonts.primary_500,
            textDayHeaderFontSize:10,
            textMonthFontFamily:theme.fonts.secundary_600,
            textMonthFontSize:20,
            monthTextColor:theme.colors.title,
            arrowStyle: {
                marginHorizontal: -15
            }

        }}

        firstDay={1}
        minDate={new Date().toString()}

        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
    />

  );
}

export {
    DateData , 
    MarkedDateProps,
    Calendar,
    generateInterval
}