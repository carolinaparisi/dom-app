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
import { Room } from '@/utils/rooms';

interface RoomContext {
  getRoom: (roomId: string) => Promise<Room | null>;
  setRoom: (roomId: string, value: Room) => Promise<void>;
  deleteRoom: (roomId: string) => Promise<void>;
  getAllRooms: (userId: string) => Promise<Record<string, Room>>;
  subscribeToRoomUpdates: (
    roomId: string,
    callback: (room: Room | null) => void,
  ) => void;
  unsubscribeFromRoomUpdates: (roomId: string) => void;
}

const RoomContext = createContext<RoomContext | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const getAllRooms = async (userId: string) => {
    const dataRef = ref(database, 'rooms');
    const roomsQuery = query(
      dataRef,
      orderByChild('createdBy'),
      equalTo(userId),
    );

    try {
      const snapshot = await get(roomsQuery);
      return snapshot.exists() ? (snapshot.val() as Record<string, Room>) : {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getRoom = async (roomId: string): Promise<Room | null> => {
    const dataRef = ref(database, `rooms/${roomId}`);
    try {
      const snapshot = await get(dataRef);
      return snapshot.exists() ? (snapshot.val() as Room) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setRoom = async (roomId: string, value: Room) => {
    const dataRef = ref(database, `rooms/${roomId}`);
    try {
      await set(dataRef, value);
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  };

  const deleteRoom = async (roomId: string) => {
    const dataRef = ref(database, `rooms/${roomId}`);
    try {
      await set(dataRef, null);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  const subscribeToRoomUpdates = (
    roomId: string,
    callback: (room: Room | null) => void,
  ) => {
    const dataRef = ref(database, `rooms/${roomId}`);
    onValue(dataRef, (snapshot) => {
      callback(snapshot.exists() ? (snapshot.val() as Room) : null);
    });
  };

  const unsubscribeFromRoomUpdates = (roomId: string) => {
    const dataRef = ref(database, `rooms/${roomId}`);
    off(dataRef);
  };

  return (
    <RoomContext.Provider
      value={{
        getRoom,
        setRoom,
        deleteRoom,
        getAllRooms,
        subscribeToRoomUpdates,
        unsubscribeFromRoomUpdates,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(
      'useDatabaseContext must be used within a DatabaseProvider',
    );
  }
  return context;
};
