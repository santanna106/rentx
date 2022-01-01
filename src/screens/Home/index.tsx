import React,{useEffect,useState} from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import {CarDTO} from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';


import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles';

export function Home(){
  const [cars,setCars] = useState<CarDTO[]>([]);
  const [loading,setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const theme = useTheme();

  function handleCarDetails(car:CarDTO){
    navigation.navigate('CarDetails',{car});
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }

  async function fetchCars(){
    try {
      const response = await api.get('/cars');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchCars();
    
  }, [])

  return (
    <Container>
        <StatusBar
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
         />
        <Header>
          <HeaderContent>
            <Logo 
              width = {RFValue(108)}
              height = {RFValue(12)}
            />
            <TotalCars>
                Total de 12 carros
            </TotalCars>
          </HeaderContent>
        </Header>

        {loading ? <Load /> : 
            <CarList
              data={cars}
              keyExtractor={(item:CarDTO) => String(item.id)}
              renderItem={({ item }: { item: CarDTO }) => <Car data={item} onPress={() => handleCarDetails(item)}/> }
              
            />
        }

        <GestureHandlerRootView>
          <MyCarsButton onPress={handleOpenMyCars}>
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButton>
        </GestureHandlerRootView>
    </Container>
  );
}