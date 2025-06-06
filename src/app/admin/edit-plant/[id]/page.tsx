
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import EditPlantForm from '@/components/admin/EditPlantForm';
import { Skeleton } from '@/components/ui/skeleton';
import { getPlantById } from '@/lib/plantService';
import type { Plant } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function EditPlantPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const plantId = params.id as string;

  const [plant, setPlant] = useState<Plant | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.replace(`/login?redirect=/admin/edit-plant/${plantId}`);
        return;
      }
    }
  }, [user, authLoading, router, plantId]);

  useEffect(() => {
    if (user && user.role === 'admin' && plantId) {
      const fetchPlant = async () => {
        try {
          setPageLoading(true);
          setError(null);
          const fetchedPlant = await getPlantById(plantId);
          if (fetchedPlant) {
            setPlant(fetchedPlant);
          } else {
            setError("Planta no encontrada.");
          }
        } catch (err) {
          setError("Error al cargar los datos de la planta.");
          console.error(err);
        } finally {
          setPageLoading(false);
        }
      };
      fetchPlant();
    }
  }, [user, plantId]);

  if (authLoading || pageLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Skeleton className="h-10 w-1/2 mb-6" />
        <div className="space-y-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <p className="text-center py-12">Redirigiendo...</p>;
  }

  if (error) {
     return (
      <div className="max-w-2xl mx-auto py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!plant) {
     return (
      <div className="max-w-2xl mx-auto py-12">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Encontrado</AlertTitle>
          <AlertDescription>La planta que intentas editar no existe o no se pudo cargar.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-headline text-primary mb-8">Editar Planta: {plant.name}</h1>
      <EditPlantForm plant={plant} />
    </div>
  );
}
