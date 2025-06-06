
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
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
import { Trash2, Pencil } from 'lucide-react'; // Added Pencil icon

interface AdminPlantActionsProps {
  plantId: string;
  plantName: string;
}

export default function AdminPlantActions({ plantId, plantName }: AdminPlantActionsProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePlant = async () => {
    setIsDeleting(true);
    try {
      await deletePlant(plantId);
      toast({
        title: "Planta Eliminada",
        description: `"${plantName}" ha sido eliminada exitosamente.`,
      });
      router.push('/'); 
      router.refresh(); 
    } catch (error) {
      console.error("Failed to delete plant:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la planta. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex space-x-2">
        <div className="h-9 w-24 animate-pulse bg-muted rounded-md" /> 
        <div className="h-9 w-28 animate-pulse bg-muted rounded-md" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null; 
  }

  return (
    <div className="flex space-x-2 items-center">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/admin/edit-plant/${plantId}`}>
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isDeleting}>
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la planta "{plantName}" y todos sus comentarios asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlant} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
