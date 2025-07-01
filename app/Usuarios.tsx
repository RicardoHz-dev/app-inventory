import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export default function VerUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://192.168.0.185:8000/api/usuarios/movil');
      if (response.data.status === 'success') {
        setUsuarios(response.data.usuarios);
      } else {
        Alert.alert('Error', response.data.message || 'No se pudieron obtener los usuarios');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    } finally {
      setCargando(false);
    }
  };

  const renderItem = ({ item }: { item: Usuario }) => (
    <View style={styles.usuario}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>{item.correo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  usuario: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  nombre: { fontWeight: 'bold' },
});
