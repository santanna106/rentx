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
  value?:string;
}

export function PasswordInput({ 
  iconName,
  value,
  ...rest
}: Props){
  const [isPasswordVisible,setIsPasswordVisible] = useState(false);
  const [isFocused,setIsFocused] = useState(false);
  const [isFilled,setIsFilled] = useState(false);
  const theme = useTheme();

  function togglePasswordVisible(){
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleInputFocused(){
    setIsFocused(true);

  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);   
  }
  
  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
       isFocused={isFocused}
       onBlur={handleInputBlur}
       onFocus={handleInputFocused}
       secureTextEntry={!isPasswordVisible}
       autoCorrect={false}
       {...rest}
       
        />
      <GestureHandlerRootView>   
        <BorderlessButton onPress={togglePasswordVisible}>
          <IconContainer  isFocused={isFocused}>
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