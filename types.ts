export interface ChartAttribute {
  name: string;
  value: number;
  fullMark: number;
}

export interface ConceptData {
  title: string;
  description: string;
  abstract: string; // A very short 3-word summary
  colors: string[]; // Hex codes
  attributes: ChartAttribute[];
  soundtrackMood: string;
}

export interface HistoryItem extends ConceptData {
  id: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}