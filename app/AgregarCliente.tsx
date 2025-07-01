import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AgregarCliente() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const router = useRouter();

  const handleGuardar = async () => {
    if (!nombre) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.185:8000/api/clientes/movil', {
        nombre,
        correo,
        telefono,
        direccion,
      });

      if (response.data.status === 'success') {
        Alert.alert('Éxito', 'Cliente agregado correctamente');
        setNombre('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
        router.push('/Menu');
      } else {
        Alert.alert('Error', response.data.message || 'No se pudo agregar el cliente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Menu')}>
          <Ionicons name="close" size={28} color="red" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Complete los campos</Text>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Dirección" value={direccion} onChangeText={setDireccion} style={styles.input} />

      <Button title="Guardar Cliente" onPress={handleGuardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, marginBottom: 10 },
});
