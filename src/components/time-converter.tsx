import ConverterPanel from './converter-panel';
import { timeUnits, convertTime } from '@/lib/conversions';

export default function TimeConverter() {
  return (
    <ConverterPanel
      units={timeUnits}
      defaultFrom="min"
      defaultTo="s"
      conversionFn={convertTime}
    />
  );
}
