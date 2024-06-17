import { Box, Typography } from "@mui/material";
import { Recipe } from "../constants/types.ts";

type DishTimeDifficultyProps = {
  recipe: Recipe;
};

function DishTimeDifficulty({ recipe }: DishTimeDifficultyProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "row",
          alignItems: "center",
          my: 1,
        }}
      >
        <Box
          component="img"
          src="/cuisine.svg"
          sx={{ alignSelf: "start", width: "2.5vw", ml: 2, mr: 1 }}
        ></Box>

        <Typography sx={{ alignSelf: "start", my: "auto" }} variant="h5">
          Cuisine: {recipe.cuisine ?? "default"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: 1,
          flexDirection: "row",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/cooking.svg"
          sx={{ alignSelf: "start", width: "2.5vw", ml: 2, mr: 1 }}
        ></Box>

        <Typography sx={{ alignSelf: "start", my: "auto" }} variant="h5">
          Difficulty: {recipe.difficulty ?? "not set"}
        </Typography>
      </Box>
    </>
  );
}
export default DishTimeDifficulty;
