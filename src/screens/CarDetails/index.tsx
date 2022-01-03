import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import { useNavigation,useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon';
 

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer
} from './styles';
import { CarList } from '../Home/styles';



interface Params {
  car:CarDTO;
}
 
export function CarDetails(){
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {car} = route.params as Params;
  const theme = useTheme();

  const scrollY = useSharedValue(0);

  const scrolHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0,200],
        [200,80],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0,150],
        [1,0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleScheduling(){
    navigation.navigate('Scheduling',{car});
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    
      <Container>
        <StatusBar 
          barStyle='dark-content'
          translucent
          backgroundColor="transparent"
        />
        <Animated.View
          style={[headerStyleAnimation,
                  styles.header,
                {backgroundColor: theme.colors.background_secundary}]}
        >
          <Header>     
            <GestureHandlerRootView>
              <BackButton onPress={handleBack} />
            </GestureHandlerRootView>    
          </Header>
       

          <Animated.View style={sliderCarsStyleAnimation}>
            <CarImages>
              <ImageSlider imagesUrl={car.photos} />
            </CarImages>
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView 
          contentContainerStyle={{
            paddingHorizontal:24,
            paddingTop:getStatusBarHeight() + 160
          }}
         showsVerticalScrollIndicator={false}
         onScroll={scrolHandler}
         scrollEventThrottle={16}
        >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>
            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>`R$ ${car.rent.price}`</Price>
            </Rent>
          </Details>
          <Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcon(accessory.type)}/>
              ))
            }
          </Accessories>
          

          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
          <About>
            {car.about}
          </About>
        </Animated.ScrollView>

        <Footer>
          <GestureHandlerRootView>
            <Button title="Escolher período do aluguel" onPress={handleScheduling} /> 
          </GestureHandlerRootView>
          
        </Footer>
      </Container>

    
  );
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    overflow: 'hidden',
    zIndex:1,
  },


});