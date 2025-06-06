
import type { Plant } from '@/lib/types';
import PlantCard from './PlantCard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PlantGridProps {
  plants: Plant[];
  isLoading?: boolean;
  error?: string | null;
  onPlantDeleted: (plantId: string) => void;
}

export default function PlantGrid({ plants, isLoading, error, onPlantDeleted }: PlantGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (plants.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No se encontraron plantas</AlertTitle>
        <AlertDescription>Intenta ajustar tus filtros de búsqueda o revisa más tarde.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {plants.map(plant => (
        <PlantCard key={plant.id} plant={plant} onPlantDeleted={onPlantDeleted} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="aspect-[3/2] bg-muted rounded-t-lg"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-muted rounded-full w-16"></div>
          <div className="h-5 bg-muted rounded-full w-20"></div>
        </div>
      </div>
    </div>
  )
}
