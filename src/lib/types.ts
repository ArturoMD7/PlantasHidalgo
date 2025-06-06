export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  uses: string[];
  location: string[];
  imageUrl: string;
  imageAiHint?: string;
  tags: string[];
  climate: string; // e.g., "Temperate", "Semi-arid", "Tropical highland"
  season: string; // e.g., "Spring flowering", "Year-round foliage"
  traditionalPreparation?: string;
  conservationStatus?: string; // e.g., "Common", "Endangered"
  createdAt?: Date; // Optional for initial mock data
  updatedAt?: Date; // Optional for initial mock data
}

export interface Comment {
  id: string;
  plantId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export interface FilterValues {
  searchTerm?: string;
  location?: string;
  climate?: string;
  season?: string;
  uses?: string; // Could be a single use for filtering
  tag?: string;
}
