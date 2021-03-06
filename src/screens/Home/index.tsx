import React,{useEffect,useState} from 'react';
import { StatusBar, StyleSheet,BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton,PanGestureHandler } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../databases';
import  api from '../../services/api';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'; 

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import {CarDTO} from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../databases/model/Car';
import { LoadAnimation } from '../../components/LoadAnimation';


import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
  MyCarsButtonWrapper
} from './styles';

export function Home(){
  const [cars,setCars] = useState<ModelCar[]>([]);
  const [loading,setLoading] = useState(true);
  
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);


  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value}
      ]
    }
  });



  
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_,ctx:any){
      ctx.startX = positionX.value;
      ctx.startY = positionY.value;
    },
    onActive(event,ctx){
      positionX.value = ctx.startX + event.translationX
      positionY.value = ctx.startY + event.translationY
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });
  

  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();
  const theme = useTheme();

  function handleCarDetails(car:CarDTO){
    navigation.navigate('CarDetails',{car});
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }

  async function offlineSynchronize(){
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } =  await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes,latestVersion } = data;
        return {changes,timestamp:latestVersion }

      },
      pushChanges: async ({ changes}) => {
        const user = changes.users;
        await api.post(`/users/sync`,user);
      }
    });
  }

 

  useEffect(() => {
    let isMounted = true;

    async function fetchCars(){
      try {
        const carCollection = database.get<ModelCar>('cars');

        const cars = await carCollection.query().fetch();

        if( isMounted ){
          setCars(cars);
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        if( isMounted ){
          setLoading(false);
        }
      }
      
    }

    fetchCars();
    
    return () => {
      isMounted = false;
    }

  }, [])

  useEffect(() => {
    if(netInfo.isConnected === true){
      offlineSynchronize();
    } 
  }, [netInfo.isConnected])

  /*
  Impedir que o usu??rio retorne atrav??s do bot??o de backButton do celular 
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',() => {
      return true;
    })
  },[])
 */


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
              { !loading && 
                <TotalCars>
                  Total de {cars.length} carros
                </TotalCars>
              }
              
            </HeaderContent>
          </Header>

          {loading ? <LoadAnimation /> : 
              <CarList
                data={cars}
                keyExtractor={(item:ModelCar) => String(item.id)}
                renderItem={({ item }: { item: ModelCar }) => <Car data={item} onPress={() => handleCarDetails(item)}/> }
                
              />
          }
          <PanGestureHandler onGestureEvent={gestureHandler}>
             
                <Animated.View style={[
                    myCarsButtonStyle,styles.buttonView
                  ]}>
                    <ButtonAnimated 
                        onPress={handleOpenMyCars}
                        style={[styles.button,{backgroundColor:theme.colors.main}]}
                      >
                        <Ionicons 
                          name="ios-car-sport"
                          size={32}
                          color={theme.colors.shape}
                        />
                      </ButtonAnimated>
                    
                  </Animated.View>
          </PanGestureHandler>
      </Container>
   
  );
}

const styles = StyleSheet.create({
  button:{
    width:60,
    height:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonView:{
    width:'100%',
    height:60,              
    justifyContent:'center',
    alignItems:'flex-end',                 
    bottom:13,
    right:22
  }
})