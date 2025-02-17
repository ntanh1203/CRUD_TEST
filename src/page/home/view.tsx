import { Box } from "@mui/material";

const HomeView = () => {
  return (
    <Box
      component="iframe"
      src="/Nguyen-Tuan-Anh-2025.pdf"
      sx={{ width: "100%", height: "calc(100% - 64px)" }}
    />
  );
};

export default HomeView;
