
import type { Plant } from './types';

// IMPORTANT: You will need to create a folder structure like `public/images/`
// and place your actual plant images there. For example, '7-corazones.png'.
// For now, all initial plants will point to a generic placeholder.
const GENERIC_STATIC_IMAGE_URL = '/images/planta-generica.png';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: '1',
    name: '7 Corazones (Talauma mexicana)',
    scientificName: 'Talauma mexicana',
    description: 'Árbol conocido por sus grandes flores blancas aromáticas y sus propiedades medicinales, especialmente para afecciones cardíacas y nerviosas. La corteza y las flores son las partes más utilizadas.',
    uses: ['Cardiotónico', 'Sedante'],
    location: ['Sierra Otomí-Tepehua', 'Valle del Mezquital'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/7-corazones.png'
    climate: 'Templado a semicálido',
    season: 'Floración en primavera-verano',
    traditionalPreparation: 'Infusión de flores o corteza.',
    conservationStatus: 'Preocupación Menor',
    bioactiveCompounds: 'Alcaloides, flavonoides.',
    partsUsed: 'Flores, corteza.',
    howToUse: 'Infusión, decocción.',
    otherUses: 'Ornamental por sus bellas flores.',
  },
  {
    id: '2',
    name: 'Árbol de Manita (Chiranthodendron pentadactylon)',
    scientificName: 'Chiranthodendron pentadactylon',
    description: 'Un árbol distintivo por sus flores rojas que asemejan una mano. Usado tradicionalmente para problemas del corazón y nerviosismo. Crece en bosques de niebla.',
    uses: ['Afecciones cardíacas', 'Tranquilizante'],
    location: ['Bosques de niebla de Hidalgo', 'Zacualtipán'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/arbol-de-manita.png'
    climate: 'Templado húmedo',
    season: 'Floración en primavera',
    traditionalPreparation: 'Té de las flores.',
    conservationStatus: 'Vulnerable',
    bioactiveCompounds: 'Flavonoides, taninos.',
    partsUsed: 'Flores.',
    howToUse: 'Infusión de las flores secas.',
    otherUses: 'Valor cultural y ornamental.',
  },
  {
    id: '3',
    name: 'Caléndula (Calendula officinalis)',
    scientificName: 'Calendula officinalis',
    description: 'Planta herbácea con flores amarillas o anaranjadas brillantes. Ampliamente reconocida por sus propiedades cicatrizantes, antiinflamatorias y antisépticas para la piel.',
    uses: ['Cicatrizante', 'Antiinflamatorio tópico'],
    location: ['Huertos caseros', 'Cultivada en varias regiones'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/calendula.png'
    climate: 'Templado',
    season: 'Floración primavera a otoño',
    traditionalPreparation: 'Ungüentos, infusiones para lavados.',
    conservationStatus: 'Común (cultivada)',
    bioactiveCompounds: 'Carotenoides, saponinas, flavonoides.',
    partsUsed: 'Flores.',
    howToUse: 'Uso externo en cremas, aceites o compresas. Infusión oral con precaución.',
    otherUses: 'Colorante natural, ornamental.',
  },
  {
    id: '4',
    name: 'Cuachalalate (Amphipterygium adstringens)',
    scientificName: 'Amphipterygium adstringens',
    description: 'Árbol cuya corteza es muy valorada en la medicina tradicional mexicana para tratar gastritis, úlceras, y como cicatrizante. Tiene un sabor amargo característico.',
    uses: ['Gastritis', 'Úlceras gástricas'],
    location: ['Valle del Mezquital', 'Zonas áridas y semiáridas'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/cuachalalate.png'
    climate: 'Semiárido',
    season: 'Corteza disponible todo el año',
    traditionalPreparation: 'Decocción de la corteza.',
    conservationStatus: 'Amenazada por sobreexplotación',
    bioactiveCompounds: 'Ácidos anacárdicos, taninos.',
    partsUsed: 'Corteza.',
    howToUse: 'Decocción de la corteza para beber o lavados.',
  },
  {
    id: '5',
    name: 'Eucalipto (Eucalyptus globulus)',
    scientificName: 'Eucalyptus globulus',
    description: 'Árbol alto y aromático, conocido por sus hojas que contienen aceites esenciales. Utilizado comúnmente para afecciones respiratorias como tos, bronquitis y congestión nasal.',
    uses: ['Expectorante', 'Descongestionante'],
    location: ['Ampliamente cultivado', 'Zonas templadas'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/eucalipto.png'
    climate: 'Templado',
    season: 'Hojas disponibles todo el año',
    traditionalPreparation: 'Vaporizaciones, infusiones de hojas.',
    conservationStatus: 'Común (introducida)',
    bioactiveCompounds: 'Eucaliptol (1,8-cineol).',
    partsUsed: 'Hojas.',
    howToUse: 'Inhalación de vapor, infusión de hojas (con moderación).',
    otherUses: 'Aceite esencial en aromaterapia, repelente de insectos.',
  },
  {
    id: '6',
    name: 'Gordolobo (Gnaphalium spp.)',
    scientificName: 'Gnaphalium spp.',
    description: 'Planta herbácea con hojas y tallos cubiertos de una lanosidad blanquecina. Es un remedio popular para la tos, el resfriado y otras afecciones de las vías respiratorias.',
    uses: ['Tos', 'Resfriado'],
    location: ['Campos abiertos', 'Laderas de cerros'],
    imageUrl: GENERIC_STATIC_IMAGE_URL, // Replace with actual path like '/images/gordolobo.png'
    climate: 'Variado, desde templado a frío',
    season: 'Principalmente en primavera y verano',
    traditionalPreparation: 'Té de las flores y hojas.',
    conservationStatus: 'Común',
    partsUsed: 'Flores y hojas.',
    howToUse: 'Infusión.',
  }
];

// Base lists for manually adding options
export const BASE_LOCATIONS = ['Region Volcánica'];
export const BASE_CLIMATES = ['Tropical Seco'];
export const BASE_USES = ['Decorativo']; // Main uses
export const BASE_SEASONS: string[] = [];

export const ALL_SEASONS_STATIC = [...new Set([...BASE_SEASONS, ...INITIAL_PLANTS.map(p => p.season)])].sort();
