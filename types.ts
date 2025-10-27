export type AnalysisType = 'on-page' | 'off-page' | 'content' | 'performance';

export interface Metric {
  name: string;
  value: string | number;
  unit?: string; // e.g., 's', 'ms', 'KB'
  explanation: string;
  recommendation: string;
  score: number; // A score from 0-100
  historicalData?: number[]; // Array of past values for trend visualization
}

export type AnalysisResult = {
  metrics: Metric[];
};