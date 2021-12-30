import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';

import ArrowSvg from  '../../assets/arrow.svg'; 

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';


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
  const theme = useTheme();
  return (
    <Container>
        <Header> 
          <StatusBar 
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />    
          <GestureHandlerRootView>
            <BackButton 
                onPress={() => {console.log('TESTE')}}
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
          <Calendar />
        </Content>
        <Footer>
            <GestureHandlerRootView>
            <Button
                title="Confirmar"
                onPress={() => {}}
            />
            </GestureHandlerRootView>
        </Footer>
    </Container>
  );
}