import { Recipe } from "./types.ts";
import {
  CuisineTypeEnum,
  DifficultyTypeEnum,
  MeasureTypeEnum,
} from "./enums.ts";

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
export const SelectAddCuisine: string[] = [
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

export const SelectAddDifficulty: string[] = [
  DifficultyTypeEnum.Easy,
  DifficultyTypeEnum.Medium,
  DifficultyTypeEnum.Hard,
];

export const SelectMeasureMethod: string[] = [
  MeasureTypeEnum.Pieces,
  MeasureTypeEnum.Kilogram,
  MeasureTypeEnum.Gram,
  MeasureTypeEnum.Liter,
  MeasureTypeEnum.Milliliter,
  MeasureTypeEnum.Cup,
  MeasureTypeEnum.Tablespoon,
  MeasureTypeEnum.Teaspoon,
];

export const clearSession = () => {
  sessionStorage.removeItem("sub");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
