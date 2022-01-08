import React,{ useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';

import { useNavigation,useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Confirmation } from '../../Confirmation';
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
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

interface Params {
  user:{
    name:string;
    email:string;
    driverLicense:string;
  }
}

export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação');
    }
    if(passwordConfirm != password){
      return Alert.alert('As senhas não são iguais');
    }

    navigation.navigate('Confirmation',{
     
        nextScreenRoute: 'SignIn',
        title:'Conta Criada!',
        message:`Agora é só fazer login\ne aproveitar`
      
    })
    
  }

  return (
    <KeyboardAvoidingView
      behavior='position' enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <FormTitle>1. Senha</FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          
            <Button 
              onPress={handleRegister}
              title="Cadastrar"
              color={theme.colors.success}
            />
         
        </Container>
      </TouchableWithoutFeedback>
  
    </KeyboardAvoidingView>
  );
}