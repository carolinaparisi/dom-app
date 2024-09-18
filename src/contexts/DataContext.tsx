'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '../services/firebase';

interface DataContext {
  getData: (path: string) => Promise<any>;
  setData: (path: string, value: any) => Promise<void>;
}

const DataContext = createContext<DataContext | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // TODO 2: Implement the getRoom and setRoom functions
  const getData = async (path: string) => {
    const dataRef = ref(database, path);
    try {
      const snapshot = await get(dataRef);
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      throw error;
    }
  };

  const setData = async (path: string, value: any) => {
    const dataRef = ref(database, path);
    try {
      await set(dataRef, value);
    } catch (error) {
      console.error('Erro ao definir dados:', error);
      throw error;
    }
  };

  return (
    <DataContext.Provider value={{ getData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      'useDatabaseContext must be used within a DatabaseProvider',
    );
  }
  return context;
};
