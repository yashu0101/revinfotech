const UserModel = require("../models/user.model");
const { compareHash } = require("../../helpers/encryption");
const { createToken, verifyToken } = require("../../helpers/token");
const UserCtrl = require("./user.controller");

class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;

    //first check wheather the user with given email id is available

    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (!result) throw new Error("inavalid email");
        // the user is available then check password, if user is not vailable then call catch
        else if (compareHash(password, result.password)) {
          // password matched
          // user is valid
          //!generate access and refresh token

          const accessToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            10 * 60
          );
          const refreshToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            25 * 60
          );

          // console.log(accessToken);

          res.set("x-access-token", accessToken);
          res.set("x-refresh-token", refreshToken);
          res.status(200).send({ message: " login successful ", data: result });
        } else {
          // password does not matched
          res.status(404).send({ message: "Inavalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Inavalid email or User is diasble" });
      });
  }

  static validateToken(req, res) {
    const token = req.headers.authorization;

    //verify token
    const payload = verifyToken(token);

    if (payload?._id) {
      //token is valida
      const { _id } = payload;

      UserModel.findOne({ _id })
        .then((result) => {
          res
            .status(200)
            .send({ data: UserCtrl.pickUser(result), message: "valid token" });
        })
        .catch((err) => {
          console.log(err);
          throw new Error("inavalid token ");
        });
    } else {
      //invalid token
      res.status(403).send({ message: "invalid token", error: null });
    }
  }

  static refreshToken(req, res) {
    const { refresh } = req.body;

    const payload = verifyToken(refresh);
    console.log("refresh", payload);
    if (payload?._id) {
      // refresh token is valid
      const accessT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 10
      );
      const refreshT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 25
      );

      res
        .status(200)
        .send({ data: { accessT, refreshT }, message: "token created" });
    } else {
      // refresh token is invalid
      res.status(403).send({ message: "Session Expired", error: null });
    }
  }
}

module.exports = AuthCtrl;
