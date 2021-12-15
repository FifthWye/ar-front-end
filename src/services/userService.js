import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";
const tokenKey = "token";
const verificationLink = "link";
const recoverEmailLink = "link";

export const userService = {
  editUser,
  resetPassword,
  changeEmail,
  sendVerificationEmail,
  activateAccount,
  sendRecoverEmail,
  resetPasswordByToken,
};

http.setJwtHeader(getJwt());

function getJwt() {
  return localStorage.getItem(tokenKey);
}

async function editUser(firstName, lastName) {
  const response = await http.put(apiEndpoint + "/", {
    firstName,
    lastName,
  });
  if (!response.headers["x-auth-token"]) {
    return Promise.reject("No auth token");
  }
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
  return JSON.stringify(response.data.user);
}

async function resetPassword(oldPassword, newPassword) {
  await http.patch(apiEndpoint + "/reset-password", {
    oldPassword,
    newPassword,
  });
}

async function changeEmail(password, newEmail) {
  const response = await http.patch(apiEndpoint + "/change-email", {
    password,
    newEmail,
  });
  if (!response.headers["x-auth-token"]) {
    return Promise.reject("No auth token");
  }
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

//=========================AccountVerification=========================//

async function sendVerificationEmail() {
  await http.get(apiEndpoint + "/send-activate-email", {
    link: verificationLink,
  });
}

async function activateAccount(token) {
  const response = await http.patch(apiEndpoint + "/activate-account", {
    token,
  });
  if (!response.headers["x-auth-token"]) {
    return Promise.reject("No auth token");
  }
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
  return JSON.stringify(response.data.user);
}

//=========================forgotPassword=========================//

async function sendRecoverEmail(email) {
  await http.get(apiEndpoint + "/send-recover-email", {
    email,
    link: recoverEmailLink,
  });
}

async function resetPasswordByToken(token, newPassword) {
  await http.patch(apiEndpoint + "/recover-password", {
    token,
    password: newPassword,
  });
}
