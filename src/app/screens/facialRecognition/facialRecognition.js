// src/screens/attendance/faceScan/faceScanPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FacialRecognition() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Face Scan Attendance</Text>
      {/* TODO: Add facial recognition component here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
