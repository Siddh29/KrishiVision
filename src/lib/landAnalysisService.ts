import { LandData, LandAnalysis, LandAnalysisStatus, ZoneDistribution } from "@/types/land";

/**
 * Service for analyzing land health data and generating insights.
 */

/**
 * Validates land data to ensure all parameters are within realistic ranges.
 */
export const validateLandData = (data: LandData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const checkRange = (val: number | undefined, min: number, max: number, name: string) => {
    if (val === undefined || val === null) {
      errors.push(`${name} data is missing.`);
    } else if (val < min || val > max) {
      errors.push(`${name} must be between ${min} and ${max}.`);
    }
  };

  checkRange(data.ndvi, 0, 1, "NDVI");
  checkRange(data.rainfall, 0, 5000, "Rainfall");
  checkRange(data.soil, 0, 100, "Soil quality/moisture");
  checkRange(data.temperature, -50, 60, "Temperature");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Calculates a land health score based on NDVI, rainfall, soil quality, and temperature.
 * Score is normalized to a 0-100 range using specific weights:
 * - NDVI: 40%
 * - Rainfall: 30%
 * - Soil: 20%
 * - Temperature: 10%
 */
export const calculateLandHealthScore = (data: LandData): number => {
  const { ndvi = 0, rainfall = 0, soil = 0, temperature = 0 } = data;

  // Normalizing NDVI: 0.0 to 1.0 -> 0 to 100
  const normalizedNdvi = Math.min(Math.max(ndvi, 0), 1) * 100;

  // Normalizing Rainfall: 0 to 1000mm -> 0 to 100 (cap at 1000 for calculation)
  const normalizedRainfall = Math.min((Math.max(rainfall, 0) / 1000) * 100, 100);

  // Normalizing Soil: 0 to 100 -> 0 to 100
  const normalizedSoil = Math.min(Math.max(soil, 0), 100);

  // Normalizing Temperature: 0 to 50°C -> 0 to 100 (cap at 50 for calculation)
  const normalizedTemperature = Math.min((Math.max(temperature, 0) / 50) * 100, 100);

  // Weighted calculation
  const score = 
    (normalizedNdvi * 0.4) + 
    (normalizedRainfall * 0.3) + 
    (normalizedSoil * 0.2) + 
    (normalizedTemperature * 0.1);

  return Math.round(score);
};

/**
 * Determines land status based on the health score.
 */
export const getLandStatus = (score: number): LandAnalysisStatus => {
  if (score >= 80) return "Healthy";
  if (score >= 50) return "Moderate";
  return "At Risk";
};

/**
 * Classifies NDVI value into vegetation zones.
 * - <0.2 → "stressed"
 * - 0.2–0.4 → "moderate"
 * - 0.4–0.6 → "healthy"
 * - >0.6 → "dense"
 */
export const classifyNDVI = (value: number | undefined): string => {
  if (value === undefined || value === null) return "unknown";
  if (value < 0.2) return "stressed";
  if (value < 0.4) return "moderate";
  if (value < 0.6) return "healthy";
  return "dense";
};

/**
 * Simulates NDVI zone distribution across the land parcel.
 * Ensures percentages sum to 100%.
 */
export const generateZoneData = (): ZoneDistribution[] => {
  // Generate three non-zero percentages that sum to 100
  const p1 = Math.floor(Math.random() * 30) + 5; // 5-35%
  const p2 = Math.floor(Math.random() * 40) + 20; // 20-60%
  const p3 = 100 - (p1 + p2);

  return [
    { zone: "stressed", percentage: p1 },
    { zone: "moderate", percentage: p2 },
    { zone: "healthy", percentage: p3 },
  ];
};

/**
 * Generates human-readable, dynamic insights based on land data.
 * Always returns an array of 4-5 insights.
 */
export const generateInsights = (data: LandData): string[] => {
  const insights: string[] = [];
  const { ndvi, rainfall, soil, temperature } = data;

  // 1. NDVI Insight
  const zone = classifyNDVI(ndvi);
  if (ndvi === undefined || ndvi === null) {
    insights.push("NDVI data is currently unavailable");
  } else {
    insights.push(`NDVI indicates ${zone} vegetation`);
  }

  // 2. Rainfall Insight
  if (rainfall === undefined || rainfall === null) {
    insights.push("Rainfall data is currently unavailable");
  } else if (rainfall < 200) {
    insights.push("Rainfall is below average");
  } else if (rainfall > 600) {
    insights.push("Rainfall is above average");
  } else {
    insights.push("Rainfall is within normal range");
  }

  // 3. Soil Insight
  if (soil === undefined || soil === null) {
    insights.push("Soil quality data is currently unavailable");
  } else if (soil < 40) {
    insights.push("Soil quality is low");
  } else if (soil > 75) {
    insights.push("Soil quality is excellent");
  } else {
    insights.push("Soil quality is moderate");
  }

  // 4. Temperature Insight
  if (temperature === undefined || temperature === null) {
    insights.push("Temperature data is currently unavailable");
  } else if (temperature < 15) {
    insights.push("Temperature is below optimal range");
  } else if (temperature > 32) {
    insights.push("Temperature is above optimal range");
  } else {
    insights.push("Temperature is within optimal range");
  }

  // 5. Actionable Summary (Optional 5th insight)
  const score = calculateLandHealthScore(data);
  if (score < 50) {
    insights.push("Immediate intervention recommended to improve land health.");
  } else if (score > 85) {
    insights.push("Land health is optimal; continue current management.");
  } else {
    insights.push("Regular monitoring is advised to maintain current health levels.");
  }

  return insights;
};

/**
 * Generates a confidence score for the analysis based on data quality/consistency.
 * - If all values present → 85–95%
 * - If some missing → 70–85%
 */
export const generateConfidenceScore = (data: LandData): number => {
  const fields: (keyof LandData)[] = ["ndvi", "rainfall", "soil", "temperature"];
  const presentFields = fields.filter(f => data[f] !== undefined && data[f] !== null);
  
  const allPresent = presentFields.length === fields.length;
  
  if (allPresent) {
    // 85 - 95 range
    return Number((85 + Math.random() * 10).toFixed(2));
  } else {
    // 70 - 85 range
    const base = presentFields.length === 0 ? 50 : 70; // Added a lower base for zero data
    const range = presentFields.length === 0 ? 20 : 15;
    return Number((base + Math.random() * range).toFixed(2));
  }
};

/**
 * Performs a complete land analysis.
 * Note: It is recommended to validate data using validateLandData before calling this.
 */
export const analyzeLand = (data: LandData): LandAnalysis => {
  const score = calculateLandHealthScore(data);
  const status = getLandStatus(score);
  const insights = generateInsights(data);
  const confidence = generateConfidenceScore(data);

  return {
    score,
    status,
    insights,
    confidence,
  };
};

/**
 * Validates and then performs analysis on land data.
 * Returns an error object if validation fails.
 */
export const validateAndAnalyzeLand = (data: LandData): { 
  success: boolean; 
  analysis?: LandAnalysis; 
  errors?: string[] 
} => {
  const validation = validateLandData(data);
  
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  const analysis = analyzeLand(data);
  return {
    success: true,
    analysis
  };
};
