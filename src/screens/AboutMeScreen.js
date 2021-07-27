import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function AboutMeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../res/images/occian.png')}
        accessibilityLabel="Occian Diaali"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
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
