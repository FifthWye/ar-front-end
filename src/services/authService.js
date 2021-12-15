import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";
const verificationLink = "link";

http.setJwtHeader(getJwt());

export const authService = {
  login,
  logout,
  getCurrentUser,
  register,
};

async function login(email, password) {
  email = "skakodube@gmail.com";
  password = "12345";
  const response = await http.post(apiEndpoint + "/login", {
    email,
    password,
  });
  if (!response.headers["x-auth-token"]) {
    return Promise.reject("No auth token");
  }
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
  return JSON.stringify(response.headers["x-auth-token"]);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

async function register(user) {
  const response = await http.post(apiEndpoint + "/signup", {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    verificationLink,
  });
  if (!response.headers["x-auth-token"]) {
    return Promise.reject("No auth token");
  }
  user = response.data.user;
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
  return JSON.stringify(user);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}
