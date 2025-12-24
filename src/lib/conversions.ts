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
    { id: 'AED', name: 'UAE Dirham', symbol: 'AED' },
    { id: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { id: 'RUB', name: 'Russian Ruble', symbol: '₽' },
    { id: 'ZAR', name: 'South African Rand', symbol: 'R' },
];
  
// NOTE: These are mock conversion rates for demonstration purposes and do not reflect real-time data.
export const currencyRates: { [key: string]: { rate: number; previousRate: number } } = {
    USD: { rate: 1, previousRate: 1 },
    EUR: { rate: 0.93, previousRate: 0.92 },
    JPY: { rate: 157.25, previousRate: 157.18 },
    GBP: { rate: 0.79, previousRate: 0.79 },
    CAD: { rate: 1.37, previousRate: 1.37 }, 
    PKR: { rate: 278.4, previousRate: 278.5 },
    INR: { rate: 83.5, previousRate: 83.4 },
    AUD: { rate: 1.5, previousRate: 1.51 },
    CHF: { rate: 0.9, previousRate: 0.91 },
    CNY: { rate: 7.25, previousRate: 7.24 },
    AED: { rate: 3.67, previousRate: 3.67 },
    BRL: { rate: 5.35, previousRate: 5.30 },
    RUB: { rate: 89.10, previousRate: 88.95 },
    ZAR: { rate: 18.88, previousRate: 18.95 },
};

export const convertCurrency = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInUSD = value / currencyRates[from].rate;
  return valueInUSD * currencyRates[to].rate;
};

// Volume
export const volumeUnits: Unit[] = [
  { id: 'l', name: 'Liters', symbol: 'L' },
  { id: 'ml', name: 'Milliliters', symbol: 'mL' },
  { id: 'gal', name: 'Gallons (US)', symbol: 'gal' },
  { id: 'pt', name: 'Pints (US)', symbol: 'pt' },
  { id: 'qt', name: 'Quarts (US)', symbol: 'qt' },
  { id: 'fl-oz', name: 'Fluid Ounces (US)', symbol: 'fl oz' },
];

const volumeFactors: { [key: string]: number } = { // to Liters
  'l': 1,
  'ml': 0.001,
  'gal': 3.78541,
  'pt': 0.473176,
  'qt': 0.946353,
  'fl-oz': 0.0295735,
};

export const convertVolume = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  const valueInLiters = value * volumeFactors[from];
  return valueInLiters / volumeFactors[to];
};
