
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addPlant, getAllLocationsForFilters, getAllClimatesForFilters, getAllSeasonsForFilters, getAllUsesForFilters } from '@/lib/plantService';
import type { Plant } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const plantSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  scientificName: z.string().optional(),
  description: z.string().min(10, "La descripción es muy corta."),
  uses: z.string({ required_error: "Debe seleccionar un uso principal." }).min(1, "Debe seleccionar un uso principal."),
  location: z.string({ required_error: "Debe seleccionar una ubicación." }).min(1, "Debe seleccionar una ubicación."),
  imageUrl: z.string().url("Debe ser una URL válida.").or(z.literal('')),
  imageAiHint: z.string().optional(),
  climate: z.string({ required_error: "El clima es requerido." }).min(1, "El clima es requerido."),
  season: z.string({ required_error: "La temporada es requerida." }).min(1, "La temporada es requerida."),
  traditionalPreparation: z.string().optional(),
  conservationStatus: z.string().optional(),
  bioactiveCompounds: z.string().optional(),
  partsUsed: z.string().optional(),
  howToUse: z.string().optional(),
  otherUses: z.string().optional(),
});

type PlantFormData = z.infer<typeof plantSchema>;

export default function AddPlantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [climateOptions, setClimateOptions] = useState<string[]>([]);
  const [seasonOptions, setSeasonOptions] = useState<string[]>([]);
  const [useOptions, setUseOptions] = useState<string[]>([]); // For main uses dropdown

  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit, formState: { errors }, register } = useForm<PlantFormData>({
    resolver: zodResolver(plantSchema),
    defaultValues: {
      name: '',
      scientificName: '',
      description: '',
      uses: '', // Single string for form
      location: '', // Single string for form
      imageUrl: '',
      imageAiHint: '',
      climate: '',
      season: '',
      traditionalPreparation: '',
      conservationStatus: '',
      bioactiveCompounds: '',
      partsUsed: '',
      howToUse: '',
      otherUses: '',
    }
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setOptionsLoading(true);
        const [locs, clims, seasons, usesData] = await Promise.all([
          getAllLocationsForFilters(),
          getAllClimatesForFilters(),
          getAllSeasonsForFilters(),
          getAllUsesForFilters(), // Fetches main uses for dropdown
        ]);
        setLocationOptions(locs);
        setClimateOptions(clims);
        setSeasonOptions(seasons);
        setUseOptions(usesData);
      } catch (error) {
        toast({ title: "Error", description: "No se pudieron cargar opciones para los selectores.", variant: "destructive" });
      } finally {
        setOptionsLoading(false);
      }
    };
    fetchOptions();
  }, [toast]);

  const onSubmit: SubmitHandler<PlantFormData> = async (data) => {
    setIsLoading(true);
    try {
      const plantDataToSubmit = {
        ...data,
        uses: [data.uses], // Convert single string selection for main use to array
        location: [data.location], // Convert single string selection for location to array
        imageUrl: data.imageUrl || `https://placehold.co/600x400.png`,
      };
      
      const newPlant = await addPlant(plantDataToSubmit as Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>);
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

  if (optionsLoading) {
    return (
      <div className="space-y-6 bg-card p-6 rounded-lg shadow">
        {[...Array(10)].map((_, i) => ( // Increased skeleton count for new fields
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-1/3" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 rounded-lg shadow">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</Label>
        <Input id="name" {...register("name")} className={commonInputProps} placeholder="Escribe Nombre..." />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="scientificName" className="block text-sm font-medium mb-1">Nombre Científico (Opcional)</Label>
        <Input id="scientificName" {...register("scientificName")} className={commonInputProps} placeholder="Escribe Nombre Científico..." />
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium mb-1">Descripción</Label>
        <Textarea id="description" {...register("description")} className={commonTextareaProps} placeholder="Escribe Descripción..." />
        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="uses" className="block text-sm font-medium mb-1">Uso Principal</Label>
        <Controller
          name="uses"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
              <SelectTrigger id="uses" className={commonInputProps}>
                <SelectValue placeholder="Selecciona un uso principal" />
              </SelectTrigger>
              <SelectContent>
                {useOptions.map(use => <SelectItem key={use} value={use}>{use}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        {errors.uses && <p className="text-sm text-destructive mt-1">{errors.uses.message}</p>}
      </div>

      <div>
        <Label htmlFor="location" className="block text-sm font-medium mb-1">Ubicación Principal</Label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
              <SelectTrigger id="location" className={commonInputProps}>
                <SelectValue placeholder="Selecciona una ubicación típica" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="climate" className="block text-sm font-medium mb-1">Clima</Label>
        <Controller
          name="climate"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
              <SelectTrigger id="climate" className={commonInputProps}>
                <SelectValue placeholder="Selecciona un clima preferido" />
              </SelectTrigger>
              <SelectContent>
                {climateOptions.map(clim => <SelectItem key={clim} value={clim}>{clim}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        {errors.climate && <p className="text-sm text-destructive mt-1">{errors.climate.message}</p>}
      </div>

      <div>
        <Label htmlFor="season" className="block text-sm font-medium mb-1">Temporada / Ciclo</Label>
        <Controller
          name="season"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
              <SelectTrigger id="season" className={commonInputProps}>
                <SelectValue placeholder="Selecciona una temporada o ciclo" />
              </SelectTrigger>
              <SelectContent>
                {seasonOptions.map(seas => <SelectItem key={seas} value={seas}>{seas}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        />
        {errors.season && <p className="text-sm text-destructive mt-1">{errors.season.message}</p>}
      </div>

      <div>
        <Label htmlFor="imageUrl" className="block text-sm font-medium mb-1">URL de Imagen</Label>
        <Input id="imageUrl" type="url" {...register("imageUrl")} className={commonInputProps} placeholder="https://placehold.co/600x400.png" />
        {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="imageAiHint" className="block text-sm font-medium mb-1">Pista para IA de Imagen (Opcional)</Label>
        <Input id="imageAiHint" {...register("imageAiHint")} className={commonInputProps} placeholder="e.g. 'flor blanca', máx. 2 palabras" />
      </div>
      
      <div>
        <Label htmlFor="bioactiveCompounds" className="block text-sm font-medium mb-1">Compuestos Bioactivos (Opcional)</Label>
        <Textarea id="bioactiveCompounds" {...register("bioactiveCompounds")} className={commonTextareaProps} placeholder="Escribe compuestos bioactivos..." />
      </div>

      <div>
        <Label htmlFor="partsUsed" className="block text-sm font-medium mb-1">Partes Utilizadas (Opcional)</Label>
        <Textarea id="partsUsed" {...register("partsUsed")} className={commonTextareaProps} placeholder="E.g., Hojas, flores, raíz..." />
      </div>

      <div>
        <Label htmlFor="howToUse" className="block text-sm font-medium mb-1">Modo de Empleo (Opcional)</Label>
        <Textarea id="howToUse" {...register("howToUse")} className={commonTextareaProps} placeholder="E.g., Infusión, cataplasma, decocción..." />
      </div>
      
      <div>
        <Label htmlFor="otherUses" className="block text-sm font-medium mb-1">Otros Usos (Opcional)</Label>
        <Textarea id="otherUses" {...register("otherUses")} className={commonTextareaProps} placeholder="E.g., Ornamental, culinario, ritual..." />
      </div>

      <div>
        <Label htmlFor="traditionalPreparation" className="block text-sm font-medium mb-1">Preparación Tradicional (Opcional)</Label>
        <Textarea id="traditionalPreparation" {...register("traditionalPreparation")} className={commonTextareaProps} placeholder="Escribe Preparación Tradicional..." />
      </div>

      <div>
        <Label htmlFor="conservationStatus" className="block text-sm font-medium mb-1">Estado de Conservación (Opcional)</Label>
        <Input id="conservationStatus" {...register("conservationStatus")} className={commonInputProps} placeholder="Escribe Estado de Conservación..." />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isLoading || optionsLoading}>
        {isLoading ? 'Añadiendo...' : 'Añadir Planta'}
      </Button>
    </form>
  );
}
