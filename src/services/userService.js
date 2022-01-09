import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/user';
const tokenKey = 'token';

export const userService = {
  getMe,
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

async function getMe() {
  const response = await http.get(apiEndpoint + '/');

  return response.data.user;
}

async function editUser(firstName, lastName) {
  const response = await http.put(apiEndpoint + '/', {
    firstName,
    lastName,
  });
  if (!response.headers['x-auth-token']) {
    return { error: 'some error' };
  }

  localStorage.setItem(tokenKey, response.headers['x-auth-token']);
  return JSON.stringify(response.data.user);
}

async function resetPassword(oldPassword, newPassword) {
  try {
    await http.patch(apiEndpoint + '/reset-password', {
      oldPassword,
      newPassword,
    });
  } catch (error) {
    return { error: 'Invalid password' };
  }
  return { success: 'Success' };
}

async function changeEmail(password, newEmail) {
  let response;
  try {
    response = await http.patch(apiEndpoint + '/change-email', {
      password,
      newEmail,
    });
  } catch (error) {
    if (error.response.data.message.includes('Already Exist'))
      return { error: 'This email is already used. Try different' };
    return { error: 'Invalid email or password' };
  }

  localStorage.setItem(tokenKey, response.headers['x-auth-token']);
  return { success: 'Success' };
}

//=========================AccountVerification=========================//

async function sendVerificationEmail() {
  await http.get(apiEndpoint + '/send-activate-email');
}

async function activateAccount(token) {
  const response = await http.patch(apiEndpoint + '/activate-account', {
    token,
  });
  if (!response.headers['x-auth-token']) {
    return Promise.reject('No auth token');
  }
  localStorage.setItem(tokenKey, response.headers['x-auth-token']);
  return JSON.stringify(response.data.user);
}

//=========================forgotPassword=========================//

async function sendRecoverEmail(email) {
  await http.get(apiEndpoint + '/send-recover-email', {
    params: {
      email,
    },
  });
  return {
    success: `We sent an email to ${email} with a link to get back into your account.`,
  };
}

async function resetPasswordByToken(token, password) {
  await http.patch(apiEndpoint + '/recover-password', {
    token,
    password,
  });
  return {
    success: `Success. Now you can log into your account.`,
  };
}
