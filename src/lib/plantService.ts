
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

export async function addDynamicClimate(climate: string): Promise<void> {
  await delay(100);
  if (!dynamicClimates.includes(climate)) {
    dynamicClimates.push(climate);
    setStoredItems(DYNAMIC_CLIMATES_KEY, dynamicClimates);
  }
}

export async function addDynamicUse(use: string): Promise<void> {
  await delay(100);
  if (!dynamicUses.includes(use)) {
    dynamicUses.push(use);
    setStoredItems(DYNAMIC_USES_KEY, dynamicUses);
  }
}

export async function getAllLocationsForFilters(): Promise<string[]> {
  await delay(50);
  // Ensure dynamicLocations are loaded if not already
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
export async function getPlants(filters?: FilterValues): Promise<Plant[]> {
  await delay(300); 
  let plants = [...INITIAL_PLANTS];

  if (filters) {
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      plants = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchTermLower) ||
        plant.uses.some(use => use.toLowerCase().includes(searchTermLower)) ||
        plant.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
        plant.description.toLowerCase().includes(searchTermLower)
      );
    }
    if (filters.location && filters.location !== "all") {
      plants = plants.filter(plant => plant.location.includes(filters.location!));
    }
    if (filters.climate && filters.climate !== "all") {
      plants = plants.filter(plant => plant.climate === filters.climate);
    }
    if (filters.season && filters.season !== "all") {
      plants = plants.filter(plant => plant.season === filters.season);
    }
    if (filters.uses && filters.uses !== "all") {
      plants = plants.filter(plant => plant.uses.includes(filters.uses!));
    }
    if (filters.tag && filters.tag !== "all") {
      plants = plants.filter(plant => plant.tags.includes(filters.tag!));
    }
  }
  return plants;
}

export async function getPlantById(id: string): Promise<Plant | undefined> {
  await delay(200);
  return INITIAL_PLANTS.find(plant => plant.id === id);
}

export async function addPlant(plantData: Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plant> {
  await delay(500);
  const newPlant: Plant = {
    ...plantData,
    id: String(Date.now()), 
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  INITIAL_PLANTS.push(newPlant); 
  console.log("Plant added (mock):", newPlant);
  return newPlant;
}

// --- Comment Management ---
let mockComments: Comment[] = [
    {id: "c1", plantId: "1", userId: "user1", userName: "Elena M.", text: "Muy útil esta información, gracias!", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    {id: "c2", plantId: "1", userId: "admin1", userName: "Admin Flores", text: "Recuerden consultar a un especialista antes de usar cualquier planta medicinal.", createdAt: new Date(Date.now() - 1000 * 60 * 30) },
];

export async function getCommentsByPlantId(plantId: string): Promise<Comment[]> {
    await delay(100);
    return mockComments.filter(comment => comment.plantId === plantId).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
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
    mockComments.push(newComment);
    return newComment;
}
