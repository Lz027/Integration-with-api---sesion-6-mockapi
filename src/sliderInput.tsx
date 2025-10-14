import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default function InputDemo() {
  const [size, setSize] = useState(100);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Ukuran: {size}</Text>
      <View style={{ width: size, height: size, backgroundColor: 'orange', margin: 20 }} />
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={50}
        maximumValue={200}
        step={1}
        value={size}
        onValueChange={(val) => setSize(val)}
      />
    </View>
  );
}
