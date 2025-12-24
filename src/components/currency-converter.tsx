'use client';

import { currencyUnits, convertCurrency } from '@/lib/conversions';
import ConverterPanel from './converter-panel';

export default function CurrencyConverter() {

  return (
    <ConverterPanel
      units={currencyUnits}
      defaultFrom="USD"
      defaultTo="EUR"
      conversionFn={convertCurrency}
    >
        <div className="text-sm text-muted-foreground">
            Note: Currency rates are for demonstration purposes and are not updated in real-time.
        </div>
    </ConverterPanel>
  );
}
