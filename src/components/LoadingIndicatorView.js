import React from 'react';

import {StyleSheet, ActivityIndicator, View} from 'react-native';

export const LoadingIndicatorView = () => (
  <View style={styles.ActivityIndicatorStyle}>
    <ActivityIndicator color="#ff0000" size="large" />
  </View>
);

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
