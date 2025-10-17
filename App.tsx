import { View, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import GestureDemo from './src/dragBox'
import React from 'react'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <GestureDemo />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App
