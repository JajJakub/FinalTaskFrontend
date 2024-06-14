import Header from "../components/header.tsx";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { API_BASE_URL } from "../constants/constants.ts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../constants/types.ts";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import DishTimeDifficulty from "../components/dish-time-difficulty.tsx";

function MainPage() {
  const navigate = useNavigate();

  const [data, setData] = useState<Recipe[]>([]);
  const [cuisine, setCuisine] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  useEffect(() => {
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

    return () => {
      console.log("Initialized");
    };
  }, []);

  const handleCuisineChange = (event: SelectChangeEvent) => {
    setCuisine(event.target.value as string);
  };
  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };
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
        <Box
          sx={{
            pt: 3,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="search-input"
              label="Search"
              variant="standard"
              fullWidth
              inputProps={{ style: { fontSize: "1.5rem" } }}
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
            />
          </Box>

          <div style={{ width: "1px" }}></div>

          <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column" }}>
            <FormControl fullWidth>
              <InputLabel id="cuisine-input-label" sx={{ fontSize: "1.3rem" }}>
                Cuisine
              </InputLabel>
              <Select
                labelId="cuisine-input-label"
                id="cuisine-select"
                value={cuisine}
                onChange={handleCuisineChange}
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

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel
                id="difficulty-input-label"
                sx={{ fontSize: "1.3rem" }}
              >
                Difficulty
              </InputLabel>
              <Select
                labelId="difficulty-input-label"
                id="difficulty-select"
                value={difficulty}
                label="Difficulty"
                onChange={handleDifficultyChange}
                sx={{ fontSize: "1.3rem" }}
              >
                <MenuItem value={"All"} sx={{ fontSize: "1.5rem" }}>
                  All
                </MenuItem>
                <MenuItem value={"Easy"} sx={{ fontSize: "1.5rem" }}>
                  Easy
                </MenuItem>
                <MenuItem value={"Medium"} sx={{ fontSize: "1.5rem" }}>
                  Medium
                </MenuItem>
                <MenuItem value={"Hard"} sx={{ fontSize: "1.5rem" }}>
                  Hard
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
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
