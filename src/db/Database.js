import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const dbName = '';
const dbVersion = '';
const location = '';

const Database = () => {
  const initDB = () => {
    let db;
    return new Promise(resolve => {
      SQLite.openDatabase(dbName, dbVersion, location).then(DB => {
        db = DB;
        db.executeSql('')
          .then(() => {
            console.log('Executing...');
          })
          .then(
            db
              .transaction(txn => {
                txn.executeSql('CREATE TABLE');
              })
              .then(() => console.log('Table created...'))
              .catch(error => console.log(error)),
          );
        resolve(db);
      });
    });
  };

  const closeDB = db => {
    if (db) {
      console.log('Closing DB...');
      db.close()
        .then(() => {
          console.log('DB closed');
        })
        .catch(error => console.log('DB closed'));
    }
  };
};

export default Database;
