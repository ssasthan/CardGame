import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: '#0971F6',
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

// eslint-disable-next-line react/prop-types
export default function TextButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
