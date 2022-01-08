import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Apointments,
  ApoitmentsTitle,
  ApoitmentsQuantity,
  CarWrapper,
  CarList,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate


} from './styles';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

export interface CarProps {
  id:string;
  user_id:string;
  car:CarDTO;
  startDate:string;
  endDate:string;
}

export function MyCars(){
  const [cars,setCars] = useState<CarProps[]>([]);
  const [loading,setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get(`/schedules_byuser/?user_id=1`)
        setCars(response.data);
      } catch (error){
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[])
  return (
    <Container>
        <Header> 
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
         />
          <BackButton
              onPress={handleBack}
              color={theme.colors.shape}
          />
        
          <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim do aluguel {'\n'}
          </Title>
          <SubTitle>Conforto Segurança e Praticidade</SubTitle>
        </Header>
       

        {loading ? <Load /> : 

          <Content>
            <Apointments>
              <ApoitmentsTitle>Agendamentos feitos</ApoitmentsTitle>
              <ApoitmentsQuantity>{cars.length}</ApoitmentsQuantity>
            </Apointments>

            <CarList
              data={cars}
              keyExtractor={(item:CarProps) => String(item.id)}
              renderItem={({ item }: { item: CarProps }) =>
                <CarWrapper>
                  <Car data={item.car} onPress={() => {} }/> 
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{marginHorizontal:10}}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              }
            />
         </Content>
        }
    </Container>
  );
}