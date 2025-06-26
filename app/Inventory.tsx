import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Tipo para los ítems del detalle
type ItemDetalle = {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
};

export default function InventoryScreen() {
  const [cliente, setCliente] = useState('');
  const [fecha, setFecha] = useState<Date | undefined>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [detalle, setDetalle] = useState<ItemDetalle[]>([]);

  const onChangeFecha = (_event: any, selectedDate?: Date) => {
    setShowPicker(false); // cerrar el selector siempre
    if (selectedDate) setFecha(selectedDate);
  };

  const agregarProducto = () => {
    const cantidadNum = parseInt(cantidad);
    const precioNum = parseFloat(precio);

    if (!producto || isNaN(cantidadNum) || isNaN(precioNum)) {
      alert('Completa correctamente producto, cantidad y precio');
      return;
    }

    const nuevo: ItemDetalle = {
      id: detalle.length + 1,
      nombre: producto,
      cantidad: cantidadNum,
      precio: precioNum,
      total: cantidadNum * precioNum,
    };

    setDetalle([...detalle, nuevo]);
    setProducto('');
    setCantidad('');
    setPrecio('');
    Keyboard.dismiss();
  };

  const calcularTotal = () =>
    detalle.reduce((total, item) => total + item.total, 0);

  const generarFactura = () => {
    if (!cliente || !fecha || detalle.length === 0) {
      alert('Completa todos los campos y agrega al menos un producto');
      return;
    }

    const fechaFormateada = fecha.toISOString().split('T')[0];
    alert(`Factura generada para ${cliente} el ${fechaFormateada} con total S/ ${calcularTotal().toFixed(2)}`);
    setCliente('');
    setFecha(new Date());
    setDetalle([]);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generar Factura</Text>

      <TextInput
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
      />

      <Pressable onPress={() => setShowPicker(true)}>
        <TextInput
          placeholder="Selecciona una fecha"
          value={fecha ? fecha.toISOString().split('T')[0] : ''}
          editable={false}
          style={styles.input}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={fecha || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeFecha}
        />
      )}

      <Text style={styles.subtitle}>Agregar producto</Text>

      <TextInput
        placeholder="Producto"
        value={producto}
        onChangeText={setProducto}
        style={styles.input}
      />
      <TextInput
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Agregar producto" onPress={agregarProducto} />

      <Text style={styles.subtitle}>Detalle:</Text>

      {/* Mostrar fecha si está definida */}
      {fecha && (
        <Text style={styles.fechaDetalle}>
          Fecha de factura: {fecha.toISOString().split('T')[0]}
        </Text>
      )}

      <FlatList
        data={detalle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.cantidad} x {item.nombre}</Text>
            <Text>S/ {item.total.toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: S/ {calcularTotal().toFixed(2)}</Text>
      <Button title="Generar Factura" onPress={generarFactura} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  fechaDetalle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'left',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  total: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
