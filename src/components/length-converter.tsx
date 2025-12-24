import ConverterPanel from './converter-panel';
import { lengthUnits, convertLength } from '@/lib/conversions';

export default function LengthConverter() {
  return (
    <ConverterPanel
      units={lengthUnits}
      defaultFrom="m"
      defaultTo="ft"
      conversionFn={convertLength}
    />
  );
}
