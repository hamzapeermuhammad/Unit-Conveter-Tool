'use client';

export type Unit = {
  id: string;
  name: string;
  symbol: string;
};

// Length
export const lengthUnits: Unit[] = [
  { id: 'm', name: 'Meters', symbol: 'm' },
  { id: 'km', name: 'Kilometers', symbol: 'km' },
  { id: 'cm', name: 'Centimeters', symbol: 'cm' },
  { id: 'mm', name: 'Millimeters', symbol: 'mm' },
  { id: 'ft', name: 'Feet', symbol: 'ft' },
  { id: 'in', name: 'Inches', symbol: 'in' },
  { id: 'yd', name: 'Yards', symbol: 'yd' },
  { id: 'mi', name: 'Miles', symbol: 'mi' },
];

const lengthFactors: { [key: string]: number } = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  ft: 0.3048,
  in: 0.0254,
  yd: 0.9144,
  mi: 1609.34,
};

export const convertLength = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInMeters = value * lengthFactors[from];
  return valueInMeters / lengthFactors[to];
};

// Weight
export const weightUnits: Unit[] = [
  { id: 'kg', name: 'Kilograms', symbol: 'kg' },
  { id: 'g', name: 'Grams', symbol: 'g' },
  { id: 'mg', name: 'Milligrams', symbol: 'mg' },
  { id: 'lb', name: 'Pounds', symbol: 'lb' },
  { id: 'oz', name: 'Ounces', symbol: 'oz' },
  { id: 't', name: 'Metric Tons', symbol: 't' },
];

const weightFactors: { [key: string]: number } = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  t: 1000,
};

export const convertWeight = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInKg = value * weightFactors[from];
  return valueInKg / weightFactors[to];
};

// Time
export const timeUnits: Unit[] = [
  { id: 's', name: 'Seconds', symbol: 's' },
  { id: 'min', name: 'Minutes', symbol: 'min' },
  { id: 'h', name: 'Hours', symbol: 'h' },
  { id: 'd', name: 'Days', symbol: 'd' },
  { id: 'ms', name: 'Milliseconds', symbol: 'ms' },
];

const timeFactors: { [key: string]: number } = {
  s: 1,
  min: 60,
  h: 3600,
  d: 86400,
  ms: 0.001,
};

export const convertTime = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInSeconds = value * timeFactors[from];
  return valueInSeconds / timeFactors[to];
};

// Currency
export const currencyUnits: Unit[] = [
  { id: 'USD', name: 'US Dollar', symbol: '$' },
  { id: 'EUR', name: 'Euro', symbol: '€' },
  { id: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { id: 'GBP', name: 'British Pound', symbol: '£' },
  { id: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { id: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { id: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { id: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { id: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { id: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

// NOTE: These are mock conversion rates for demonstration purposes and do not reflect real-time data.
export const currencyRates: { [key: string]: { rate: number; previousRate: number } } = {
  USD: { rate: 1, previousRate: 1 },
  EUR: { rate: 0.93, previousRate: 0.92 }, // 1 USD = 0.93 EUR
  JPY: { rate: 157.25, previousRate: 157.18 }, // 1 USD = 157.25 JPY
  GBP: { rate: 0.79, previousRate: 0.79 }, // 1 USD = 0.79 GBP
  CAD: { rate: 1.37, previousRate: 1.45 }, // 1 USD = 1.37 CAD (previously 1.45, an anomaly)
  PKR: { rate: 278.4, previousRate: 278.5 }, // 1 USD = 278.4 PKR
  INR: { rate: 83.5, previousRate: 83.4 },   // 1 USD = 83.5 INR
  AUD: { rate: 1.5, previousRate: 1.51 },    // 1 USD = 1.5 AUD
  CHF: { rate: 0.9, previousRate: 0.91 },    // 1 USD = 0.9 CHF
  CNY: { rate: 7.25, previousRate: 7.24 },   // 1 USD = 7.25 CNY
};

export const convertCurrency = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInUSD = value / currencyRates[from].rate;
  return valueInUSD * currencyRates[to].rate;
};
