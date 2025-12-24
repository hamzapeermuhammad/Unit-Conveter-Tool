'use client';

import { useState, useTransition } from 'react';
import { currencyUnits, convertCurrency, currencyRates } from '@/lib/conversions';
import ConverterPanel from './converter-panel';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, ShieldCheck, Landmark } from 'lucide-react';
import { currencyDataAnomalyDetection } from '@/ai/flows/currency-data-anomaly-detection';
import type { CurrencyDataAnomalyDetectionOutput } from '@/ai/flows/currency-data-anomaly-detection';

type AnomalyResult = CurrencyDataAnomalyDetectionOutput & { currencyPair: string };

export default function CurrencyConverter() {
  const [isPending, startTransition] = useTransition();
  const [anomalyResults, setAnomalyResults] = useState<AnomalyResult[]>([]);

  const handleCheckAnomalies = () => {
    startTransition(async () => {
      setAnomalyResults([]); 
      const threshold = 5; // 5% threshold

      const promises = Object.entries(currencyRates)
        .filter(([key]) => key !== 'USD')
        .map(([currency, rates]) => {
          const pair = `${currency}/USD`;
          // The AI expects the rate of the pair, e.g., how many USD for 1 of the currency.
          // Our mock rates are `1 USD = X other currency`, so we need to inverse.
          const currentRate = 1 / rates.rate;
          const previousRate = 1 / rates.previousRate;
          
          return currencyDataAnomalyDetection({
            currencyPair: pair,
            currentRate: currentRate,
            previousRate: previousRate,
            threshold: threshold,
          }).then(result => ({ ...result, currencyPair: pair }));
        });

      const results = await Promise.all(promises);
      setAnomalyResults(results);
    });
  };

  return (
    <ConverterPanel
      units={currencyUnits}
      defaultFrom="USD"
      defaultTo="EUR"
      conversionFn={convertCurrency}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border bg-card text-card-foreground p-4 gap-4">
          <div className='space-y-1'>
            <h3 className="font-semibold flex items-center"><Landmark className="w-4 h-4 mr-2 text-primary" />AI Anomaly Detection</h3>
            <p className="text-sm text-muted-foreground">Check for unusual currency rate fluctuations against the USD.</p>
          </div>
          <Button onClick={handleCheckAnomalies} disabled={isPending} className="w-full sm:w-auto flex-shrink-0">
            {isPending ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...</>
            ) : (
              'Check for Anomalies'
            )}
          </Button>
        </div>

        {isPending && (
          <div className="flex items-center justify-center p-8 text-muted-foreground rounded-lg border border-dashed">
             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Analyzing currency data...</span>
          </div>
        )}
        
        {anomalyResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm px-1">Analysis Complete:</h4>
            {anomalyResults.map((result, index) => (
              result.isAnomaly ? (
                <Alert key={index} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Anomaly Detected: {result.currencyPair}</AlertTitle>
                  <AlertDescription>{result.explanation}</AlertDescription>
                </Alert>
              ) : (
                <Alert key={index}>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>No Anomaly: {result.currencyPair}</AlertTitle>
                  <AlertDescription>{result.explanation}</AlertDescription>
                </Alert>
              )
            ))}
          </div>
        )}
      </div>
    </ConverterPanel>
  );
}
