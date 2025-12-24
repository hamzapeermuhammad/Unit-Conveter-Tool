import ConverterPanel from './converter-panel';
import { volumeUnits, convertVolume } from '@/lib/conversions';

export default function VolumeConverter() {
  return (
    <ConverterPanel
      units={volumeUnits}
      defaultFrom="l"
      defaultTo="gal"
      conversionFn={convertVolume}
    />
  );
}
