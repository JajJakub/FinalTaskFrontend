import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#C65F00",
    },
  },
  typography: {
    fontFamily: "Just Me Again Down Here",
    fontWeightRegular: 400,
  },
});

export const mainModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
