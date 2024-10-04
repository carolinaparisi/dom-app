'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '../services/firebase';
import { Room } from '@/utils/rooms';

interface DataContext {
  getData: (path: string) => Promise<Room | null>;
  setData: (path: string, value: Room) => Promise<void>;
}

const DataContext = createContext<DataContext | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // TODO 2: Implement the getRoom and setRoom functions
  const getData = async (path: string): Promise<Room | null> => {
    const dataRef = ref(database, path);
    try {
      const snapshot = await get(dataRef);
      return snapshot.exists() ? (snapshot.val() as Room) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setData = async (path: string, value: Room) => {
    const dataRef = ref(database, path);
    try {
      console.log('Setting data at path:', path, 'with value:', value); // Log the data
      await set(dataRef, value);
      console.log('Data set successfully'); // Confirm success
    } catch (error) {
      console.error('Error setting data:', error);
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
