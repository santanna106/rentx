import React from 'react';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function SchedulingComplete(){
  const {width} = useWindowDimensions();
  return (
    <Container>
        <LogoSvg 
            width={width}
        />
        <Content>
            <DoneSvg width={80} height={80} />
            <Title>Carro Alugado!</Title>

            <Message>
                Agora você só precisa ir {'\n'}
                até a concessionária da RENTX {'\n'}
                pegar o seu automóvel. {'\n'}
            </Message>
        </Content>

        <Footer>
            <ConfirmButton title="OK"/>
        </Footer>
        
    </Container>
  );
}