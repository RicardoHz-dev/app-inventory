import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function EditarCliente() {
  const { id, nombre, correo, telefono, direccion } = useLocalSearchParams();
  const [nombreCliente, setNombre] = useState(nombre as string);
  const [email, setCorreo] = useState(correo as string);
  const [telefonoCliente, setTelefono] = useState(telefono as string);
  const [direccionCliente, setDireccion] = useState(direccion as string);
  const router = useRouter();

  const handleActualizar = async () => {
    if (!nombreCliente) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.0.185:8000/api/clientes/actualizar/${id}`, {
        nombre: nombreCliente,
        correo: email,
        telefono: telefonoCliente,
        direccion: direccionCliente,
      });

      if (response.data.status === 'success') {
        Alert.alert('Éxito', 'Cliente actualizado correctamente');
        router.push('/Clientes');
      } else {
        Alert.alert('Error', response.data.message || 'No se pudo actualizar el cliente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>

      <TextInput placeholder="Nombre" value={nombreCliente} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Correo" value={email} onChangeText={setCorreo} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Teléfono" value={telefonoCliente} onChangeText={setTelefono} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Dirección" value={direccionCliente} onChangeText={setDireccion} style={styles.input} />

      <Button title="Actualizar Cliente" onPress={handleActualizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, marginBottom: 10 },
});
