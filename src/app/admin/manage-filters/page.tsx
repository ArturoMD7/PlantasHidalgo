
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { addDynamicLocation, addDynamicClimate, addDynamicUse, getAllLocationsForFilters, getAllClimatesForFilters, getAllUsesForFilters } from '@/lib/plantService';
import { Skeleton } from '@/components/ui/skeleton';

type FilterCategory = 'location' | 'climate' | 'use';

export default function ManageFiltersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [newLocation, setNewLocation] = useState('');
  const [newClimate, setNewClimate] = useState('');
  const [newUse, setNewUse] = useState('');
  
  const [existingLocations, setExistingLocations] = useState<string[]>([]);
  const [existingClimates, setExistingClimates] = useState<string[]>([]);
  const [existingUses, setExistingUses] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.replace('/login?redirect=/admin/manage-filters');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setDataLoading(true);
        const [locations, climates, uses] = await Promise.all([
          getAllLocationsForFilters(),
          getAllClimatesForFilters(),
          getAllUsesForFilters()
        ]);
        setExistingLocations(locations);
        setExistingClimates(climates);
        setExistingUses(uses);
      } catch (error) {
        toast({ title: "Error", description: "No se pudieron cargar las opciones de filtro.", variant: "destructive" });
      } finally {
        setDataLoading(false);
      }
    };
    if (user && user.role === 'admin') {
      fetchFilterOptions();
    }
  }, [user, toast]);


  const handleAddItem = async (category: FilterCategory, value: string) => {
    if (!value.trim()) {
      toast({ title: "Error", description: "El valor no puede estar vacío.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      let alreadyExists = false;
      let updateFunc: (() => Promise<string[]>) | null = null;

      if (category === 'location') {
        if (existingLocations.find(loc => loc.toLowerCase() === value.trim().toLowerCase())) alreadyExists = true;
        if (!alreadyExists) await addDynamicLocation(value.trim());
        updateFunc = getAllLocationsForFilters;
      } else if (category === 'climate') {
        if (existingClimates.find(clim => clim.toLowerCase() === value.trim().toLowerCase())) alreadyExists = true;
        if (!alreadyExists) await addDynamicClimate(value.trim());
        updateFunc = getAllClimatesForFilters;
      } else if (category === 'use') {
        if (existingUses.find(u => u.toLowerCase() === value.trim().toLowerCase())) alreadyExists = true;
        if (!alreadyExists) await addDynamicUse(value.trim());
        updateFunc = getAllUsesForFilters;
      }

      if (alreadyExists) {
        toast({ title: "Información", description: `"${value.trim()}" ya existe en ${category === 'location' ? 'ubicaciones' : category === 'climate' ? 'climas' : 'usos'}.`, variant: "default" });
      } else {
        toast({ title: "Éxito", description: `"${value.trim()}" añadido a ${category === 'location' ? 'ubicaciones' : category === 'climate' ? 'climas' : 'usos'}.` });
        // Clear input
        if (category === 'location') setNewLocation('');
        else if (category === 'climate') setNewClimate('');
        else if (category === 'use') setNewUse('');
        
        // Refresh the list for that category
        if (updateFunc) {
            const updatedItems = await updateFunc();
            if (category === 'location') setExistingLocations(updatedItems);
            else if (category === 'climate') setExistingClimates(updatedItems);
            else if (category === 'use') setExistingUses(updatedItems);
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "No se pudo añadir el elemento.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <Skeleton className="h-10 w-1/2 mb-6" />
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Skeleton className="h-10 flex-grow" />
                <Skeleton className="h-10 w-24" />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-2">
                {[...Array(3)].map((_, j) => <Skeleton key={j} className="h-6 w-full" />)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <p className="text-center py-12">Redirigiendo...</p>;
  }
  
  const renderFilterSection = (
    title: string,
    description: string,
    value: string,
    setter: (val: string) => void,
    category: FilterCategory,
    existingItems: string[]
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder={`Nueva ${title.toLowerCase().slice(0, -1)}...`}
            value={value}
            onChange={(e) => setter(e.target.value)}
            disabled={isLoading}
            className="flex-grow"
          />
          <Button onClick={() => handleAddItem(category, value)} disabled={isLoading || !value.trim()}>
            {isLoading ? 'Añadiendo...' : 'Añadir'}
          </Button>
        </div>
        <h4 className="text-sm font-medium mb-2">Existentes:</h4>
        {existingItems.length > 0 ? (
          <ul className="list-disc list-inside pl-2 text-sm max-h-40 overflow-y-auto bg-muted/50 p-2 rounded-md">
            {existingItems.map(item => <li key={item}>{item}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No hay {title.toLowerCase()} añadidas aún.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-headline text-primary mb-8">Gestionar Opciones de Filtro</h1>
      
      {renderFilterSection(
        "Ubicaciones",
        "Añade nuevas ubicaciones para filtrar plantas.",
        newLocation,
        setNewLocation,
        'location',
        existingLocations
      )}

      {renderFilterSection(
        "Climas",
        "Añade nuevos tipos de clima.",
        newClimate,
        setNewClimate,
        'climate',
        existingClimates
      )}

      {renderFilterSection(
        "Usos Principales",
        "Añade nuevos usos principales para las plantas.",
        newUse,
        setNewUse,
        'use',
        existingUses
      )}
    </div>
  );
}
