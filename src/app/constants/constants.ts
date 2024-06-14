import { Recipe } from "./types.ts";
import { CuisineTypeEnum, DifficultyTypeEnum } from "./enums.ts";

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const RecipePlaceholder: Recipe = {
  _id: "",
  name: "",
  cuisine: "",
  difficulty: "",
  ingredients: [],
  steps: "",
  comments: [],
} as const;

export const SelectCuisine: string[] = [
  CuisineTypeEnum.All,
  CuisineTypeEnum.American,
  CuisineTypeEnum.Default,
  CuisineTypeEnum.Italian,
  CuisineTypeEnum.Polish,
];

export const SelectDifficulty: string[] = [
  DifficultyTypeEnum.All,
  DifficultyTypeEnum.Easy,
  DifficultyTypeEnum.Medium,
  DifficultyTypeEnum.Hard,
];
