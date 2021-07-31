import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.hoodie}
        source={require('../res/images/hacker.png')}
      />
      <Text style={styles.heading}>Ooops!</Text>
      <Text style={styles.sub}>Sorry, I couldn't summon this story...</Text>
      <Text style={styles.sub}>
        Just tap the back button above to see more stories...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 90,
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
  hoodie: {
    width: 150,
    height: 150,
  },
  sub: {
    color: '#ff0000',
    fontSize: 25,
    padding: 5,
  },
});
