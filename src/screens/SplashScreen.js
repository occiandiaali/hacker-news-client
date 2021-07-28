import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';

export default function SplashScreen({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace('Home');
    }, 7000);
  }, []);

  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../res/images/ehn_logo.png')}
        style={{
          width: '90%',
          resizeMode: 'contain',
          margin: 30,
          transform: [{rotate: spin}],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f6bb',
  },
});
