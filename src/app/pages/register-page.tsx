import Header from "../components/header.tsx";
import { Box, Container, Modal, Typography } from "@mui/material";
import LoginRegister from "../components/login-register.tsx";
import React, { useState } from "react";
import { AuthModeEnum } from "../constants/login-register.enum.ts";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants.ts";
import { mainModalStyle } from "../constants/default-theme.ts";
import { ErrorData } from "../constants/types.ts";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthModeEnum>(AuthModeEnum.Register);
  const [modalState, setModalState] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<ErrorData>();
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const email = data.get("email");

    if (username && password) {
      const userData = {
        username: username.toString(),
        password: password.toString(),
        email: email,
      };

      fetchData(userData);
    }
  };
  const handleModalClose = () => setModalState(false);

  const fetchData = (userData: {
    username: string;
    password: string;
    email: FormDataEntryValue | null;
  }) => {
    axios
      .post(API_BASE_URL + "/auth/" + authMode, userData)
      .then((response) => {
        sessionStorage.setItem("sub", response.data._id);
        sessionStorage.setItem("token", response.data.access_token);
        sessionStorage.setItem("user", response.data.username);

        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          const errorData: ErrorData = {
            code: error.response.status,
            messages: error.response.data.message,
          };

          setErrorMessages(errorData);
          setModalState(true);
        } else if (error.request) {
          setErrorMessages({
            code: 0,
            messages: [error.message, " No response from server."],
          });
          setModalState(true);
        } else {
          setErrorMessages({ code: 1, messages: error.message });
          setModalState(true);
        }
      });
  };

  return (
    <>
      <Header />

      <Container sx={{ width: "75%" }}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LoginRegister mode={setAuthMode} />
        </Box>
      </Container>

      <Modal open={modalState} onClose={handleModalClose}>
        <Box sx={mainModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Error ` + errorMessages?.code}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Error messages: ` + errorMessages?.messages}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
export default RegisterPage;
