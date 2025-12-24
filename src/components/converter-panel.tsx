'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SwitchHorizontal } from 'lucide-react';
import type { Unit } from '@/lib/conversions';

interface ConverterPanelProps {
  units: Unit[];
  defaultFrom: string;
  defaultTo: string;
  conversionFn: (value: number, from: string, to: string) => number;
  children?: React.ReactNode;
}

export default function ConverterPanel({ units, defaultFrom, defaultTo, conversionFn, children }: ConverterPanelProps) {
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [pop, setPop] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const swapUnits = () => {
    const currentOutput = outputValue;
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(currentOutput);
  };
  
  const fromUnitDetails = useMemo(() => units.find(u => u.id === fromUnit), [units, fromUnit]);
  const toUnitDetails = useMemo(() => units.find(u => u.id === toUnit), [units, toUnit]);

  useEffect(() => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const result = conversionFn(numericValue, fromUnit, toUnit);
      const formattedResult = Number(result.toFixed(6)).toString();
      setOutputValue(formattedResult);
      
      setPop(true);
      const timer = setTimeout(() => setPop(false), 300);
      return () => clearTimeout(timer);

    } else {
      setOutputValue('');
    }
  }, [inputValue, fromUnit, toUnit, conversionFn]);
  
  return (
    <Card className="overflow-hidden">
      <style>
        {`
        .value-pop {
          animation: pop 0.3s ease-out;
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); color: hsl(var(--accent)); }
          100% { transform: scale(1); }
        }
        `}
      </style>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
          {/* From */}
          <div className="w-full sm:w-auto flex-1 space-y-2">
            <label htmlFor="from-value" className="text-sm font-medium text-muted-foreground">From</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{fromUnitDetails?.symbol}</span>
              <Input
                id="from-value"
                value={inputValue}
                onChange={handleInputChange}
                className="pl-8 text-lg font-semibold"
                type="text"
                inputMode="decimal"
              />
            </div>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="mt-7">
            <Button variant="ghost" size="icon" onClick={swapUnits} aria-label="Swap units">
              <SwitchHorizontal className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          {/* To */}
          <div className="w-full sm:w-auto flex-1 space-y-2">
            <label htmlFor="to-value" className="text-sm font-medium text-muted-foreground">To</label>
            <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-secondary/50 px-3 py-2 text-lg font-semibold">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{toUnitDetails?.symbol}</span>
              <span className={`pl-8 transition-colors ${pop ? 'value-pop' : ''}`}>{outputValue}</span>
            </div>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {children && <div className="mt-6 pt-6 border-t">{children}</div>}
      </CardContent>
    </Card>
  );
}
