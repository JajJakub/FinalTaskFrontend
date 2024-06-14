import { Recipe } from "../constants/types.ts";
import Header from "../components/header.tsx";
import { Box, Container, Paper, Typography } from "@mui/material";
import DishTimeDifficulty from "../components/dish-time-difficulty.tsx";
import { useEffect, useState } from "react";
import AddRecipeModal from "../components/add-recipe-modal.tsx";
import { API_BASE_URL, RecipePlaceholder } from "../constants/constants.ts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/comment.tsx";

function RecipePage() {
  const navigate = useNavigate();
  const params = useParams<string>();

  const [addRecipeModal, setAddRecipeModal] = useState<boolean>(false);
  const [data, setData] = useState<Recipe>(RecipePlaceholder);

  useEffect(() => {
    const url = API_BASE_URL + "/recipes/getById";

    axios
      .post(url, params)
      .then((result) => {
        const recipe: Recipe = result.data;
        setData(recipe);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });

    return () => {
      console.log("Initialized");
    };
  }, [params, navigate]);

  const handleAddRecipe = () => {
    setAddRecipeModal(true);
  };
  const handleAddComment = () => {};

  return (
    <>
      <Box>
        <Header />
        <Box
          sx={{
            width: "8vw",
            border: "2px solid",
            borderColor: "action.active",
            display: "flex",
            justifyContent: "center",
            mx: 5,
            borderRadius: "10px",
          }}
          onClick={handleAddRecipe}
        >
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              width: 1,
              textAlign: "center",
              py: 1,
            }}
          >
            Add Recipe
          </Typography>
        </Box>
      </Box>

      <Container
        sx={{
          pt: 3,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box
          component="img"
          src="/pizza.svg"
          sx={{ width: 1, height: 1 }}
        ></Box>

        <Box>
          <Typography variant="h2">{data.name}</Typography>
          <DishTimeDifficulty recipe={data} />
        </Box>
        <Box>
          <Typography variant="h3">Instructions</Typography>
          <Typography>{data.steps}</Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            boxSizing: "border-box",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Box>
            <Typography variant="h3">Ingredients</Typography>
            <ul>
              {data.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                >{`${ingredient.quantity} ${ingredient.measureType} ${ingredient.product}`}</li>
              ))}
            </ul>
          </Box>
        </Paper>
      </Container>
      <Box sx={{ width: 1, bgcolor: "primary.main", height: "3px" }}></Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Comments</Typography>
          <Box
            sx={{
              width: "8vw",
              border: "2px solid",
              borderColor: "action.active",
              display: "flex",
              justifyContent: "center",
              mx: 5,
              borderRadius: "10px",
            }}
            onClick={handleAddComment}
          >
            <Typography variant="h5">Add Comment</Typography>
          </Box>
        </Box>
        <Comment />
        <Comment />
        <Comment />
      </Box>

      <AddRecipeModal
        isActive={addRecipeModal}
        activatedModal={setAddRecipeModal}
      />
    </>
  );
}

export default RecipePage;
