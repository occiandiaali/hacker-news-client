import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FourZeroFour() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ooops!</Text>
      <Text style={styles.sub}>Looks like there's nothing here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  heading: {
    fontSize: 55,
    color: 'gray',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  sub: {
    color: '#ff0000',
    fontSize: 27,
  },
});
