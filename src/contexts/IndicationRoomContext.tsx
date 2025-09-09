'use client';

import { createContext, useContext, ReactNode } from 'react';
import {
  ref,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
} from 'firebase/database';
import { database } from '../services/firebase';
import { IndicationRoom } from '@/utils/indications';

interface IndicationRoomContext {
  getIndicationRoom: (roomId: string) => Promise<IndicationRoom | null>;
  setIndicationRoom: (roomId: string, value: IndicationRoom) => Promise<void>;
  deleteIndicationRoom: (roomId: string) => Promise<void>;
  getAllIndicationRooms: (
    userId: string,
  ) => Promise<Record<string, IndicationRoom>>;
  subscribeToIndicationRoomUpdates: (
    roomId: string,
    callback: (room: IndicationRoom | null) => void,
  ) => void;
  unsubscribeFromIndicationRoomUpdates: (roomId: string) => void;
}

const IndicationRoomContext = createContext<IndicationRoomContext | undefined>(
  undefined,
);

export const DataIndicationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const getAllIndicationRooms = async (userId: string) => {
    const dataRef = ref(database, 'rooms/indication');
    const roomsQuery = query(
      dataRef,
      orderByChild('createdBy'),
      equalTo(userId),
    );

    try {
      const snapshot = await get(roomsQuery);
      return snapshot.exists()
        ? (snapshot.val() as Record<string, IndicationRoom>)
        : {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getIndicationRoom = async (
    roomId: string,
  ): Promise<IndicationRoom | null> => {
    const dataRef = ref(database, `rooms/indication/${roomId}`);
    try {
      const snapshot = await get(dataRef);
      return snapshot.exists() ? (snapshot.val() as IndicationRoom) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setIndicationRoom = async (roomId: string, value: IndicationRoom) => {
    const dataRef = ref(database, `rooms/indication/${roomId}`);
    try {
      await set(dataRef, value);
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  };

  const deleteIndicationRoom = async (roomId: string) => {
    const dataRef = ref(database, `rooms/indication/${roomId}`);
    try {
      await set(dataRef, null);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  const subscribeToIndicationRoomUpdates = (
    roomId: string,
    callback: (room: IndicationRoom | null) => void,
  ) => {
    const dataRef = ref(database, `rooms/indication/${roomId}`);
    onValue(dataRef, (snapshot) => {
      callback(snapshot.exists() ? (snapshot.val() as IndicationRoom) : null);
    });
  };

  const unsubscribeFromIndicationRoomUpdates = (roomId: string) => {
    const dataRef = ref(database, `rooms/indication/${roomId}`);
    off(dataRef);
  };

  return (
    <IndicationRoomContext.Provider
      value={{
        getIndicationRoom,
        setIndicationRoom,
        deleteIndicationRoom,
        getAllIndicationRooms,
        subscribeToIndicationRoomUpdates,
        unsubscribeFromIndicationRoomUpdates,
      }}
    >
      {children}
    </IndicationRoomContext.Provider>
  );
};

export const useIndicationRoomContext = () => {
  const context = useContext(IndicationRoomContext);
  if (!context) {
    throw new Error(
      'useDatabaseContext must be used within a DatabaseProvider',
    );
  }
  return context;
};
