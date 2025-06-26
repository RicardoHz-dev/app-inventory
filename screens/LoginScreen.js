import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Comprobación de las credenciales
    if (email === 'correo@web.com' && password === 'root') {
      // Si las credenciales son correctas, navegar a la pantalla de inventario
      navigation.navigate('Inventory');
    } else {
      // Si las credenciales son incorrectas, mostrar un mensaje de alerta
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail} // Actualiza el estado de email al escribir
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry // Hace que el texto sea oculto
        value={password}
        onChangeText={setPassword} // Actualiza el estado de password al escribir
      />
      <Button title="Ingresar" onPress={handleLogin} /> {/* Acción de login */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
