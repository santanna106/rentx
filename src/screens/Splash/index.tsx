import React from 'react';
import { Button,StyleSheet,Dimensions } from 'react-native';

import Animated,{ 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

import {
  Container
} from './styles';

const WIDTH = Dimensions.get('window').width;

export function Splash(){
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle (() => {
    return {  transform :[
          {
            translateX: withTiming(animation.value,{
              duration:3000,
              easing:Easing.bounce
            })
          }
      ]
    }
  })

  function handleAnimationPosition(){
    animation.value=Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
        <Animated.View style={[styels.box,animatedStyles]} />

       
        <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styels = StyleSheet.create({
    box:{
        width: 100,
        height:100,
        backgroundColor:'red'
    }
})