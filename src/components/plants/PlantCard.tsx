import Link from 'next/link';
import Image from 'next/image';
import type { Plant } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, MapPin, Tag } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <Link href={`/plants/${plant.id}`} className="block">
          <div className="aspect-[3/2] relative w-full">
            <Image
              src={plant.imageUrl}
              alt={plant.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={plant.imageAiHint || "plant nature"}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/plants/${plant.id}`}>
          <CardTitle className="text-xl font-headline mb-2 hover:text-primary transition-colors">{plant.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{plant.description}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <MapPin className="w-3 h-3 mr-1.5 text-accent" />
          {plant.location.slice(0, 2).join(', ')}{plant.location.length > 2 ? '...' : ''}
        </div>
         <div className="flex items-center text-xs text-muted-foreground">
          <Leaf className="w-3 h-3 mr-1.5 text-primary" />
          {plant.uses.slice(0,2).join(', ')}{plant.uses.length > 2 ? '...' : ''}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {plant.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {plant.tags.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
        </div>
      </CardFooter>
    </Card>
  );
}
