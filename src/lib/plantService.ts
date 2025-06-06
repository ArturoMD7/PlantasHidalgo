
import { INITIAL_PLANTS, BASE_LOCATIONS, BASE_CLIMATES, BASE_USES, ALL_SEASONS_STATIC, ALL_TAGS_STATIC } from './constants';
import type { Plant, FilterValues, Comment } from './types';

const DYNAMIC_LOCATIONS_KEY = 'dynamic_locations';
const DYNAMIC_CLIMATES_KEY = 'dynamic_climates';
const DYNAMIC_USES_KEY = 'dynamic_uses';

// Simulate a delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get items from localStorage
const getStoredItems = (key: string): string[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Helper to set items to localStorage
const setStoredItems = (key: string, items: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(items));
  }
};

// --- Dynamic Filter Option Management ---
let dynamicLocations: string[] = getStoredItems(DYNAMIC_LOCATIONS_KEY);
let dynamicClimates: string[] = getStoredItems(DYNAMIC_CLIMATES_KEY);
let dynamicUses: string[] = getStoredItems(DYNAMIC_USES_KEY);

export async function addDynamicLocation(location: string): Promise<void> {
  await delay(100);
  if (!dynamicLocations.includes(location)) {
    dynamicLocations.push(location);
    setStoredItems(DYNAMIC_LOCATIONS_KEY, dynamicLocations);
  }
}

export async function deleteDynamicLocation(locationToDelete: string): Promise<void> {
  await delay(100);
  dynamicLocations = dynamicLocations.filter(loc => loc !== locationToDelete);
  setStoredItems(DYNAMIC_LOCATIONS_KEY, dynamicLocations);
}

export async function addDynamicClimate(climate: string): Promise<void> {
  await delay(100);
  if (!dynamicClimates.includes(climate)) {
    dynamicClimates.push(climate);
    setStoredItems(DYNAMIC_CLIMATES_KEY, dynamicClimates);
  }
}

export async function deleteDynamicClimate(climateToDelete: string): Promise<void> {
  await delay(100);
  dynamicClimates = dynamicClimates.filter(clim => clim !== climateToDelete);
  setStoredItems(DYNAMIC_CLIMATES_KEY, dynamicClimates);
}

export async function addDynamicUse(use: string): Promise<void> {
  await delay(100);
  if (!dynamicUses.includes(use)) {
    dynamicUses.push(use);
    setStoredItems(DYNAMIC_USES_KEY, dynamicUses);
  }
}

export async function deleteDynamicUse(useToDelete: string): Promise<void> {
  await delay(100);
  dynamicUses = dynamicUses.filter(use => use !== useToDelete);
  setStoredItems(DYNAMIC_USES_KEY, dynamicUses);
}

export async function getAllLocationsForFilters(): Promise<string[]> {
  await delay(50);
  if (typeof window !== 'undefined' && dynamicLocations.length === 0 && localStorage.getItem(DYNAMIC_LOCATIONS_KEY)) {
    dynamicLocations = getStoredItems(DYNAMIC_LOCATIONS_KEY);
  }
  return [...new Set([...BASE_LOCATIONS, ...INITIAL_PLANTS.flatMap(p => p.location), ...dynamicLocations])].sort();
}

export async function getAllClimatesForFilters(): Promise<string[]> {
  await delay(50);
   if (typeof window !== 'undefined' && dynamicClimates.length === 0 && localStorage.getItem(DYNAMIC_CLIMATES_KEY)) {
    dynamicClimates = getStoredItems(DYNAMIC_CLIMATES_KEY);
  }
  return [...new Set([...BASE_CLIMATES, ...INITIAL_PLANTS.map(p => p.climate), ...dynamicClimates])].sort();
}

export async function getAllUsesForFilters(): Promise<string[]> {
  await delay(50);
  if (typeof window !== 'undefined' && dynamicUses.length === 0 && localStorage.getItem(DYNAMIC_USES_KEY)) {
    dynamicUses = getStoredItems(DYNAMIC_USES_KEY);
  }
  return [...new Set([...BASE_USES, ...INITIAL_PLANTS.flatMap(p => p.uses), ...dynamicUses])].sort();
}

export async function getAllSeasonsForFilters(): Promise<string[]> {
    await delay(50);
    return ALL_SEASONS_STATIC;
}

export async function getAllTagsForFilters(): Promise<string[]> {
    await delay(50);
    return ALL_TAGS_STATIC;
}

// --- Plant Data Management ---
// Keep INITIAL_PLANTS mutable for additions/deletions in this mock service
let currentPlants: Plant[] = [...INITIAL_PLANTS];
// Keep mockComments mutable
let currentComments: Comment[] = [
    {id: "c1", plantId: "1", userId: "user1", userName: "Elena M.", text: "Muy útil esta información, gracias!", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    {id: "c2", plantId: "1", userId: "admin1", userName: "Admin Flores", text: "Recuerden consultar a un especialista antes de usar cualquier planta medicinal.", createdAt: new Date(Date.now() - 1000 * 60 * 30) },
];


export async function getPlants(filters?: FilterValues): Promise<Plant[]> {
  await delay(300); 
  let plantsToFilter = [...currentPlants];

  if (filters) {
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      plantsToFilter = plantsToFilter.filter(plant =>
        plant.name.toLowerCase().includes(searchTermLower) ||
        plant.uses.some(use => use.toLowerCase().includes(searchTermLower)) ||
        plant.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
        plant.description.toLowerCase().includes(searchTermLower)
      );
    }
    if (filters.location && filters.location !== "all") {
      plantsToFilter = plantsToFilter.filter(plant => plant.location.includes(filters.location!));
    }
    if (filters.climate && filters.climate !== "all") {
      plantsToFilter = plantsToFilter.filter(plant => plant.climate === filters.climate);
    }
    if (filters.season && filters.season !== "all") {
      plantsToFilter = plantsToFilter.filter(plant => plant.season === filters.season);
    }
    if (filters.uses && filters.uses !== "all") {
      plantsToFilter = plantsToFilter.filter(plant => plant.uses.includes(filters.uses!));
    }
    if (filters.tag && filters.tag !== "all") {
      plantsToFilter = plantsToFilter.filter(plant => plant.tags.includes(filters.tag!));
    }
  }
  return plantsToFilter;
}

export async function getPlantById(id: string): Promise<Plant | undefined> {
  await delay(200);
  return currentPlants.find(plant => plant.id === id);
}

export async function addPlant(plantData: Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plant> {
  await delay(500);
  const newPlant: Plant = {
    ...plantData,
    id: String(Date.now()), 
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  currentPlants.push(newPlant); 
  console.log("Plant added (mock):", newPlant);
  return newPlant;
}

export async function deletePlant(plantId: string): Promise<void> {
  await delay(500);
  currentPlants = currentPlants.filter(plant => plant.id !== plantId);
  // Also delete associated comments
  currentComments = currentComments.filter(comment => comment.plantId !== plantId);
  console.log(`Plant with id ${plantId} deleted (mock).`);
}


// --- Comment Management ---
export async function getCommentsByPlantId(plantId: string): Promise<Comment[]> {
    await delay(100);
    return currentComments.filter(comment => comment.plantId === plantId).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function addComment(plantId: string, userId: string, userName: string, text: string): Promise<Comment> {
    await delay(300);
    const newComment: Comment = {
        id: `c${Date.now()}`,
        plantId,
        userId,
        userName,
        text,
        createdAt: new Date()
    };
    currentComments.push(newComment);
    return newComment;
}
