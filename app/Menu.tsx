// app/Menu.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>

      <View style={styles.buttonContainer}>
        <Button title="Crear nuevo usuario" onPress={() => router.push('/CrearUsuario')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Ver todos los usuarios" onPress={() => router.push('/Usuarios')} />
      </View>


      <View style={styles.buttonContainer}>
        <Button title="Agregar nuevo cliente" onPress={() => router.push('/AgregarCliente')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Ver todos los clientes" onPress={() => router.push('/Clientes')} />
      </View>


      <View style={styles.buttonContainer}>
        <Button title="Generar factura" onPress={() => router.push('/Inventory')} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  buttonContainer: { marginBottom: 20 },
});
