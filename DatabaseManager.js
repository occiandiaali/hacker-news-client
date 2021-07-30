import SQLite from 'react-native-sqlite-storage';

export default () => {
  const db = SQLite.openDatabase(
    {
      name: 'UserDB',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);',
      );
    });
  };

  const deleteTable = () => {
    db.transaction(txn => {
      txn.executeSql('DROP TABLE IF EXISTS Users', []);
    });
  };

  const insertUser = async (email, password, confirm) => {
    if (!email || !password) {
      Alert.alert('Attention!', 'Complete ALL fields!');
      return;
    }
    if (confirm !== password) {
      Alert.alert('Attention!', 'Passwords do not match!');
      return;
    }

    try {
      await db.transaction(txn => {
        txn.executeSql('INSERT INTO Users (email, password) VALUES (?, ?)', [
          email,
          password,
        ]);
      });
    } catch (error) {}
  };

  const deleteUser = () => {};

  const selectAll = () => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM Users ', [], (txn, res) => {
        for (let i = 0; i < res.rows.length; i++) {
          console.log('User: ', res.rows.item(i));
        }
      });
    });
  };
};
