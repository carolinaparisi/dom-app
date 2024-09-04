export interface VoterName {
  id: number;
  name: string;
  isReady: boolean;
}

export const initialNames = [
  { id: 1, name: 'Carol', isReady: true },
  { id: 2, name: 'Cássio', isReady: false },
  { id: 3, name: 'Dante', isReady: false },
  { id: 4, name: 'Aurora', isReady: false },
  { id: 5, name: 'Shuno', isReady: true },
  { id: 6, name: 'Petúnia', isReady: true },
  { id: 7, name: 'Caflor', isReady: false },
  { id: 8, name: 'PatoREM', isReady: false },
];
