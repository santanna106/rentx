import React from 'react';
import theme from '../../styles/theme';

import {
  Container,
  Title
} from './styles';

interface Props {
    title:string;
    color?:string;
    onPress: () => void;
    enabled?:boolean;
}

export function Button({
    title,
    color,
    onPress,
    enabled = true
}:Props){
  return (
    <Container 
    color={color ? color : theme.colors.main}
    onPress={onPress}
    enabled={enabled}
    style={{opacity: enabled ? 1 : .5}}
    >
        <Title>{title}</Title>
    </Container>
  );
}