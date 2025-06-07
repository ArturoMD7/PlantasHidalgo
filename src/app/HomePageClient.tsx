
'use client';

import { useState, useEffect, useCallback } from 'react';
import PlantGrid from '@/components/plants/PlantGrid';
import SearchAndFilter from '@/components/plants/SearchAndFilter';
import { getPlants } from '@/lib/plantService';
import type { Plant, FilterValues } from '@/lib/types';
import { useSearchParams, useRouter } from 'next/navigation';

export default function HomePageClient() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentFilters, setCurrentFilters] = useState<FilterValues>(() => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      searchTerm: params.get('searchTerm') || '',
      location: params.get('location') || 'all',
      climate: params.get('climate') || 'all',
      season: params.get('season') || 'all',
      uses: params.get('uses') || 'all',
    };
  });

  const fetchAndSetPlants = useCallback(async (filters: FilterValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPlants = await getPlants(filters);
      setPlants(fetchedPlants);
    } catch (err) {
      setError('Error al cargar las plantas. Intenta de nuevo más tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetPlants(currentFilters);
  }, [fetchAndSetPlants, currentFilters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setCurrentFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value as string);
      }
    });
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handlePlantDeleted = (deletedPlantId: string) => {
    setPlants(prevPlants => prevPlants.filter(plant => plant.id !== deletedPlantId));
  };

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">
          Explora la Flora de Hidalgo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre la riqueza de plantas medicinales y tradicionales de la región de Hidalgo, México.
          Busca por nombre, usos, ubicación y más.
        </p>
      </section>

      <SearchAndFilter onFilterChange={handleFilterChange} initialFilters={currentFilters} />
      
      <PlantGrid plants={plants} isLoading={isLoading} error={error} onPlantDeleted={handlePlantDeleted} />
    </div>
  );
}
