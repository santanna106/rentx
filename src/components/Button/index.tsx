import React from 'react';
import { ActivityIndicator,TouchableOpacityProps } from 'react-native';
import { GestureHandlerRootView, RectButtonProps } from 'react-native-gesture-handler';

import theme from '../../styles/theme';

import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
    title:string;
    color?:string;
    enabled?:boolean;
    loading?:boolean;
    light?:boolean;
}

export function Button({
    title,
    color,
    enabled = true,
    onPress,
    loading = false,
    light = false,
    ...rest
}:Props){
  return (
  
    <Container 
    color={color ? color : theme.colors.main}
    style={{opacity: (enabled === false || loading === true) ? .5 : 1}}
    onPress={onPress}
    {...rest}
    >
      {loading ? 
        <ActivityIndicator 
          color={theme.colors.shape}
        />
        :
        <Title light={light}>{title}</Title>
      }
    </Container>
    
  );
}