import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation,useRoute } from '@react-navigation/native';
import { format } from 'date-fns';


import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';



interface Params {
  car:CarDTO;
  dates:string[];
}

interface RentalPeriod {
  start:string;
  end:string;
}
 
export function SchedulingDetails(){
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading,setLoadin] = useState(false);
  const [rentalPeriod,setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const { user } = useAuth();
  
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const {car,dates} = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfimScheduling(){
    setLoadin(true);
  

    await api.post('rentals',{
      user_id:user.user_id,
      car_id: car.id,
      start_Date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total:rentTotal
    })
    .then(response => {
      navigation.navigate('Confirmation',{
       
          nextScreenRoute: 'Home',
          title:'Carro alugado!',
          message:`Agora você só precisar ir\naté a concessionária da RENTEX\npegar o seu automóvel.`
        
      })
    })
    .catch((error) => {
      console.log('*****ERROR **')
      console.log(error)
      Alert.alert('Não foi possível confirmar o agendamento')
      setLoadin(false);
    })

    
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
   setRentalPeriod({
     start: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
     end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
   })
  }, [])

  useEffect(() => {
    async function fetchCarUpdated(){
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true){
      fetchCarUpdated();
    }
  }, [netInfo.isConnected])

  return (
    
      <Container>
        <Header>     
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
        <ImageSlider imagesUrl={
                !!carUpdated.photos ? 
                carUpdated.photos : [{id:car.thumbnail, photo:car.thumbnail}]
              } />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>
            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
          </Details>
          {
            carUpdated.accessories &&
            <Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)}/>
              ))
            }
          </Accessories>
          }

          <RentalPeriod>
            <CalendarIcon>
              <Feather 
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather 
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.text}
              />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
          </RentalPeriod>
          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
              <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>


        
        </Content>

        <Footer>
            <Button 
              title="Alugar Agora"
              color={theme.colors.success} 
              onPress={handleConfimScheduling}
              enabled={!loading}
              loading={loading}
             /> 
        </Footer>
      </Container>

    
  );
}