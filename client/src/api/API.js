import axios from "axios";
import AuthServices from "../services/AuthService";
import endpoints from "./endpoints";

const API = axios.create({
  baseURL: `${endpoints.serverBaseurl}/api/v1`,
});

API.interceptors.request.use((req) => {
  const aToken = sessionStorage.getItem("access");
  if (aToken && req.headers) {
    req.headers["authorization"] = aToken;
  }
  return req;
});

API.interceptors.response.use(
  (res) => {
    console.log("response intersepetor");
    return res;
  },
  async (err) => {
    console.error(err);

    if (err?.response?.status == 420) {
      const response = await AuthServices.refreshToken();

      if (response.data?.data) {
        const { accessT, refreshT } = response?.data?.data;
        sessionStorage.clear();
        sessionStorage.setItem("refresh ", refreshT);
        sessionStorage.setItem("accesss ", accessT);
        return Promise.resolve({ data: null, message: "token refreshed" });
      } else {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    } else {
      return Promise.reject(err);
    }
  }
);

export default API;
