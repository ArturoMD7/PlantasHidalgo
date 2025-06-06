
import type { Plant } from '@/lib/types';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Leaf, MapPin, Thermometer, CalendarDays, BookOpen, ShieldCheck, FlaskConical, Scissors, FileText, Lightbulb } from 'lucide-react';
import CommentSection from '@/components/comments/CommentSection';
import AdminPlantActions from '@/components/admin/AdminPlantActions'; 

interface PlantDetailsPageProps {
  plant: Plant;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value?: string | string[] | null }> = ({ icon: Icon, label, value }) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  
  const renderValue = () => {
    if (Array.isArray(value)) {
      return value.map((v, i) => <p key={i} className="text-foreground whitespace-pre-line">{v}</p>);
    }
    return <p className="text-foreground whitespace-pre-line">{value}</p>;
  };

  return (
    <div className="flex items-start space-x-3 py-2">
      <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        {renderValue()}
      </div>
    </div>
  );
};

export default function PlantDetailsPage({ plant }: PlantDetailsPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-card p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-headline text-primary mb-2">{plant.name}</h1>
            {plant.scientificName && (
              <p className="text-lg italic text-muted-foreground mb-6">{plant.scientificName}</p>
            )}
          </div>
          <AdminPlantActions plantId={plant.id} plantName={plant.name} />
        </div>

        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] mb-8 rounded-md overflow-hidden">
          <Image
            src={plant.imageUrl}
            alt={plant.name}
            fill
            sizes="(max-width: 640px) 100vw, 60vw"
            className="object-cover"
            priority
            data-ai-hint={plant.imageAiHint || "plant detail"}
          />
        </div>

        <p className="text-lg leading-relaxed text-foreground mb-8 whitespace-pre-line">{plant.description}</p>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          <DetailItem icon={Leaf} label="Usos Principales" value={plant.uses} />
          <DetailItem icon={MapPin} label="Ubicaciones Típicas" value={plant.location} />
          <DetailItem icon={Thermometer} label="Clima Preferido" value={plant.climate} />
          <DetailItem icon={CalendarDays} label="Temporada / Ciclo" value={plant.season} />
          {plant.bioactiveCompounds && <DetailItem icon={FlaskConical} label="Compuestos Bioactivos" value={plant.bioactiveCompounds} />}
          {plant.partsUsed && <DetailItem icon={Scissors} label="Partes Utilizadas" value={plant.partsUsed} />}
          {plant.howToUse && <DetailItem icon={FileText} label="Modo de Empleo" value={plant.howToUse} />}
          {plant.otherUses && <DetailItem icon={Lightbulb} label="Otros Usos" value={plant.otherUses} />}
          {plant.traditionalPreparation && <DetailItem icon={BookOpen} label="Preparación Tradicional" value={plant.traditionalPreparation} />}
          {plant.conservationStatus && <DetailItem icon={ShieldCheck} label="Estado de Conservación" value={plant.conservationStatus} />}
        </div>
        
      </article>

      <CommentSection plantId={plant.id} />
    </div>
  );
}
