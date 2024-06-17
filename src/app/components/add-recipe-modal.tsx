import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { mainModalStyle } from "../constants/default-theme.ts";
import { AddCircleOutlined } from "@mui/icons-material";
import React, { useState } from "react";

import {
  API_BASE_URL,
  SelectAddCuisine,
  SelectAddDifficulty,
} from "../constants/constants.ts";
import { CuisineTypeEnum, DifficultyTypeEnum } from "../constants/enums.ts";
import { Ingredient, Recipe } from "../constants/types.ts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type AddRecipeModalProps = {
  isActive: boolean;
  activatedModal: (isActive: boolean) => void;
};
function AddRecipeModal({ isActive, activatedModal }: AddRecipeModalProps) {
  const [cuisine, setCuisine] = useState<string>(CuisineTypeEnum.Default);
  const [difficulty, setDifficulty] = useState<string>(
    DifficultyTypeEnum.Medium,
  );
  const [ingredientNumber, setIngredientNumber] = useState<number>(1);

  const handleModalClose = () => {
    activatedModal(false);
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = API_BASE_URL + "/recipes/addRecipe";
    const ingredientList: Ingredient[] = [];

    for (let i = 1; i <= ingredientNumber; i++) {
      const name = data.get(`ingredient${i}-name`) as string;
      const quantity = parseFloat(
        data.get(`recipe-product${i}-quantity`) as string,
      );
      const measure = data.get(`recipe-product${i}-quantity`) as string;

      if (name && !isNaN(quantity)) {
        const ingredient: Ingredient = {
          product: name,
          quantity: quantity,
          measureType: measure,
        };

        ingredientList.push(ingredient);
      }
    }
    const addRecipeData = {
      authorId: sessionStorage.getItem("sub"),
      name: data.get("recipe-name-input"),
      cuisine: cuisine,
      difficulty: difficulty,
      ingredients: ingredientList,
      steps: data.get("recipe-steps"),
      photos: [data.get("recipe-photo-input")],
    };

    axios
      .post(url, addRecipeData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        const recipe: Recipe = result.data;

        if (recipe) toast.success("Successfully added recipe " + recipe.name);
        else toast.error("Error while adding new recipe");
      })
      .catch((error) => {
        toast.error(
          "Error Code " +
            error.response.status +
            ": " +
            error.response.data.message,
        );

        if (error.response.data.message === "Unauthorized") {
          sessionStorage.removeItem("sub");
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");

          toast.error("Log in again");
        }
      });

    activatedModal(false);
  };

  const handleRecipeCuisineChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setCuisine(value);
  };

  const handleRecipeDifficultyChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setDifficulty(value);
  };

  const handleOnAddIngredient = () => {
    setIngredientNumber(ingredientNumber + 1);
  };

  return (
    <>
      <Modal open={isActive} onClose={handleModalClose}>
        <Box sx={mainModalStyle} component="form" onSubmit={handleFormSubmit}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add New Recipe
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: 1,
              flexDirection: "row",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: "65%",
                display: "flex",
                flexDirection: "column",
                maxHeight: "55vh",
                overflowX: "auto",
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Recipe Name
              </Typography>
              <TextField
                required={true}
                id="recipe-name-input"
                name="recipe-name-input"
                label="Recipe Name"
                variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "1.3rem" } }}
                InputLabelProps={{ style: { fontSize: "1.3rem" } }}
              />
              <Typography variant="h5" sx={{ mb: 1 }}>
                Photo
              </Typography>
              <TextField
                required={true}
                id="recipe-photo-input"
                name="recipe-photo-input"
                label="Photo URL"
                variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "1.3rem" } }}
                InputLabelProps={{ style: { fontSize: "1.3rem" } }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ my: 1 }}>
                  Ingredients
                </Typography>
                <AddCircleOutlined
                  sx={{ alignSelf: "end", my: 1 }}
                  onClick={handleOnAddIngredient}
                />
              </Box>
              {Array.from({ length: ingredientNumber }).map((_, key) => (
                <Box key={key} sx={{ width: 1, mt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: 1,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      required={true}
                      type="number"
                      id={`recipe-product${key}-quantity`}
                      name={`recipe-product${key}-quantity`}
                      variant="outlined"
                      label="Quantity"
                      inputProps={{ style: { fontSize: "1.3rem" } }}
                      InputLabelProps={{ style: { fontSize: "1.3rem" } }}
                      sx={{ width: "60%" }}
                    />

                    <TextField
                      required={true}
                      label="Type"
                      id={`recipe-product${key}-measure-type`}
                      name={`recipe-product${key}-measure-type`}
                      inputProps={{ style: { fontSize: "1.3rem" } }}
                      InputLabelProps={{ style: { fontSize: "1.3rem" } }}
                      sx={{ width: "40%", fontSize: "1.3em" }}
                    ></TextField>
                  </Box>
                  <TextField
                    required={true}
                    id={`recipe-product${key}-name`}
                    name={`recipe-product${key}-name`}
                    variant="outlined"
                    label="Ingredient Name"
                    inputProps={{ style: { fontSize: "1.3rem" } }}
                    InputLabelProps={{ style: { fontSize: "1.3rem" } }}
                    sx={{ width: 1, mb: 2 }}
                  />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                width: "35%",
                display: "flex",
                flexDirection: "column",
                ml: 2,
              }}
            >
              <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
                <Typography sx={{ width: 1, mb: 1 }} variant="h5">
                  Level
                </Typography>

                <FormControl sx={{ width: 1 }}>
                  <InputLabel
                    id="recipe-level-label"
                    sx={{ fontSize: "1.3rem" }}
                  >
                    Level
                  </InputLabel>
                  <Select
                    required={true}
                    labelId="recipe-level-label"
                    id="recipe-level-select"
                    name="recipe-level-select"
                    value={difficulty}
                    onChange={handleRecipeDifficultyChange}
                    sx={{ fontSize: "1.3em" }}
                  >
                    {SelectAddDifficulty.map((item, index) => (
                      <MenuItem
                        value={item}
                        sx={{ fontSize: "1.5rem" }}
                        key={index}
                      >
                        {item[0].toUpperCase() + item.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
                <Typography sx={{ width: 1, mb: 1 }} variant="h5">
                  Cuisine
                </Typography>

                <FormControl sx={{ width: 1 }}>
                  <InputLabel
                    id="recipe-cuisine-label"
                    sx={{ fontSize: "1.3rem" }}
                  >
                    Cuisine
                  </InputLabel>
                  <Select
                    required={true}
                    labelId="recipe-cuisine-label"
                    id="recipe-cuisine-select"
                    value={cuisine}
                    onChange={handleRecipeCuisineChange}
                    sx={{ fontSize: "1.3em" }}
                  >
                    {SelectAddCuisine.map((item, index) => (
                      <MenuItem
                        value={item}
                        sx={{ fontSize: "1.5rem" }}
                        key={index}
                      >
                        {item[0].toUpperCase() + item.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box sx={{ maxHeight: "30vh", overflowX: "auto" }}>
            <Typography sx={{ width: 1, mb: 1 }} variant="h5">
              Steps
            </Typography>

            <TextField
              required={true}
              id="recipe-steps"
              name="recipe-steps"
              variant="outlined"
              label="Steps"
              multiline
              inputProps={{ style: { fontSize: "1.3rem" } }}
              InputLabelProps={{ style: { fontSize: "1.3rem" } }}
              sx={{ width: 1, mb: 2 }}
            />
            <Button
              type="submit"
              sx={{
                width: "10vw",
                fontSize: "1.3rem",
                border: "2px solid",
                borderColor: "action.active",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default AddRecipeModal;
