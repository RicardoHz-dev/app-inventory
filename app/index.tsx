import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // 👈 Para navegación

export default function IndexScreen() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (usuario === 'geraldin' && contrasena === 'root') {
      router.push('/Menu'); // ✅ Ruta automática basada en archivo
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        secureTextEntry
        onChangeText={setContrasena}
        style={styles.input}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f1f1f1' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
