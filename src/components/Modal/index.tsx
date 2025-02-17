import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";
import { BootstrapDialog } from "./styled";

type Props = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  content: ReactNode;
  closeTitle?: string;
  saveTitle?: string;
};

export default function CustomizedDialogs(props: Props) {
  const {
    title = "Modal Title",
    isOpen,
    onClose,
    onSave,
    content,
    closeTitle = "cancel",
    saveTitle = "save",
  } = props;

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers sx={{ minWidth: "500px" }}>
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{ paddingRight: "1rem" }}
        >
          {closeTitle}
        </Button>
        <Button
          autoFocus
          onClick={() => {
            onSave();
            onClose();
          }}
          variant="contained"
        >
          {saveTitle}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
