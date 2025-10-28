import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';

export type MovieStackParamList = {
  MovieList: undefined;
  MovieDetail: { id: string; title?: string };
};

const Stack = createNativeStackNavigator<MovieStackParamList>();

export default function MovieStack() {
  return (
    <Stack.Navigator initialRouteName="MovieList">
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{ title: 'Movies' }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({ title: route.params?.title || 'Detail' })}
      />
    </Stack.Navigator>
  );
}
