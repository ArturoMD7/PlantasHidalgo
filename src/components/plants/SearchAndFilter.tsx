"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_CLIMATES, ALL_LOCATIONS, ALL_SEASONS, ALL_USES, ALL_TAGS } from '@/lib/constants';
import type { FilterValues } from '@/lib/types';
import { Search, XCircle } from 'lucide-react';

interface SearchAndFilterProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
}

const initialFormState: FilterValues = {
  searchTerm: '',
  location: 'all',
  climate: 'all',
  season: 'all',
  uses: 'all',
  tag: 'all',
};

export default function SearchAndFilter({ onFilterChange, initialFilters }: SearchAndFilterProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters || initialFormState);

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSelectChange = (name: keyof Omit<FilterValues, 'searchTerm'>) => (value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters(initialFormState);
    onFilterChange(initialFormState);
  };

  const hasActiveFilters = () => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'searchTerm') return value !== '';
      return value !== 'all';
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="lg:col-span-1">
          <label htmlFor="searchTerm" className="block text-sm font-medium mb-1">Buscar planta</label>
          <Input
            id="searchTerm"
            type="text"
            placeholder="Nombre, uso, etiqueta..."
            value={filters.searchTerm}
            onChange={handleInputChange}
            className="h-10"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">Ubicación</label>
          <Select value={filters.location} onValueChange={handleSelectChange('location')}>
            <SelectTrigger id="location" className="h-10">
              <SelectValue placeholder="Todas las ubicaciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ubicaciones</SelectItem>
              {ALL_LOCATIONS.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="climate" className="block text-sm font-medium mb-1">Clima</label>
          <Select value={filters.climate} onValueChange={handleSelectChange('climate')}>
            <SelectTrigger id="climate" className="h-10">
              <SelectValue placeholder="Todos los climas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los climas</SelectItem>
              {ALL_CLIMATES.map(clim => <SelectItem key={clim} value={clim}>{clim}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="season" className="block text-sm font-medium mb-1">Temporada</label>
          <Select value={filters.season} onValueChange={handleSelectChange('season')}>
            <SelectTrigger id="season" className="h-10">
              <SelectValue placeholder="Todas las temporadas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las temporadas</SelectItem>
              {ALL_SEASONS.map(seas => <SelectItem key={seas} value={seas}>{seas}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="uses" className="block text-sm font-medium mb-1">Uso Principal</label>
          <Select value={filters.uses} onValueChange={handleSelectChange('uses')}>
            <SelectTrigger id="uses" className="h-10">
              <SelectValue placeholder="Todos los usos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los usos</SelectItem>
              {ALL_USES.map(use => <SelectItem key={use} value={use}>{use}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 items-end h-full">
          <Button type="submit" className="w-full h-10">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          {hasActiveFilters() && (
             <Button type="button" variant="outline" onClick={handleReset} className="w-full h-10">
               <XCircle className="mr-2 h-4 w-4" />
               Limpiar
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
