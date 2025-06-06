
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deletePlant } from '@/lib/plantService';
import { Pencil, Trash2 } from 'lucide-react';

interface PlantCardAdminActionsProps {
  plantId: string;
  plantName: string;
  onPlantDeleted: (plantId: string) => void;
}

export default function PlantCardAdminActions({ plantId, plantName, onPlantDeleted }: PlantCardAdminActionsProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePlant = async () => {
    setIsDeleting(true);
    try {
      await deletePlant(plantId);
      toast({
        title: "Planta Eliminada",
        description: `"${plantName}" ha sido eliminada.`,
      });
      onPlantDeleted(plantId);
      router.refresh(); 
    } catch (error) {
      console.error("Failed to delete plant:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la planta.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex space-x-1 mt-2 justify-end">
      <Button variant="outline" size="icon" className="h-7 w-7" asChild>
        <Link href={`/admin/edit-plant/${plantId}`}>
          <Pencil className="h-3.5 w-3.5" />
          <span className="sr-only">Editar {plantName}</span>
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" className="h-7 w-7" disabled={isDeleting}>
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Eliminar {plantName}</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la planta "{plantName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlant} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
