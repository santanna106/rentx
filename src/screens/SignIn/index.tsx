import React,{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
 } from 'react-native';

 import * as Yup from 'yup';

import { useTheme } from 'styled-components';
 
import {Button} from '../../components/Button';
import {Input} from '../../components/Input';
import {PasswordInput} from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer
} from './styles';


export function SignIn(){
 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const { signIn } = useAuth();
  
  const navigation = useNavigation<any>();
  const theme = useTheme();

  async function handleSignIn(){
   
    try{
        const schema = Yup.object().shape({
            password: Yup.string()
            .required('A senha é obrigatória'),
            email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido')
        });

        await schema.validate({email,password});

        signIn({email,password});
       
    } catch (error) {
        if(error instanceof Yup.ValidationError){
            Alert.alert("Opa",error.message);
        } else {
            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, verifique as credenciais')
        }
    }
    

 
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep')
  }

  return (  
    <KeyboardAvoidingView
        behavior='position'
        enabled>
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            
            <Container>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>Estamos {'\n'}quase lá </Title>
                        <Subtitle>
                            Faça seu login para começar {'\n'}
                            uma experiência incrível
                        </Subtitle>
                    </Header>
                    <Form>
                        <Input
                        iconName="mail"
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                        />

                        <PasswordInput
                        iconName="lock"
                        placeholder='Senha'
                        value={password}
                        onChangeText={setPassword}
                        />
                    </Form>
                
                    
                    <Footer>
                        <Button 
                              title="Login"
                              onPress={handleSignIn}
                              enabled={true}
                              loading={false}
                         />
                            
                        <Button 
                              title="Criar conta gratuita"
                              onPress={handleNewAccount}
                              enabled={true}
                              loading={false}
                              color={theme.colors.background_secundary}
                              light
                        />
                    </Footer>
                </Container>
        </TouchableWithoutFeedback>
        
    </KeyboardAvoidingView>
   
  );
}