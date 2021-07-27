import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Mybutton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    backgroundColor: '#FF1493',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
