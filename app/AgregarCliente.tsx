import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function AgregarCliente() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleAgregar = () => {
    if (!nombre || !correo || !telefono || !direccion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí puedes conectar al backend con axios.post()
    Alert.alert(
      'Cliente agregado',
      `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nDirección: ${direccion}`
    );

    // Limpiar campos
    setNombre('');
    setCorreo('');
    setTelefono('');
    setDireccion('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Cliente</Text>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />

      <Button title="Agregar cliente" onPress={handleAgregar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
