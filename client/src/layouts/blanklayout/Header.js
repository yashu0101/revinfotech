import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/AuthSlice";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Route, Routes, NavLink as Link } from "react-router-dom";
import routes from "../../shared/routes/FrontendRoutes";

const NavLink = styled(Link)({
  textDecoration: "none",
  margin: "0 5px",
});

const drawerWidth = 240;
const Header = (props) => {
  const loggedUser = useSelector(selectUser);

  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Topper's E-Learning
      </Typography>
      <Divider />
      <List>
        {routes

          .filter((route) => {
            console.log(route.authenticated, " => ", loggedUser._id);

            if (route.authenticated == "both") return true;
            else if (route.authenticated == "yes" && loggedUser._id)
              return true;
            else if (route.authenticated == "no" && !loggedUser._id)
              return true;
            else return false;
          })

          .map(({ path, label }) => (
            <ListItem key={path} disablePadding>
              <NavLink
                end
                to={path}
                style={({ isActive }) => ({
                  width: "100",
                  color: isActive ? "red" : "#000",
                })}
              >
                <ListItemButton sx={{ paddingLeft: 1 }}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
      <AppBar
        component="nav"
        sx={{ backgroundColor: "#fff", color: "#000336" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Study Material
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {routes

              .filter((route) => {
                console.log(route.authenticated, " => ", loggedUser._id);

                if (route.authenticated == "both") return true;
                else if (route.authenticated == "yes" && loggedUser._id)
                  return true;
                else if (route.authenticated == "no" && !loggedUser._id)
                  return true;
                else return false;
              })

              .map(({ path, label }) => (
                <NavLink
                  end
                  key={path}
                  to={path}
                  style={({ isActive }) => ({
                    color: isActive ? "#687690" : "#000336",
                    fontWeight: "bold",
                  })}
                >
                  {label}
                </NavLink>
              ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />

        <Routes>
          {Array.isArray(routes) &&
            routes
              .filter(({ addRoute }) => addRoute)
              .map(({ path, component }, i) => (
                <Route key={path + i} path={path} element={component} />
              ))}
        </Routes>
      </Box>
    </Box>
  );
};

export default Header;
