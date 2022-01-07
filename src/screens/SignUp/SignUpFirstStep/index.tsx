import React from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
 } from 'react-native';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';



export function SignUpFirstStep(){
  const navigation = useNavigation<any>();

  function handleBack(){
    navigation.goBack();
  }

  function handleNext(){
    navigation.navigate('SignUpSecondStep')
  }

  return (
    <KeyboardAvoidingView
      behavior='position' enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
      <GestureHandlerRootView>
        <Container>
      
          <Header>
           
              <BackButton onPress={handleBack} />
           
            <Steps>
              <Bullet active />
              <Bullet  />
            </Steps>
          </Header>

          <Title>
            Crie sua {'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma fácil e rápida
          </SubTitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
            />
          </Form>

          
            <Button 
              onPress={handleNext}
              title="Próximo"
            />
         
        </Container>
        </GestureHandlerRootView>
        </>
      </TouchableWithoutFeedback>
  
    </KeyboardAvoidingView>
  );
}