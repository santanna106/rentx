import React,{ useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { GestureHandlerRootView,BorderlessButton } from 'react-native-gesture-handler';



import {
  Container,
  IconContainer,
  InputText
} from './styles';


interface Props extends TextInputProps {
  iconName:React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ 
  iconName,
  ...rest
}: Props){
  const [isPasswordVisible,setIsPasswordVisible] = useState(false);
  const theme = useTheme();

  function togglePasswordVisible(){
    setIsPasswordVisible(!isPasswordVisible);
  }
  
  return (
    <Container >
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
       secureTextEntry={!isPasswordVisible}
       {...rest}
        />
      <GestureHandlerRootView>   
        <BorderlessButton onPress={togglePasswordVisible}>
          <IconContainer>
            <Feather 
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color={theme.colors.text_detail}
              />
          </IconContainer>
      </BorderlessButton>
      </GestureHandlerRootView>

    </Container>
  );
}