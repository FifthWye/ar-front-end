import http from './httpService';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';
const verificationLink = 'link';

http.setJwtHeader(getJwt());

export const authService = {
  login,
  logout,
  getCurrentUser,
  register,
};

async function login(email, password) {
  let response;
  try {
    response = await http.post(apiEndpoint + '/login', {
      email,
      password,
    });
  } catch (error) {
    return { error: 'Invalid credentials' };
  }

  const { data, status } = response;
  const { user } = data;

  if (!response.headers['x-auth-token']) {
    return { error: 'No auth token' };
  }

  if (!user.isVerified) {
    return { warring: 'Your account is not verified. Check your email or contact support to get verified manually.' };
  }

  if (status === 200) {
    localStorage.setItem(tokenKey, response.headers['x-auth-token']);
    window.location.href = '/panel';
    return { success: 'You successfully logged in' };
  }
}

function logout() {
  localStorage.removeItem(tokenKey);
  window.location.href = '/';
}

async function register(user) {
  const response = await http.post(apiEndpoint + '/signup', {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    verificationLink,
  });

  if (!response.headers['x-auth-token']) {
    return { error: 'No auth token' };
  }

  user = response.data.user;
  localStorage.setItem(tokenKey, response.headers['x-auth-token']);

  return { success: 'You have successfully created account, now you can try log in' };
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
