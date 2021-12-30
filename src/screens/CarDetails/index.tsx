import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


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
  About,
  Footer
} from './styles';
 
export function CarDetails(){
  const navigation = useNavigation<any>();

  function handleScheduling(){
    navigation.navigate('Scheduling');
  }
  return (
    
      <Container>
        <Header>     
          <GestureHandlerRootView>
            <BackButton onPress={() => {console.log('TESTE')}} />
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
          

          <About>
            Este é automóvel desportivo. Surgiu do lendário touro de 
            lide indultado na praça Real Maestranza de Sevilla. É um
            belíssimo carro para quem gosta de acelerar.
          </About>
        </Content>

        <Footer>
          <GestureHandlerRootView>
            <Button title="Escolher período do aluguel" onPress={handleScheduling} /> 
          </GestureHandlerRootView>
          
        </Footer>
      </Container>

    
  );
}