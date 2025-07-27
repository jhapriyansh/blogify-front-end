import axios from "axios";

const loginService = (data: { email: string; password: string }) => {
  return axios.post("http://localhost:3002/api/v1/user/login", data);
};

const registerService = (data: {
  email: string;
  password: string;
  userName: string;
}) => {
  return axios.post("http://localhost:3002/api/v1/user/register", data);
};

const AuthServices = { loginService, registerService };
export default AuthServices;
