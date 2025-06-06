
export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  uses: string[]; // Main uses
  location: string[];
  imageUrl: string;
  imageAiHint?: string;
  climate: string; 
  season: string; 
  traditionalPreparation?: string;
  conservationStatus?: string;
  bioactiveCompounds?: string;
  partsUsed?: string;
  howToUse?: string;
  otherUses?: string;
  createdAt?: Date; 
  updatedAt?: Date; 
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
  uses?: string; // Main use for filtering
  // tag?: string; // Removed tag filter
}
