import { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { AuthModeEnum } from "../constants/login-register.enum.ts";

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
      <FormControl variant="standard" required={true}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" name="username" />
      </FormControl>
      <FormControl variant="standard" required={true}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" name="password" type="password" />
      </FormControl>

      {authMode === AuthModeEnum.Register ? (
        <>
          <FormControl variant="standard" required={true}>
            <InputLabel htmlFor="retypePassword">Retype password</InputLabel>
            <Input id="retypePassword" name="retypePassword" type="password" />
          </FormControl>

          <FormControl variant="standard" required={true}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" name="email" type="email" />
          </FormControl>
        </>
      ) : null}

      <Button type="submit">Confirm</Button>
      <Box onClick={handleFormSwitch}>Login/Register</Box>
    </>
  );
}
export default LoginRegister;
