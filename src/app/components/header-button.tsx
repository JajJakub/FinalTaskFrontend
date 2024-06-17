import { Box, Typography } from "@mui/material";

type HeaderButtonProps = {
  handleAction: (handle: unknown) => void;
  name: string;
};

function HeaderButton({ handleAction, name }: HeaderButtonProps) {
  return (
    <Box
      sx={{
        width: "8vw",
        border: "2px solid",
        borderColor: "action.active",
        display: "flex",
        justifyContent: "center",
        mx: 2,
        borderRadius: "10px",
        height: "50%",
      }}
      onClick={handleAction}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          width: 1,
          textAlign: "center",
          py: 1,
          height: "50%",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
export default HeaderButton;
