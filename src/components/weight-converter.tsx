import ConverterPanel from './converter-panel';
import { weightUnits, convertWeight } from '@/lib/conversions';

export default function WeightConverter() {
  return (
    <ConverterPanel
      units={weightUnits}
      defaultFrom="kg"
      defaultTo="lb"
      conversionFn={convertWeight}
    />
  );
}
