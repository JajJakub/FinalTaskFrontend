import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import { ThemeProvider } from "@mui/material";
import { mainTheme } from "./constants/default-theme.ts";
import "@fontsource/just-me-again-down-here";
import "@fontsource/nunito-sans";
import RegisterPage from "./pages/register-page.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import MainPage from "./pages/main-page.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter([
  { path: "/", element: <MainPage />, errorElement: <App /> },
  { path: "register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
