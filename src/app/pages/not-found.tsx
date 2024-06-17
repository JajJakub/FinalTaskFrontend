import Header from "../components/header.tsx";
import { Link, useNavigate } from "react-router-dom";
import HeaderButton from "../components/header-button.tsx";
import { Box, Container, Typography } from "@mui/material";

function NotFound() {
  const navigate = useNavigate();
  const handleMainClick = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }} component="header">
        <Header />
        <HeaderButton handleAction={handleMainClick} name={"Main"} />
      </Box>
      <Container sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "80%",
          }}
        >
          <Typography variant="h2" sx={{ width: 1, mb: 2 }}>
            404 Page Not Found
          </Typography>

          <Link
            className="lead"
            to={"/"}
            style={{ width: "20%", alignSelf: "center" }}
          >
            <Typography variant="h4">Main Page</Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default NotFound;
