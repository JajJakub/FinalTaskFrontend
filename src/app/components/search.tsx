import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { CuisineTypeEnum, DifficultyTypeEnum } from "../constants/enums.ts";
import { SelectCuisine, SelectDifficulty } from "../constants/constants.ts";

type MySearchProps = {
  onSearch: (item: string) => void;
  onSelectCuisine: (item: string) => void;
  onSelectDifficulty: (item: string) => void;
};
function MySearch({
  onSearch,
  onSelectCuisine,
  onSelectDifficulty,
}: MySearchProps) {
  const [cuisine, setCuisine] = useState<string>(CuisineTypeEnum.All);
  const [difficulty, setDifficulty] = useState<string>(DifficultyTypeEnum.All);
  const [, setInputValue] = useState<string>("");

  const handleCuisineChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    console.log(value);

    setCuisine(value);
    onSelectCuisine(value);
  };
  const handleDifficultyChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    console.log(value);

    setDifficulty(value);
    onSelectDifficulty(value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search: string = event.target.value;
    console.log(search);

    setInputValue(search);
    onSearch(search);
  };

  return (
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
          onChange={handleInputChange}
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
            {SelectCuisine.map((item, index) => (
              <MenuItem value={item} sx={{ fontSize: "1.5rem" }} key={index}>
                {item[0].toUpperCase() + item.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="difficulty-input-label" sx={{ fontSize: "1.3rem" }}>
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
            {SelectDifficulty.map((item, index) => (
              <MenuItem value={item} sx={{ fontSize: "1.5rem" }} key={index}>
                {item[0].toUpperCase() + item.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
export default MySearch;
