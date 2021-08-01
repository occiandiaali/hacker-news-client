import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

import {List, Switch, Divider, Button, Modal, Portal} from 'react-native-paper';

import {database} from '../db/database';

export default function UserProfileScreen({route, navigation}) {
  let [inputUID, setUID] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // for delete confirmation pop up - start
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    width: '90%',
    margin: 21,
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 25,
  };

  const {user, toks} = route.params || '';

  let token = Number(toks);
  console.log(`Received token: ${token}`);

  const deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Users WHERE user_id=?',
        [inputUID],
        (tx, results) => {
          console.log('Results: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Successful',
              'User deleted',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setUID(inputUID);
                    navigation.navigate('Home');
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Error', 'Error');
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.warningText}>
            Are you sure you want to delete your account?
          </Text>
          <Text style={styles.warningText}>
            Tap outside the red box if you want to keep your account
          </Text>
          <Text style={styles.warningText}>Otherwise, tap DELETE</Text>
          <Button>DELETE</Button>
        </Modal>
      </Portal>
      <Text style={styles.label}>{user.replace(/['"]+/g, '')}</Text>

      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Contrasts"
          left={() => <List.Icon icon="brightness-6" />}
        />
        <List.Item title="Bookmarks" left={() => <List.Icon icon="folder" />} />
      </List.Section>

      <Divider
        style={{
          width: '95%',
          height: 1,
          alignSelf: 'center',
          backgroundColor: 'gray',
        }}
      />

      <View style={{padding: 13, flexDirection: 'row'}}>
        <Text style={{marginRight: 25, fontSize: 17}}>Dark Mode</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>

      <List.Section>
        <TouchableOpacity
          onPress={() => {
            database.closeDB();
            token = 0;
            navigation.navigate('Home', {isFlag: token});
            console.log(`Sent to home token: ${token}`);
          }}>
          <List.Item title="Log Out" left={() => <List.Icon icon="logout" />} />
        </TouchableOpacity>
      </List.Section>

      <Divider
        style={{
          width: '95%',
          height: 1,
          alignSelf: 'center',
          backgroundColor: 'gray',
        }}
      />

      <List.Section>
        <Button onPress={showModal}>Delete Account</Button>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 24,
    backgroundColor: '#000',
  },
  btnLabel: {
    color: '#fff',
    fontSize: 21,
  },
  container: {
    padding: 32,
  },
  label: {
    fontSize: 19,
    color: 'gray',
  },
  warningText: {
    fontSize: 21,
    color: '#FFF',
  },
});
