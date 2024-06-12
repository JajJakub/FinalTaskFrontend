import Header from "../components/header.tsx";
import {
  Box,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants.ts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../constants/types.ts";

function MainPage() {
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

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Header />
        <Link to={"register"}>Register</Link>
      </Box>

      <Box sx={{ width: 1 }}>
        <Box
          component="img"
          src="/banner.svg"
          sx={{ width: 1, objectFit: "contain" }}
        ></Box>
      </Box>

      <Container sx={{ width: "80%" }}>
        <Box sx={{ display: "flex" }}>
          <Input></Input>

          <Typography>Cuisine:</Typography>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="cuisine-input-label">Cuisine</InputLabel>
              <Select
                labelId="cuisine-input-label"
                id="cuisine-select"
                value={cuisine}
                label="Cuisine"
                onChange={handleCuisineChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography>Difficulty:</Typography>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="difficulty-input-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-input-label"
                id="difficulty-select"
                value={difficulty}
                label="Difficulty"
                onChange={handleDifficultyChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {data.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: "25%",
                boxSizing: "border-box",
                borderRadius: "10px 10px 0 0",
              }}
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
                <Box sx={{ display: "flex", width: 1 }}>
                  <Box
                    component="img"
                    src="/cuisine.svg"
                    sx={{ alignSelf: "start" }}
                  ></Box>
                  <Typography>Cuisine</Typography>
                  <Box sx={{ alignSelf: "flex-end" }}>
                    {item.cuisine ?? "default"}
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
export default MainPage;
