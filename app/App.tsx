import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';  // Ruta correcta
import InventoryScreen from './Inventory';  // Ruta correcta
import { RootStackParamList } from '../.expo/types/types'; 

const Stack = createStackNavigator<RootStackParamList>(); // Usa los tipos de navegación

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
