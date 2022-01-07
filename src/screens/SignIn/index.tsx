import React,{ useState } from 'react';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    TouchableOpacity,
    Text
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

  return (  
    <KeyboardAvoidingView
        behavior='position'
        enabled>
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
             <>  
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
                     
                        <GestureHandlerRootView>
                                <Button 
                                    title="Login"
                                    onPress={handleSignIn}
                                    enabled={true}
                                    loading={false}

                                />
                            
                                <Button 
                                    title="Criar conta gratuita"
                                    onPress={() => alert('teste')}
                                    enabled={true}
                                    loading={false}
                                    color={theme.colors.background_secundary}
                                    light
                                />
                            </GestureHandlerRootView>
                     
                    </Footer>
                
                    
                </Container>
            
            </>
        </TouchableWithoutFeedback>
        
    </KeyboardAvoidingView>
   
  );
}