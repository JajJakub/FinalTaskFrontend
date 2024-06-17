import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { AuthModeEnum } from "../constants/enums.ts";

type LoginRegisterProps = {
  mode: (mode: AuthModeEnum) => void;
};
function LoginRegister(mode: LoginRegisterProps) {
  const [authMode, setAuthMode] = useState<AuthModeEnum>(AuthModeEnum.Register);

  const handleFormSwitch = () => {
    if (authMode === AuthModeEnum.Register) {
      setAuthMode(AuthModeEnum.Login);
      mode.mode(AuthModeEnum.Login);
    }
    if (authMode === AuthModeEnum.Login) {
      setAuthMode(AuthModeEnum.Register);
      mode.mode(AuthModeEnum.Register);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid",
          borderColor: "action.active",
          borderRadius: "10px",
          justifyContent: "center",
          py: 2,
          px: 15,
          mt: 5,
        }}
      >
        <Typography variant="h3" sx={{ my: 1 }}>
          Welcome to Recipe Book!
        </Typography>
        <FormControl
          variant="standard"
          required={true}
          sx={{ my: 1, width: 1 }}
        >
          <InputLabel htmlFor="username" sx={{ fontSize: "1.5rem" }}>
            Username
          </InputLabel>
          <Input
            id="username"
            name="username"
            inputProps={{ style: { fontSize: "1.5rem" } }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          required={true}
          sx={{ my: 2, width: 1 }}
        >
          <InputLabel htmlFor="password" sx={{ fontSize: "1.5rem" }}>
            Password
          </InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            inputProps={{ style: { fontSize: "1.5rem" } }}
          />
        </FormControl>

        {authMode === AuthModeEnum.Register ? (
          <>
            <FormControl
              variant="standard"
              required={true}
              sx={{ my: 1, width: 1 }}
            >
              <InputLabel htmlFor="retypePassword" sx={{ fontSize: "1.5rem" }}>
                Retype password
              </InputLabel>
              <Input
                id="retypePassword"
                name="retypePassword"
                type="password"
                inputProps={{ style: { fontSize: "1.5rem" } }}
              />
            </FormControl>

            <FormControl
              variant="standard"
              required={true}
              sx={{ my: 2, width: 1 }}
            >
              <InputLabel htmlFor="email" sx={{ fontSize: "1.5rem" }}>
                Email address
              </InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                inputProps={{ style: { fontSize: "1.5rem" } }}
              />
            </FormControl>
          </>
        ) : null}

        <Button
          type="submit"
          sx={{
            width: "10vw",
            alignSelf: "center",
            fontSize: "1.6rem",
            border: "2px solid",
            borderColor: "action.active",
          }}
        >
          Confirm
        </Button>
      </Box>

      <Box onClick={handleFormSwitch} sx={{ alignSelf: "start", mx: 2 }}>
        <Typography variant="h5">Login/Register</Typography>
      </Box>
    </>
  );
}
export default LoginRegister;
