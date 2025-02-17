import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { AppBar, Drawer, DrawerHeader } from "./styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type MenuItemProps = {
  label: string;
  icon: ReactNode;
  url: string;
};
type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  titleHeader?: string;
  options?: MenuItemProps[];
  subOptions?: MenuItemProps[];
};

export default function MiniDrawer(props: Props) {
  const {
    children,
    isOpen,
    onClose,
    onOpen,
    titleHeader,
    options = [{ label: "candidate", icon: <PersonIcon />, url: "" }],
    subOptions = [{ label: "news", icon: <NewspaperIcon />, url: "news" }],
  } = props;

  const router = useParams();
  const location = useLocation();
  console.log("🚀 ~ MiniDrawer ~ location:", location);
  console.log("🚀 ~ MiniDrawer ~ router:", router);
  const navigate = useNavigate();

  const theme = useTheme();

  const renderList = (array: MenuItemProps[]) => {
    const currentPath = location?.pathname;

    return array?.map(({ label, url, icon }) => {
      const isHome = url === "" && currentPath === "/";
      const isActive = url && currentPath?.includes(url);
      const background = isHome || isActive ? "#1976d2" : "none";
      const color = isHome || isActive ? "white" : "initial";

      return (
        <ListItem
          key={label}
          disablePadding
          sx={{ display: "block", background, color }}
          onClick={() => navigate(`/${url}`)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
              justifyContent: isOpen ? "initial" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                mr: isOpen ? 3 : "auto",
                color,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              sx={{ textTransform: "capitalize", opacity: isOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={isOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            edge="start"
            sx={[{ marginRight: 5 }, isOpen && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {titleHeader || location?.pathname === "/" ? "Candidate" : "News"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={onClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderList(options)}</List>
        {subOptions?.length > 0 && (
          <>
            <Divider />
            <List>{renderList(subOptions)}</List>
          </>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
