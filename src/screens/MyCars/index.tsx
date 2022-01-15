import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { format,parseISO } from 'date-fns';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../databases/model/Car';
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

export interface DataProps {
  id:string;
  car:ModelCar;
  start_date:string;
  end_date:string;
}

export function MyCars(){
  const [cars,setCars] = useState<DataProps[]>([]);
  const [loading,setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const screenIsFocus = useIsFocused();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get(`/rentals`)
        const dataFormatted = response.data.map((data:DataProps) => {
          return {
            id:data.id,
            car:data.car,
            start_date:format(parseISO(data.start_date),'dd/MM/yyyy'),
            end_date:format(parseISO(data.end_date),'dd/MM/yyyy'),
          }
        })
        setCars(dataFormatted);
      } catch (error){
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[screenIsFocus])
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
              keyExtractor={(item:DataProps) => String(item.id)}
              renderItem={({ item }: { item: DataProps }) =>
                <CarWrapper>
                  <Car data={item.car} onPress={() => {} }/> 
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{marginHorizontal:10}}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
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