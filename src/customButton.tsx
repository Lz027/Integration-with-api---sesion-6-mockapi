import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const CustomButton = ({ label } : {label: any}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: pressed ? '#4CAF50' : '#2196F3',
        padding: 15,
        borderRadius: 10,
        margin: 10,
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <CustomButton label="Tekan Saya" />
    </View>
  );
}
