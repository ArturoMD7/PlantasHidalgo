
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllLocationsForFilters, getAllClimatesForFilters, getAllSeasonsForFilters, getAllUsesForFilters } from '@/lib/plantService';
import type { FilterValues } from '@/lib/types';
import { Search, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchAndFilterProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters?: FilterValues;
}

const initialFormState: FilterValues = {
  searchTerm: '',
  location: 'all',
  climate: 'all',
  season: 'all',
  uses: 'all', // For main uses
  // tag: 'all', // Tag filter removed
};

export default function SearchAndFilter({ onFilterChange, initialFilters }: SearchAndFilterProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters || initialFormState);
  
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [climateOptions, setClimateOptions] = useState<string[]>([]);
  const [seasonOptions, setSeasonOptions] = useState<string[]>([]);
  const [useOptions, setUseOptions] = useState<string[]>([]); // For main uses

  const [optionsLoading, setOptionsLoading] = useState(true);

  const fetchFilterOptions = useCallback(async () => {
    setOptionsLoading(true);
    try {
      const [locs, clims, seasons, usesData] = await Promise.all([
        getAllLocationsForFilters(),
        getAllClimatesForFilters(),
        getAllSeasonsForFilters(),
        getAllUsesForFilters(), // Fetches main uses
      ]);
      setLocationOptions(locs);
      setClimateOptions(clims);
      setSeasonOptions(seasons);
      setUseOptions(usesData);
    } catch (error) {
      console.error("Failed to load filter options", error);
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

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

  if (optionsLoading) {
    return (
      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {[...Array(4)].map((_, i) => ( // Reduced skeleton count as one filter is removed
            <div key={i} className="space-y-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
           <div className="md:col-span-2 lg:col-span-1"> {/* Placeholder for button row */}
             <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-2 items-end h-full">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-card rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="lg:col-span-1">
          <label htmlFor="searchTerm" className="block text-sm font-medium mb-1">Buscar planta</label>
          <Input
            id="searchTerm"
            type="text"
            placeholder="Nombre, uso, descripción..."
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
              {locationOptions.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
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
              {climateOptions.map(clim => <SelectItem key={clim} value={clim}>{clim}</SelectItem>)}
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
              {seasonOptions.map(seas => <SelectItem key={seas} value={seas}>{seas}</SelectItem>)}
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
              {useOptions.map(use => <SelectItem key={use} value={use}>{use}</SelectItem>)}
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
