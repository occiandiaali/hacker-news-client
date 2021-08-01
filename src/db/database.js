import {openDatabase} from 'react-native-sqlite-storage';

const dbName = 'UsersDB';
//const dbLocation = 'default';
const dbVersion = '1.0';
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
  db;
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `create table if not exists ${tableName} (
          id integer primary key not null, email text, password text
        );`,
          [],
        );
      },
      (_, error) => {
        console.log(`table creation error: ${error}`);
        reject(error);
      },
      (_, success) => {
        console.log(`${tableName} table: created`);
        resolve(success);
      },
    );
  });
};

const insertUserToTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `insert into ${tableName} (email, password) values (?,?)`,
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
        `select * from ${tableName} where email = ? and password = ?`,
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
        `drop table ${tableName}`,
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
  dbName,
  createUsersTable,
  insertUserToTable,
  getUser,
  dropUsersTable,
  closeDB,
};
