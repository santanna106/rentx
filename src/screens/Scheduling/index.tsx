import React,{useState} from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import ArrowSvg from  '../../assets/arrow.svg'; 

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar,DateData,generateInterval,MarkedDateProps } from '../../components/Calendar';


import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';

export function Scheduling(){
  const [lastSelectedDate,setLastSelectedDate] = useState<DateData>({} as DateData);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleConfirmPeriod(){
    navigation.navigate('SchedulingDetails');
  }

  function handleBack(){
    navigation.goBack();
  }

  function handleChangeDate(date:DateData){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      let dateAux = start;
      start = end;
      end = dateAux;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start,end);
    setMarkedDates(interval);
   
  }

  return (
    <Container>
        <Header> 
          <StatusBar 
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />    
          <GestureHandlerRootView>
            <BackButton 
                onPress={handleBack}
                color={theme.colors.shape}
             />
          </GestureHandlerRootView>   
          <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel {'\n'}
          </Title>
          <RentalPeriod>
              <DateInfo>
                  <DateTitle>DE</DateTitle>
                  <DateValue selected={true}>18/11/2021</DateValue>
              </DateInfo>

              <ArrowSvg />

              <DateInfo>
                  <DateTitle>ATÉ</DateTitle>
                  <DateValue selected={true}>19/11/2021</DateValue>
              </DateInfo>
          </RentalPeriod> 
          
        </Header>

        <Content>
          <Calendar
            markedDates={markedDates}
            onDayPress={handleChangeDate}
          />
        </Content>
        <Footer>
            <GestureHandlerRootView>
            <Button
                title="Confirmar"
                onPress={handleConfirmPeriod}
            />
            </GestureHandlerRootView>
        </Footer>
    </Container>
  );
}