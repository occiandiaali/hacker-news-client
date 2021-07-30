import {openDatabase} from 'react-native-sqlite-storage';

const dbName = 'UsersDB';
const dbLocation = 'default';
const tableName = 'Users';

// open the db
const db = openDatabase(
  {
    name: dbName,
    location: dbLocation,
  },
  () => {
    console.log(`${dbName} DB opened at ${dbLocation} location...`);
  },
  error => {
    console.log(error);
  },
);

export const getDBConnect = async () => {
  return db;
};

export const getDBName = () => dbName;

export const createTable = async () => {
  await db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        email TEXT, password TEXT);`,
    );
    console.log(`${tableName} Table created in ${dbName}.`);
  });
};

// export const deleteTable = async () => {
//   const deleteQuery = `DROP TABLE ${tableName}`;

//   await db.executeSql(deleteQuery);
// };
