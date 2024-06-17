import { Recipe } from "../constants/types.ts";
import Header from "../components/header.tsx";
import { Box, Container, Paper, Typography } from "@mui/material";
import DishTimeDifficulty from "../components/dish-time-difficulty.tsx";
import { useEffect, useState } from "react";
import { API_BASE_URL, RecipePlaceholder } from "../constants/constants.ts";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommentComponent from "../components/comment.tsx";
import AddCommentModal from "../components/add-comment-modal.tsx";
import HeaderButton from "../components/header-button.tsx";

function RecipePage() {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const params = useParams<string>();

  const [addCommentModal, setAddCommentModal] = useState<boolean>(false);
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

  const handleAddComment = () => {
    setAddCommentModal(true);
  };

  const handleProfileClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  const handleMainClick = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "rows", alignItems: "center" }}
        component="header"
      >
        <Header />
        <HeaderButton handleAction={handleMainClick} name={"Main"} />
        <HeaderButton
          handleAction={handleProfileClick}
          name={token ? "Profile" : "Sign in"}
        />
      </Box>

      <Container
        sx={{
          pt: 3,
          display: "grid",
          gridTemplateColumns: "repeat(2, 2fr)",
          gap: 3,
          width: 1,
        }}
      >
        <Box
          component="img"
          src="/pizza.svg"
          sx={{ width: 1, height: 1, borderRadius: "10px " }}
        ></Box>

        <Box sx={{ width: 1 }}>
          <Typography variant="h2">{data.name}</Typography>
          <DishTimeDifficulty recipe={data} />
        </Box>
        <Box sx={{ minHeight: "30vh" }}>
          <Typography variant="h3">Instructions</Typography>
          <Typography variant="h5">{data.steps}</Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            boxSizing: "border-box",
            my: 3,
            minHeight: "30vh",
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ mx: 2, my: 1 }}>
              Ingredients
            </Typography>
            <ul>
              {data.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  style={{ fontSize: "1.3rem" }}
                >{`${ingredient.product}: ${ingredient.quantity} ${ingredient.measureType}`}</li>
              ))}
            </ul>
          </Box>
        </Paper>
      </Container>
      <Box
        sx={{ width: 1, bgcolor: "primary.main", height: "3px", mb: 3 }}
      ></Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mx: 15,
            mb: 3,
          }}
        >
          <Typography variant="h3" sx={{ width: "20vw" }}>
            Comments
          </Typography>
          {token ? (
            <Box
              sx={{
                width: "20vw",
                border: "2px solid",
                borderColor: "action.active",
                display: "flex",
                justifyContent: "center",
                mx: 5,
                borderRadius: "10px",
              }}
              onClick={handleAddComment}
            >
              <Typography variant="h4" sx={{ my: "auto" }}>
                Add Comment
              </Typography>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
        {data.comments.map((comment, index) => (
          <CommentComponent key={index} comment={comment} />
        ))}
      </Box>

      <AddCommentModal
        isActive={addCommentModal}
        activatedModal={setAddCommentModal}
        recipe={data}
        updateRecipe={setData}
      />
    </>
  );
}

export default RecipePage;
