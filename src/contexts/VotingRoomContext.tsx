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
import { VotingRoom } from '@/utils/rooms';

interface VotingRoomContext {
  getVotingRoom: (roomId: string) => Promise<VotingRoom | null>;
  setVotingRoom: (roomId: string, value: VotingRoom) => Promise<void>;
  deleteVotingRoom: (roomId: string) => Promise<void>;
  getAllVotingRooms: (userId: string) => Promise<Record<string, VotingRoom>>;
  subscribeToRoomUpdates: (
    roomId: string,
    callback: (room: VotingRoom | null) => void,
  ) => void;
  unsubscribeFromRoomUpdates: (roomId: string) => void;
}

const VotingRoomContext = createContext<VotingRoomContext | undefined>(
  undefined,
);

export const DataVotingProvider = ({ children }: { children: ReactNode }) => {
  const getAllVotingRooms = async (userId: string) => {
    const dataRef = ref(database, 'rooms/voting');
    const roomsQuery = query(
      dataRef,
      orderByChild('createdBy'),
      equalTo(userId),
    );

    try {
      const snapshot = await get(roomsQuery);
      return snapshot.exists()
        ? (snapshot.val() as Record<string, VotingRoom>)
        : {};
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getVotingRoom = async (roomId: string): Promise<VotingRoom | null> => {
    const dataRef = ref(database, `rooms/voting/${roomId}`);
    try {
      const snapshot = await get(dataRef);
      return snapshot.exists() ? (snapshot.val() as VotingRoom) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const setVotingRoom = async (roomId: string, value: VotingRoom) => {
    const dataRef = ref(database, `rooms/voting/${roomId}`);
    try {
      await set(dataRef, value);
    } catch (error) {
      console.error('Error setting data:', error);
      throw error;
    }
  };

  const deleteVotingRoom = async (roomId: string) => {
    const dataRef = ref(database, `rooms/voting/${roomId}`);
    try {
      await set(dataRef, null);
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

  const subscribeToRoomUpdates = (
    roomId: string,
    callback: (room: VotingRoom | null) => void,
  ) => {
    const dataRef = ref(database, `rooms/voting/${roomId}`);
    onValue(dataRef, (snapshot) => {
      callback(snapshot.exists() ? (snapshot.val() as VotingRoom) : null);
    });
  };

  const unsubscribeFromRoomUpdates = (roomId: string) => {
    const dataRef = ref(database, `rooms/voting/${roomId}`);
    off(dataRef);
  };

  return (
    <VotingRoomContext.Provider
      value={{
        getVotingRoom,
        setVotingRoom,
        deleteVotingRoom,
        getAllVotingRooms,
        subscribeToRoomUpdates,
        unsubscribeFromRoomUpdates,
      }}
    >
      {children}
    </VotingRoomContext.Provider>
  );
};

export const useVotingRoomContext = () => {
  const context = useContext(VotingRoomContext);
  if (!context) {
    throw new Error(
      'useDatabaseContext must be used within a DatabaseProvider',
    );
  }
  return context;
};
