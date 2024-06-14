import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { mainModalStyle } from "../constants/default-theme.ts";
import { AddCircleOutlined } from "@mui/icons-material";
import React from "react";

type AddRecipeModalProps = {
  isActive: boolean;
  activatedModal: (isActive: boolean) => void;
};
function AddRecipeModal({ isActive, activatedModal }: AddRecipeModalProps) {
  const handleModalClose = () => {
    activatedModal(false);
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);

    activatedModal(false);
  };

  return (
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
          <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h5">Recipe Name</Typography>
            <TextField
              id="recipe-name-input"
              label="Recipe Name"
              variant="outlined"
              fullWidth
              inputProps={{ style: { fontSize: "1.3rem" } }}
              InputLabelProps={{ style: { fontSize: "1.3rem" } }}
            />
            <Typography>Photo</Typography>
            <TextField
              id="recipe-photo-input"
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
              <Typography variant="h6">Ingredients</Typography>
              <AddCircleOutlined sx={{ alignSelf: "end" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                alignItems: "center",
              }}
            >
              <TextField
                id="recipe-product-quantity"
                variant="outlined"
                label="Quantity"
                inputProps={{ style: { fontSize: "1.3rem" } }}
                InputLabelProps={{ style: { fontSize: "1.3rem" } }}
                sx={{ width: "60%" }}
              />
              <FormControl sx={{ width: "40%" }}>
                <InputLabel
                  id="recipe-product-measure-label"
                  sx={{ fontSize: "1.3rem" }}
                >
                  Type
                </InputLabel>
                <Select
                  labelId="recipe-product-measure-label"
                  id="recipe-product-measure-select"
                  // value={cuisine}
                  //onChange={handleCuisineChange}
                  sx={{ fontSize: "1.3em", width: 1 }}
                >
                  <MenuItem value={10} sx={{ fontSize: "1.5rem" }}>
                    Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "1.5rem" }}>
                    Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "1.5rem" }}>
                    Thirty
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="recipe-product-name"
              variant="outlined"
              label="Ingredient Name"
              inputProps={{ style: { fontSize: "1.3rem" } }}
              InputLabelProps={{ style: { fontSize: "1.3rem" } }}
              sx={{ width: 1 }}
            />
          </Box>

          <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
              <Typography sx={{ width: "50%" }}>Level</Typography>

              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="recipe-level-label" sx={{ fontSize: "1.3rem" }}>
                  Level
                </InputLabel>
                <Select
                  labelId="recipe-level-label"
                  id="recipe-level-select"
                  // value={cuisine}
                  //onChange={handleCuisineChange}
                  sx={{ fontSize: "1.3em" }}
                >
                  <MenuItem value={10} sx={{ fontSize: "1.5rem" }}>
                    Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "1.5rem" }}>
                    Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "1.5rem" }}>
                    Thirty
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
              <Typography sx={{ width: "50%" }}>Cuisine</Typography>

              <FormControl sx={{ width: "50%" }}>
                <InputLabel
                  id="recipe-cuisine-label"
                  sx={{ fontSize: "1.3rem" }}
                >
                  Cuisine
                </InputLabel>
                <Select
                  labelId="recipe-cuisine-label"
                  id="recipe-cuisine-select"
                  // value={cuisine}
                  //onChange={handleCuisineChange}
                  sx={{ fontSize: "1.3em" }}
                >
                  <MenuItem value={10} sx={{ fontSize: "1.5rem" }}>
                    Ten
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: "1.5rem" }}>
                    Twenty
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: "1.5rem" }}>
                    Thirty
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Button type="submit">Save</Button>
      </Box>
    </Modal>
  );
}
export default AddRecipeModal;
