import Header from "../components/header.tsx";
import {
  Box,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Header />
        <Link to={"register"}>Register</Link>
      </Box>
      <Box sx={{ width: 1 }}>
        <Box
          component="img"
          src="./src/app/assets/banner.svg"
          sx={{ width: 1 }}
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
                // value={age}
                label="Cuisine"
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
                // value={age}
                label="Difficulty"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default MainPage;
