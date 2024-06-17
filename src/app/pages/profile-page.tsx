import Header from "../components/header.tsx";
import { Box, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { API_BASE_URL, clearSession } from "../constants/constants.ts";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
import AddRecipeModal from "../components/add-recipe-modal.tsx";
import { Recipe } from "../constants/types.ts";

function ProfilePage() {
  const navigate = useNavigate();

  const [addRecipeModal, setAddRecipeModal] = useState<boolean>(false);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (
      !token ||
      !sessionStorage.getItem("user") ||
      !sessionStorage.getItem("sub")
    ) {
      toast.error("You are not logged in!");
      clearSession();
      navigate("/");
    } else {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        if (decoded.exp * 1000 < new Date().getTime()) {
          toast.error("Session expired");
          clearSession();
          navigate("/");
        }
      } else {
        toast.error("Incorrect JWT token");
        clearSession();
        navigate("/");
      }
    }
    const getUserRecipes = () => {
      const url = API_BASE_URL + "/recipes/userRecipes";
      axios
        .post(
          url,
          { id: sessionStorage.getItem("sub") },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((result) => {
          const recipes: Recipe[] = result.data;
          if (recipes) {
            setUserRecipes(recipes);
          }
        })
        .catch((error) => {
          toast.error("Couldn't get recipes");
          toast.error(
            "Error Code " +
              error.response.status +
              ": " +
              error.response.data.message,
          );
        });
    };

    getUserRecipes();

    return () => {};
  }, [navigate, userRecipes]);

  const handleLogout = () => {
    clearSession();

    toast.success("Successfully logged out!");

    navigate("/");
  };

  const handleMain = () => {
    navigate("/");
  };

  const handleAddRecipe = () => {
    setAddRecipeModal(true);
  };

  return (
    <>
      <Header />

      <Box sx={{ width: 1, mb: 3 }}>
        <Box
          component="img"
          src="/banner.svg"
          sx={{ width: 1, maxHeight: "30vh", objectFit: "cover" }}
        ></Box>
      </Box>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "max-content",
              px: 1,
              border: "2px solid",
              borderColor: "action.active",
              display: "flex",
              justifyContent: "center",
              mx: 5,
              borderRadius: "10px",
              justifySelf: "center",
            }}
            onClick={handleLogout}
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
              Log Out
            </Typography>
          </Box>

          <Box
            sx={{
              width: "8vw",
              border: "2px solid",
              borderColor: "action.active",
              display: "flex",
              justifyContent: "center",
              mx: 5,
              borderRadius: "10px",
              justifySelf: "center",
            }}
            onClick={handleMain}
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
              Main
            </Typography>
          </Box>

          <Box
            sx={{
              width: "max-content",
              border: "2px solid",
              borderColor: "action.active",
              display: "flex",
              justifyContent: "center",
              mx: 5,
              borderRadius: "10px",
              justifySelf: "center",
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
                px: 1,
              }}
            >
              Add Recipe
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
            My Recipes:
          </Typography>
          <ul>
            {userRecipes.length === 0 ? (
              <li>
                <Typography
                  variant="h4"
                  sx={{
                    my: 1,
                    border: "2px solid",
                    borderColor: "action.active",
                    borderRadius: "10px",
                    p: 1,
                  }}
                >
                  User does not have recipes
                </Typography>
              </li>
            ) : (
              userRecipes.map((recipe, index) => (
                <Link
                  to={`/recipe/${recipe._id}`}
                  key={index}
                  style={{
                    color: "black",
                    fontFamily: "Just Me Again Down Here",
                    textDecorationColor: "#C65F00",
                  }}
                >
                  <li>
                    <Typography
                      variant="h4"
                      sx={{
                        width: "max-content",
                        my: 1,
                        border: "2px solid",
                        borderColor: "action.active",
                        borderRadius: "10px",
                        p: 1,
                      }}
                    >
                      {recipe.name}
                    </Typography>
                  </li>
                </Link>
              ))
            )}
          </ul>
        </Box>
      </Container>
      <Toaster position="top-right" reverseOrder={false} />

      <AddRecipeModal
        isActive={addRecipeModal}
        activatedModal={setAddRecipeModal}
      />
    </>
  );
}
export default ProfilePage;
