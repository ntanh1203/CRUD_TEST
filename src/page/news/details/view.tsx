import { Box, Button, Collapse, TextField } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FormProps } from "./container";

type Props = {
  onSubmit: () => void;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
};

const NewsDetailsView = (props: Props) => {
  const { onSubmit, register, errors } = props;

  const navigate = useNavigate();
  const { action } = useParams();
  const isView = action === "view";

  return (
    <Box noValidate component="form" autoComplete="off" onSubmit={onSubmit}>
      <Box sx={{ marginBottom: "2rem", textAlign: "right" }}>
        <Button
          variant="contained"
          type="button"
          color="error"
          onClick={() => navigate("/news")}
          sx={{ marginRight: "1rem" }}
        >
          {isView ? "Close" : "Cancel"}
        </Button>

        {!isView && (
          <Button variant="contained" type="submit">
            Save
          </Button>
        )}
      </Box>
      <Box sx={{ marginBottom: "2rem", textAlign: "left" }}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          {...register("label", { required: true })}
          disabled={isView}
        />

        <Collapse in={!!errors?.label}>
          {errors?.label && (
            <Box sx={{ fontSize: "12px", color: "red" }}>
              This field is required
            </Box>
          )}
        </Collapse>
      </Box>

      <Box sx={{ marginBottom: "2rem", textAlign: "left" }}>
        <TextField
          fullWidth
          multiline
          maxRows="8"
          minRows="4"
          label="Content"
          variant="outlined"
          {...register("content", { required: true })}
          disabled={isView}
        />
        <Collapse in={!!errors?.content}>
          {errors?.content && (
            <Box sx={{ fontSize: "12px", color: "red" }}>
              This field is required
            </Box>
          )}
        </Collapse>
      </Box>
    </Box>
  );
};

export default NewsDetailsView;
