import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Slide,
  SlideProps,
  TextField,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";

interface PostDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (content: string) => void;
}

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const validationSchema = Yup.object().shape({
  content: Yup.string().trim().required("Post content cannot be empty"),
});

const PostDialog: React.FC<PostDialogProps> = ({ open, handleClose, handleSubmit }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handlePost = async () => {
    try {
      await validationSchema.validate({ content });
      setError("");
      handleSubmit(content);
      setContent(""); // Clear input after submission
      handleClose();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>
        Create Post
        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="What's on your Mind..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{marginTop: "12px"}}
          />
          <Button variant="outlined" color="primary" onClick={handlePost}>
            Post
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
