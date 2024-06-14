import Header from "../components/header.tsx";
import { Box, Container, Paper, Typography } from "@mui/material";

import { API_BASE_URL } from "../constants/constants.ts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../constants/types.ts";
import { useNavigate } from "react-router-dom";

import DishTimeDifficulty from "../components/dish-time-difficulty.tsx";
import MySearch from "../components/search.tsx";
import { CuisineTypeEnum, DifficultyTypeEnum } from "../constants/enums.ts";

function MainPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<Recipe[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  const [cuisineSelect, setCuisineSelect] = useState<string>(
    CuisineTypeEnum.All,
  );
  const [difficultySelect, setDifficultySelect] = useState<string>(
    DifficultyTypeEnum.All,
  );

  useEffect(() => {
    if (
      searchString === "" &&
      cuisineSelect === CuisineTypeEnum.All &&
      difficultySelect === DifficultyTypeEnum.All
    ) {
      const url = API_BASE_URL + "/recipes/all";
      axios
        .get(url)
        .then((result) => {
          const recipes: Recipe[] = result.data;
          setData(recipes);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const url = API_BASE_URL + "/recipes/search";
      console.log(searchString + " " + cuisineSelect + " " + difficultySelect);

      const searchData = {
        name: searchString,
        cuisine: cuisineSelect,
        difficulty: difficultySelect,
      };

      axios
        .post(url, searchData)
        .then((result) => {
          const recipes: Recipe[] = result.data;
          setData(recipes);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      console.log("Initialized");
    };
  }, [searchString, cuisineSelect, difficultySelect]);

  const handleOnRegisterLogout = () => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("sub");
      sessionStorage.removeItem("token");
      navigate("/");
    } else {
      navigate("register");
    }
  };
  const handlePaperClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
          onClick={handleOnRegisterLogout}
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
            {sessionStorage.getItem("token") ? "Logout" : "Sign in"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: 1 }}>
        <Box
          component="img"
          src="/banner.svg"
          sx={{ width: 1, maxHeight: "30vh", objectFit: "cover" }}
        ></Box>
      </Box>

      <Container sx={{ width: "80%" }}>
        <MySearch
          onSearch={setSearchString}
          onSelectCuisine={setCuisineSelect}
          onSelectDifficulty={setDifficultySelect}
        />
        <Box
          sx={{
            pt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          {data.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                boxSizing: "border-box",
                borderRadius: "10px 10px 0 0",
              }}
              onClick={() => handlePaperClick(item._id)}
            >
              <Box>
                <Box
                  component="img"
                  src="/pizza.svg"
                  sx={{ width: 1, height: 1, borderRadius: "10px 10px 0 0" }}
                ></Box>

                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  {item.name}
                </Typography>

                <DishTimeDifficulty recipe={item} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
export default MainPage;
