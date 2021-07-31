import React, {useEffect} from 'react';

import {database} from '../db/database';

const useDB = () => {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.createUsersTable();
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
};

export default useDB;
