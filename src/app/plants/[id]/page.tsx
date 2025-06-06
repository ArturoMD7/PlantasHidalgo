import { getPlantById } from '@/lib/plantService';
import PlantDetailsPage from '@/components/plants/PlantDetailsPage';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plant = await getPlantById(params.id);
  if (!plant) {
    return {
      title: 'Planta no encontrada',
    };
  }
  return {
    title: `${plant.name} | Flores en Hidalgo`,
    description: plant.description.substring(0, 160),
  };
}

export default async function PlantPage({ params }: Props) {
  const plant = await getPlantById(params.id);

  if (!plant) {
    notFound();
  }

  return <PlantDetailsPage plant={plant} />;
}
