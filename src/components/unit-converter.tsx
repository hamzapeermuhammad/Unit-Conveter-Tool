import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler, Scale, Landmark, Clock } from 'lucide-react';
import LengthConverter from './length-converter';
import WeightConverter from './weight-converter';
import CurrencyConverter from './currency-converter';
import TimeConverter from './time-converter';

export default function UnitConverter() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Unit Converter
        </h1>
        <p className="text-muted-foreground mt-2">
          A modern tool for seamless conversions.
        </p>
      </div>
      <Tabs defaultValue="length" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
          <TabsTrigger value="length" className="py-2 sm:py-1.5"><Ruler className="mr-2 h-4 w-4" /> Length</TabsTrigger>
          <TabsTrigger value="weight" className="py-2 sm:py-1.5"><Scale className="mr-2 h-4 w-4" /> Weight</TabsTrigger>
          <TabsTrigger value="currency" className="py-2 sm:py-1.5"><Landmark className="mr-2 h-4 w-4" /> Currency</TabsTrigger>
          <TabsTrigger value="time" className="py-2 sm:py-1.5"><Clock className="mr-2 h-4 w-4" /> Time</TabsTrigger>
        </TabsList>
        <TabsContent value="length">
          <LengthConverter />
        </TabsContent>
        <TabsContent value="weight">
          <WeightConverter />
        </TabsContent>
        <TabsContent value="currency">
          <CurrencyConverter />
        </TabsContent>
        <TabsContent value="time">
          <TimeConverter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
