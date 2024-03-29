import axios from 'axios';

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;
//   if (!expectedError) {
//     console.log('An unexpected error occured.');
//   }
//   //change to error no message
//   // return Promise.reject(error);
//   // console.log('Catched in httpService');
//   // return { error: 'Invalid credentials' };
// });

function setJwtHeader(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwtHeader,
};
