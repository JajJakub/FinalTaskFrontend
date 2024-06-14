import { Box, Typography } from "@mui/material";

function Comment() {
  return (
    <Box sx={{ width: "75%", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Ala ma kota</Typography>
        <Typography variant="h5">Data</Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{ color: "secondary.main", border: "1px solid black" }}
      >
        Comment Message
      </Typography>
    </Box>
  );
}
export default Comment;
