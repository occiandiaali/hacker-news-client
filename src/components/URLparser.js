import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {URL} from 'react-native-url-polyfill';

export default function URLparser({url}) {
  const obj = new URL(url);
  return <Text style={styles.url}>({obj.hostname})</Text>;
}

const styles = StyleSheet.create({
  url: {
    color: 'gray',
  },
});
