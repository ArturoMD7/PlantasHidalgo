
import type { Plant } from './types';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: '1',
    name: '7 Corazones (Talauma mexicana)',
    scientificName: 'Talauma mexicana',
    description: 'Árbol conocido por sus grandes flores blancas aromáticas y sus propiedades medicinales, especialmente para afecciones cardíacas y nerviosas. La corteza y las flores son las partes más utilizadas.',
    uses: ['Cardiotónico', 'Sedante', 'Antiinflamatorio'],
    location: ['Sierra Otomí-Tepehua', 'Valle del Mezquital'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'white flower',
    tags: ['medicinal', 'árbol', 'aromática'],
    climate: 'Templado a semicálido',
    season: 'Floración en primavera-verano',
    traditionalPreparation: 'Infusión de flores o corteza.',
    conservationStatus: 'Preocupación Menor',
  },
  {
    id: '2',
    name: 'Árbol de Manita (Chiranthodendron pentadactylon)',
    scientificName: 'Chiranthodendron pentadactylon',
    description: 'Un árbol distintivo por sus flores rojas que asemejan una mano. Usado tradicionalmente para problemas del corazón y nerviosismo. Crece en bosques de niebla.',
    uses: ['Afecciones cardíacas', 'Tranquilizante', 'Ornamental'],
    location: ['Bosques de niebla de Hidalgo', 'Zacualtipán'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'red flower',
    tags: ['medicinal', 'árbol', 'flor exótica'],
    climate: 'Templado húmedo',
    season: 'Floración en primavera',
    traditionalPreparation: 'Té de las flores.',
    conservationStatus: 'Vulnerable',
  },
  {
    id: '3',
    name: 'Caléndula (Calendula officinalis)',
    scientificName: 'Calendula officinalis',
    description: 'Planta herbácea con flores amarillas o anaranjadas brillantes. Ampliamente reconocida por sus propiedades cicatrizantes, antiinflamatorias y antisépticas para la piel.',
    uses: ['Cicatrizante', 'Antiinflamatorio tópico', 'Antiséptico'],
    location: ['Huertos caseros', 'Cultivada en varias regiones'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'orange flower',
    tags: ['medicinal', 'hierba', 'cuidado de la piel'],
    climate: 'Templado',
    season: 'Floración primavera a otoño',
    traditionalPreparation: 'Ungüentos, infusiones para lavados.',
    conservationStatus: 'Común (cultivada)',
  },
  {
    id: '4',
    name: 'Cuachalalate (Amphipterygium adstringens)',
    scientificName: 'Amphipterygium adstringens',
    description: 'Árbol cuya corteza es muy valorada en la medicina tradicional mexicana para tratar gastritis, úlceras, y como cicatrizante. Tiene un sabor amargo característico.',
    uses: ['Gastritis', 'Úlceras gástricas', 'Cicatrizante', 'Problemas renales'],
    location: ['Valle del Mezquital', 'Zonas áridas y semiáridas'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'tree bark',
    tags: ['medicinal', 'árbol', 'corteza'],
    climate: 'Semiárido',
    season: 'Corteza disponible todo el año',
    traditionalPreparation: 'Decocción de la corteza.',
    conservationStatus: 'Amenazada por sobreexplotación',
  },
  {
    id: '5',
    name: 'Eucalipto (Eucalyptus globulus)',
    scientificName: 'Eucalyptus globulus',
    description: 'Árbol alto y aromático, conocido por sus hojas que contienen aceites esenciales. Utilizado comúnmente para afecciones respiratorias como tos, bronquitis y congestión nasal.',
    uses: ['Expectorante', 'Descongestionante', 'Antiséptico respiratorio'],
    location: ['Ampliamente cultivado', 'Zonas templadas'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'eucalyptus leaves',
    tags: ['medicinal', 'árbol', 'respiratorio'],
    climate: 'Templado',
    season: 'Hojas disponibles todo el año',
    traditionalPreparation: 'Vaporizaciones, infusiones de hojas.',
    conservationStatus: 'Común (introducida)',
  },
  {
    id: '6',
    name: 'Gordolobo (Gnaphalium spp.)',
    scientificName: 'Gnaphalium spp.',
    description: 'Planta herbácea con hojas y tallos cubiertos de una lanosidad blanquecina. Es un remedio popular para la tos, el resfriado y otras afecciones de las vías respiratorias.',
    uses: ['Tos', 'Resfriado', 'Bronquitis', 'Antiinflamatorio'],
    location: ['Campos abiertos', 'Laderas de cerros'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageAiHint: 'fuzzy plant',
    tags: ['medicinal', 'hierba', 'respiratorio'],
    climate: 'Variado, desde templado a frío',
    season: 'Principalmente en primavera y verano',
    traditionalPreparation: 'Té de las flores y hojas.',
    conservationStatus: 'Común',
  }
];

// Base lists for manually adding options
export const BASE_LOCATIONS = ['Region Volcánica'];
export const BASE_CLIMATES = ['Tropical Seco'];
export const BASE_USES = ['Decorativo'];
export const BASE_SEASONS: string[] = [];
export const BASE_TAGS: string[] = [];


// ALL_TAGS and ALL_SEASONS are still derived here as they are not admin-editable yet.
// Locations, Climates, Uses will be fetched from plantService which combines these bases with dynamic data.
export const ALL_SEASONS_STATIC = [...new Set([...BASE_SEASONS, ...INITIAL_PLANTS.map(p => p.season)])].sort();
export const ALL_TAGS_STATIC = [...new Set([...BASE_TAGS, ...INITIAL_PLANTS.flatMap(p => p.tags)])].sort();
