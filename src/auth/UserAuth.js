import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';

import {TextInput, Button, Divider, Modal, Portal} from 'react-native-paper';
import {database} from '../db/database';

export default function UserAuth({navigation}) {
  // I use separate states for reg and login
  // because of a 'quirk' encountered with RN Paper Modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState(password);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {
    width: '100%',
    height: '70%',
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 25,
  };

  // temporary flag for user auth
  let flag = 0;

  const db = database.db;

  //  - to Login
  const login = async () => {
    if (!userEmail || !userPassword) {
      Alert.alert('Empty Field(s)', 'All fields are required.');
      return;
    }
    try {
      await db.transaction(txn => {
        txn.executeSql(
          `select * from ${database.tableName} where email = ? and password = ?`,
          [email, password],
          (txn, results) => {
            const len = results.rows.length;
            if (len === 0) {
              Alert.alert('Attention', 'This account does not exist!');
            } else if (len > 0) {
              const row = results.rows.item(0);
              if (userPassword === row.password) {
                flag = 1;
                setUserEmail(userEmail);
                navigation.navigate('Home', {umail: userEmail});
              } else {
                Alert.alert('Alert!', 'Authentication Failed!');
              }
            }
          },
        );
      }); // mark
    } catch (error) {
      console.log(`Login error: ${error}`);
    }
  };

  //  - to Register
  const register = async () => {
    if (!email || !password) {
      Alert.alert('Attention!', 'Complete ALL fields!');
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert('Attention!', 'Ensure that passwords match...');
      return;
    }
    try {
      await db.transaction(txn => {
        txn.executeSql(
          // check if account already exists
          `select * from ${database.tableName} where email = ? and password = ?`,
          [email, password],
          (txn, results) => {
            console.log('Check account query completed.');
            const len = results.rows.length;
            if (len > 0) {
              Alert.alert('Hey!', `${email} already exists! :( `);
              return;
            } else if (len === 0) {
              txn.executeSql(
                // Add a new account to sql
                `insert into ${database.tableName} (email, password) values (?, ?)`,
                [email, password],
                (txn, results) => {
                  console.log(`Affected rows: ${results.rowsAffected}`);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success!',
                      `You have registered as ${email}. Tap on the profile icon at the bottom to see more...`,
                    );
                  } else {
                    Alert.alert('Oops!', 'Could not register you! :( ');
                    return;
                  }
                },
              );
            }
          },
        ); // mark
        // txn.executeSql(
        //   // Add a new account to sql
        //   `INSERT INTO ${database.tableName} (email, password) VALUES (?, ?)`,
        //   [email, password],
        //   (txn, results) => {
        //     console.log(`Affected rows: ${results.rowsAffected}`);
        //     if (results.rowsAffected > 0) {
        //       Alert.alert(
        //         'Success!',
        //         `You just registered as ${email}. Tap on the profile icon at the bottom to access more functionality...`,
        //       );
        //     } else {
        //       Alert.alert('Oops!', 'Could not register you! :( ');
        //       return;
        //     }
        //   },
        // );
      }); // mark 2

      flag = 1; // set to indicate user has validation
      setEmail(email);
      setPassword(password);
      navigation.navigate('Home', {umail: email, isFlag: flag});
    } catch (error) {
      console.error(`DB Insertion: ${error} `);
    }
  }; // user reg function

  // ============================================

  return (
    <KeyboardAvoidingView behavior="padding">
      <Image
        style={styles.image}
        source={require('../res/images/ehn_logo.png')}
        accessibilityLabel="Easy Hacker News"
      />
      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={containerStyle}
          onDismiss={hideModal}>
          <TextInput
            label="Email"
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry={true}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
          />
          <Button
            style={{
              width: '90%',
              height: 40,
              borderRadius: 25,
              margin: 17,
            }}
            mode="contained"
            onPress={register}>
            Sign Up
          </Button>
        </Modal>
      </Portal>

      <TextInput
        style={{marginTop: 35}}
        label="Email"
        keyboardType="email-address"
        onChangeText={userEmail => setUserEmail(userEmail)}
      />
      <TextInput
        label="Password"
        secureTextEntry={true}
        onChangeText={userPassword => setUserPassword(userPassword)}
      />
      <Button
        style={{
          width: '90%',
          height: 40,
          borderRadius: 25,
          margin: 17,
        }}
        mode="contained"
        onPress={login}>
        Sign In
      </Button>
      <Divider />
      <TouchableOpacity onPress={showModal} style={styles.signup_container}>
        <Text style={styles.signup_label}>No Account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
  },
  signup_container: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup_label: {
    fontSize: 23,
    color: 'gray',
  },
});
