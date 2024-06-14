import { Recipe } from "./types.ts";

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const RecipePlaceholder: Recipe = {
  _id: "",
  name: "",
  cuisine: "",
  ingredients: [],
  steps: [],
  comments: [],
} as const;
