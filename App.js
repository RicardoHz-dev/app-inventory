import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from './app/tabs/index.tsx';  // Ruta correcta del archivo
import ExploreScreen from './app/tabs/explore.tsx';  // Crear otro archivo ExploreScreen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={IndexScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
