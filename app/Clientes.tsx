import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Feather, Ionicons } from '@expo/vector-icons'; // Iconos
import { router } from 'expo-router';

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://192.168.0.185:8000/api/clientes/movil');
      if (response.data.status === 'success') {
        setClientes(response.data.clientes);
      } else {
        Alert.alert('Error', response.data.message || 'No se pudieron obtener los clientes');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setCargando(false);
    }
  };

  const handleEditar = (cliente: Cliente) => {
    router.push({
      pathname: '/EditarCliente',
      params: {
        id: cliente.id.toString(),
        nombre: cliente.nombre,
        correo: cliente.correo,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      },
    });
  };

  const handleEliminar = async (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await axios.get(`http://192.168.0.185:8000/api/clientes/eliminar/${id}`);
              if (response.data.status === 'success') {
                Alert.alert('Eliminado', 'Cliente eliminado correctamente');
                obtenerClientes();
              } else {
                Alert.alert('Error', response.data.message || 'No se pudo eliminar el cliente');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'No se pudo conectar al servidor');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>{item.correo}</Text>
        <Text>{item.telefono}</Text>
        <Text>{item.direccion}</Text>
      </View>
      <View style={styles.acciones}>
        <TouchableOpacity onPress={() => handleEditar(item)}>
          <Feather name="edit" size={24} color="blue" style={styles.icono} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEliminar(item.id)}>
          <Feather name="trash-2" size={24} color="red" style={styles.icono} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botón de cerrar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Menu')}>
          <Ionicons name="close" size={28} color="red" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Clientes Registrados</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: { flex: 1 },
  nombre: { fontWeight: 'bold', fontSize: 16 },
  acciones: { flexDirection: 'row' },
  icono: { marginLeft: 10 },
});
