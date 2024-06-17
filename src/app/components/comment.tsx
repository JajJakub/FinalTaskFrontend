import { Box, Typography } from "@mui/material";
import { Comment } from "../constants/types.ts";

type CommentProps = {
  comment: Comment;
};

function CommentComponent({ comment }: CommentProps) {
  return (
    <Box sx={{ width: "75%", margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "secondary.main", mt: 1 }}>
          @{comment.authorName ?? ""}
        </Typography>
        <Typography variant="h5" sx={{ color: "secondary.main", mt: 1 }}>
          {comment.commentDate.toString() ?? ""}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: "secondary.main",
          border: "2px solid",
          borderRadius: "10px",
          px: 2,
          py: 1,
        }}
      >
        {comment.commentBody ?? "No comments for this recipe"}
      </Typography>
    </Box>
  );
}
export default CommentComponent;
