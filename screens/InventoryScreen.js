import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function InventoryScreen() {
  const [facturas, setFacturas] = useState([
    { id: '1', fecha: '2025-06-01', monto: 100 },
    { id: '2', fecha: '2025-06-02', monto: 200 },
    { id: '3', fecha: '2025-06-03', monto: 300 },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={facturas}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID: {item.id}</Text>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Monto: S/{item.monto}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
