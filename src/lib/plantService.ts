import { INITIAL_PLANTS } from './constants';
import type { Plant, FilterValues } from './types';

// Simulate a delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPlants(filters?: FilterValues): Promise<Plant[]> {
  await delay(300); // Simulate network delay
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

// Mock function for adding a plant (admin only)
export async function addPlant(plantData: Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plant> {
  await delay(500);
  const newPlant: Plant = {
    ...plantData,
    id: String(Date.now()), // Simple ID generation for mock
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  INITIAL_PLANTS.push(newPlant); // Note: This modification is in-memory and will be lost on refresh.
  console.log("Plant added (mock):", newPlant);
  return newPlant;
}

// Mock functions for comments - these would typically interact with a database
import type { Comment } from './types';
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
