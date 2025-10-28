import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieStack from './src/screens/MovieStack';
import SongListScreen from './src/screens/SongListScreen';
import { Text } from 'react-native';

// Define the parameter list for the root Tab Navigator
export type RootTabParamList = {
  Movies: undefined;
  Songs: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Movies"
        screenOptions={{
          headerShown: false, // Hide header for the tab navigator, as it's handled by the nested stack
        }}
      >
        <Tab.Screen
          name="Movies"
          component={MovieStack}
          options={{
            tabBarLabel: 'Movies',
            // Simple icon placeholder for demonstration
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🎬</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Songs"
          component={SongListScreen}
          options={{
            title: 'Song List', // Title for the header on this screen
            tabBarLabel: 'Songs',
            // Simple icon placeholder for demonstration
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🎶</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
