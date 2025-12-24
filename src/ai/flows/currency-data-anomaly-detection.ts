// CurrencyDataAnomalyDetection
'use server';
/**
 * @fileOverview Currency data anomaly detection AI agent.
 *
 * - currencyDataAnomalyDetection - A function that handles the currency data anomaly detection process.
 * - CurrencyDataAnomalyDetectionInput - The input type for the currencyDataAnomalyDetection function.
 * - CurrencyDataAnomalyDetectionOutput - The return type for the currencyDataAnomalyDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CurrencyDataAnomalyDetectionInputSchema = z.object({
  currencyPair: z.string().describe('The currency pair to monitor (e.g., USD/EUR).'),
  currentRate: z.number().describe('The current conversion rate for the currency pair.'),
  previousRate: z.number().describe('The previous conversion rate for the currency pair.'),
  threshold: z.number().describe('The threshold percentage change to trigger an alert.'),
});
export type CurrencyDataAnomalyDetectionInput = z.infer<typeof CurrencyDataAnomalyDetectionInputSchema>;

const CurrencyDataAnomalyDetectionOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether the currency rate change is anomalous.'),
  explanation: z.string().describe('Explanation of why the change is anomalous or not.'),
});
export type CurrencyDataAnomalyDetectionOutput = z.infer<typeof CurrencyDataAnomalyDetectionOutputSchema>;

export async function currencyDataAnomalyDetection(input: CurrencyDataAnomalyDetectionInput): Promise<CurrencyDataAnomalyDetectionOutput> {
  return currencyDataAnomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'currencyDataAnomalyDetectionPrompt',
  input: {schema: CurrencyDataAnomalyDetectionInputSchema},
  output: {schema: CurrencyDataAnomalyDetectionOutputSchema},
  prompt: `You are an expert financial analyst specializing in detecting anomalies in currency exchange rates.

You will receive the current and previous exchange rates for a currency pair, along with a threshold.
Your task is to determine if the change in the exchange rate is anomalous based on the given threshold.

Currency Pair: {{{currencyPair}}}
Current Rate: {{{currentRate}}}
Previous Rate: {{{previousRate}}}
Threshold: {{{threshold}}}%

Determine if the percentage change between the current and previous rates exceeds the threshold. If it does, set isAnomaly to true and provide an explanation. Otherwise, set isAnomaly to false and explain why it is not considered an anomaly.

Consider factors like typical daily fluctuations for the given currency pair and any recent major economic events that might justify the change.
`,
});

const currencyDataAnomalyDetectionFlow = ai.defineFlow(
  {
    name: 'currencyDataAnomalyDetectionFlow',
    inputSchema: CurrencyDataAnomalyDetectionInputSchema,
    outputSchema: CurrencyDataAnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
