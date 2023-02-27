const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); //add variable from .env file

require("./v1/models/db");

const port = process.env.PORT || 2020;

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token");
  next();
});
app.use(express.static("uploads"));
app.use(bodyParser.json());

// app.use(path,middlewear)
app.use("/api/v1/users", require("./v1/routes/user.route")); //api is path, and router is middlewear
app.use("/api/v1/auth", require("./v1/routes/auth.route")); //api is path, and router is middlewear

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
