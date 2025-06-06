import type { Plant } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Leaf, MapPin, Tag, Sun, Droplets, Thermometer, CalendarDays, BookOpen, ShieldCheck, Info } from 'lucide-react';
import CommentSection from '@/components/comments/CommentSection';

interface PlantDetailsPageProps {
  plant: Plant;
}

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value?: string | string[] | null }> = ({ icon: Icon, label, value }) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex items-start space-x-3 py-2">
      <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        {Array.isArray(value) ? (
          value.map((v, i) => <p key={i} className="text-foreground">{v}</p>)
        ) : (
          <p className="text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
};

export default function PlantDetailsPage({ plant }: PlantDetailsPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-card p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-headline text-primary mb-2">{plant.name}</h1>
        {plant.scientificName && (
          <p className="text-lg italic text-muted-foreground mb-6">{plant.scientificName}</p>
        )}

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

        <p className="text-lg leading-relaxed text-foreground mb-8">{plant.description}</p>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
          <DetailItem icon={Leaf} label="Usos Comunes" value={plant.uses} />
          <DetailItem icon={MapPin} label="Ubicaciones Típicas" value={plant.location} />
          <DetailItem icon={Thermometer} label="Clima Preferido" value={plant.climate} />
          <DetailItem icon={CalendarDays} label="Temporada / Ciclo" value={plant.season} />
          {plant.traditionalPreparation && <DetailItem icon={BookOpen} label="Preparación Tradicional" value={plant.traditionalPreparation} />}
          {plant.conservationStatus && <DetailItem icon={ShieldCheck} label="Estado de Conservación" value={plant.conservationStatus} />}
        </div>
        
        {plant.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-accent" />
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-2">
              {plant.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-md px-3 py-1">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>

      <CommentSection plantId={plant.id} />
    </div>
  );
}
