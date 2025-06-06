"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addPlant } from '@/lib/plantService'; // Mock service
import type { Plant } from '@/lib/types';

// Zod schema for validation
const plantSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  scientificName: z.string().optional(),
  description: z.string().min(10, "La descripción es muy corta."),
  uses: z.string().min(1, "Debe haber al menos un uso.").transform(val => val.split(',').map(s => s.trim())),
  location: z.string().min(1, "Debe haber al menos una ubicación.").transform(val => val.split(',').map(s => s.trim())),
  imageUrl: z.string().url("Debe ser una URL válida.").or(z.literal('')), // Allow empty or valid URL
  imageAiHint: z.string().optional(),
  tags: z.string().min(1, "Debe haber al menos una etiqueta.").transform(val => val.split(',').map(s => s.trim())),
  climate: z.string().min(3, "El clima es requerido."),
  season: z.string().min(3, "La temporada es requerida."),
  traditionalPreparation: z.string().optional(),
  conservationStatus: z.string().optional(),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function AddPlantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors }, register } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: '',
      scientificName: '',
      description: '',
      uses: [],
      location: [],
      imageUrl: '',
      imageAiHint: '',
      tags: [],
      climate: '',
      season: '',
      traditionalPreparation: '',
      conservationStatus: '',
    }
  });

  const onSubmit: SubmitHandler<PlantFormData> = async (data) => {
    setIsLoading(true);
    try {
      // Use a placeholder if imageUrl is empty
      const plantDataWithImage = {
        ...data,
        imageUrl: data.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name.substring(0,15))}`,
      };
      
      const newPlant = await addPlant(plantDataWithImage as Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>);
      toast({
        title: "Planta Añadida",
        description: `"${newPlant.name}" ha sido añadida exitosamente.`,
      });
      router.push(`/plants/${newPlant.id}`);
    } catch (error) {
      console.error("Failed to add plant:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir la planta. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const commonInputProps = "bg-card border-border focus:ring-primary";
  const commonTextareaProps = "bg-card border-border focus:ring-primary min-h-[100px]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg shadow">
      {(['name', 'scientificName', 'description', 'uses', 'location', 'imageUrl', 'imageAiHint', 'tags', 'climate', 'season', 'traditionalPreparation', 'conservationStatus'] as (keyof PlantFormData)[]).map((fieldName) => {
        const isTextarea = ['description', 'traditionalPreparation'].includes(fieldName);
        const labelText = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
        const placeholderText = ['uses', 'location', 'tags'].includes(fieldName) ? 'Separado por comas' : `Escribe ${labelText.toLowerCase()}...`;
        
        return (
          <div key={fieldName}>
            <Label htmlFor={fieldName} className="block text-sm font-medium mb-1">{labelText}</Label>
            {isTextarea ? (
              <Textarea
                id={fieldName}
                {...register(fieldName)}
                className={commonTextareaProps}
                placeholder={placeholderText}
              />
            ) : (
              <Input
                id={fieldName}
                type={fieldName === 'imageUrl' ? 'url' : 'text'}
                {...register(fieldName)}
                className={commonInputProps}
                placeholder={placeholderText}
              />
            )}
            {errors[fieldName] && <p className="text-sm text-destructive mt-1">{errors[fieldName]?.message}</p>}
          </div>
        );
      })}

      <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? 'Añadiendo...' : 'Añadir Planta'}
      </Button>
    </form>
  );
}
