import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function App() {
  return (
    <Container sx={{ height: "100vh" }}>
      <Typography variant="h1" sx={{ color: "secondary.main" }}>
        Classic Pizza
      </Typography>
      <Link to={"register"}>Register</Link>
    </Container>
  );
}

export default App;
