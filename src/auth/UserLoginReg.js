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

import {openDatabase} from 'react-native-sqlite-storage';

// open the db
const db = openDatabase(
  {
    name: 'UserDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function UserLoginReg({navigation}) {
  // I used separate variables for reg and login
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

  //create db users table
  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);',
      );
    });
  };

  useEffect(() => {
    createTable();
  }, []);

  // Authentication method - for Login
  const userLogin = async () => {
    if (!userEmail || !userPassword) {
      Alert.alert('Empty Field(s)', 'All fields are required.');
      return;
    }
    await db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM Users WHERE email = ? AND password = ?',
        [email, password],
        (txn, results) => {
          const len = results.rows.length;
          if (!len) {
            Alert.alert('Attention', 'This account does not exist!');
          }
          if (len > 0) {
            const row = results.rows.item(0);
            if (userPassword === row.password) {
              setUserEmail(userEmail);
              navigation.navigate('Home', {umail: userEmail});
            } else {
              Alert.alert('Alert!', 'Authentication Failed!');
            }
          }
        },
      );
    });
  };

  // check for already registered
  // const existingAccount = len => {
  //   txn.executeSql(
  //     'SELECT * FROM Users WHERE email= ? AND password = ?',
  //     [email, password],
  //     () => {
  //       if (len > 0) {
  //         Alert.alert('Hey!', 'Account already exists! :( ');
  //         return;
  //       }
  //     },
  //   );
  // };

  // Authentication method - for Register
  const userRegister = async () => {
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
          'INSERT INTO Users (email, password) VALUES (?, ?)',
          [email, password],
          (txn, results) => {
            // console.log(`Affected rows: ${results.rowsAffected}`);
            if (results.rowsAffected > 0) {
              Alert.alert('Success!', 'You are now registered!');
            } else {
              Alert.alert('Oops!', 'Error: Could not register you! :( ');
              return;
            }
          },
        );
      });

      setEmail(email);
      setPassword(password);
      navigation.navigate('Home', {umail: email});
    } catch (error) {
      console.log(`DB Insertion err: ${error} `);
    }
  };

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
          <TextInput label="Email" onChangeText={email => setEmail(email)} />
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
            onPress={userRegister}>
            Sign Up
          </Button>
        </Modal>
      </Portal>

      <TextInput
        style={{marginTop: 35}}
        label="Email"
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
        onPress={userLogin}>
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
