import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        width: 1,
        height: "10vh",
        alignItems: "center",
      }}
      component="header"
    >
      <Box sx={{ width: 1, bgcolor: "primary.main", height: "3px" }}></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mx: 2,
        }}
      >
        <Box component="img" src="./src/app/assets/cooking.svg"></Box>
        <Typography variant="h3" sx={{ marginLeft: 1, width: "max-content" }}>
          Recipe Book
        </Typography>
      </Box>
      <Box sx={{ width: 1, bgcolor: "primary.main", height: "3px" }}></Box>
    </Box>
  );
}

export default Header;
