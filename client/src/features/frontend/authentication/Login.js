import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../app/slices/AuthSlice";
import { useDispatch } from "react-redux";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    AuthService.userLogin(user)
      .then((response) => {
        alert("Login success");

        dispatch(addUser(response.data.data));
        navigate("/secured");
      })
      .catch((err) => {
        const message = err.response
          ? err.response.data.message
          : "could not login";
        alert(message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "auto",
        }}
      >
        <CssBaseline />
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "auto",
          }}
        >
          <Grid item xs={12} md={7} xl={5}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Paper sx={{ px: 4, py: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    {/* <LockOutlinedIcon /> */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={handleChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
