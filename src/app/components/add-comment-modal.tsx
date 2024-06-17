import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { mainModalStyle } from "../constants/default-theme.ts";
import React from "react";
import { API_BASE_URL } from "../constants/constants.ts";
import axios from "axios";
import { Recipe } from "../constants/types.ts";
import toast, { Toaster } from "react-hot-toast";

type AddCommentModalProps = {
  isActive: boolean;
  activatedModal: (isActive: boolean) => void;
  recipe: Recipe;
  updateRecipe: (recipe: Recipe) => void;
};
function AddCommentModal({
  isActive,
  activatedModal,
  recipe,
  updateRecipe,
}: AddCommentModalProps) {
  const handleModalClose = () => {
    activatedModal(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const url = API_BASE_URL + "/recipes/addComment";

    const addCommentData = {
      recipeId: recipe._id,
      authorName: sessionStorage.getItem("user"),
      authorId: sessionStorage.getItem("sub"),
      commentBody: data.get("comment-message") as string,
    };

    axios
      .post(url, addCommentData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        const updatedRecipe: Recipe = result.data;
        console.log(updatedRecipe);
        updateRecipe(updatedRecipe);
      })
      .catch((error) => {
        toast.error(
          "Error Code " +
            error.response.status +
            ": " +
            error.response.data.message,
        );

        if (error.response.data.message === "Unauthorized") {
          sessionStorage.removeItem("sub");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");

          toast.error("Log in again");
        }
      });
    activatedModal(false);
  };

  return (
    <>
      <Modal open={isActive} onClose={handleModalClose}>
        <Box sx={mainModalStyle} component="form" onSubmit={handleFormSubmit}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add New Comment
          </Typography>
          <TextField
            required={true}
            id="comment-message"
            name="comment-message"
            label="Your Message"
            variant="outlined"
            fullWidth
            inputProps={{ style: { fontSize: "1.3rem" } }}
            InputLabelProps={{ style: { fontSize: "1.3rem" } }}
          />
          <Button type="submit" sx={{ fontSize: "1.3rem" }}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default AddCommentModal;
