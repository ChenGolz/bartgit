import type { LucideIcon } from "lucide-react";

export type CategoryId = "all" | "home" | "business" | "wellness" | "tech" | "lessons" | "media";

export type Category = {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
};

export type User = {
  id: string;
  name: string;
  email: string;
  city: string;
  avatar?: string;
  verified: boolean;
};

export type Listing = {
  id: number;
  userId: string;
  name: string;
  city: string;
  distance: string;
  title: string;
  offer: string;
  wants: string;
  category: Exclude<CategoryId, "all">;
  tags: string[];
  rating: number;
  verified: boolean;
  matchScore: number;
  createdAt: string;
  image?: string;
};
