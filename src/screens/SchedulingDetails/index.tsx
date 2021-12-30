import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

 
export function SchedulingDetails(){
  const theme = useTheme();

  const navigation = useNavigation<any>();

  function handleConfimScheduling(){
    navigation.navigate('SchedulingComplete')
  }

  return (
    
      <Container>
        <Header>     
          <GestureHandlerRootView>
            <BackButton onPress={handleConfimScheduling} />
          </GestureHandlerRootView>    
        </Header>
        <CarImages>
          <ImageSlider imagesUrl={['https://tse1.mm.bing.net/th?id=OIP.6JApWPZe9yqr1j8c-BDTkAHaFj&pid=Api&P=0&w=218&h=165']} />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>Lamborguine</Brand>
              <Name>Huracan</Name>
            </Description>
            <Rent>
              <Period>Ao dia</Period>
              <Price>R$ 580</Price>
            </Rent>
          </Details>
          <Accessories>
            <Accessory name="380Km/h"  icon={speedSvg}/>
            <Accessory name="3.2s"  icon={accelerationSvg}/>
            <Accessory name="800 HP"  icon={forceSvg}/>
            <Accessory name="Gasolina"  icon={gasolineSvg}/>
            <Accessory name="Auto"  icon={exchangeSvg}/>
            <Accessory name="2 pessoas"  icon={peopleSvg}/>
          </Accessories>

          <RentalPeriod>
            <CalendarIcon>
              <Feather 
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <DateTitle></DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>

            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.text}
              />

            <DateInfo>
              <DateTitle></DateTitle>
              <DateValue>18/06/2021</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>


        
        </Content>

        <Footer>
          <GestureHandlerRootView>
            <Button title="Confirmar" onPress={handleConfimScheduling} /> 
          </GestureHandlerRootView>
          
        </Footer>
      </Container>

    
  );
}