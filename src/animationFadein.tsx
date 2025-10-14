import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AnimationDemo() {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value,
  }));

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Animated.View style={[{width:100,height:100,backgroundColor:'purple'}, animatedStyle]} />
    </View>
  );
}
