import {openDatabase} from 'react-native-sqlite-storage';

const dbName = 'UsersDB';
//const dbLocation = 'default';
const tableName = 'Users';

// open the db
const db = openDatabase(
  {
    name: dbName,
    // location: dbLocation, This parameter is neglected on android
  },
  () => {
    console.log(`${dbName} DB opened...`);
  },
  error => {
    console.log(error);
  },
);

// close the db
const closeDB = () => {
  if (db) {
    console.log('Closing DB...');
    db.close();
  } else {
    console.log('DB was already closed.');
  }
};

const createUsersTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY NOT NULL, email TEXT, password TEXT
        );`,
          [],
        );
      },
      (_, success) => {
        console.log(`${tableName} table: created`);
        resolve(success);
      },
      (_, error) => {
        console.log(`table creation error: ${error}`);
        reject(error);
      },
    );
  });
};

const insertUserToTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO ${tableName} (email, password) VALUES (?,?)`,
          [email, password],
        );
      },
      (t, error) => {
        console.log(`insert user error: ${error}`);
        resolve();
      },
      (t, success) => resolve(success),
    );
  });
};

const getUser = setUserFunc => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`,
        [email, password],
        (_, {rows: {_array}}) => {
          setUserFunc(_array);
        },
      );
    },
    (t, error) => {
      console.log('db error load users');
      console.log(error);
    },
    (_t, _success) => {
      console.log('loaded users');
    },
  );
};

const dropUsersTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE ${tableName}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log('error dropping users table');
          reject(error);
        },
      );
    });
  });
};

export const database = {
  db,
  tableName,
  createUsersTable,
  insertUserToTable,
  getUser,
  dropUsersTable,
  closeDB,
};
