import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';

export function Home(){

  const carDataOne = {

    brand:'audi',
    name:'RS Coupé',
    rent: {
        period:'ao dia',
        price:120,
    },
    thumbnail:'https://tse1.mm.bing.net/th?id=OIP.6JApWPZe9yqr1j8c-BDTkAHaFj&pid=Api&P=0&w=218&h=165'
  }

  const carDataTwo = {

    brand:'audi',
    name:'RS Coupé',
    rent: {
        period:'ao dia',
        price:120,
    },
    thumbnail:'https://tse1.mm.bing.net/th?id=OIP.6JApWPZe9yqr1j8c-BDTkAHaFj&pid=Api&P=0&w=218&h=165'
  }

  return (
    <Container>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
         />
        <Header>
          <HeaderContent>
            <Logo 
              width = {RFValue(108)}
              height = {RFValue(12)}
            />
            <TotalCars>
                Total de 12 carros
            </TotalCars>
          </HeaderContent>
        </Header>
        <CarList 
          data={[1,2,3]}
          keyExtractor={item => String(item)}
          renderItem={({item}) => <Car data={carDataOne}/> }
           
        />
    </Container>
  );
}