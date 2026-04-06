export interface LandData {
  ndvi?: number;
  rainfall?: number;
  soil?: number;
  temperature?: number;
}

export type LandAnalysisStatus = "Healthy" | "Moderate" | "At Risk";
export type NDVIZone = "stressed" | "moderate" | "healthy" | "dense";

export interface ZoneDistribution {
  zone: string;
  percentage: number;
}

export interface LandAnalysis {
  score: number;
  status: LandAnalysisStatus;
  insights: string[];
  confidence: number;
}
