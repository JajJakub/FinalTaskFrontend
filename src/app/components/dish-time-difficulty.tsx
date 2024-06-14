import { Box, Typography } from "@mui/material";
import { Recipe } from "../constants/types.ts";

type DishTimeDifficultyProps = {
  recipe: Recipe;
};

function DishTimeDifficulty({ recipe }: DishTimeDifficultyProps) {
  return (
    <>
      <Box sx={{ display: "flex", width: 1, flexDirection: "row" }}>
        <Box
          component="img"
          src="/cuisine.svg"
          sx={{ alignSelf: "start" }}
        ></Box>

        <Typography sx={{ alignSelf: "start" }}>Cuisine</Typography>

        <Box sx={{ justifySelf: "end" }}>{recipe.cuisine ?? "default"}</Box>
      </Box>

      <Box sx={{ display: "flex", width: 1, flexDirection: "row" }}>
        <Box
          component="img"
          src="/cooking.svg"
          sx={{ alignSelf: "start" }}
        ></Box>

        <Typography sx={{ alignSelf: "start" }}>Difficulty</Typography>

        <Box sx={{ justifySelf: "end" }}>{recipe.difficulty ?? "not set"}</Box>
      </Box>
    </>
  );
}
export default DishTimeDifficulty;
