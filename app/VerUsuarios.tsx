import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import axios from 'axios';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  password?: string; // Opcional, no se muestra pero se puede editar
}

export default function VerUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [correoEditado, setCorreoEditado] = useState('');
  const [passwordEditado, setPasswordEditado] = useState('');

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

      <View style={styles.acciones}>
        <Button title="Editar" onPress={() => abrirModalEdicion(item)} />
        <Button title="Eliminar" color="red" onPress={() => confirmarEliminar(item.id)} />
      </View>
    </View>
  );

  const abrirModalEdicion = (usuario: Usuario) => {
    setUsuarioActual(usuario);
    setNombreEditado(usuario.nombre);
    setCorreoEditado(usuario.correo);
    setPasswordEditado('');
    setModalVisible(true);
  };

  const confirmarEliminar = (id: number) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarUsuario(id),
        },
      ]
    );
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await axios.delete(`http://192.168.0.185:8000/api/usuarios/movil/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      Alert.alert('Eliminado', 'Usuario eliminado correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    }
  };

  const guardarCambios = async () => {
    if (!usuarioActual) return;

    try {
      await axios.put(`http://192.168.0.185:8000/api/usuarios/movil/${usuarioActual.id}`, {
        nombre: nombreEditado,
        correo: correoEditado,
        password: passwordEditado || undefined, // opcional
      });

      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === usuarioActual.id
            ? { ...u, nombre: nombreEditado, correo: correoEditado }
            : u
        )
      );

      setModalVisible(false);
      Alert.alert('Éxito', 'Usuario actualizado');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

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

      {/* Modal de edición */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombreEditado}
              onChangeText={setNombreEditado}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={correoEditado}
              onChangeText={setCorreoEditado}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña (opcional)"
              value={passwordEditado}
              onChangeText={setPasswordEditado}
              secureTextEntry
            />

            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={guardarCambios} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  usuario: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  nombre: { fontWeight: 'bold' },
  acciones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});