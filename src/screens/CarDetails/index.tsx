import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {
  Container,
  Header
} from './styles';

import { BackButton } from '../../components/BackButton';
 
export function CarDetails(){
  return (
    
      <Container>
        <Header>     
          <GestureHandlerRootView>
            <BackButton onPress={() => {console.log('TESTE')}} />
          </GestureHandlerRootView>    
        </Header>
      </Container>

    
  );
}