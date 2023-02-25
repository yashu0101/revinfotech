import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

import UserService from "../../../services/UserService";

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: {
      first: "",
      last: "",
    },
    status: 1,
    role: "users",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;

    if (user?.name)
      setUser({ ...user, name: { ...user?.name, [name]: value } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User: ", user);

    if (!user.name || !user.email) {
      alert("Enter all required fields");
    }
  };

  const registerUser = () => {
    UserService.createUser(user)
      .then((response) => {
        const message = response.data.message || "Created";
        alert(message);
        navigate("/login");
      })
      .catch((err) => {
        console.log("err", err);
        const message = err.response.data.message || "Not Created";
        alert(message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={7}>
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
                  <Typography component="h1" variant="h5">
                    User Registration
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="first"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={user.name?.first}
                        onChange={handleNameChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="last"
                        label="Last"
                        name="last"
                        autoComplete="family-name"
                        value={user.image?.last}
                        onChange={handleNameChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="mobile"
                        label="Mobile "
                        name="mobile"
                        autoComplete="mobile"
                        value={user.mobile}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={user.password}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={registerUser}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/login">Already have an account? Sign in</Link>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
