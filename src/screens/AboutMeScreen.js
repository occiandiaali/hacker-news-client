import React, {useRef, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View, Image} from 'react-native';

import {Portal, Modal} from 'react-native-paper';

export default function AboutMeScreen() {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const fadeMeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeMeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    //fadeMeOut();
    fadeMeIn();
    setTimeout(() => showModal(), 7000);
  }, []);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <Text style={styles.heading}>
            Occian Fumnanya Diaali is a Nigerian, born of a royal family from a
            tribe in Delta state. He enjoys reading, painting, or playing 2D
            video games when he's not busy improving his skills as a world-class
            software developer while solving real-world problems with software.
          </Text>
          <Text style={styles.sub}>
            He sometimes dreams of an equitable world.
          </Text>
        </Modal>
      </Portal>
      <Animated.Image
        source={require('../res/images/occian.png')}
        accessibilityLabel="Occian Diaali"
        style={{opacity}}
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
  containerStyle: {
    backgroundColor: 'white',
    height: 404,
    padding: 20,
    borderRadius: 23,
    margin: 11,
  },
  heading: {
    fontSize: 21,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 9,
  },
  sub: {
    fontSize: 19,
  },
});
