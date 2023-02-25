import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as yup from "yup";
import Divider from "@mui/material/Divider";
import CustomerContext from "./CustomerContext";
import UserServices from "../../../services/UserService";
import AddIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
const Uploader = (
  { handleChange, name, image } //this component is created for avatar and id doc
) => (
  <Box
    sx={{
      border: "1px solid #aaa",
      width: 100,
      height: 100,
      position: "relative",
    }}
  >
    <IconButton sx={{ position: "absolute", bottom: 0, left: 0, p: 0 }}>
      <label htmlFor={name}>
        <AddIcon />
      </label>
    </IconButton>
    <input
      type="file"
      name={name}
      onChange={handleChange}
      accept=".png,.jpg,.webp,.svg"
      id={name}
      style={{ display: "none" }}
    />
    <img src={image} style={{ width: "100%", height: "100%" }} />
  </Box>
);
const userSchema = yup.object().shape({
  name: yup.object({
    first: yup.string().min(3, "too short"),
    last: yup.string().min(3, "too short"),
  }),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  email: yup.string().email(),
  password: yup.string().min(5, "too short"),
  role: yup.string().optional(),
  task: yup.string(),
  startdate: yup.date(),
  enddate: yup.date(),
  status: yup.number().optional(),
});
const CustomerForm = () => {
  const { initialUser, handleDialogClose, operation, loadUsers } =
    useContext(CustomerContext);
  const [images, setImages] = React.useState({
    avatar: "",
  });
  const [strImages, setStrImages] = React.useState({
    avatar: "",
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) setImages({ ...images, [name]: files[0] });
  };

  const handleSubmit = (user) => {
    // console.log("User: ", user);
    const fd = new FormData();
    fd.append("avatar", images.avatar);
    fd.append("name.first", user.name?.first);
    fd.append("name.last", user.name?.last);
    fd.append("email", user.email);
    fd.append("password", user.password);
    fd.append("role", user.role);
    fd.append("mobile", user.mobile);
    fd.append("status", user.status);

    // if (user.address) {
    //   for (const p in user.address) fd.append(`address.${p}`, user.address[p]);
    // }

    if (operation == "edit") {
      // update user
      UserServices.updateUser(user._id, fd)
        .then((response) => {
          alert("user updated...");
          loadUsers && loadUsers();
          handleDialogClose();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // create user
      UserServices.createUser(fd)
        .then((response) => {
          alert("user created...");
          loadUsers && loadUsers();
          handleDialogClose();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  React.useEffect(() => {
    if (images.avatar) {
      const fr = new FileReader();
      fr.addEventListener("load", (e) => {
        setStrImages({ ...strImages, avatar: fr.result });
      });

      if (images.avatar) fr.readAsDataURL(images.avatar);
    }
  }, [images]);

  return (
    <Formik
      initialValues={{
        name: {
          first: "",
          last: "",
        },
        mobile: "",
        email: "",
        password: "",
        // gender: "",
        status: 1,
        role: "admin",

        ...initialUser,
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>Avatar</h4>
              <Uploader
                handleChange={handleImageChange}
                name="avatar"
                image={strImages.avatar}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                name="name.first"
                value={values.name.first}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched?.name && touched?.name.first && errors?.name?.first
                    ? true
                    : false
                }

                // helperText={
                //   touched?.name && touched?.name.first && errors?.name?.first
                // }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                name="name.last"
                value={values.name.last}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched?.name && touched?.name.last && errors?.name?.last
                    ? true
                    : false
                }
                // helperText={
                //   touched?.name && touched?.name.last && errors?.name?.last
                // }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Mobile"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.mobile && errors?.mobile ? true : false}
                helperText={touched?.mobile && errors?.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.email && errors?.email ? true : false}
                helperText={touched?.email && errors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.password && errors?.password ? true : false}
                helperText={touched?.password && errors?.password}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="role">Role</InputLabel>
                <Select
                  labelId="role"
                  id="demo-simple-select"
                  value={values.role}
                  label="Role"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="users">users</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="demo-simple-select"
                  value={values.status}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} container justifyContent="space-evenly">
              <Divider />
              <Button type="submit" variant="contained" color="primary">
                {operation == "edit" ? "Update" : "Create"}
              </Button>
              <Button
                onClick={handleDialogClose}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default CustomerForm;
